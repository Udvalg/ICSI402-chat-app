import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Friend from "./Friend";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { AuthContext } from "../../../context/AuthContext";

const FriendList = () => {
  const { signedUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const unsub = onSnapshot(doc(db, "users", signedUser?.uid), (doc) => {
      setFriends(doc?.data()?.friends);
    });
  };

  const a=5;

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
