import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { HEADER_HEIGHT } from "../../shared/constants";

export const BoxStyled = styled(Box)`
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
