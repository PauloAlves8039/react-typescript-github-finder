import { Outlet } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import classes from "./App.module.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <div className={classes.app}>
        <h1>
          <FaGithub className={classes.github_icon} /> GitHub Finder
        </h1>
        < Outlet />
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
}

