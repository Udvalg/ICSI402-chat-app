import Search from "antd/es/transfer/search";
import { Button, Tabs } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { doc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import FriendRequests from "./friendRequests/FriendRequests";
import { db } from "../../firebase.config";
import FriendList from "./FriendList/FriendList";
import { auth } from "../../firebase.config";
import User from "../user/User";
const Drawer = () => {
  const { signedUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchUsers();
    fetchMyFriends();
  }, []);

  const fetchUsers = async () => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const temp = [];
      snapshot?.forEach((doc) => {
        temp.push(doc.data());
      });
      setUsers(temp);
    });
  };

  const fetchMyFriends = () => {
    const temp = [];
    onSnapshot(doc(db, "users", signedUser?.uid), (doc) => {
      setFriends(doc?.data()?.friends);
    });
  };

  const handleChange = async (e) => {
    setSearchBar(e.target.value);
  };

  function isMyFriend(uid) {
    for (var i = 0; i < friends?.length; i++) {
      console.log("comparing", friends[i], uid);
      if (friends[i].userId === uid) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="absolute left-100 top-0 h-full py-[5px] px-[15px] ml-[50px] w-[45vw] z-10 bg-white shadow-lg">
      <Search
        className="w-[90%]"
        placeholder="Search friend"
        onChange={(e) => handleChange(e)}
      ></Search>
      {searchBar === "" ? (
        <div className="flex flex-column px-5 py-5 overflow-y-scroll scrollbar-hide">
          <Tabs className="w-full" defaultActiveKey="1">
            <Tabs.TabPane tab="Friends" key="1">
              <FriendList />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Friend Requests" key="2">
              <FriendRequests />
            </Tabs.TabPane>
          </Tabs>
        </div>
      ) : (
        users?.filter((user) => user.displayName.toLowerCase().includes(searchBar) && user.uid !== signedUser.uid)
          .map((user) => (
            <div className="my-2">
              <User
                userName={user.displayName}
                userImg={user.userImg}
                userId={user.uid}
                isMyfriend={isMyFriend(user.uid)}
              />
            </div>
          ))
      )}

      <Button
        onClick={() => signOut(auth).then(() => console.log("signed out"))}
      >
        Log out
      </Button>
    </div>
  );
};

export default Drawer;
