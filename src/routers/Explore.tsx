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
import Components from "../components/component";
import Paginations from "../components/Pagination";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import TweetBox from "../components/TweetBox";

import CommentsList from "../components/commentList";
import customAxios from "../CommonAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  changeCurentPage,
  changeCurrentPosts,
  changeTotalPosts,
  changGetDataState,
} from "../redux/createSlice/GetDataSlice";
import Sidebar from "../components/Sidebar";
import "./Explore.scss";
import "./People.scss";
import { Like, Comment, Data } from "./Tweets";
import { changeExploreState } from "../redux/createSlice/ExploreSlice";
import Searchbar from "../components/Searchbar";
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

function Explore() {
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
    console.log("전송");
  }, [currentPage]);

  return (
    <>
      {/* <Header /> */}
      <div className="flex h-auto">
        <Sidebar />
        <div className="grow">
          {/* search bar */}
          <Searchbar />
          <div className=" font-serif w-full inline-block ">
            <button
              className={
                " button w-1/3 p-3 hover:bg-slate-200 " +
                (isTop ? "border-solid border-b-4 border-blue-300" : "")
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
                " button w-1/3 p-3 hover:bg-slate-200 " +
                (isLatest ? "border-solid border-b-4 border-blue-300" : "")
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
                " button w-1/3 p-3 hover:bg-slate-200 " +
                (isPeople ? "border-solid border-b-4 border-blue-300" : "")
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
                    <img
                      className="w-8 h-8 pt-0 m-1"
                      alt="#"
                      src={"/assets/user(1).png"}
                    />

                    <div className="info">
                      <div className="userInfo">
                        <p className="font-bold pt-1">{t.email}</p>
                        {/* <div>{t.profile}</div> */}
                      </div>
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
}

export default Explore;
