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
import { Link } from "react-router-dom";
import Paginations from "../components/layouts/Pagination";
import Pagination from "../components/layouts/Pagination";
import Header from "../components/layouts/Header";
import TweetBox from "../components/tweets/TweetBox";

import CommentsList from "../components/tweets/commentList";
import customAxios from "../api/CommonAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  changeCurentPage,
  changeCurrentPosts,
  changeTotalPosts,
  changGetDataState,
} from "../redux/createSlice/GetDataSlice";
import Sidebar from "../components/layouts/Sidebar";
import "../scss/pages/Explore.scss";

import { Like, Comment, Data } from "./Tweets";
import { changeExploreState } from "../redux/createSlice/ExploreSlice";
import Searchbar from "../components/explore/Searchbar";
import { changePeopleState } from "../redux/createSlice/PeopleDataSlice";
import { current } from "@reduxjs/toolkit";

export interface ExploreData {
  id: string;
  email: string;
  tweet_id: number;
  comment: Array<Comment>;
  like: Array<Like>;
  content: string;
  tag: Array<string>;
  write_date: string;
}

const Explore = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data: any) => {
      window.alert("새로운 코멘트가 추가되었습니다");
    });
  }, [socket]);

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.getData.currentPosts);
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

  // const getLikeData = useSelector((state: RootState) => state.getData.likeData);

  useEffect(() => {
    customAxios
      .get("/getTweets/top", {
        params: { search, currentPage },
      })
      .then((res) => {
        dispatch(changeCurrentPosts(res.data.data));
        dispatch(changeTotalPosts(res.data.count));
      });
    dispatch(
      changeExploreState({
        top: true,
        latest: false,
        people: false,
        focus: "top",
      })
    );
  }, []);

  useEffect(() => {
    customAxios
      .get(`/getTweets/${focus}`, {
        params: { search, currentPage },
      })
      .then((res) => {
        dispatch(changeCurrentPosts(res.data.data));
        dispatch(changeTotalPosts(res.data.count));
      });
    dispatch(
      changeExploreState({
        top: true,
        latest: false,
        people: false,
        focus: "top",
      })
    );
  }, [currentPage]);

  return (
    <>
      {/* <Header /> */}
      <div className="flex h-auto">
        <Sidebar />
        <div className="grow">
          <div className="p-5">
            <Searchbar />
          </div>

          <div className=" font-serif w-full flex justify-around ">
            <button
              className={
                " button w-20 p-3 ml-3 hover:bg-slate-200 " +
                (isTop
                  ? "border-solid border-b-4 border-blue-300"
                  : " border-solid border-b-4 border-white")
              }
              onClick={() => {
                customAxios
                  .get("/getTweets/top", {
                    params: { search, currentPage },
                  })
                  .then((res) => {
                    let data = res.data.data.sort(
                      (a: any, b: any) => b.like.length - a.like.length
                    );
                    dispatch(changeCurrentPosts(data));
                    dispatch(changeTotalPosts(res.data.count));
                  });
                dispatch(
                  changeExploreState({
                    top: true,
                    latest: false,
                    people: false,
                    focus: "top",
                  })
                );
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
              onClick={() => {
                dispatch(
                  changeExploreState({
                    top: false,
                    latest: true,
                    people: false,
                    focus: "latest",
                  })
                );
                customAxios
                  .get("/getTweets/latest", {
                    params: { search, currentPage },
                  })
                  .then((result) => {
                    dispatch(changeCurrentPosts(result.data.data));
                    dispatch(changeTotalPosts(result.data.count));
                  });
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
              onClick={() => {
                customAxios
                  .get("/getTweets/people", {
                    params: { search, currentPage },
                  })
                  .then((res) => {
                    dispatch(
                      changePeopleState({
                        userData: res.data.data,
                      })
                    );
                    dispatch(changeTotalPosts(res.data.count));
                  });

                dispatch(
                  changeExploreState({
                    top: false,
                    latest: false,
                    people: true,
                    focus: "people",
                  })
                );
              }}
            >
              People
            </button>
          </div>
          {isPeople ? (
            <>
              {peopleData.map((t: any, i: number) => {
                return (
                  <div className="peopleBox" key={t.user_id}>
                    <div className="imgBox">
                      <img
                        className="profileImg rounded-full "
                        alt={`http://localhost:1234/static/${t.profile}`}
                        src={`http://localhost:1234/static/${t.profile}`}
                      />
                    </div>
                    <div>
                      <div className="peopleInfo ">
                        <p className="font-bold pt-1">사용자</p>
                        <p className="from-neutral-400 text-sm">{t.email}</p>
                        <p className="from-neutral-400 text-sm">소개글</p>
                      </div>
                    </div>
                    <div className=" followBox">
                      <button
                        className=""
                        key={t.user_id}
                        onClick={() => {
                          t.following
                            ? customAxios
                                .post("/saveFollow/delete", {
                                  user_id: t.user_id,
                                })
                                .then(() => {
                                  customAxios
                                    .get("/getTweets/people", {
                                      params: { search, currentPage },
                                    })
                                    .then((res) => {
                                      dispatch(
                                        changePeopleState({
                                          userData: res.data.data,
                                        })
                                      );
                                    });
                                })
                            : customAxios
                                .post("/saveFollow", {
                                  user_id: t.user_id,
                                })
                                .then(() => {
                                  customAxios
                                    .get("/getTweets/people", {
                                      params: { search, currentPage },
                                    })
                                    .then((res) => {
                                      dispatch(
                                        changePeopleState({
                                          userData: res.data.data,
                                        })
                                      );
                                    });
                                });
                        }}
                      >
                        {t.following ? (
                          <div className=" ">
                            <span className="follow hover:bg-slate-800 ">
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
            <TweetBox />
          )}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default Explore;
