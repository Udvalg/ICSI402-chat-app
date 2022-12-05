import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  doc,
  arrayRemove,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { Avatar, Button } from "antd";
import { CheckCircleFilled, CloseOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const FriendRequests = () => {
  const { signedUser } = useContext(AuthContext);
  const signedDocRef = doc(db, "users", signedUser.uid);
  const [signedUserdata, setSignedUserData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [requestUser, setRequestUser] = useState([]);

  useEffect(() => {
    fetchSignedUserData();
    fetchFriendRequests();
    fetchFriendRequests();
  });

  const fetchFriendRequests = async () => {
    const unsub = onSnapshot(doc(db, "users", signedUser?.uid), (doc) => {
      setRequests(doc?.data()?.friendRequests);
    });
  };

  const fetchSignedUserData = () => {
    const unsub = onSnapshot(doc(db, "users", signedUser?.uid), (doc) => {
      setSignedUserData(doc?.data());
    });
  };

  const handleDelete = ({ displayName, userId, userImg }) => {
    updateDoc(signedDocRef, {
      friendRequests: arrayRemove({
        displayName: displayName,
        userId: userId,
        userImg: userImg,
      }),
    });
  };

  const handleAccept = ({ userId, userImg, displayName }) => {
    const requestedUserDoc = doc(db, "users", userId);
    updateDoc(signedDocRef, {
      friends: arrayUnion({
        displayName: displayName,
        userId: userId,
        userImg: userImg,
      }),
    });

    updateDoc(requestedUserDoc, {
      friends: arrayUnion({
        displayName: signedUserdata.displayName,
        userId: signedUserdata.uid,
        userImg: signedUserdata.userImg,
      }),
    });
    updateDoc(signedDocRef, {
      friendRequests: arrayRemove({
        displayName: displayName,
        userId: userId,
        userImg: userImg,
      }),
    });
  };

  return (
    requests.length > 0 &&
    requests?.map((requestUser, index) => (
      <div className="my-2" key={index}>
        <div className="flex justify-between ">
          <div className="flex items-center">
            <Avatar src={requestUser?.userImg} />
            <p>{requestUser?.displayName}</p>
          </div>
          <div className="flex items-centerw-18 space-x-3">
            <Button
              className="flex justify-center items-center"
              icon={<CloseOutlined height={100} />}
              onClick={() =>
                handleDelete({
                  userId: requestUser.userId,
                  userImg: requestUser.userImg,
                  displayName: requestUser.displayName,
                })
              }
            ></Button>
            <Button
              className="flex justify-center items-center"
              icon={<CheckCircleFilled size={40} />}
              onClick={() =>
                handleAccept({
                  userId: requestUser.userId,
                  userImg: requestUser.userImg,
                  displayName: requestUser.displayName,
                })
              }
            ></Button>
          </div>
        </div>
      </div>
    ))
  );
};

export default FriendRequests;
