import axios, { AxiosResponse } from "axios";
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

import CommentsList from "../components/tweets/CommentList";
import customAxios from "../api/CommonAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addCurrentPosts,
  changeCurrentPosts,
  changeIsLoaded,
  changeTotalPageNumberPosts,
  changGetDataState,
  setPageCount,
} from "../redux/createSlice/GetDataSlice";
import Sidebar from "../components/layouts/Sidebar";
import { current, latest } from "immer/dist/internal";
import Searchbar from "../components/explore/Searchbar";
import "../scss/pages/Tweets.scss";
import SidebarRight from "../components/layouts/SidebarRight";
import { save } from "react-cookies";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { count } from "console";
import AddTweet from "../components/tweets/AddTweet";

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
  upload_file: string;
}
export interface Data {
  id: string;
  email: string;
  tweet_id: number;
  content: string;
  profile: string;
  tag: Array<string>;
  write_date: string;
  upload_file: string;
  comment: Array<Comment>;
  like: Array<Like>;
  is_opened: boolean;
  retweet_opened: boolean;
  is_bookmark: boolean;
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

export interface getDataState {
  currentPosts: Array<Data>;
  id: string;
  currentPage: number;
  postPerPage: number;
  totalPosts: number;
  isLoaded: boolean;
  pageCount: number;
  totalPageNumber: number;
  uploadFile: string;
}

interface saveTweets {
  content: string;
  tag: any;
}

const Tweets = () => {
  // const data1 = useSelector((state: RootState) => state.getData.currentPosts);
  const target = useRef<any>(null);
  const id = useSelector((state: RootState) => state.getData.id);
  const isLoaded = useSelector((state: RootState) => state.getData.isLoaded);

  let [pageCount, setPageCount] = useState(0);
  const page = useRef(pageCount);
  const queryClient = useQueryClient();

  const getTotalPageNumber = useSelector(
    (state: RootState) => state.getData.totalPageNumber
  );

  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  function tweetSelectApi() {
    return customAxios.get("/getTweets/select", {
      params: { pageCount },
    });
  }

  const getTweets = useQuery(["select", page], tweetSelectApi, {
    refetchOnWindowFocus: false,
    onSuccess: (res: any) => {
      if (pageCount > 1) {
        setAddData([...addData, ...res.data.data]);
      } else {
        setAddData([...res.data.data]);
      }

      dispatch(
        changGetDataState({
          id: res.data.user_id,
          postPerPage: 10,
          totalPosts: res.data.count,
        })
      );

      //   dispatch(addCurrentPosts(res.data.data));
    },
  });
  console.log(getTweets.data);

  // let newData = [...data.data.data];

  const [addData, setAddData] = useState<Data[]>([]);
  useEffect(() => {
    console.log(getTotalPageNumber);
    const observer = new IntersectionObserver(
      async (entries) => {
        console.log(entries);

        if (entries[0].isIntersecting) {
          console.log("is InterSecting");
          setPageCount((page.current += 1));

          queryClient.invalidateQueries(["select"]);
          console.log(getTweets.data);
          // setAddData([...addData, ...getTweets.data.data.data]);

          // if (getTotalPageNumber > page.current) {
          // }
          // console.log(page.current);
        }
      },
      {
        threshold: 1,
      }
    );
    if (target) observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  useEffect(() => {
    socket.on("RECEIVE_COMMENT", (data: any) => {
      window.alert("새로운 코멘트가 추가되었습니다");
    });

    // return () => {
    //   socket.off("RECEIVE_MESSAGE", (data: any) => {
    //     console.log(data);
    //     window.alert("새로운 코멘트가 추가되었습니다");
    //   });
    // };
  }, [socket]);

  return (
    <>
      {/* <Header /> */}

      <div className=" flex">
        <Sidebar />

        <div className="middleBox flex-col grow">
          <div className="title">Home</div>
          <AddTweet />
          <TweetBox data={addData} />
        </div>
        <SidebarRight />
      </div>
      <div ref={target}>{isLoaded && <p>Loading...</p>}</div>
    </>
  );
};

export default Tweets;
