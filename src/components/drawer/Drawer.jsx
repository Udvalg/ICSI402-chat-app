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
  const [isSearchFilled, setIsSearchFilled] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
  };

  const handleChange = async (e) => {
    setSearchBar(e.target.value);

    setFilteredUsers();
    console.log(users);
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
            .map((friend) => (
              <div className="my-2">
                <Friend userName={friend.displayName} avatar={friend.avatar} />
              </div>
            ))
        ) : (
          <div>
            <div>
              {friendRequests.map((request) => (
                <div className="my-2">
                  <FriendReq
                    key={friendRequests.indexOf(request)}
                    userName={request.userName}
                    avatar={request.avatar}
                  />
                </div>
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
