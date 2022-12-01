import React from "react";
import { friendRequests } from "../../testData";
import FriendReq from "../friendRequest/FriendReq";

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
