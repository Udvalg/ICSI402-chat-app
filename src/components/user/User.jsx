import React, { useContext } from "react";
import { Avatar, Button } from "antd";
import { CheckCircleFilled, CloseOutlined } from "@ant-design/icons";
import { handler } from "tailwind-scrollbar-hide";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";
const User = ({ userName, avatar, userId }) => {
  const { signedUser } = useContext(AuthContext);
  const docRef = doc(db, "users", userId);
  const signedUsersDocRef = doc(db, "users", signedUser.uid);

  const handleRequest = async () => {
    const docSnap = await getDoc(signedUsersDocRef);
    console.log("signed", docSnap.data());
    updateDoc(docRef, {
      displayName: docSnap.data().displayName,
      userImg: docSnap.data().userImg,
      friendRequests: arrayUnion(signedUser.uid),
    }).then(() => console.log("updated"));
  };

  return (
    <div className="flex items-center space-x-3">
      <Avatar icon={avatar} />
      <p>{userName}</p>
      <Button
        className="flex justify-center items-center"
        icon={<CheckCircleFilled height={100} />}
        onClick={handleRequest}
      ></Button>
    </div>
  );
};

export default User;
