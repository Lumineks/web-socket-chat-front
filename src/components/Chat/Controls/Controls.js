import { useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Grid, Icon } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import Context from '../../../context/userContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexBasis: "100%",
    marginLeft: 0,
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
      width: "100%",
    },
  },
  desktop: {
    flexBasis: "58.3%",
    marginLeft: "auto",
  },
  btn: {
    height: "100%",
  },
}));

const Controls = (props) => {
  const userCxt = useContext(Context);
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const isMatchesMd = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.send(message);
    setMessage("");
    console.log("send");
  };

  return (
    <form
      className={clsx(classes.root, isMatchesMd && classes.desktop)}
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={9}>
          <TextField
            id="standard-multiline-flexible"
            label="Введите сообщение"
            value={message}
            onChange={handleChange}
            required
            inputProps={{ maxLength: 200 }}
            disabled={userCxt.isMuted}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Icon>send</Icon>}
            fullWidth
            disabled={userCxt.isMuted}
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Controls;
