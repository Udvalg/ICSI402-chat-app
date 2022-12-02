import React, { useContext, useEffect } from "react";
import { Avatar, Button } from "antd";
import { CheckCircleFilled, CloseOutlined } from "@ant-design/icons";
import { handler } from "tailwind-scrollbar-hide";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";
const User = ({ userName, avatar, userId,isMyfriend = true}) => {
  const { signedUser } = useContext(AuthContext);
  const docRef = doc(db, "users", userId);
  const signedUsersDocRef = doc(db, "users", signedUser.uid);

  const handleRequest = async () => {
    const docSnap = await getDoc(signedUsersDocRef);
    const userData = docSnap.data();
    console.log("signed", docSnap.data());
    updateDoc(docRef, {
      friendRequests: arrayUnion({userId: userData.uid, displayName: userData.displayName, userImg: userData.userImg}),
    }).then(() => console.log("updated"));
  };

  useEffect(()=>{
    console.log("this is",userName, avatar, userId,isMyfriend);
  },[]);

  return (
    <div className="flex items-center space-x-3">
      <Avatar icon={avatar} />
      <p>{userName}</p>
      <Button
        //className={isMyfriend !== true ? "flex justify-center items-center" : "hidden" }
        icon={<CheckCircleFilled height={100} />}
        onClick={handleRequest}
      ></Button>
    </div>
  );
};

export default User;
