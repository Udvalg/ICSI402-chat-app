import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { CloseOutlined, CheckCircleFilled } from "@ant-design/icons";
import {
  arrayRemove,
  doc, updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";

const FriendReq = ({ requests, setRequests }) => {
 
  const { signedUser } = useContext(AuthContext);
  const signedDocRef = doc(db, "users", signedUser.uid);
  const [friendRequests, setFriendRequests] = useState([]);

 useEffect(()=>{
  console.log("request",requests);
  requests.forEach((request)=>friendRequests.push(request));
  //setFriendRequests(requests)
  console.log("friendRequests",friendRequests);
 },[]);

  const handleDelete = async (index2) => {
    console.log("before",requests,requests.length);
    setRequests(requests.pop(index2));
    console.log("after",requests,requests.length);
    updateDoc(signedDocRef, {
      friendRequests: arrayRemove({...friendRequests[index2]}),
    });
    
  };


  
  const handleAccept = () => {};
  // useEffect(() => {
  //   fetchReqUser();
  //   friendRequestsOfSigned();
  // }, []);

  return (
    <div>
      {typeof requests.length !== 'undefined'  && requests.map((item,index) => 
      <div className="flex justify-between ">
          <div className="flex items-center">
            <Avatar src={item?.userImg} />
            <p>{item?.displayName}</p>
          </div>
          <div className="flex items-centerw-18 space-x-3">
            <Button
              className="flex justify-center items-center"
              icon={<CloseOutlined height={100} />}
              onClick={() => handleDelete(index)}
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
