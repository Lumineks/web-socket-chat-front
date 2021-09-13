import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Avatar,
} from "@material-ui/core";

const Message = ({ msg, right }) => {
  const { text, date, name, color } = msg;
  const useStyles = makeStyles((theme) => ({
    root: {
      color: color,
      maxWidth: 400,
      [theme.breakpoints.up("sm")]: {
        minWidth: "50%",
        maxWidth: "80%",
      },
      overflow: "visible",
      margin: "10px 0",
    },
    self: {
      marginLeft: "auto",
    },
    avatar: {
      backgroundColor: color,
    },
  }));

  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, right && classes.self)} elevation={3}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{name[0]}</Avatar>}
        title={name}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="inherit" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
