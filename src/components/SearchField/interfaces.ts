import { ChangeEvent } from "react";

export interface SearchProps {
  searchValue: string;
  handleSearchValueChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSearchClick: () => void;
}
