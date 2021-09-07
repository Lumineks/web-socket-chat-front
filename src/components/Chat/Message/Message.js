import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    overflow: 'visible',
    margin: '10px 0',
  },
  self: {
      marginLeft: 'auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Message = (props) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, props.self && classes.self)} elevation={3}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>U</Avatar>}
        title="User nickname"
        subheader="September 7, 13:33"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
