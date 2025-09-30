import { useState } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import CardPage from "./pages/CardPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
