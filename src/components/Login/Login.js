import clsx from "clsx";
import { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button, CircularProgress } from "@material-ui/core";
import Context from "../../context/userContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 15,
    paddingBottom: 5,
    textAlign: "center",
  },
  form: {
    maxWidth: 414,
    margin: "auto",
  },
  textField: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
  },
  spinner: {
    margin: "30px auto 0",
  },
  btn: {
    marginTop: 30,
  },
}));

const Login = () => {
  const userCxt = useContext(Context);
  const classes = useStyles();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    userName: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setIsLoading(true);
    const userData = {
      username: values.userName,
      password: values.password,
      email: values.email,
    };

    axios
      .post("/login", userData)
      .then((response) => {
        setIsLoading(false);
        userCxt.login(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <header className={clsx(classes.header)}>
        <h1>Авторизация</h1>
      </header>
      <form
        className={clsx(classes.form)}
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <FormControl className={clsx(classes.textField)}>
          <TextField
            id="username"
            label="Имя пользователя"
            onChange={handleChange("userName")}
            required
          />
        </FormControl>
        <FormControl className={clsx(classes.textField)}>
          <TextField
            id="email"
            label="Email адрес"
            onChange={handleChange("email")}
            type="email"
            required
          />
        </FormControl>
        <FormControl className={clsx(classes.textField)}>
          <InputLabel htmlFor="password" required>
            Password
          </InputLabel>
          <Input
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {isLoading ? (
            <CircularProgress className={clsx(classes.spinner)} />
          ) : (
            <Button
              className={clsx(classes.btn)}
              variant="contained"
              color="primary"
              type="submit"
            >
              Войти
            </Button>
          )}
        </FormControl>
      </form>
    </div>
  );
};

export default Login;
