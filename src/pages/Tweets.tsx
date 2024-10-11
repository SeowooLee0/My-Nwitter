import axios, { AxiosResponse } from "axios";
import { SocketContext, SOCKET_EVENT } from "../socketio";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import TweetBox from "../components/tweets/TweetBox";

import customAxios from "../api/CommonAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Sidebar from "../components/layouts/Sidebar";
import "../scss/pages/Tweets.scss";

import { useInfiniteQuery, useQueryClient } from "react-query";
// 다른 파일에서 사용 예시

import OptimizedImageUtils from "../components/layouts/OptimizedImageUtils";

// 페이지 로드 시 최적화된 이미지 표시

import AddTweet from "../components/tweets/AddTweet";
import { changGetDataState } from "../redux/createSlice/GetDataSlice";
import CommentsList from "../components/tweets/commentList";

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

console.time("측정");

const Tweets = () => {
  const [optimizedBgImgUrl, setOptimizedBgImgUrl] = useState<string>("");

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
            dispatch(
              changGetDataState({
                id: res.data.user_id,
              })
            );
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
        if (entries[0].isIntersecting) {
          if (Math.ceil(total / 10) > page.current) {
            fetchNextPage();
            setPageCount((page.current += 1));
            // queryClient.invalidateQueries(["select"]);
          }
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

    socket.on("RECEIVE_MESSAGE", () => {
      window.alert("새로운 메세지 도착");
    });

    // return () => {
    //   socket.off("RECEIVE_MESSAGE", (data: any) => {
    //     console.log(data);
    //     window.alert("새로운 코멘트가 추가되었습니다");
    //   });
    // };
  }, [socket]);
  // console.log(data.pages);

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

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
      <div className="flex " style={bgImageStyle}>
        <Sidebar />

        <div className=" flex  justify-center items-center w-full h-5/5 ">
          <div className="middleBox ">
            <div className="tweetTitle">
              <img src="/assets/Group25.png" alt="Tweet Title" />
            </div>

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

console.timeEnd("측정");

export default Tweets;
