export interface Data {
  number: number;
  name: string;
  authors: string;
  journal: string;
  year: number;
}

export interface LocationState {
  pathname: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  email: string;
  roles: Role[];
  fio: string;
}

export interface Row {
  id: number;
  name: string;
  author: Author;
  journalName: string;
  publicationYear: number;
  publicationPlace: string;
  publicationMount: number;
  publicationNumber: number;
  pageInterval: number;
  publicationKind: string;
}
