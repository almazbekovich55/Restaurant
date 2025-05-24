import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/footer/Footer.jsx";
import Header from "./components/layout/Header/Header.jsx";
import Main from "./components/main/Main.jsx";

function App() {
  const routes = [
    {
      id: 1,
      path: "/as",
      element: <h1>Home</h1>,
    },
  ];

  return (
    <div className="App">
      <Header />
      <Main />
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
