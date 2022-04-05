import React, { useState } from "react";
import AppRouter from "./router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <AppRouter isLogin={isLogin} />
    </div>
  );
}

export default App;
