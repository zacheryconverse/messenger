import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer, Auth } from "./components";

import './App.css';

const apiKey = "86nn7ccc5364";

const client = StreamChat.getInstance(apiKey);

const authToken = false;

const App = () => {

  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="dark">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
