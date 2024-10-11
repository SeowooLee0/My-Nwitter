import axios from "axios";
import { SocketContext, SOCKET_EVENT } from "../socketio";

import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Paginations from "../components/layouts/Pagination";
import Pagination from "../components/layouts/Pagination";

import TweetBox from "../components/tweets/TweetBox";

import customAxios from "../api/CommonAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import Sidebar from "../components/layouts/Sidebar";
import "../scss/pages/Explore.scss";

import { Like, Comment, Data } from "./Tweets";
import { changeExploreState } from "../redux/createSlice/ExploreSlice";
import Searchbar from "../components/explore/Searchbar";
import { changePeopleState } from "../redux/createSlice/PeopleDataSlice";
import { current } from "@reduxjs/toolkit";
import { useQuery, useQueryClient } from "react-query";
import { changSearchState } from "../redux/createSlice/SearchSlice";
import { wait } from "@testing-library/user-event/dist/utils";
import { changeCurrentPage } from "../redux/createSlice/GetDataSlice";

export interface ExploreData {
  id: string;
  email: string;
  tweet_id: number;
  comment: Array<Comment>;
  reply_tweet_id: any;
  like: Array<Like>;
  content: string;
  tag: Array<string>;
  write_date: string;
  profile: string;
  user_id: number;
  is_bookmark: boolean;
  is_like: boolean;
}

