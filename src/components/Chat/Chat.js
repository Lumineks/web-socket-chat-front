import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid } from "@material-ui/core";
import Context from "../../context/userContext";
import InfoPanel from "./infoPanel/InfoPanel";
import Message from "./Message/Message";
import Header from "./header/header";
import Controls from "./Controls/Controls";
import TopPanel from "./TopPanel/TopPanel";

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
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);

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
      const parsedData = JSON.parse(event.data);
      console.log(parsedData);
      switch (parsedData.event) {
        case "message": {
          const { message } = parsedData;
          setMessages((prevmsges) => {
            const messages = [...prevmsges];
            messages.unshift(message);
            return messages;
          });

          break;
        }
        case "usersOnline": {
          console.log(parsedData);
          setUsersOnline(parsedData.users);
          break;
        }
        case "muteToggled": {
          console.log(`call setMute  -  ${userCxt.isMuted} - `);
          
          // userCxt.logout();
          userCxt.setMute(parsedData.isMuted);

          break;
        }
        case "allUsers": {
          console.log("all users from db", parsedData.users);
          setAllUsers(parsedData.users);

          break;
        }
        case "refreshOnlineUsers": {
          const data = JSON.stringify({
            event: "login",
            token: userCxt.token,
          });

          connection.send(data);
          break;
        }
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
    const date = new Date().toLocaleString();
    const message = JSON.stringify({
      event: "message",
      text: text,
      date: date,
      token: userCxt.token,
    });
    console.log(message);
    if (connection.readyState) {
      connection.send(message);
    }
  };

  const handleMute = (isMuted, name) => {
    const message = JSON.stringify({
      event: "toggleMute",
      isMuted: isMuted,
      token: userCxt.token,
      userToMuteName: name,
    });

    if (connection.readyState && userCxt.isAdmin) {
      connection.send(message);
    }
  };

  const handleBan = (isBanned, name) => {
    const message = JSON.stringify({
      event: "toggleBan",
      isBanned: isBanned,
      token: userCxt.token,
      userToBanName: name,
    });

    if (connection.readyState && userCxt.isAdmin) {
      connection.send(message);
    }
  };

  const handleLogout = () => {
    const data = JSON.stringify({
      event: "logout",
      token: userCxt.token,
    });
    connection.send(data);
    connection.close();
    userCxt.logout();
  };

  let messageList = null;

  if (messages) {
    messageList = messages.map((msg) =>
      msg.name === userCxt.name ? (
        <Message msg={msg} right />
      ) : (
        <Message msg={msg} />
      )
    );
  }

  return (
    <>
      <Header closeConnection={handleLogout} />
      <Box padding={3} boxShadow={3}>
        <TopPanel
          usersOnline={usersOnline}
          allUsers={allUsers}
          handleMute={handleMute}
          handleBan={handleBan}
        />
        {/* <InfoPanel usersOnline={usersOnline} /> */}
        <Grid
          container
          direction="column-reverse"
          wrap="nowrap"
          className={clsx(classes.list)}
        >
          {messageList}
        </Grid>
        <Controls send={handleSendMessage}/>
      </Box>
    </>
  );
};

export default Chat;
