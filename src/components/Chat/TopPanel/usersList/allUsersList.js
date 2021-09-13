import UserListItem from "./UserListItem";

const AllUsersList = ({allUsers, handleMute, handleBan}) => {
  return allUsers.map((user) => <UserListItem user={user} handleMute={handleMute} handleBan={handleBan} />);
};

export default AllUsersList;
