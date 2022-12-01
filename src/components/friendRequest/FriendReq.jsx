import React from "react";
import { Avatar, Button } from "antd";
import {
  CloseOutlined,
  CheckCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
const FriendReq = ({ userName, avatar }) => {
  return (
    <div className="flex justify-between ">
      <div className="flex items-center">
        <Avatar icon={avatar} />
        <p>{userName}</p>
      </div>
      <div className="flex items-centerw-18 space-x-3">
       <Button className="flex justify-center items-center" icon={ <CloseOutlined height={100} />}></Button>
       <Button className="flex justify-center items-center" icon={ <CheckCircleFilled size={40} />}></Button>
      </div>
    </div>
  );
};

export default FriendReq;
