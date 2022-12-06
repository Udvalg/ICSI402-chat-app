import { Avatar, Input } from "antd";
import "./home.css";
import React, { useContext, useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";
import { Drawer } from "../../components";
import {
  getDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase.config";

export const Home = () => {
  const [menuShown, setMenuShown] = useState(false);
  const { signedUser } = useContext(AuthContext);
  const [signedUserData, setSignedUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [docData, setDocData] = useState([]);
  const [conversationId, setConversationId] = useState("");

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

  const handleSend = async (e) => {
    const newId =
      signedUser.uid > selectedFriend.userId
        ? signedUser.uid + selectedFriend.userId
        : selectedFriend.userId + signedUser.uid;

    setConversationId(newId);

    const docRef = doc(db, "chats", newId);
    const unsub = onSnapshot(doc(db, "chats", newId), (doc) => {
      setDocData(doc.data());
      console.log("messages", doc.data());
    });

    if (docData.exists) {
      await updateDoc(docRef, {
        messages: arrayUnion({
          date: new Date(),
          msgBody: e.target.value,
          sentBy: signedUser.uid,
        }),
      }).then(() => console.log("doc updated"));
    } else {
      await setDoc(docRef, {
        messages: {
          date: new Date(),
          msgBody: e.target.value,
          sentBy: signedUser.uid,
        },
      }).then(() => console.log("new doc created"));
    }
  };

  const handleSelect = (friend) => {
    setSelectedFriend(friend);
    console.log(selectedFriend);
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
                  <Avatar
                    src={friend?.userImg}
                    className="cursor-pointer"
                    onClick={() => handleSelect(friend)}
                  />
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
        <div className="w-full h-full">
          <div className="flex items-center justify-center h-100 border border-blue-800 h-[5vh] py-[15px]">
            <p>{selectedFriend.displayName}</p>
          </div>
          <div className="flex flex-col border border-red-800 h-[95vh]">
            <div className="chats flex-1">
              <p>chats</p>
            </div>

            <div className="flex justify-end gap-[2vw] mx-[2vw] my-[5px]">
              <Avatar />
              <Avatar />
              <Input
                className="justify-end w-[50vw]"
                placeholder="msg bichne uu"
                onPressEnter={(e) => handleSend(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
