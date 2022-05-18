import { ChangeEvent } from "react";

export interface EnhancedTableToolbarProps {
  selected: number[];
  handleDeleteRow: () => void;
  searchValue: string;
  handleSearchValueChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSearchClick: () => void;
}
