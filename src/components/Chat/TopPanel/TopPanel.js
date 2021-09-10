import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Context from "../../../context/userContext";

const useStyles = makeStyles((theme) => ({
  ItemGutters: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  itemRoot: {
    border: "1px solid #3f51b5",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  itemRootAdmin: {
    border: "1px solid #3f51b5",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingRight: 140,
  },
  itemTextRoot: {
    wordBreak: "break-all",
  },
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
  btnText: {
    padding: 0,
  },
}));

const TopPanel = ({ usersOnline, allUsers, handleMute, handleBan }) => {
  const userCxt = useContext(Context);
  const classes = useStyles();
  const theme = useTheme();
  const isMatchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  console.log(isMatchesSm);

  let itemClasses = {
    root: classes.itemRoot,
    gutters: classes.ItemGutters,
  };
  if (userCxt.isAdmin) {
    itemClasses["root"] = classes.itemRootAdmin;
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const usersList = usersOnline.map((user) => (
    <ListItem classes={{ ...itemClasses }} key={user.name}>
      <ListItemText
        primary={user.name}
        secondary={user.email}
        classes={{ root: classes.itemTextRoot }}
      />
      {userCxt.isAdmin && user.name !== userCxt.name && (
        <ListItemSecondaryAction>
          <Button
            classes={{ text: classes.btnText }}
            onClick={() => {
              handleMute(user.isMuted ? false : true, user.name);
            }}
          >
            {user.isMuted ? "Unmute" : "Mute"}{" "}
          </Button>
          <Button
            classes={{ text: classes.btnText }}
            color="secondary"
            onClick={() => {
              handleBan(user.isBanned ? false : true, user.name);
            }}
          >
            {user.isBanned ? "unban" : "Ban"}
          </Button>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  ));

  let allUsersList = null;
  if (userCxt.isAdmin) {
    allUsersList = allUsers.map((user) => (
      <ListItem classes={{ ...itemClasses }} key={user.name}>
        <ListItemText
          primary={user.name}
          secondary={user.email}
          classes={{ root: classes.itemTextRoot }}
        />
        {userCxt.isAdmin && user.name !== userCxt.name && (
          <ListItemSecondaryAction>
            <Button
              classes={{ text: classes.btnText }}
              onClick={() => {
                handleMute(user.isMuted ? false : true, user.name);
              }}
            >
              {user.isMuted ? "Unmute" : "Mute"}{" "}
            </Button>
            <Button
              classes={{ text: classes.btnText }}
              color="secondary"
              onClick={() => {
                handleBan(user.isBanned ? false : true, user.name);
              }}
            >
              {user.isBanned ? "unban" : "Ban"}
            </Button>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    ));
  }

  return (
    <>
      <Box marginBottom={3}>
        <Grid container justifyContent="space-between" spacing={1}>
          <Grid item>
            <h2>Привет, <span style={{color: userCxt.color}}>{userCxt.name}</span></h2>
          </Grid>

          <Grid item>
            <Button color="primary" variant="outlined" onClick={handleOpen}>
              {/* Пользователи(онлайн: 5) */}
              Пользователи(онлайн: {usersOnline.length})
            </Button>
          </Grid>
        </Grid>
      </Box>

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
              {usersList}
            </List>
            {userCxt.isAdmin && (
              <>
                <div>Все пользователи</div>
                <List dense>{allUsersList}</List>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default TopPanel;
