import React, { useState } from "react";
import AppRouter from "./router";
import { auth } from "../firebase";

function App() {
  const [isLogin, setIsLogin] = useState(auth.currentUser);

  return (
    <div>
      <AppRouter isLogin={isLogin} />
    </div>
  );
}

export default App;
