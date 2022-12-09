import { Avatar } from "antd";
import React from "react";

const Message = ({ signedUser ,selectedFriend, message }) => {
  return (
    console.log("msg", message), 
    <div className={selectedFriend.userId === message.sentBy ? "flex max-h-[calc(100vh-60px)] py-1 gap-1 scroll-smooth" : "flex flex-row-reverse max-h-[calc(100vh-60px)]   py-1 gap-1 scroll-smooth"}>
      <Avatar src={selectedFriend.userId === message.sentBy ? selectedFriend.userImg : signedUser.userImg} />
      <div className={selectedFriend.userId === message.sentBy ? "bg-purple-100 p-3 min-w-[50vw] rounded-r-lg rounded-bl-lg" : "bg-slate-100 p-3 min-w-[50vw] rounded-b-lg rounded-tl-lg"}>{message.msgBody}</div>
    </div>
  )
};

export default Message;
