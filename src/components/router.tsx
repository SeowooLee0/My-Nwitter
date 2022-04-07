import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";

function AppRouter({ isLogin }: any) {
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
