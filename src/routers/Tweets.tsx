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
  likes: Array<Like>;
}

interface Comment {
  tweet_id: number;
  comment: string;
  id: number;
  write_date: string;
  email: string;
}

interface Like {
  likeUsers: Array<string>;
  likeCount: number;
}

function Tweets() {
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:1234/getTweets",
    }).then((res) => {
      // console.log(res.data.data);
      setData(res.data.data);
      console.log(res.data.data);
      setId(res.data.email);
      console.log(id);
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

  const [currentPosts, setCurrentPosts] = useState<Tweet[]>([]);
  const [data, setData] = useState<Tweet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPost = data.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNum: number) => {
    setCurrentPage(pageNum);
    console.log(currentPage);
    //axios 요청 나눠서 들고오기
    axios
      .get("http://localhost:1234/getTweets/select", {
        params: { currentPage },
      })
      .then((result: any) => {
        console.log(result.data.data);
        setCurrentPosts(result.data.data);
        console.log(currentPost);
      });
  };
  const [id, setId] = useState("");

  return (
    <>
      <Header />
      {/* <Components /> */}

      <TweetBox data={currentPost} id={id}></TweetBox>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </>
  );
}

export default Tweets;
