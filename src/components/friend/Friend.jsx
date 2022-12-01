import React from "react";
import { Avatar } from "antd";

const Friend = ({ userName, avatar }) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar icon={avatar} />
      <p>{userName}</p>
    </div>
  );
};

export default Friend;
