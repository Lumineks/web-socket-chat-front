import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  useMediaQuery,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 15,
    paddingBottom: 15,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.closeConnection();
  };

  let logoutContent = null;
  if (useMediaQuery(theme.breakpoints.up("sm"))) {
    logoutContent = (
      <Grid item>
        <Button onClick={handleLogout}>Выйти из чата</Button>
      </Grid>
    );
  } else {
    logoutContent = (
      <Grid item>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Выйти из чата</MenuItem>
        </Menu>
      </Grid>
    );
  }

  return (
    <header className={clsx(classes.header)}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <h1>Websockets chat</h1>
        </Grid>
        {logoutContent}
      </Grid>
    </header>
  );
};

export default Header;
