import { Avatar, Input } from "antd";
import React, { useContext, useState, useRef } from "react";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import "./home.css";
import Search from "antd/es/input/Search";
import { FriendReq, Friend } from "../../components";
import { friendRequests, friends, users } from "./testData";

export const Home = () => {
  const [menuShown, setMenuShown] = useState(false);
  const [isSearchFilled, setIsSearchFilled] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const handleChange = (e) => {
    setIsSearchFilled(true);
    setSearchBar(e.target.value);
    console.log(searchBar);
  };

  return (
    <>
      {menuShown && (
        <div className="absolute left-100 top-0 h-full py-[15px] ml-[50px] border border-red-800 w-[45vw]">
          <div>
            <Search
              placeholder="Search friend"
              onChange={handleChange}
            ></Search>
          </div>
          <div className="px-5 py-5">
            <p>{searchBar !== "" ? "Friends" : "Friend Requests"}</p>
            <div className="w-100 h-[1px] bg-slate-200 my-2"></div>
            {searchBar !== "" ? (
              friends
                .filter((friend) =>
                  friend.userName
                    .toLowerCase()
                    .includes(searchBar.toLowerCase())
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
        </div>
      )}
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center w-[50px]   h-full">
          <div className="menuIcon">
            <Avatar
              className="flex justify-center items-center "
              onClick={() => setMenuShown(!menuShown)}
              size={40}
              icon={<MenuOutlined />}
            />
          </div>
          <div className="flex flex-col overflow-y-scroll scrollbar-hide h-[calc(100%-50px)] my-2">
            {users.map((user) => (
              <div className="mb-1">
                <Avatar key={users.indexOf(user)} icon={user} />
              </div>
            ))}
          </div>
          <div className="userIcon mb-1">
            <Avatar
              className="flex justify-center items-center"
              size={40}
              icon={<UserOutlined />}
            />
          </div>
        </div>
        <div className="w-full h-full"></div>
      </div>
    </>
  );
};

export default Home;
