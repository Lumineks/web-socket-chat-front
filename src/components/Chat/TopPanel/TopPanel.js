import { useState, useContext } from "react";
import { Box, Button, Grid } from "@material-ui/core";
import Context from "../../../context/userContext";
import UsersModal from "./UsersModal";

const TopPanel = ({ usersOnline, allUsers, handleMute, handleBan }) => {
  const userCxt = useContext(Context);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box marginBottom={3}>
        <Grid container justifyContent="space-between" spacing={1}>
          <Grid item>
            <h2>
              Привет, 
              <span style={{ color: userCxt.color }}> {userCxt.name}</span>
            </h2>
          </Grid>

          <Grid item>
            <Button color="primary" variant="outlined" onClick={handleOpen}>
              Пользователи(онлайн: {usersOnline.length})
            </Button>
          </Grid>
        </Grid>
      </Box>

      <UsersModal
        open={open}
        handleClose={handleClose}
        usersOnline={usersOnline}
        allUsers={allUsers}
        handleMute={handleMute}
        handleBan={handleBan}
      />
    </>
  );
};

export default TopPanel;
