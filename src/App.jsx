import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/footer/Footer.jsx";
import Main from "./components/main/Main.jsx";
import Header from "./components/layout/header/Header.jsx";
import Category from "./components/pages/category/Category.jsx";
import Detail from "./components/pages/detail/Detail.jsx";
import Search from "./components/pages/search/Search.jsx";

function App() {
  const routes = [
    {
      id: 1,
      path: "/",
      element: <Main />,
    },
    {
      id: 2,
      path: "/products",
      element: <Category />,
    },
    {
      id: 3,
      path: "/detail/:id",
      element: <Detail />,
    },
    {
      id: 4,
      path: "/search/:ProductsName",
      element: <Search />,
    },
  ];

  return (
    <div className="App">
      <Header />
      <Routes>
        {routes.map((el) => (
          <Route key={el.id} path={el.path} element={el.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;