import LoginPage from "@/pages/Login"
import NoPage from "@/pages/NoPage";
import Layout from "@/pages/Layout";
import Search from "@/pages/Search";
import Artist from "./pages/Artist";
import AuthCallback from "./pages/AuthCallback";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/search" element={<Search />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}