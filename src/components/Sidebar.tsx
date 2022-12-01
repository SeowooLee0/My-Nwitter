import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import customAxios from "../CommonAxios";
import { changeState } from "../redux/createSlice/IsLoginSlice";
import "./Sidebar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    customAxios.get("http://localhost:1234/logout");
    alert("로그아웃 되었습니다");
    dispatch(changeState(false));
  };
  return (
    <div className=" sideBar h-5/5 ">
      <div>트위터</div>
      <button className="btn">
        <img className="w-5 h-5 pt-0 mr-1" alt="#" src={"/assets/home.png"} />
        <Link to={"/"}>Home</Link>
      </button>

      <button className="btn">
        <img className="w-5 h-5 pt-0 mr-1" alt="#" src={"/assets/search.png"} />
        <Link to={"/explore"}>Explore</Link>
      </button>
      <button className="btn">
        <img className="w-5 h-5 pt-0 mr-1" alt="#" src={"/assets/user.png"} />
        <Link to={"/profile"}>Profile</Link>
      </button>
      <button className="btn">
        <img className="w-5 h-5 pt-0 mr-1" alt="#" src={"/assets/email.png"} />
        <Link to={"/explore"}>Messeages</Link>
      </button>
      <button onClick={onLogout} className=" logout hover:text-red-900">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
