import React, { useState } from "react";
import { FriendReq, Friend } from "../index";
import { Button } from "antd/es/radio";
import Search from "antd/es/input/Search";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

import { friendRequests, friends } from "../../testData";

const Drawer = () => {
  const [searchBar, setSearchBar] = useState("");
  const [isSearchFilled, setIsSearchFilled] = useState(false);

  const handleChange = (e) => {
    setIsSearchFilled(true);
    setSearchBar(e.target.value);
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
          friends
            .filter((friend) =>
              friend.userName.toLowerCase().includes(searchBar.toLowerCase())
            )
            .map((friend) => (
              <Friend userName={friend.userName} avatar={friend.avatar} />
            ))
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
