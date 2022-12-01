import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { CloseOutlined, CheckCircleFilled } from "@ant-design/icons";
import {
  arrayUnion,
  doc,
  FieldValue,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";

const FriendReq = ({ reqUserId, index }) => {
  const { signedUser } = useContext(AuthContext);
  const docRef = doc(db, "users", reqUserId);
  const signedDocRef = doc(db, "users", signedUser.uid);
  const [displayName, setDisplayName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [friendRequests, setRequests] = useState([]);

  const friendRequestsOfSigned = async () => {
    const docSnap = await getDoc(signedDocRef);
    console.log(docSnap.data().friendRequests);
    setRequests(docSnap.data().friendRequests);
  };

  const fetchReqUser = async () => {
    const docSnap = await getDoc(docRef);
    setDisplayName(docSnap.data().displayName);
    setUserImg(docSnap.data().userImg);
  };

  const handleDelete = async () => {
    updateDoc(signedDocRef, {
      friendRequests: arrayRemove(friendRequests[index]),
    });
  };
  const handleAccept = () => {};
  useEffect(() => {
    fetchReqUser();
    friendRequestsOfSigned();
  }, []);

  return (
    <div className="flex justify-between ">
      <div className="flex items-center">
        <Avatar src="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" />
        <p>{displayName}</p>
      </div>
      <div className="flex items-centerw-18 space-x-3">
        <Button
          className="flex justify-center items-center"
          icon={<CloseOutlined height={100} />}
          onClick={handleDelete}
        ></Button>
        <Button
          className="flex justify-center items-center"
          icon={<CheckCircleFilled size={40} />}
          onClick={handleAccept}
        ></Button>
      </div>
    </div>
  );
};

export default FriendReq;
