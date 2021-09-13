import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";

import Context from "../../context/userContext";
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

    connection.onclose = () => {
      userCxt.logout();
    };

    connection.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.event === "message") {
        const { message } = parsedData;
        setMessages((prevmsges) => {
          const updatedMessages = [...prevmsges];
          updatedMessages.unshift(message);
          return updatedMessages;
        });

        return;
      }

      if (parsedData.event === "muteToggled") {
        userCxt.setMute(parsedData.isMuted);

        if (parsedData.isMuted) {
          alert("Вы в муте, отправка сообщений недоступна");
        } else {
          alert("Мут был снят, отправка сообщений снова доступна");
        }

        return;
      }

      if (parsedData.event === "usersOnline") {
        setUsersOnline(parsedData.users);

        return;
      }

      if (parsedData.event === "refreshOnlineUsers") {
        const data = JSON.stringify({
          event: "login",
          token: userCxt.token,
        });

        connection.send(data);

        return;
      }

      if (parsedData.event === "allUsers") {
        setAllUsers(parsedData.users);

        return;
      }
    };

    connection.onerror = function (error) {
      console.log("Ошибка " + error.message);
    };

    setConnection(connection);

    return () => {
      setConnection(null);
    }
  }, []);

  const handleSendMessage = (text) => {
    const date = new Date().toLocaleString();

    const message = JSON.stringify({
      event: "message",
      token: userCxt.token,
      text: text,
      date: date,
      color: userCxt.color,
    });

    if (connection.readyState) {
      connection.send(message);
    }
  };

  const handleMute = (isMuted, name) => {
    const message = JSON.stringify({
      event: "toggleMute",
      token: userCxt.token,
      isMuted: isMuted,
      userToMuteName: name,
    });

    if (connection.readyState && userCxt.isAdmin) {
      connection.send(message);
    }
  };

  const handleBan = (isBanned, name) => {
    const message = JSON.stringify({
      event: "toggleBan",
      token: userCxt.token,
      isBanned: isBanned,
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
        <Message msg={msg} right key={msg.name + msg.date} />
      ) : (
        <Message msg={msg} key={msg.name + msg.date} />
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
        <Grid
          container
          direction="column-reverse"
          wrap="nowrap"
          className={clsx(classes.list)}
        >
          {messageList}
        </Grid>
        <Controls send={handleSendMessage} />
      </Box>
    </>
  );
};

export default Chat;
