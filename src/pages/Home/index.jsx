import { Avatar } from "antd";
import "./home.css";
import React, { useContext, useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";
import { Drawer } from "../../components";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";

export const Home = () => {
  const [menuShown, setMenuShown] = useState(false);
  const { signedUser } = useContext(AuthContext);
  const [signedUserData, setSignedUserData] = useState({});
  const [friends, setFriends] = useState([]);

  const fetchSignedUserDoc = async () => {
    const docRef = doc(db, "users", signedUser.uid);
    try {
      const docSnap = await getDoc(docRef);
      setSignedUserData(docSnap.data());
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFriends = async () => {
    const unsub = onSnapshot(doc(db, "users", signedUser?.uid), (doc) => {
      setFriends(doc?.data()?.friends);
    });
  };

  useEffect(() => {
    fetchSignedUserDoc();
    fetchFriends();
  }, []);

  return (
    <>
      {menuShown && <Drawer />}
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
            {friends.length > 0 &&
              friends?.map((friend, index) => (
                <div className="mb-1" key={index}>
                  <Avatar src={friend?.userImg} />
                </div>
              ))}
          </div>
          <div className="userIcon mb-1">
            <Avatar
              className="flex justify-center items-center"
              size={40}
              src={signedUserData.userImg}
            />
          </div>
        </div>
        <div className="w-full h-full"></div>
      </div>
    </>
  );
};

export default Home;
