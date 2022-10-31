import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { io } from "socket.io-client";

import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import { DataProps, is_like, Like, Tweet } from "../routers/Tweets";
import HeartButton from "./Heartbutton";
import { socket, SocketContext, SOCKET_EVENT } from "../socketio";
export interface likeButton {
  tweet_id: number;
  likes: boolean;
}

const TweetBox = ({
  data,
  id,
  likeData,
}: {
  data: Array<Tweet>;
  id: any;
  likeData: Array<is_like>;
}) => {
  type likeUser = Array<string>;
  interface chat {
    tweetId: Number;
    comment: String;
  }

  const naviagte = useNavigate();
  const [like, setLike] = useState(false);

  const [openComment, setOpenComment] = useState(false);

  const saveTweets = async () => {
    axios
      .post("http://localhost:1234/saveTweets", {
        content: tweet,
        tag: saveTag,
      })
      .then((res) => {
        if (res.data === "login again") {
          alert("로그인이 만료되었습니다");
        }
      });
  };

  const [tweet, setTweet] = useState([]);

  const [getComments, setGetComments] = useState([]);
  const [comment, setComment] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [saveTag, setSaveTag] = useState("");

  const [login, setLogin] = useState(true);

  const onClick = (event: any) => {
    saveTweets();
    event.preventDefault();
    console.log(axios.defaults.headers);
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
    axios
      .get("http://localhost:1234/refreshTokenRequest")
      .then((res) => {
        setGetId(res.data.email);
        if (res.data.data === null) {
          alert("로그인이 만료되었습니다");
          naviagte("/auth");
        }
      })
      .catch((err) => {});
  };

  const [getid, setGetId] = useState("");
  const [check, setCheck] = useState(false);
  // const checkData = data.filter((data: Tweet) => data.email === id);

  const onComment = (event: any) => {
    setComment(event.target.value);
    setTweetId(event.target.id);
  };

  const saveComment = (event: any) => {
    event.preventDefault();
    axios
      .post("http://localhost:1234/saveComments", {
        comment: comment,
        tweet_id: tweetId,
      })
      .then((res) => {
        if (res.data === "login again") {
          alert("로그인이 만료되었습니다");
        }
        socket.emit(SOCKET_EVENT.SEND_MESSAGE, { comment, tweetId, id });
      });
  };

  const onCheck = (e: any) => {
    if (e.target.checked === true) {
      setCheck(true);
    } else if (e.target.checked === false) {
      setCheck(false);
    }
  };

  const onChangeId = (e: any) => {
    setTweetId(e.target.id);
    console.log(e.target);
  };

  const onHeartButton = (e: any) => {
    console.log(
      data.find((d: any) => {
        return (d.tweet_id = e.target.id);
      })
    );
  };

  // const toggleLike = async (e) => {
  //   const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
  //   setLike(!like)
  // }

  //

  const viewComments = (e: any) => {
    console.log(e.target.id);
    axios
      .post("http://localhost:1234/getComments", {
        tweet_id: e.target.id,
      })
      .then((res) => {
        setGetComments(res.data.data);
      });
  };

  const checkData = data.filter((data) => data.email === id);
  // console.log(like);

  return (
    <>
      <form className="form">
        <input
          className="text"
          placeholder="트윗 입력란"
          value={tweet}
          onClick={onLogin}
          onChange={onChange}
          disabled={login ? false : true}
        />
        <input
          className="text"
          placeholder="태그 입력란"
          onClick={onLogin}
          onChange={onTag}
        />
        <button className="inputBtn" onClick={onClick}>
          업로드
        </button>
        <input type="checkbox" value={id} onChange={onCheck} />
        <div className="tweetBox">
          {(check ? checkData : data).map((t: any, i: number) => {
            return (
              <>
                <div className="tweet" key={t.tweet_id} id={`${t.tweet_id}`}>
                  <p>작성자 : {t.email}</p>
                  <p>{t.content}</p>
                  <p>
                    {t.tag === null
                      ? ""
                      : t.tag.map((tagId: any, i: any) => {
                          const tagName = tagId.replace(/#/g, "");
                          return (
                            <>
                              <span>#</span>
                              <Link to={`/tag/${tagName}`} key={i}>
                                {tagName}
                              </Link>
                            </>
                          );
                        })}
                  </p>

                  {/* {t.comments.map.comments} */}

                  <div className="comment_inputBox " id={`${t.tweet_id}`}>
                    <input
                      className="comment_input placeholder-gray-500"
                      id={`${t.tweet_id}`}
                      type="text"
                      placeholder="댓글달기..."
                      onChange={onComment}
                      // value={comment}
                    />
                    <button className="comment_button" onClick={saveComment}>
                      게시
                    </button>
                  </div>
                </div>

                <div className="  flex">
                  <img
                    className="w-5 h-5 "
                    alt="#"
                    src={
                      t.is_like ? "/assets/heart.png" : "/assets/EmptyHeart.png"
                    }
                    id={t.tweet_id}
                    onClick={() => {
                      if (t.is_like === true) {
                        axios
                          .post("http://localhost:1234/saveLike/delete", {
                            tweet_id: t.tweet_id,
                          })
                          .then((res) => {
                            if (res.data === "login again") {
                              alert("로그인이 만료되었습니다");
                            }
                          });
                      }

                      if (t.is_like === false) {
                        axios
                          .post("http://localhost:1234/saveLike", {
                            tweet_id: t.tweet_id,
                          })
                          .then((res) => {
                            if (res.data === "login again") {
                              alert("로그인이 만료되었습니다");
                            }
                          });
                      }
                    }}
                  />
                  <img
                    className="w-5 h-5"
                    alt="#"
                    src={"/assets/messenger.png"}
                    onClick={(e: any) => {
                      // console.log(t.is_opened);

                      if (t.is_opened === false) {
                        // t.is_opened = !t.is_opened;
                        axios
                          .post("http://localhost:1234/getComments", {
                            tweet_id: e.target.id,
                          })
                          .then((res) => {
                            t.is_opened = res.data.is_opened;
                            setGetComments(res.data.data);
                          });
                      }
                      if (t.is_opened === true) {
                        t.is_opened = false;
                        setGetComments([]);
                      }
                    }}
                    id={t.tweet_id}
                  />

                  <div className="commentBox font-black" key={t.comment.id}>
                    {t.is_opened
                      ? getComments.map((t: any) => {
                          return (
                            <>
                              <div className="comment_title">Comments</div>
                              <div key={t.id} className="comment">
                                {`작성자 : ${t.email} ${t.comment}`}
                              </div>
                            </>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </>
            );
            // }
          })}
        </div>
      </form>
    </>
  );
};

export default TweetBox;
