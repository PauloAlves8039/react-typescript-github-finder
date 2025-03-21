import { Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import ListRepository from "../components/ListRepository/ListRepository";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repos/:username" element={<ListRepository />} />
    </Routes>
  );
}