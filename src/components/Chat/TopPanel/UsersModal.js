import { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Context from "../../../context/userContext";

import {
  Grid,
  IconButton,
  List,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import OnlineUsersList from "./usersList/OnlineUsersList";
import AllUsersList from './usersList/allUsersList';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    maxWidth: 400,
    width: "100%",
    maxHeight: 400,
    overflow: "auto",
  },
  title: {
    fontSize: theme.typography.caption,
  },
}));

const UsersModal = ({ open, handleClose, usersOnline, allUsers, handleMute, handleBan }) => {
  const userCxt = useContext(Context);
  const classes = useStyles();
  const theme = useTheme();
  const isMatchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <h2 className={classes.title}>Пользователи онлайн</h2>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <CloseIcon fontSize={isMatchesSm ? "large" : "medium"} />
              </IconButton>
            </Grid>
          </Grid>
          <List dense>
            <OnlineUsersList usersOnline={usersOnline} handleMute={handleMute} handleBan={handleBan} />
          </List>
          {userCxt.isAdmin && (
            <>
              <div>Все пользователи</div>
              <List dense>
                <AllUsersList allUsers={allUsers} handleMute={handleMute} handleBan={handleBan} />
              </List>
            </>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default UsersModal;
