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
import { latest } from "immer/dist/internal";
import Searchbar from "../components/Searchbar";
import "./Tweets.scss";
import SidebarRight from "../components/SidebarRight";

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

  console.log(getCurrentPosts);
  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data: any) => {
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
  const [tweet, setTweet] = useState([]);
  const [saveTag, setSaveTag] = useState("");
  const saveTweets = async () => {
    customAxios
      .post("/saveTweets", {
        content: tweet,
        tag: saveTag,
      })
      .then((res) => {});
  };

  const onClick = (event: any) => {
    saveTweets();
    event.preventDefault();
  };

  const onChange = (event: any) => {
    const { value } = event.target;

    setTweet(value);
    if (value.length >= 101) {
      alert("글자수는 10자리로 제한되어있습니다");
      const text = value.slice(0, 100);
      setTweet(text);
    }
  };

  const onTag = (event: any) => {
    const { value } = event.target;
    setSaveTag(value.match(/(#[^\s#]+)/g));
  };

  const onLogin = () => {
    customAxios
      .get("/refreshTokenRequest")
      .then((res) => {
        // if (res.data.data === null) {
        //   alert("로그인이 만료되었습니다");
        // }
      })
      .catch((err) => {});
  };

  const [likeData, setLikeData] = useState<isLike[]>([]);

  function paginate(pageNum: number) {
    dispatch(changeCurentPage(pageNum));

    //axios 요청 나눠서 들고오기
  }

  return (
    <>
      {/* <Header /> */}

      <div className="flex">
        <Sidebar />
        <div className="middleBox flex-col grow">
          <form>
            <div className="tweetTop">
              <div className="title">Home</div>
              <div className="flex p-5 tweetWritingBox ">
                <img
                  className="w-8 h-8 pt-0 m-1"
                  alt="#"
                  src={"/assets/user(1).png"}
                />
                <div className="w-full">
                  <input
                    className="input"
                    placeholder="What's happening?"
                    value={tweet}
                    onClick={onLogin}
                    onChange={onChange}
                  />
                  <input
                    className="input"
                    placeholder="#태그"
                    onClick={onLogin}
                    onChange={onTag}
                  />
                  <div className="inputBtn">
                    <button onClick={onClick}>업로드</button>
                  </div>
                </div>
              </div>
            </div>
            <TweetBox />
          </form>
        </div>
        <SidebarRight />
      </div>
      <Pagination
        postsPerPage={getPostPerPage}
        totalPosts={getDataLength}
        paginate={paginate}
      />
    </>
  );
}

export default Tweets;
