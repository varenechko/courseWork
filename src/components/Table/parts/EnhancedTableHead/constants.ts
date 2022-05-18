import { HeadCell } from "./interafces";

export const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "название публикации",
  },
  {
    id: "author",
    numeric: true,
    disablePadding: true,
    label: "ФИО авторов",
  },
  {
    id: "journalName",
    numeric: true,
    disablePadding: true,
    label: "название журнала",
  },
  {
    id: "publicationYear",
    numeric: true,
    disablePadding: true,
    label: "год издания",
  },
  {
    id: "publicationPlace",
    numeric: true,
    disablePadding: true,
    label: "место публикации",
  },
  {
    id: "publicationMount",
    numeric: true,
    disablePadding: true,
    label: "количество публикаций",
  },
  {
    id: "publicationNumber",
    numeric: true,
    disablePadding: true,
    label: "номер публикации",
  },
  {
    id: "pageInterval",
    numeric: true,
    disablePadding: true,
    label: "страничный интервал",
  },
  {
    id: "publicationKind",
    numeric: true,
    disablePadding: true,
    label: "вид публикации",
  },
];
