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
  btnMargin: {
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

    const userData = {
      username: values.userName,
      password: values.password,
      email: values.email,
    };

    axios
      .post("/login", userData)
      .then((response) => {
        // console.log(response);
        userCxt.login(response.data);
      })
      .catch((error) => console.log(error));

    // userCxt.login('', userData.username, false, false, false);
  };

  return (
    <div>
      <h2>Login</h2>
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
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            required
          />
          {isLoading ? (
            <CircularProgress className={clsx(classes.spinner)} />
          ) : (
            <Button
              className={clsx(classes.btnMargin)}
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          )}
        </FormControl>
      </form>
    </div>
  );
};

export default Login;
