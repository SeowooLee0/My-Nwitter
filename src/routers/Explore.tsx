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
  changGetDataState,
} from "../redux/createSlice/GetDataSlice";
import Sidebar from "../components/Sidebar";
import "./Explore.scss";
import { Like, Comment, Data } from "./Tweets";
import { changExploreState } from "../redux/createSlice/ExploreSlice";
import Searchbar from "../components/Searchbar";

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
      console.log(data);
      window.alert("새로운 코멘트가 추가되었습니다");
    });
  }, [socket]);

  const dispatch = useDispatch();
  const isTop = useSelector((state: RootState) => state.changExploreState.top);
  const isLatest = useSelector(
    (state: RootState) => state.changExploreState.latest
  );
  const getCurrentPosts = useSelector(
    (state: RootState) => state.getData.currentPosts
  );
  const isPeople = useSelector(
    (state: RootState) => state.changExploreState.people
  );

  const search = useSelector(
    (state: RootState) => state.changeSearchState.search
  );
  const getId = useSelector((state: RootState) => state.getData.id);
  // const getLikeData = useSelector((state: RootState) => state.getData.likeData);

  useEffect(() => {
    customAxios
      .get("/getTweets/top", {
        params: { search },
      })
      .then((res) => {
        dispatch(changeCurrentPosts(res.data.data));
      });
    dispatch(
      changExploreState({
        top: true,
        latest: false,
        people: false,
        focus: "top",
      })
    );
  }, []);

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
                console.log(search === "");
                customAxios
                  .get("/getTweets/top", {
                    params: search === "" ? { search: "" } : { search },
                  })
                  .then((res) => {
                    let data = res.data.data.sort(
                      (a: any, b: any) => b.like.length - a.like.length
                    );
                    dispatch(changeCurrentPosts(data));
                  });
                dispatch(
                  changExploreState({
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
                customAxios
                  .get("/getTweets/latest", {
                    params: { search },
                  })
                  .then((res) => {
                    console.log(res.data);
                    dispatch(changeCurrentPosts(res.data.data));
                  });
                dispatch(
                  changExploreState({
                    top: false,
                    latest: true,
                    people: false,
                    focus: "latest",
                  })
                );
                console.log(getCurrentPosts, isLatest);
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
                    params: search === "" ? { search: "" } : { search },
                  })
                  .then((res) => {
                    console.log(res.data.data);
                  });
                dispatch(
                  changExploreState({
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
          {isPeople ? <></> : <TweetBox />}
        </div>

        {/* <Sidebar /> */}
      </div>
    </>
  );
}

export default Explore;
