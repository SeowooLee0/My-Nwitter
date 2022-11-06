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
import "./Tweets.scss";
import CommentsList from "../components/commentList";
import customAxios from "../CommonAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  changeCurentPage,
  changeCurrentPosts,
  changGetDataState,
} from "../redux/createSlice/GetDataSlice";

export interface DataProps {
  data: Array<Tweet>;
}

export interface Tweet {
  id: string;
  email: string;
  tweet_id: number;
  content: string;
  tag: Array<string>;
  write_date: string;
  comment: Array<Comment>;
  like: Array<Like>;
}
export interface Data {
  id: string;
  email: string;
  tweet_id: number;
  content: string;
  tag: Array<string>;
  write_date: string;
  comment: Array<Comment>;
  like: Array<Like>;
  is_opened: boolean;
  user_id: number;
  is_like: Array<isLike>;
}

export interface Comment {
  tweet_id: number;
  comment: string;
  id: number;
  write_date: string;
  email: string;
}

export interface Like {
  user_id: any;
  tweet_id: number;
}

export interface isLike {
  is_like: boolean;
  tweet_id: number;
}
export interface Comment {
  tweet_id: number;
  comment: string;
  id: number;
  write_date: string;
  email: string;
}

function Tweets() {
  const getDataLength = useSelector(
    (state: RootState) => state.getData.dataLength
  );
  const getCurrentPosts = useSelector(
    (state: RootState) => state.getData.currentPosts
  );
  // const getLikeData = useSelector((state: RootState) => state.getData.likeData);
  const getCurrentPage = useSelector(
    (state: RootState) => state.getData.currentPage
  );
  const getPostPerPage = useSelector(
    (state: RootState) => state.getData.postPerPage
  );
  const getId = useSelector((state: RootState) => state.getData.id);
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);
  useEffect(() => {
    customAxios.get("/getTweets/select").then((res) => {
      dispatch(
        changGetDataState({
          dataLength: res.data.count,
          currentPosts: res.data.data,
          id: res.data.email,
          currentPage: 1,
          postPerPage: 10,
        })
      );
    });

    customAxios
      .get("/getTweets/select", {
        params: { getCurrentPage },
      })
      .then((result: any) => {
        dispatch(changeCurrentPosts(result.data.data));
      });
  }, []);

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data: any) => {
      console.log(data);
      window.alert("새로운 코멘트가 추가되었습니다");
    });

    // return () => {
    //   socket.off("RECEIVE_MESSAGE", (data: any) => {
    //     console.log(data);
    //     window.alert("새로운 코멘트가 추가되었습니다");
    //   });
    // };
  }, [socket]);

  // const [data, setData] = useState<Tweet[]>([]);

  // const currentPost = data.slice(0, 10);

  const [likeData, setLikeData] = useState<isLike[]>([]);

  function paginate(pageNum: number) {
    dispatch(changeCurentPage(pageNum));

    //axios 요청 나눠서 들고오기
  }

  return (
    <>
      <Header />

      <TweetBox likeData={likeData}></TweetBox>

      <Pagination
        postsPerPage={getPostPerPage}
        totalPosts={getDataLength}
        paginate={paginate}
      />
    </>
  );
}

export default Tweets;
