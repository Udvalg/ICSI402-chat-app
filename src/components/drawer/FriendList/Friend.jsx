import { Avatar, Button } from "antd";
import { arrayRemove, doc, updateDoc, getDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { db } from "../../../firebase.config";

const Friend = ({ userId, displayName, userImg }) => {
  const { signedUser } = useContext(AuthContext);
  const [signedUserData, setSignedUserData] = useState([]);
  useEffect(() => {
    const fetchSignedUserDoc = async () => {
      const docRef = doc(db, "users", signedUser?.uid);
      try {
        const docSnap = await getDoc(docRef);
        console.log("sanp", docSnap?.data());
        setSignedUserData(docSnap?.data());
      } catch (e) {
        console.log(e);
      }
    };
    fetchSignedUserDoc();
  }, []);

  const handleRemoveFriend = (userId, displayName, userImg) => {
    console.log("unfriend");
    const signedDocRef = doc(db, "users", signedUser.uid);
    updateDoc(signedDocRef, {
      friends: arrayRemove({
        displayName: displayName,
        userId: userId,
        userImg: userImg,
      }),
    });
    const docref = doc(db, "users", userId);
    console.log("data", signedUserData);
    updateDoc(docref, {
      friends: arrayRemove({
        displayName: signedUserData?.displayName,
        userId: signedUser?.uid,
        userImg: signedUserData?.userImg,
      }),
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Avatar src={userImg} />
        <p>{displayName}</p>
      </div>
      <Button
        onClick={() => handleRemoveFriend(userId, displayName, userImg)}
        type="text"
      >
        unfriend
      </Button>
    </div>
  );
};

export default Friend;
