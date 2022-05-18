import { alpha, InputBase } from "@mui/material";
import styled from "styled-components";
import { theme } from "../../shared/theme";

export const Search = styled.div`
  position: relative;
  max-width: 180px;
  border-radius: 15px;
  border: 1px solid ${theme.palette.primary.dark};
  display: flex;
`;

export const SearchIconWrapper = styled.div`
  height: 100%;
  position: absolute;
  right: 5px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.palette.primary.dark};
`;

export const StyledInputBase = styled(InputBase)`
  & .MuiInputBase-input {
    color: inherit;
    width: 100%;
    padding-left: 10px;
  }
`;
// (({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));
