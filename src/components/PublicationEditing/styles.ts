import { Box, Button, FormControl, TextField } from "@mui/material";
import styled from "styled-components";
import { HEADER_HEIGHT } from "../../shared/constants";

export const BoxStyled = styled(Box)`
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NumberFieldWrapperStyled = styled(Box)`
  width: 18vw;
  display: flex;
  justify-content: space-between;
`;

export const TextFieldStyled = styled(TextField)`
  width: 18vw;
  margin-bottom: 8px;
`;

export const NumberFieldStyled = styled(TextFieldStyled)`
  width: 5vw;
`;

export const FormControlStyled = styled(FormControl)`
  width: 18vw;
  margin-top: 12px;
`;

export const ButtonStyled = styled(Button)`
  width: 8vw;
  margin-top: 14px;
`;
