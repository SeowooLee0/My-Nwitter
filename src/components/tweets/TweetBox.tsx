import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../scss/components/TweetBox.scss";
import HeartButton from "./Heartbutton";
import { socket, SocketContext, SOCKET_EVENT } from "../../socketio";
import customAxios from "../../api/CommonAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  changeCurrentPosts,
  changeIsOpened,
} from "../../redux/createSlice/GetDataSlice";
import Searchbar from "../explore/Searchbar";
import { QueryClient, useQuery, useQueryClient } from "react-query";
export interface likeButton {
  tweet_id: number;
  likes: boolean;
}

const TweetBox = () => {




  const data1 = useSelector((state: RootState) => state.getData.currentPosts);
  const id = useSelector((state: RootState) => state.getData.id);
  const getCurrentPage = useSelector(
    (state: RootState) => state.getData.currentPage
  );

  // console.log(tweetData);

  const dispatch = useDispatch();

  const [getComments, setGetComments] = useState([]);
  const [comment, setComment] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [check, setCheck] = useState(false);

  const onComment = (event: any) => {
    setComment(event.target.value);
    setTweetId(event.target.id);
  };

  const saveComment = (event: any) => {
    event.preventDefault();

    customAxios
      .post("/saveComments", {
        comment: comment,
        tweet_id: tweetId,
      })
      .then((res) => {
        // console.log(res.headers);
        // if (res.data === "login again") {
        //   alert("로그인이 만료되었습니다");
        // }
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
  };

  const viewComments = (e: any) => {
    customAxios
      .post("/getComments", {
        tweet_id: e.target.id,
      })
      .then((res) => {
        setGetComments(res.data.data);
      });
  };

  const checkData = data1.filter(
    (data: { email: string }) => data.email === id
  );
  // console.log(like);

  return (
    <>
      {/* <input type="checkbox" value={id} onChange={onCheck} /> */}

      <div className="tweetBox">
        {(check ? checkData : data1).map((t: any, i: number) => {
          return (
            <>
              <div className="tweet" key={t.tweet_id} id={`${t.tweet_id}`}>
                <img
                  className="w-8 h-8 pt-0 m-1"
                  alt="#"
                  src={"/assets/user(1).png"}
                />

                <div className="info">
                  <div className="userInfo">
                    <p className="font-bold pt-1">{t.email}</p>
                    <div>{t.write_date}</div>
                  </div>
                  <p className="pt-2 pb-1">{t.content}</p>
                  <p className="pt-1 pb-1">
                    {t.tag === null
                      ? "ddd"
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

                  <div className="footer flex">
                    <div className=" flex pr-5">
                      <img
                        className="w-4 h-4 "
                        alt="#"
                        src={
                          t.is_like
                            ? "/assets/heart.png"
                            : "/assets/EmptyHeart.png"
                        }
                        id={t.tweet_id}
                        onClick={() => {
                          if (t.is_like === true) {
                            customAxios
                              .post("/saveLike/delete", {
                                tweet_id: t.tweet_id,
                              })
                              .then((res) => {
                                customAxios
                                  .get("/getTweets/select", {
                                    params: { getCurrentPage },
                                  })
                                  .then((result: any) => {
                                    dispatch(
                                      changeCurrentPosts(result.data.data)
                                    );
                                  });
                              });
                          }

                          if (t.is_like === false) {
                            customAxios
                              .post("/saveLike", {
                                tweet_id: t.tweet_id,
                              })
                              .then((res) => {
                                customAxios
                                  .get("/getTweets/select", {
                                    params: { getCurrentPage },
                                  })
                                  .then((result: any) => {
                                    dispatch(
                                      changeCurrentPosts(result.data.data)
                                    );
                                  });
                              });
                          }
                        }}
                      />
                      <div className="font-light text-sm pl-2">
                        {t.like.length - 1}
                      </div>
                    </div>
                    <div className=" flex ">
                      <img
                        className="w-4 h-4 "
                        alt="#"
                        src={"/assets/messenger.png"}
                        onClick={(e: any) => {
                          if (t.is_opened === false) {
                            // t.is_opened = !t.is_opened;
                            customAxios
                              .post("/getComments", {
                                tweet_id: e.target.id,
                              })
                              .then((response) => {
                                dispatch(
                                  changeIsOpened(response.data.is_opened)
                                );
                                // t.is_opened = response.data.is_opened;
                                setGetComments(response.data.data);
                              });
                          }
                          if (t.is_opened === true) {
                            dispatch(changeIsOpened(false));
                            setGetComments([]);
                          }
                        }}
                        id={t.tweet_id}
                      />

                      <div className="font-light text-sm pl-2">
                        {t.comment.length}
                      </div>
                      {/* <div className="comment_inputBox " id={`${t.tweet_id}`}>
                        <input
                          className="comment_input placeholder-gray-500"
                          id={`${t.tweet_id}`}
                          type="text"
                          placeholder="댓글달기..."
                          onChange={onComment}
                          // value={comment}
                        />
                        <button
                          className="comment_button"
                          onClick={saveComment}
                        >
                          게시
                        </button>
                      </div> */}
                      {/* <div className="commentBox font-black" key={t.comment.id}>
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
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
          // }
        })}
      </div>
    </>
  );
};

export default TweetBox;
