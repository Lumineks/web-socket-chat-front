import UserListItem from "./UserListItem";

const AllUsersList = ({ allUsers, handleMute, handleBan }) => {
  return allUsers.map((user) => (
    <UserListItem
      user={user}
      handleMute={handleMute}
      handleBan={handleBan}
      key={user.name + user.email}
    />
  ));
};

export default AllUsersList;
