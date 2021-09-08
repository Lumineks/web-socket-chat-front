import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import { useContext, useState } from "react";
import Context from "../../context/userContext";
import InfoPanel from "./infoPanel/InfoPanel";
import Message from "./Message/Message";
import Header from "./header/header";


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

  return (
    <>
    <Header />
      <Box padding={3} boxShadow={3}>
        <Box marginBottom={3}>
          <h2>Привет, username{userCxt.userName}</h2>
        </Box>

        <Grid container spacing={5}>
          <InfoPanel />
          <Grid
            item
            xs={12}
            md={7}
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
        </Grid>
      </Box>
    </>
  );
};

export default Chat;
