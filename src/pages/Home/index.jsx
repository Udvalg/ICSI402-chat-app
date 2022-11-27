import { Avatar, Input } from 'antd';
import React, { useState } from 'react';
import { HomeOutlined,MenuOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import "./home.css"
import Search from 'antd/es/input/Search';

const users = ["UserOutlined", "UserOutlined", "UserOutlined", "UserOutlined", "UserOutlined","UserOutlined", "UserOutlined", "UserOutlined",, "UserOutlined","UserOutlined", "UserOutlined", "UserOutlined", "UserOutlined","UserOutlined", "UserOutlined", "UserOutlined", "UserOutlined","UserOutlined", "UserOutlined", "UserOutlined", "UserOutlined","UserOutlined", "UserOutlined", "UserOutlined", "UserOutlined","UserOutlined", "UserOutlined", "UserOutlined", "UserOutlined","UserOutlined", "UserOutlined", "UserOutlined"]

export const Home = () => {
  const [menuShown,setMenuShown] = useState(false);

 

  return (
    <>
    {menuShown && <div className='absolute left-100 top-0 h-full ml-[50px] border border-red-800 w-300'>
      <div>
        <Search></Search>
      </div>
    </div>}
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-[50px]   h-full">       
      <div className="menuIcon" ><Avatar className="flex justify-center items-center " onClick={()=> setMenuShown(!menuShown)} size={40} icon={<MenuOutlined />}/></div>
      <div className="flex flex-col overflow-y-scroll scrollbar-hide h-[calc(100%-50px)] my-2">
        {users.map((user)=>
          <div className="mb-1">
            <Avatar icon={user} icon={<UserOutlined/>}/>
          </div>
        )}
      </div>
      <div className="userIcon mb-1">
        <Avatar className='flex justify-center items-center' size={40} icon={<UserOutlined/>} />
      </div>
        
      </div>
      <div className="w-full  h-full"></div>
    </div>
    </>
  );
};

export default Home;  