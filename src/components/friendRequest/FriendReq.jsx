import React from "react";
import { Avatar } from "antd";
import {
  CloseOutlined,
  CheckCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
const FriendReq = ({ userName, avatar }) => {
  return (
    <div className="flex flex-row just">
      <div className="flex flex-row flex-1 space-x-10">
        <Avatar icon={avatar} />
        <p>{userName}</p>
      </div>
      <div className="flex-initial w-18 space-x-10">
        <CloseOutlined height={100} color="green" />
        <CheckCircleFilled size={40} />
      </div>
    </div>
  );
};

export default FriendReq;
