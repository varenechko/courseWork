import { FC, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { sendGetRequest } from "../../axios/hooks";
import { PublicationEditing } from "../../components/PublicationEditing";
import { Row } from "../../shared/interfases";

export const EditPublication: FC = () => {
  const { id } = useParams();

  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const getRows = async () => {
      const response = await sendGetRequest("publications");
      if (response) {
        setRows(response);
      }
    };
    getRows();
  }, []);

  if (!id) return <Navigate to="/" />;

  console.log(rows.filter((elem) => elem.id === Number(id))[0]);

  return (
    <PublicationEditing
      publication={rows.filter((elem) => elem.id === Number(id))[0]}
    />
  );
};
