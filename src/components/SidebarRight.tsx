import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import customAxios from "../CommonAxios";
import { changeState } from "../redux/createSlice/IsLoginSlice";
import Searchbar from "./Searchbar";
import "./Sidebar.scss";

const SidebarRight = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    customAxios.get("http://localhost:1234/logout");
    alert("로그아웃 되었습니다");
    dispatch(changeState(false));
  };
  return (
    <div className=" sideBarRight h-5/5 ">
      <Searchbar />
    </div>
  );
};

export default SidebarRight;
