import { useContext } from "react";
import Context from "../../../../context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

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
  btnText: {
    padding: 0,
  },
}));

const UserListItem = ({ user, handleMute, handleBan }) => {
  const userCxt = useContext(Context);
  const classes = useStyles();

  let itemClasses = {
    root: classes.itemRoot,
    gutters: classes.ItemGutters,
  };
  if (userCxt.isAdmin) {
    itemClasses["root"] = classes.itemRootAdmin;
  }

  return (
    <ListItem classes={{ ...itemClasses }} key={user.name}>
      <ListItemText
        classes={{ root: classes.itemTextRoot }}
        primary={user.name}
        secondary={user.email}
      />
      {userCxt.isAdmin && user.name !== userCxt.name && (
        <ListItemSecondaryAction>
          <Button
            classes={{ text: classes.btnText }}
            onClick={() => {
              handleMute(user.isMuted ? false : true, user.name);
            }}
          >
            {user.isMuted ? "Unmute" : "Mute"}
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
  );
};

export default UserListItem;
