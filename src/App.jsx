import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import JoinCreateChat from "./Components/JoinCreateChat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <JoinCreateChat />
    </>
  );
}

export default App;
