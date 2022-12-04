import { Avatar } from "antd";
import React from "react";

const Friend = ({ displayName, userImg }) => {
  return (
    <div className="flex items-center">
      <Avatar src={userImg} />
      <p>{displayName}</p>
    </div>
  );
};

export default Friend;
