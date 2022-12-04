import React, { useContext, useEffect } from "react";
import { Avatar, Button } from "antd";
import { CheckCircleFilled, CloseOutlined } from "@ant-design/icons";
import { handler } from "tailwind-scrollbar-hide";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";

const User = ({ userName, userImg, userId, isMyfriend }) => {
  console.log("isMyfriend", isMyfriend);
  const { signedUser } = useContext(AuthContext);
  const docRef = doc(db, "users", userId);
  const signedUsersDocRef = doc(db, "users", signedUser.uid);

  const handleRequest = async () => {
    const docSnap = await getDoc(signedUsersDocRef);
    const userData = docSnap.data();
    console.log("signed", docSnap.data());
    updateDoc(docRef, {
      friendRequests: arrayUnion({
        userId: userData.uid,
        displayName: userData.displayName,
        userImg: userData.userImg,
      }),
    }).then(() => console.log("updated"));
  };

  return (
    <div className="flex items-center space-x-3">
      <Avatar src={userImg} />
      <p>{userName}</p>
      <Button
        className={
          isMyfriend !== true ? "flex justify-center items-center" : "hidden"
        }
        icon={<CheckCircleFilled height={100} />}
        onClick={handleRequest}
      ></Button>
    </div>
  );
};

export default User;
