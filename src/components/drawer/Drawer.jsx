import React, { useEffect, useState } from "react";
import { FriendReq, Friend } from "../index";
import { Button } from "antd/es/radio";
import Search from "antd/es/input/Search";
import { signOut } from "firebase/auth";
import { collectionData } from "rxfire/firestore";

import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";

import { friendRequests, friends } from "../../testData";
import { CloseOutlined } from "@ant-design/icons";

const Drawer = () => {
  const [searchBar, setSearchBar] = useState("");
  // const [isSearchFilled, setIsSearchFilled] = useState(false);
  const usersRef = collection(db, "users");
  // const userSearchQuery = query(where("displayName", "==", searchBar));
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = async (e) => {
    setSearchBar(e.target.value);
    console.log(users);
  };

  return (
    <div className="absolute left-100 top-0 h-full py-[15px] ml-[50px] border border-red-800 w-[45vw]">
      <div>
        <Search placeholder="Search friend" onChange={handleChange}></Search>
      </div>
      <div className="px-5 py-5">
        <p>{searchBar !== "" ? "Friends" : "Friend Requests"}</p>
        <div className="w-100 h-[1px] bg-slate-200 my-2"></div>
        {searchBar !== "" ? (
          users.filter((user, index) => {
            user.displayName.includes(searchBar);
          })
        ) : (
          <div>
            <div>
              {friendRequests.map((request) => (
                <FriendReq
                  key={friendRequests.indexOf(request)}
                  userName={request.userName}
                  avatar={request.avatar}
                />
              ))}
            </div>
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
