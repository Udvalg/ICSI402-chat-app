import { Avatar, Input } from "antd";
import "./home.css";
import React, { useContext, useState, useEffect, useRef } from "react";
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
import Message from "../../components/Message/Message";

export const Home = () => {
  const [menuShown, setMenuShown] = useState(false);
  const { signedUser } = useContext(AuthContext);
  const [signedUserData, setSignedUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [docData, setDocData] = useState([]);
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [joke, setJoke] = useState([]);
  const hoosondivref = useRef();
  const [mapped, setMapped] = useState(false);

  const fetchSignedUserDoc = async () => {
    const docRef = doc(db, "users", signedUser?.uid);
    try {
      const docSnap = await getDoc(docRef);
      setSignedUserData(docSnap?.data());
    } catch (e) {
      console.log(e);
    }
  };

  const fetchFriends = async () => {
    onSnapshot(doc(db, "users", signedUser?.uid), (doc) => {
      setFriends(doc?.data()?.friends);
    });
  };

  const generateChatId = (friend) => {
    return signedUser.uid > friend.userId
      ? signedUser.uid + friend.userId
      : friend.userId + signedUser.uid;
  };

  const handleSend = async (e) => {
    hoosondivref?.current.scrollIntoView({ behavior: "smooth" });
    console.log(e.target.value);
    const newId = generateChatId(selectedFriend);
    const docRef = doc(db, "chats", newId);

    const unsub = onSnapshot(doc(db, "chats", newId), (doc) => {
      messages?.push(doc.data());
      console.log("tugudlur", messages);
    });
    await updateDoc(docRef, {
      messages: arrayUnion({
        date: new Date(),
        msgBody: e.target.value,
        sentBy: signedUser.uid,
      }),
    }).then(() => {
      const unsub = onSnapshot(docRef, (doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);

      console.log("doc updated", messages);
    });
  };

  const handleSelect = async (friend) => {
    const newId = generateChatId(friend);
    setChatId(newId);
    const docRef = doc(db, "chats", newId);
    const docSnap = await getDoc(docRef);

    setSelectedFriend(friend); // useless now but may use later

    if (!docSnap?.exists()) {
      await setDoc(docRef, { messages: [] }).then(() =>
        console.log("new chat added")
      );
    } else {
      fetchMessages(newId);
    }
  };
  const fetchMessages = (chatId) => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      let temp = [999];
      temp.push(doc?.data());
      setMessages(temp);
      console.log("fetched2", messages);
      setJoke(messages);
    });
  };

  useEffect(() => {
    fetchSignedUserDoc();
    fetchFriends();
  }, []);
  return (
    <>
      {menuShown && <Drawer />}
      <div className="h-[100vh] flex items-center justify-center">
        <div className="flex flex-col items-center w-[50px] h-full">
          <div className="menuIcon">
            <Avatar
              className="flex justify-center items-center "
              onClick={() => setMenuShown(!menuShown)}
              size={40}
              icon={<MenuOutlined />}
            />
          </div>
          <div className="flex flex-col overflow-y-scroll scrollbar-hide h-[calc(100%-50px)] my-2">
            {friends?.length > 0 &&
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
              src={signedUserData?.userImg}
            />
          </div>
        </div>
        <div className="w-full h-full">
          <div className="flex items-center justify-center border-b h-100 h-[40px] py-[15px]">
            <p>{selectedFriend.displayName}</p>
          </div>
          <div className="flex flex-col flex-1 h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col flex-1 p-3">
              {messages &&
                joke &&
                selectedFriend &&
                messages[messages.length - 1]?.messages?.map((msg, index) => (
                  <Message
                    key={index}
                    signedUser={signedUserData}
                    selectedFriend={selectedFriend}
                    message={msg}
                  />
                ))}
              <div className="h-[50px]" ref={hoosondivref}></div>
            </div>
          </div>
          <div className="flex justify-end items-end h-[40px] pb-1">
            <div className="flex justify-end gap-[2vw] mx-[2vw]">
              <Avatar />
              <Avatar />
              <Input
                className="justify-end w-[50vw]"
                placeholder="msg bichne uu"
                onPressEnter={(e) => {
                  handleSend(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
