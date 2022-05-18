import { styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { theme } from "../../shared/theme";

export const BoxStyled = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SignUpWrapper = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

export const SignUpTypography = styled(Typography)`
  font-size: 12px;
  color: ${theme.palette.primary.dark};

  a {
    margin-left: 5px;
    text-decoration: none;
  }
`;
