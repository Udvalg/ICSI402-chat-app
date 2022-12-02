import React, { useContext, useEffect, useState } from "react";
import { FriendReq, User } from "../index";
import { Button } from "antd/es/radio";
import Search from "antd/es/input/Search";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { Test } from "./Test";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";

import { friendRequests, friends } from "../../testData";
import { CloseOutlined } from "@ant-design/icons";

const Drawer = () => {
  const { signedUser } = useContext(AuthContext);
  const [searchBar, setSearchBar] = useState("");
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchFriendRequests();
  }, []);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
  };
  const fetchFriendRequests = async () => {
    const docRef = doc(db, "users", signedUser.uid);
    const docSnap = await getDoc(docRef);
    console.log("reqss", docSnap.data().friendRequests);
    // setRequests(docSnap.data().friendRequests);
     docSnap.data().friendRequests.forEach((friendReqUid) => {
        requests.push(docSnap.data().friendRequests)
     })
  };

  const handleChange = async (e) => {
    setSearchBar(e.target.value);
  };

  return (
    <div className="absolute left-100 top-0 h-full py-[15px] ml-[50px] border border-red-800 w-[45vw]">
      <div className="flex justify-center">
        <Search
          className="w-[90%]"
          placeholder="Search friend"
          onChange={(e) => handleChange(e)}
        ></Search>
      </div>
      <div className="px-5 py-5 overflow-y-scroll scrollbar-hide">
        <p>{searchBar !== "" ? "Friends" : "Friend Requests"}</p>
        <div className="w-[90%] h-[1px] bg-slate-200 my-2"></div>
        {searchBar !== "" ? (
          users
            .filter((user) =>
              user.displayName.toLowerCase().includes(searchBar)
            )
            .map((user) => (
              <div className="my-2">
                <User
                  userName={user.displayName}
                  avatar={user.avatar}
                  userId={user.uid}
                />
              </div>
            ))
        ) : (
          <div>
            {requests && 
            requests.map((reqUserId) => (
              <FriendReq
                reqUserId={reqUserId}
                index={requests.indexOf(reqUserId)}
              />
            ))
            }
          </div>
        )}
      </div>
      <Button className="absolute left-[20px]" onClick={() => signOut(auth)}>
        Log out
      </Button>
    </div>
  );
};

export default Drawer;
