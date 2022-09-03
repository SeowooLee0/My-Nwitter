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
import Example from "../components/slide";
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

  interface pagination {
    postsPerPage: any;
    totalPosts: any;
    paginate: any;
  }

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

  const [data, setData] = useState<Tweet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = data.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNum: number) => {
    setCurrentPage(pageNum);
  };
  const [id, setId] = useState("");

  return (
    <>
      <Example />
      {/* <Components /> */}

      <TweetBox data={currentPosts} id={id}></TweetBox>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </>
  );
}

export default Tweets;
