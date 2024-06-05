import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { useEffect, useState } from "react";
import { NotFound } from "./pages/NotFound";

function App() {
  const navigate = useNavigate();
  const [markedData, setMarkedData] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );
  const { pathname } = useLocation();
  console.log(pathname);
  useEffect(() => {
    JSON.parse(localStorage.getItem("token"))?.length
      ? navigate(pathname == "/auth/login" ? "/" : { pathname })
      : navigate("auth/login");
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(markedData));
  }, [markedData]);

  const addBookmark = (obj) => setMarkedData((prev) => [...prev, obj]);

  const removeBookmark = (id) =>
    setMarkedData((prev) => prev.filter((item) => item.id !== id));

  return (
    <Routes>
      <Route path="auth/login" element={<Login />} />
      <Route
        index
        element={
          <Home
            addMarkFunc={addBookmark}
            marksArr={markedData}
            removeBookmark={removeBookmark}
            setMarkedData={setMarkedData}
          />
        }
      />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
