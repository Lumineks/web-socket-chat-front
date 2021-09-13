import UserListItem from "./UserListItem";

const OnlineUsersList = ({ usersOnline, handleMute, handleBan }) => {
  return usersOnline.map((user) => (
    <UserListItem
      user={user}
      handleMute={handleMute}
      handleBan={handleBan}
      key={user.name + user.email}
    />
  ));
};

export default OnlineUsersList;
