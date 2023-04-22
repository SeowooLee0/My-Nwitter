import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../api/CommonAxios";
import { changeState } from "../../redux/createSlice/IsLoginSlice";
import Searchbar from "../explore/Searchbar";
import "../../scss/components/Sidebar.scss";
import { RootState } from "../../redux/store";

const SidebarRight = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onLogout = () => {
    customAxios.get("/logout");
    alert("로그아웃 되었습니다");
    dispatch(changeState(false));
  };

  const search = useSelector(
    (state: RootState) => state.changeSearchState.search
  );

  const currentPage = 1;

  function onSearch() {
    navigate("/explore");
    return customAxios.get(`/getTweets/top`, {
      params: { search, currentPage },
    });
  }

  return (
    <div className=" sideRightBar ">
      <Searchbar onSearchbar={onSearch} />
    </div>
  );
};

export default SidebarRight;
