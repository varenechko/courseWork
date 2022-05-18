import { Data } from "./interfases";

export const createData = (
  number: number,
  name: string,
  authors: string,
  journal: string,
  year: number
): Data => ({
  number,
  name,
  authors,
  journal,
  year,
});
