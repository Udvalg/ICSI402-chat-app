import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Friend from "./Friend";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { AuthContext } from "../../../context/AuthContext";

const FriendList = () => {
  const { signedUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const docSnap = await getDoc(doc(db, "users", signedUser.uid));
    setFriends(docSnap.data()?.friends);
  };

  return (
    <div>
      {friends?.map((friend) => (
        <Friend
          key={friend?.userId}
          displayName={friend?.displayName}
          userImg={friend?.userImg}
        />
      ))}
    </div>
  );
};

export default FriendList;
