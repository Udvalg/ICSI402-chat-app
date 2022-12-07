import { Avatar } from "antd";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Message = ({ selectedFriend, signedUser, msg }) => {
  return msg.sentBy === signedUser.uid ? (
    <div className="flex flex-row justify-end my-2 mx-2">
      <div className="bg-slate-50 w-[35vw] p-2 rounded-l-lg rounded-br-lg">
        {msg.msgBody}
      </div>
      <Avatar className="mx-2" src={signedUser.userImg} />
    </div>
  ) : (
    <div className="flex flex-row my-2 mx-2">
      <Avatar className="mx-2" src={selectedFriend.userImg} />
      <div className="bg-purple-200 w-[35vw] p-2 rounded-r-lg rounded-bl-lg">
        {msg.msgBody}
      </div>
    </div>
  );
};

export default Message;
