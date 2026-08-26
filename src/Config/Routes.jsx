import React from "react";
import { Routes, Route } from "react-router";
import App from "../App.jsx";
import ChatPage from "../Components/ChatPage.jsx";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/about" element={<h1>"this is about page"</h1>} />
      <Route path="*" element={<h1>"404 Not Found"</h1>} />
    </Routes>
  );
};

export default AppRoutes;
