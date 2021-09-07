import { setState } from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid } from "@material-ui/core";
import { useContext, useState } from "react";
import Context from "../../context/userContext";
import InfoPanel from "./infoPanel/InfoPanel";
import Message from "./Message/Message";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  list: {
    height: "calc(100vh - 200px)",
    overflow: "auto",
  },
  btn: {
    padding: 0,
    minWidth: 'auto',
  },
  header: {
    paddingTop: 15,
    paddingBottom: 15,
  },
}));

const Chat = () => {
  const userCxt = useContext(Context);
  const classes = useStyles();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  //   const array = [];
  //   for (let i = 0; i < 100; i++) {
  //     array.push(i);
  //   }

  return (
    <>
      <header className={clsx(classes.header)}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Button className={clsx(classes.btn)}>
              <MenuIcon fontSize="large" />
            </Button>
            <Drawer
              anchor="left"
              open={isMenuOpen}
              onClose={toggleDrawer(false)}
            >
              <div>1block</div>
              <div>1block</div>
            </Drawer>
          </Grid>
          <Grid item>
            <h1>Websockets chat</h1>
          </Grid>
        </Grid>
      </header>
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
            {/* {array.map(item=><Box>{item}</Box>)} */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Chat;
