import React, { useState } from "react";
import toast from "react-hot-toast";
import chatIcon from "../assets/chat.png"; // Đảm bảo đường dẫn ảnh đúng
import { createRoomApi, joinChatApi } from "../Services/RoomService";
import useChatContext from "../Context/ChatContext";
import { useNavigate } from "react-router-dom";
// Thêm icons để giao diện đẹp hơn
import { MdPerson, MdGroups, MdLogin, MdAddBox } from "react-icons/md";

function JoinCreateChat() {
  const [detail, setDetail] = useState({
    userName: "",
    roomId: "",
  });

  const {
    roomId,
    userName,
    connected,
    setRoomId,
    setCurrentUser,
    setConnected,
  } = useChatContext();

  const navigate = useNavigate();

  const handleFormInputChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  function validatedForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid Input !!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validatedForm()) {
      try {
        const room = await joinChatApi(detail.roomId);
        toast.success(`Joined room: ${room.roomId}`);
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        console.error("Error joining room:", error);
        toast.error("Failed to join room. Please check the Room ID.");
      }
    }
  }

  async function createRoom() {
    if (validatedForm()) {
      console.log(detail);
      try {
        const response = await createRoomApi(detail.roomId);
        console.log(response);
        toast.success(`Room created with ID: ${response.roomId}`);
        // Tùy chọn: Tự động join luôn sau khi tạo (nếu muốn logic cũ thì giữ nguyên)
      } catch (error) {
        console.error("Error creating room:", error);
        if (error.status === 400) {
          toast.error("Room ID already exists. Please choose a different ID.");
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-8 animate-fade-in-up">
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="p-3 bg-slate-700/50 rounded-full shadow-inner">
            <img
              src={chatIcon}
              className="w-16 h-16 object-contain drop-shadow-lg"
              alt="Chat Icon"
            />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Ting Ting
          </h1>
          <p className="text-slate-400 text-sm">
            Join a room or create a new one
          </p>
        </div>

        {/* Form Container */}
        <div className="flex flex-col gap-5">
          {/* User Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="userName"
              className="text-sm font-medium text-slate-300 ml-1"
            >
              Your Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdPerson className="text-slate-400 group-focus-within:text-indigo-400 text-xl transition-colors" />
              </div>
              <input
                id="userName"
                name="userName"
                value={detail.userName}
                onChange={handleFormInputChange}
                type="text"
                placeholder="Enter your display name"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Room ID Input */}
          <div className="space-y-2">
            <label
              htmlFor="roomId"
              className="text-sm font-medium text-slate-300 ml-1"
            >
              Room ID
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdGroups className="text-slate-400 group-focus-within:text-indigo-400 text-xl transition-colors" />
              </div>
              <input
                id="roomId"
                name="roomId"
                value={detail.roomId}
                onChange={handleFormInputChange}
                type="text"
                placeholder="Enter room ID to join or create"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Buttons Group */}
          <div className="flex gap-3 mt-4 pt-2">
            <button
              onClick={joinChat}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <MdLogin size={20} />
              Join Room
            </button>
            <button
              onClick={createRoom}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] border border-slate-600 hover:border-slate-500 active:scale-95"
            >
              <MdAddBox size={20} />
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinCreateChat;
