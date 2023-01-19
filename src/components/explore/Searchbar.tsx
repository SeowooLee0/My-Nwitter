import customAxios from "../../api/CommonAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  changeCurentPage,
  changeCurrentPosts,
  changGetDataState,
} from "../../redux/createSlice/GetDataSlice";
import { useState } from "react";
import { changSearchState } from "../../redux/createSlice/SearchSlice";
import { useNavigate } from "react-router-dom";
import { changePeopleState } from "../../redux/createSlice/PeopleDataSlice";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const focus = useSelector(
    (state: RootState) => state.changeExploreState.focus
  );
  const searchData = useSelector(
    (state: RootState) => state.changeSearchState.search
  );

  const onChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
  };

  const onSearch = (event: any) => {
    dispatch(changSearchState(search));
    event.preventDefault();

    customAxios
      .get(`/getTweets/${focus}`, {
        params: { search },
      })
      .then((res) => {
        if (focus === "people") {
          dispatch(
            changePeopleState({
              userData: res.data.data,
            })
          );
        } else {
          dispatch(changeCurrentPosts(res.data.data));
        }
      });

    navigate("/explore");
  };
  return (
    <form className="flex justify-center w-full">
      <div className="relative w-3/5">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:placeholder-gray-400 dark:text-white"
          placeholder="Search"
          required
          value={search}
          onChange={onChange}
        />
      </div>
      <button
        type="submit"
        onClick={onSearch}
        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-300 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default Searchbar;
