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

import TweetBox from "../components/tweets/TweetBox";

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

import "../scss/pages/Tweets.scss";
import SidebarRight from "../components/layouts/SidebarRight";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

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
  let [total, setTotal] = useState(10);
  const [profile, setProfile] = useState("");
  let page = useRef(pageCount);
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

  const all = queryClient.getQueriesData(["select"]);

  // const getTWeets: any = useQuery(["select", page], tweetSelectApi, {
  //   refetchOnWindowFocus: false,
  //   onSuccess: (res: any) => {
  //     console.log(res);
  //     setProfile(res.data.profile);
  //     setTotal(res.data.count);
  //     if (pageCount > 1) {
  //       setAddData([...addData, ...res.data.data]);
  //     } else {
  //       setAddData([...res.data.data]);
  //     }

  //     // dispatch(
  //     //   changGetDataState({
  //     //     id: res.data.user_id,
  //     //     postPerPage: 10,
  //     //     totalPosts: res.data.count,
  //     //   })
  //     // );
  //   },
  // });

  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["select"],
      async ({ pageParam = 1 }) =>
        customAxios
          .get("/getTweets/select", {
            params: { pageParam },
          })
          .then((res: any) => {
            setProfile(res.data.profile);
            setTotal(res.data.count);
            return res;
          }),

      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.config.params.pageParam + 1;
        },
        refetchOnWindowFocus: false,
      }
    );

  const [addData, setAddData] = useState<Data[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        console.log(entries);

        if (entries[0].isIntersecting) {
          console.log("is InterSecting");

          // setAddData([...addData, ...getTweets.data.data.data]);

          if (Math.ceil(total / 10) > page.current) {
            fetchNextPage();
            setPageCount((page.current += 1));
            // queryClient.invalidateQueries(["select"]);
          }
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
  }, [target, total]);

  useEffect(() => {
    socket.on("RECEIVE_COMMENT", (i: any) => {
      window.alert("새로운 코멘트가 추가되었습니다");
    });

    // return () => {
    //   socket.off("RECEIVE_MESSAGE", (data: any) => {
    //     console.log(data);
    //     window.alert("새로운 코멘트가 추가되었습니다");
    //   });
    // };
  }, [socket]);
  // console.log(data.pages);

  return (
    <>
      {/* <Header /> */}
      <div className="flex">
        <Sidebar />

        <div className=" flex  justify-center items-center w-full h-5/5 ">
          <div className="middleBox ">
            <div className="tweetTitle" />
            <div className="tweets">
              <AddTweet profile={profile} count={Math.ceil(total / 10)} />
              {!data ? (
                <p>Loading...</p>
              ) : (
                <TweetBox
                  data={data?.pages.map((page) => page.data.data)}
                  profile={profile}
                />
              )}
              <div ref={target}>{isLoaded && <p>Loading...</p>}</div>
              {/* <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
              </div> */}

              {/* 클릭 시 이전 페이지 호출 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweets;
