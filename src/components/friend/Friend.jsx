import React from "react";
import { Avatar } from "antd";

const Friend = ({ userName, avatar }) => {
  return (
    <div className="flex flex-row flex-1 space-x-10">
      <Avatar icon={avatar} />
      <p>{userName}</p>
    </div>
  );
};

export default Friend;
