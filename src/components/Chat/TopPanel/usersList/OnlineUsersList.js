import UserListItem from "./UserListItem";

const OnlineUsersList = ({ usersOnline, handleMute, handleBan }) => {
  return usersOnline.map((user) => (
    <UserListItem user={user} handleMute={handleMute} handleBan={handleBan} />
  ));
};

export default OnlineUsersList;
