import axios from "axios";

import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { DataProps, Tweet } from "../routers/Tweets";
import { HeartIcon } from "@heroicons/react/24/outline";

const TweetBox = ({ data, id }: { data: Array<Tweet>; id: any }) => {
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

  // const onLogout = () => {
  //   axios.get("http://localhost:1234/logout");
  //   alert("로그아웃 되었습니다");
  //   window.location.reload();
  // };

  const [tweet, setTweet] = useState([]);
  const [comment, setComment] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [saveTag, setSaveTag] = useState("");
  const [like, setLike] = useState(false);
  const [login, setLogin] = useState(true);

  const onClick = (event: any) => {
    saveTweets();
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
          window.location.reload();
        }
      })
      .catch((err) => {});
  };

  const [getid, setGetId] = useState("");
  const [check, setCheck] = useState(false);
  //   const checkData = data.filter((data: Tweet) => data.email === id);

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
      });
  };

  const onCheck = (e: any) => {
    if (e.target.checked === true) {
      setCheck(true);
    } else if (e.target.checked === false) {
      setCheck(false);
    }
  };

  const onHeartButton = () => {
    setLike((prev) => !prev);
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
          {(check ? checkData : data).map((t: any) => {
            return (
              <>
                <div className="tweet" key={t.tweet_id}>
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

                  <div className="comment_inputBox">
                    <input
                      className="comment_input"
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
                    src={like ? "/assets/heart.png" : "/assets/EmptyHeart.png"}
                    onClick={onHeartButton}
                  />
                  <img
                    className="w-5 h-5"
                    alt="#"
                    src={"/assets/messenger.png"}
                    // onClick={onHeartButton}
                  />
                </div>
                <div className="commentBox">
                  <div className="comment_title">Comments</div>
                  {t.comment.map((t: any) => {
                    return (
                      <>
                        <div key={t.id} className="comment">
                          {`작성자 : ${t.email} ${t.comment}`}
                        </div>
                      </>
                    );
                  })}
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
