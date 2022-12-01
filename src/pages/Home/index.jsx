import { Avatar, Input } from "antd";
import React, { useContext, useState, useRef, useEffect } from "react";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import "./home.css";

import { Drawer } from "../../components";
import { users } from "../../testData";

export const Home = () => {
  const [menuShown, setMenuShown] = useState(false);

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
            {users.map((user) => (
              <div className="mb-1">
                <Avatar icon={user} />
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