const Explore = () => {
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data: any) => {
      window.alert("새로운 코멘트가 추가되었습니다");
    });
  }, [socket]);

  useEffect(() => {
    // 이미지가 로드될 때까지 상태를 false로 유지합니다.
    setIsImageLoaded(false);

    // 이미지 로드를 시도합니다.
    const image = new Image();
    image.onload = () => {
      // 이미지 로드가 완료되면 상태를 true로 업데이트합니다.
      setIsImageLoaded(true);
    };
    image.src = `${process.env.BACKEND_URL}assets/1.1.jpg`;
  }, []);
  const [Focus, setFocus] = useState("top");
  const dispatch = useDispatch();
  // const data = useSelector((state: RootState) => state.getData.currentPosts);
  const isTop = useSelector((state: RootState) => state.changeExploreState.top);

  const isLatest = useSelector(
    (state: RootState) => state.changeExploreState.latest
  );
  const getCurrentPosts = useSelector(
    (state: RootState) => state.getData.currentPosts
  );
  const isPeople = useSelector(
    (state: RootState) => state.changeExploreState.people
  );

  const search = useSelector(
    (state: RootState) => state.changeSearchState.search
  );
  const peopleData = useSelector(
    (state: RootState) => state.changePeopleState.userData
  );

  const focus = useSelector(
    (state: RootState) => state.changeExploreState.focus
  );

  const currentPage = useSelector(
    (state: RootState) => state.getData.currentPage
  );

  const pageCount = useSelector((state: RootState) => state.getData.pageCount);

  const saveFollow = (prop: number) => {
    customAxios
      .post("/saveFollow", {
        user_id: prop,
      })
      .then(() => {
        queryClient.invalidateQueries(["selectExploreData"]);
      });
  };

  const deleteFollow = (prop: number) => {
    customAxios
      .post("/saveFollow/delete", {
        user_id: prop,
      })
      .then(() => {
        queryClient.invalidateQueries(["selectExploreData"]);
      });
  };
  function onExploreSearch() {
    return customAxios.get(`/getTweets/${focus}`, {
      params: { search },
    });
  }

  // const [exploreData, setExploreData] = useState<Data[]>([]);

  const tweetFocusApi = () => {
    return customAxios.get(`/getTweets/${focus}`, {
      params: { search, currentPage },
    });
  };

  const { isLoading, isError, data, error }: any = useQuery(
    ["selectExploreData", currentPage, focus, search],
    tweetFocusApi,
    {
      refetchOnWindowFocus: true,
      // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지

      onSuccess: (res: any) => {},

      onError: (e: any) => {
        console.log(e.message);
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // 이미지 로드 상태에 따라 배경 스타일을 동적으로 설정합니다.
  const bgImageStyle = isImageLoaded
    ? {
        backgroundImage: `${process.env.BACKEND_URL}assets/1.1.jpg`,
        backgroundSize: "cover", // 배경 이미지가 로드된 경우에만 추가합니다.
        width: "100vw",
        height: "100vh",
      }
    : {
        backgroundColor: "#0a1527", // 이미지 로드 전에는 기본 배경색을 사용합니다.
        width: "100vw",
        height: "100vh",
      };

  return (
    <>
      {/* <Header /> */}
      <div className="flex ">
        <Sidebar />
        <div className=" flex  justify-center items-center w-full h-5/5 ">
          <div className="middleBox ">
            <div className="exploreTitle" />
            <div className="tweets">
              <div className="p-5">
                <Searchbar onSearchbar={onExploreSearch} />
              </div>

              <div className=" font-serif w-full flex justify-around ">
                <button
                  className={
                    " button w-20 p-3 ml-3 hover:bg-slate-200 " +
                    (isTop
                      ? "border-solid border-b-4 border-blue-300"
                      : " border-solid border-b-4 border-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setFocus("top");
                    dispatch(
                      changeExploreState({
                        top: true,
                        latest: false,
                        people: false,
                        focus: "top",
                      })
                    );
                    dispatch(changeCurrentPage(1));
                    queryClient.invalidateQueries(["selectExploreData"]);

                    // queryKey 유효성 제거
                  }}
                >
                  Top
                </button>
                <button
                  className={
                    " button w-20 p-3 ml-3 hover:bg-slate-200 " +
                    (isLatest
                      ? "border-solid border-b-4 border-blue-300"
                      : " border-solid border-b-4 border-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      changeExploreState({
                        top: false,
                        latest: true,
                        people: false,
                        focus: "latest",
                      })
                    );
                    dispatch(changeCurrentPage(1));
                    setFocus("latest");
                    queryClient.invalidateQueries(["selectExploreData"]);
                  }}
                >
                  Latest
                </button>
                <button
                  className={
                    " button w-20 p-3  ml-3 hover:bg-slate-200 " +
                    (isPeople
                      ? "border-solid border-b-4 border-blue-300"
                      : " border-solid border-b-4 border-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      changeExploreState({
                        top: false,
                        latest: false,
                        people: true,
                        focus: "people",
                      })
                    );
                    dispatch(changeCurrentPage(1));
                    setFocus("people");
                    queryClient.invalidateQueries(["selectExploreData"]);
                  }}
                >
                  People
                </button>
              </div>
              {isPeople ? (
                <>
                  {data.data.data.map((t: any, i: number) => {
                    return (
                      <div className="peopleBox" key={t.user_id}>
                        <div className="imgBox">
                          <img
                            className="profileImg rounded-full "
                            alt={
                              t.profile === null
                                ? `/assets/사람.png`
                                : `${process.env.BACKEND_URL}static/uploads/${t.profile}`
                            }
                            src={
                              t.profile === null
                                ? `/assets/사람.png`
                                : `${process.env.BACKEND_URL}static/uploads/${t.profile}`
                            }
                          />
                        </div>
                        <div>
                          <div className="peopleInfo ">
                            <p className="font-bold pt-1">사용자</p>
                            <p className="from-neutral-400 text-sm">
                              {t.email}
                            </p>
                            <p className="from-neutral-400 text-sm">소개글</p>
                          </div>
                        </div>
                        <div className=" followBox">
                          <button
                            className=""
                            key={t.user_id}
                            onClick={() => {
                              t.following
                                ? deleteFollow(t.user_id)
                                : saveFollow(t.user_id);
                            }}
                          >
                            {t.following ? (
                              <div className=" ">
                                <span className="follow hover:bg-slate-700 ">
                                  Following
                                </span>
                              </div>
                            ) : (
                              <>
                                <div className="following">
                                  <span className="follow">Follow</span>
                                </div>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <TweetBox data={data.data.data} />
              )}
            </div>
            <Pagination count={data.data.count} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
