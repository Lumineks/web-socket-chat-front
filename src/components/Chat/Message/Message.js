import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";


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
      backgroundColor: red[500],
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
