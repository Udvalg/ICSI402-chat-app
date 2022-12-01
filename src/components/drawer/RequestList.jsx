import React from "react";

const RequestList = () => {
  return (
    <div>
      <div>
        {friendRequests.map((request) => (
          <FriendReq
            key={friendRequests.indexOf(request)}
            userName={request.userName}
            avatar={request.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default RequestList;
