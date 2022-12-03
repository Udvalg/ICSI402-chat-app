import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { CloseOutlined, CheckCircleFilled } from "@ant-design/icons";
import {
  arrayRemove,
  doc, updateDoc, getDoc
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";
const FriendReq = () => {
  const { signedUser } = useContext(AuthContext);
  const {refresh ,setRefresh} = (true)
  
  const signedDocRef = doc(db, "users", signedUser.uid);
  const [friendRequests, setFriendRequests] = useState([]);

  const fetchFriendRequests = async () => {
     const docRef = await doc(db, "users", signedUser.uid);
    const docSnap = await getDoc(docRef)
    docSnap.data().friendRequests.forEach((req)=>{friendRequests.push(req)})
    setFriendRequests(friendRequests)
    setRefresh(!refresh)
    console.log("setted", friendRequests);
  };

  useEffect(()=>{
    fetchFriendRequests();
  },[]);

  // const handleDelete = async (index2) => {
  //   console.log("before",friendRequests,friendRequests.length);
  //   setFriendRequests(friendRequests.pop(index2));
  //   console.log("after",friendRequests,friendRequests.length);
  //   updateDoc(signedDocRef, {
  //     friendRequests: arrayRemove({...friendRequests[index2]}),
  //   });
    
  // };
  
  const handleAccept = () => {};
  // useEffect(() => {
  //   fetchReqUser();
  //   friendRequestsOfSigned();
  // }, []);

  return (
    <div>
      <Button>hi</Button>
      { refresh && friendRequests.map((item) =>
      <div className="flex justify-between ">
          <div className="flex items-center">
            <Avatar src={item?.userImg} />
            <p>{item?.displayName}</p>
          </div>
          <div className="flex items-centerw-18 space-x-3">
            <Button
              className="flex justify-center items-center"
              icon={<CloseOutlined height={100} />}
            ></Button>
            <Button
              className="flex justify-center items-center"
              icon={<CheckCircleFilled size={40} />}
              onClick={handleAccept}
            ></Button>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default FriendReq;
