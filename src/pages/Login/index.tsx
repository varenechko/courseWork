import { ChangeEvent, FC, useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BoxStyled, SignUpTypography, SignUpWrapper } from "./styles";
import { Button } from "@mui/material";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../shared/Context";
import { sendPostRequest } from "../../axios/hooks";
import { LoginResponse } from "../../axios/interfaces";

export const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  let navigate = useNavigate();

  const textFieldWidth = "25vw";

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  const handleOnLoginClick = async () => {
    const response: LoginResponse = await sendPostRequest("api/auth/signin", {
      email,
      password,
    });
    if (response) {
      sessionStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(`jwt`, response.jwt);
      setIsLoggedIn(true);
      navigate("/", { replace: true });
    }
  };

  if (isLoggedIn) return <Navigate to="/" replace={true} />;

  return (
    <BoxStyled>
      <TextField
        label="Логин"
        id="outlined-start-adornment"
        value={email}
        onChange={handleEmailChange}
        sx={{ m: 1, width: textFieldWidth }}
      />
      <FormControl sx={{ m: 1, width: textFieldWidth }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button variant="contained" onClick={handleOnLoginClick}>
        Войти
      </Button>
      <SignUpWrapper>
        <SignUpTypography>
          еще нет аккаунта?
          <NavLink to="/signUp">создать</NavLink>
        </SignUpTypography>
      </SignUpWrapper>
    </BoxStyled>
  );
};
