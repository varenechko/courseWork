import { SelectChangeEvent, InputLabel, Select, MenuItem } from "@mui/material";
import { FC, useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendPostRequest } from "../../axios/hooks";
import { EditPublicationProps } from "./infetrafces";
import {
  BoxStyled,
  TextFieldStyled,
  NumberFieldWrapperStyled,
  NumberFieldStyled,
  FormControlStyled,
  ButtonStyled,
} from "./styles";

export const PublicationEditing: FC<EditPublicationProps> = ({
  publication,
}) => {
  const [name, setName] = useState(publication?.name || "");
  const [journalName, setJournalName] = useState(
    publication?.journalName || ""
  );
  const [publicationYear, setPublicationYear] = useState(
    publication?.publicationYear || "2022"
  );
  const [publicationPlace, setPublicationPlace] = useState(
    publication?.publicationPlace || ""
  );
  const [publicationMount, setPublicationMount] = useState(
    publication?.publicationMount || "0"
  );
  const [publicationNumber, setPublicationNumber] = useState(
    publication?.publicationNumber || "0"
  );
  const [pageInterval, setPageInterval] = useState(
    publication?.pageInterval || "0"
  );
  const [publicationKind, setPublicationKind] = useState(
    publication?.publicationKind || ""
  );

  useEffect(() => {
    if (publication) {
      setName(publication.name);
      setJournalName(publication.journalName);
      setPublicationYear(publication.publicationYear);
      setPublicationPlace(publication.publicationPlace);
      setPublicationMount(publication.publicationMount);
      setPublicationNumber(publication.publicationNumber);
      setPageInterval(publication.pageInterval);
      setPublicationKind(publication.publicationKind);
    }
  }, [publication]);

  const navigate = useNavigate();

  const onChangePublicationPlace = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPublicationPlace(event.target.value);
  };
  const onChangeName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };
  const onChangeJournalName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJournalName(event.target.value);
  };
  const onChangePublicationYear = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPublicationYear(event.target.value);
  };
  const onChangePublicationMount = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPublicationMount(event.target.value);
  };
  const onChangePublicationNumber = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPublicationNumber(event.target.value);
  };
  const onChangePageInterval = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageInterval(event.target.value);
  };
  const onChangePublicationKind = (event: SelectChangeEvent) => {
    setPublicationKind(event.target.value as string);
  };

  const onCancelClick = () => {
    navigate("/", { replace: true });
  };

  const onSaveClick = async () => {
    const response = await sendPostRequest("publications", {
      name,
      journalName,
      publicationYear,
      publicationPlace,
      publicationMount,
      publicationNumber,
      pageInterval,
      publicationKind,
    });
    if (response) {
      navigate("/", { replace: true });
    }
  };

  return (
    <BoxStyled>
      <TextFieldStyled
        label="название"
        variant="standard"
        type="email"
        id="outlined-start-adornment"
        value={name}
        onChange={(e) => onChangeName(e)}
      />
      <TextFieldStyled
        label="название журнала"
        variant="standard"
        id="outlined-start-adornment"
        value={journalName}
        onChange={(e) => onChangeJournalName(e)}
      />
      <TextFieldStyled
        label="место публикации"
        variant="standard"
        id="outlined-start-adornment"
        value={publicationPlace}
        onChange={(e) => onChangePublicationPlace(e)}
      />
      <NumberFieldWrapperStyled>
        <NumberFieldStyled
          label="кол-во"
          variant="standard"
          type={"number"}
          id="outlined-start-adornment"
          value={publicationNumber}
          onChange={(e) => onChangePublicationNumber(e)}
        />
        <NumberFieldStyled
          label="интервал"
          variant="standard"
          type={"number"}
          id="outlined-start-adornment"
          value={pageInterval}
          onChange={(e) => onChangePageInterval(e)}
        />
        <NumberFieldStyled
          label="год"
          variant="standard"
          type={"number"}
          id="outlined-start-adornment"
          value={publicationYear}
          onChange={(e) => onChangePublicationYear(e)}
        />
      </NumberFieldWrapperStyled>

      <FormControlStyled fullWidth size="small">
        <InputLabel id="demo-simple-select-label">вид публикации</InputLabel>
        <Select
          labelId="publicationKind-select-label"
          id="publicationKind-select"
          value={publicationKind}
          label="publicationKind"
          onChange={onChangePublicationKind}
        >
          <MenuItem value={"научная работа"}>научная работа</MenuItem>
          <MenuItem value={"публикация студента"}>публикация студента</MenuItem>
          <MenuItem value={"школьная книга"}>школьная книга</MenuItem>
        </Select>
      </FormControlStyled>
      <NumberFieldWrapperStyled>
        <ButtonStyled onClick={onCancelClick} variant="outlined">
          Отменить
        </ButtonStyled>
        <ButtonStyled onClick={onSaveClick} variant="contained">
          Сохранить
        </ButtonStyled>
      </NumberFieldWrapperStyled>
    </BoxStyled>
  );
};
