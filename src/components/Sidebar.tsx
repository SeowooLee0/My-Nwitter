import { useState } from "react";
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

  const [moreOpen, setMoreOpen] = useState(false);
  const [view, setView] = useState(false);
  const onMore = () => {
    setMoreOpen((prev) => !prev);
  };

  return (
    <div className=" sideBar h-5/5  ">
      <div>트위터</div>
      <button className="btn">
        <div className="pt-1">
          <img
            className="w-5 h-5  mr-1"
            alt="#"
            src={"/assets/free-icon-home-1946436.png"}
          />
        </div>
        <Link to={"/"}>Home</Link>
      </button>

      <button className="btn">
        <img className="w-5 h-5 pt-0 mr-1" alt="#" src={"/assets/home.png"} />
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
      <button className="btn relative" onClick={onMore}>
        {moreOpen ? (
          <div className="moreModal">
            <div className=" border-b-2">
              <button className="btn  hover:bg-slate-100 rounded">
                <img
                  className="w-5 h-5 pt-0 mr-1"
                  alt="#"
                  src={"/assets/search.png"}
                />
                <Link to={"/explore"}>Topics</Link>
              </button>
              <button className="btn  hover:bg-slate-100 rounded ">
                <img
                  className="w-5 h-5 pt-0 mr-1"
                  alt="#"
                  src={"/assets/search.png"}
                />
                <Link to={"/explore"}>Twitter Circle</Link>
              </button>
            </div>
            <button className="btn b-20  overflow-  hover:bg-slate-100 rounded  ">
              <ul
                onClick={() => {
                  setView(!view);
                }}
              >
                Creator Studio {view ? "⌃" : "⌄"}
                {view && (
                  <div className=" ">
                    <li className="">마이페이지</li>
                    <li>로그아웃</li>
                  </div>
                )}
              </ul>
            </button>
            <button className="btn hover:bg-slate-100 rounded">
              <Link to={"/explore"}>Professional Tools</Link>
            </button>
            <button className="btn hover:bg-slate-100 rounded">
              <Link to={"/explore"}>Settings and Support</Link>
            </button>
          </div>
        ) : (
          <>
            <img
              className="w-5 h-5 pt-0 mr-1"
              alt="#"
              src={"/assets/email.png"}
            />
            More
          </>
        )}
      </button>

      <button onClick={onLogout} className=" logout hover:text-red-900">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
