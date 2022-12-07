import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import Message from "./Message";

const Messages = (chatId, signedUser) => {
  const [messages, setMessages] = useState([]);
  console.log(chatId);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
  //     //hi
  //     doc.exists() && messages.push(doc.data());
  //   });

  //   return () => {
  //     unSub();
  //   };
  // });

  return (
    <div className="messages">
      {messages?.map((msg, index) => (
        <Message
          key={index}
          signedUser={signedUser}
          selectedFriend={selectedFriend}
          message={msg}
        />
      ))}
    </div>
  );
};

export default Messages;
