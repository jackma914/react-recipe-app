import Home from "./Home";
import Cuisine from "./Cuisine";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Pages() {
  // 렌덤 데이터를 받아옵니다.

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisine/:type" element={<Cuisine />} />
    </Routes>
  );
}

export default Pages;
