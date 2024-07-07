import { Link } from "react-router-dom";

const FriendsList = ({ friends }) => {
  if (!friends.length) {
    return <div> </div>;
  }
  return (
    <div className="space-y-4 ">
      <h2 className="font-bold mb-4">Friends:</h2>
      {friends &&
        friends.map((friend) => (
          <div
            key={friend._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 w-full  "
          >
            <p>
              <Link
                to={`/profiles/${friend.username}`}
                className="text-black-500 hover:underline"
              >
                {friend.username}
              </Link>
            </p>
          </div>
        ))}
    </div>
  );
};
export default FriendsList;
