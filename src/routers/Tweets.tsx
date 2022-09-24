import axios from "axios";

import React, {
  Component,
  useCallback,
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

interface Comment {
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

export interface is_like {
  is_like: boolean;
  tweet_id: number;
}

function Tweets() {
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:1234/getTweets/select",
    }).then((res) => {
      console.log(res.data.data);
      // setData(res.data.data);
      setId(res.data.email);
      setCurrentPosts(res.data.data);
      setDataLength(res.data.data.length);
    });
  }, []);

  // const selectTweets = async () => {
  //   axios.get("http://localhost:1234/getTweets/select").then((res) => {
  //     // console.log(res.data);
  //     if (res.data === "login again") {
  //       alert("로그인이 만료되었습니다");
  //     }
  //   });
  // };

  interface Comment {
    tweet_id: number;
    comment: string;
    id: number;
    write_date: string;
    email: string;
  }

  // const [data, setData] = useState<Tweet[]>([]);
  const [dataLength, setDataLength] = useState(Number);
  // const currentPost = data.slice(0, 10);

  const [currentPosts, setCurrentPosts] = useState<Tweet[]>([]);
  const [likeData, setLikeData] = useState<is_like[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  // console.log(currentPage);

  const [postsPerPage] = useState(10);

  // const indexOfLast = currentPage * postsPerPage;
  // const indexOfFirst = indexOfLast - postsPerPage;

  function paginate(pageNum: number) {
    setCurrentPage(pageNum);

    //axios 요청 나눠서 들고오기
  }

  useEffect(() => {
    // console.log(currentPage);
    axios
      .get("http://localhost:1234/getTweets/select", {
        params: { currentPage },
      })
      .then((result: any) => {
        setCurrentPosts(result.data.data);
      });
  }, [currentPage]);

  const [id, setId] = useState("");

  return (
    <>
      <Header />
      {/* <Components /> */}

      <TweetBox data={currentPosts} id={id} likeData={likeData}></TweetBox>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={dataLength}
        paginate={paginate}
      />
    </>
  );
}

export default Tweets;
