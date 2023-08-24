import React from "react";
import ItemsList from "./Components/ItemsList";
import TopNavbar from "./Components/TopNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <TopNavbar />
      <ItemsList />
    </div>
  );
};

export default App;
