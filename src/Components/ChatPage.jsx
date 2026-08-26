import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdAttachFile, MdSend, MdArrowBack, MdLogout } from "react-icons/md"; // Thêm icon
import { useNavigate } from "react-router-dom";
import useChatContext from "../Context/ChatContext";
import { baseURL } from "../Config/AxiosHelper";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getMessages } from "../Services/RoomService";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  useEffect(() => {
    if (!roomId) return;
    const loadMessages = async () => {
      try {
        const data = await getMessages(roomId);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    loadMessages();
  }, [roomId]);

  useEffect(() => {
    const connectToWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to chat server");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };
    if (connected && roomId) {
      connectToWebSocket();
    }
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };
      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  const handleLogout = () => {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  };

  useEffect(() => {
    if (chatBoxRef.current && messages.length > 0) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
  // --- KẾT THÚC LOGIC ---

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-gray-100 overflow-hidden">
      {/* HEADER */}
      <header className="h-16 shrink-0 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg uppercase shadow-lg">
            {roomId ? roomId.charAt(0) : "R"}
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">
              Room: <span className="text-indigo-400">{roomId}</span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
              Online as {currentUser}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="group p-2 hover:bg-red-500/20 rounded-full transition-all duration-200"
          title="Leave Room"
        >
          <MdLogout className="text-slate-400 group-hover:text-red-500 text-2xl" />
        </button>
      </header>

      {/* CHAT MESSAGES CONTAINER */}
      <main
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900 scroll-smooth custom-scrollbar"
      >
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {messages.map((message, index) => {
            const isMe = message.sender === currentUser;
            return (
              <div
                key={index}
                className={`flex gap-3 ${
                  isMe ? "justify-end" : "justify-start"
                } animate-fade-in-up`}
              >
                {/* Avatar (Only for others) */}
                {!isMe && (
                  <div className="flex-shrink-0 self-end mb-1">
                    <img
                      className="h-8 w-8 rounded-full bg-slate-700 border border-slate-600"
                      src={`https://ui-avatars.com/api/?name=${message.sender}&background=random`}
                      alt={message.sender}
                    />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`flex flex-col max-w-[75%] sm:max-w-[60%] ${
                    isMe ? "items-end" : "items-start"
                  }`}
                >
                  {!isMe && (
                    <span className="text-xs text-slate-400 ml-1 mb-1">
                      {message.sender}
                    </span>
                  )}

                  <div
                    className={`px-4 py-2 shadow-sm break-words relative group ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-2xl rounded-tr-none"
                        : "bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none border border-slate-700"
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">
                      {message.content}
                    </p>

                    {/* Timestamp tooltip/subtext */}
                    <p
                      className={`text-[10px] mt-1 opacity-70 ${
                        isMe ? "text-indigo-200 text-right" : "text-slate-500"
                      }`}
                    >
                      {formatTime(message.timeStamp)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* INPUT AREA */}
      <div className="shrink-0 bg-slate-800 border-t border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-slate-900 border border-slate-700 rounded-3xl p-2 pl-4 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all shadow-lg">
          {/* Attachment Icon */}
          <button className="p-2 text-slate-400 hover:text-indigo-400 transition-colors rounded-full hover:bg-slate-800">
            <MdAttachFile size={22} />
          </button>

          {/* Text Input */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-slate-200 placeholder-slate-500 py-3 max-h-32 overflow-y-auto"
          />

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`p-3 rounded-full transition-all duration-200 flex items-center justify-center shadow-md ${
              input.trim()
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            <MdSend size={20} className={input.trim() ? "ml-1" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
