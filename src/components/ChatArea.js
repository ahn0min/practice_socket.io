import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { Input } from "./common/Input";
import { Button } from "./common/Button";

export const ChatContainer = ({ children }) => {
  const [value, setValue] = useState("");
  const [chatList, setChatList] = useState([]);
  const { lastMessage, sendPing } = useSocket();

  const onClick = () => {
    sendPing(value);
    setValue("");
  };
  const onChange = (e) => setValue(e.target.value);

  useEffect(() => {
    if (!lastMessage.data) return;
    setChatList((pre) => [...pre, lastMessage.data]);
  }, [lastMessage]);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <ChatAreaHeader />
      <ChatInput input={<Input value={value} onChange={onChange} />} />
      <ChatAreaTrigger trigger={<Button onClick={onClick} text="보내기" />} />
      <ChatList datas={chatList} />
    </div>
  );
};

const ChatAreaHeader = () => {
  const { lastMessage, isConnected } = useSocket();

  return (
    <header>
      <div>{lastMessage.userCount}명이 접속중이에요.</div>
      <div>현재상태: {isConnected ? "접속완료" : "접속종료"}</div>
    </header>
  );
};

const ChatInput = ({ input }) => {
  return <>{input}</>;
};

const ChatList = ({ datas }) => {
  return (
    <ul style={{ textAlign: "left" }}>
      {datas.map((data, index) => (
        <li style={{ width: "100%" }} key={index}>
          {data}
        </li>
      ))}
    </ul>
  );
};

const ChatAreaTrigger = ({ trigger }) => {
  return <>{trigger}</>;
};

export const ChatArea = Object.assign(ChatContainer, {
  ChatAreaHeader,
  ChatAreaTrigger,
  ChatInput,
  ChatList,
});
