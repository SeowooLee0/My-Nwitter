import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import customAxios from "../../api/CommonAxios";
import { changeState } from "../../redux/createSlice/IsLoginSlice";
import Searchbar from "../explore/Searchbar";
import "../../scss/components/Sidebar.scss";

const SidebarRight = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    customAxios.get("/logout");
    alert("로그아웃 되었습니다");
    dispatch(changeState(false));
  };
  return (
    <div className=" sideRightBar ">
      <Searchbar />
    </div>
  );
};

export default SidebarRight;
