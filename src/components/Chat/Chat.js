import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid } from "@material-ui/core";
import Context from "../../context/userContext";
import InfoPanel from "./infoPanel/InfoPanel";
import Message from "./Message/Message";
import Header from "./header/header";
import Controls from "./Controls/Controls";

const useStyles = makeStyles((theme) => ({
  list: {
    height: "calc(100vh - 260px)",
    minHeight: 300,
    overflow: "auto",
  },
}));

const Chat = () => {
  const userCxt = useContext(Context);
  const classes = useStyles();

  const [connection, setConnection] = useState(null);
  const [usersOnline, setUsersOnline] = useState([]);

  useEffect(() => {
    const connection = new WebSocket("ws://localhost:5000");

    connection.onopen = () => {
      console.log("connected");

      const data = JSON.stringify({
        event: "login",
        token: userCxt.token,
      });

      connection.send(data);
    };

    connection.onclose = (event) => {
      if (event.wasClean) {
        console.log("closed successfuly");
      } else {
        console.log("lost connection");
      }

      console.log("Код: " + event.code);
      userCxt.logout();
    };

    connection.onmessage = (event) => {
      // console.log(data);
      const parsedData = JSON.parse(event.data);
      console.log(parsedData);
      switch (parsedData.event) {
        case "message":
          break;

        case "usersOnline":
          console.log(parsedData);
          setUsersOnline(parsedData.users);
          break;
        default:
          break;
      }
    };

    connection.onerror = function (error) {
      console.log("Ошибка " + error.message);
    };

    setConnection(connection);
  }, []);

  const handleSendMessage = (text) => {
    console.log(userCxt);
    const message = JSON.stringify({
      event: "message",
      text: text,
      token: userCxt.token,
    });
    console.log(message);
    if (connection.readyState) {
      connection.send(message);
    }
  };

  const handleClose = () => {
    const data = JSON.stringify({
      event: "logout",
      token: userCxt.token,
    });
    connection.send(data);
    connection.close();
    userCxt.logout();
  };

  return (
    <>
      <Header closeConnection={handleClose} />
      <Box padding={3} boxShadow={3}>
        

          {/* <InfoPanel usersOnline={usersOnline} /> */}
          <Grid
            container
            direction="column-reverse"
            wrap="nowrap"
            className={clsx(classes.list)}
          >
            <Message self />
            <Message />
            <Message />
            <Message self />
            <Message self />
            <Message />
          </Grid>
          <Controls send={handleSendMessage} />

      </Box>
    </>
  );
};

export default Chat;
