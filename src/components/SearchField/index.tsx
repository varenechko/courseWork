import { Search, StyledInputBase } from "./styles";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { FC } from "react";
import { SearchProps } from "./interfaces";

export const SearchField: FC<SearchProps> = ({
  searchValue,
  onSearchClick,
  handleSearchValueChange,
}) => (
  <Search>
    <StyledInputBase
      placeholder="имя автора…"
      value={searchValue}
      inputProps={{ "aria-label": "search" }}
      onChange={handleSearchValueChange}
    />
    <IconButton onClick={onSearchClick}>
      <SearchIcon />
    </IconButton>
  </Search>
);
