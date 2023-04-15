import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../scss/components/TweetBox.scss";
import Modal from "react-modal";
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
import { Data } from "../../pages/Tweets";

import AddTweet from "./AddTweet";
export interface likeButton {
  tweet_id: number;
  likes: boolean;
}

const TweetBox = (prop: any) => {
  const dispatch = useDispatch();
  let data = prop.data;
  console.log(data);

  const id = useSelector((state: RootState) => state.getData.id);

  const getCurrentPage = useSelector(
    (state: RootState) => state.getData.currentPage
  );
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [getComments, setGetComments] = useState([]);
  const [getData, setGetData] = useState<Data[]>([]);
  const [nowData, setNowData] = useState<Data[]>([]);
  // setGetData(prop.data);
  const [comment, setComment] = useState("");
  const [retweetBtn, setRetweetBtn] = useState(false);
  const [tweetId, setTweetId] = useState("");
  const [check, setCheck] = useState(false);
  let retweetRef = useRef(null);

  useEffect(() => {
    setGetData(prop.data);
  }, [prop.data]);

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
        socket.emit(SOCKET_EVENT.SEND_COMMENT, { comment, tweetId, id });
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

  const deleteHearts = (prop: number) => {
    customAxios
      .post("/saveLike/delete", {
        tweet_id: prop,
      })
      .then((res) => {
        customAxios
          .get("/getTweets/select", {
            params: { getCurrentPage },
          })
          .then((result: any) => {
            queryClient.invalidateQueries(["select"]);
            //mutation 사용해보기
          });
      });
  };

  const addHearts = (tweet_id: number) => {
    customAxios
      .post("/saveLike", {
        tweet_id: tweet_id,
      })
      .then((res) => {
        customAxios
          .get("/getTweets/select", {
            params: { getCurrentPage },
          })
          .then((result: any) => {
            queryClient.invalidateQueries(["select"]);
          });
      });
  };

  const deleteBookmark = (prop: number) => {
    customAxios
      .post("/saveBookmark/delete", {
        tweet_id: prop,
        id: id,
      })
      .then((res) => {
        customAxios
          .get("/getTweets/select", {
            params: { getCurrentPage },
          })
          .then((result: any) => {
            queryClient.invalidateQueries(["select"]);
            //mutation 사용해보기
          });
      });
  };

  const addBookmark = (tweet_id: number) => {
    customAxios
      .post("/saveBookmark", {
        tweet_id: tweet_id,
        id: id,
      })
      .then((res) => {
        customAxios
          .get("/getTweets/select", {
            params: { getCurrentPage },
          })
          .then((result: any) => {
            queryClient.invalidateQueries(["select"]);
          });
      });
  };

  //리트윗 일단 모두에게 보여지는걸로
  const retweet = (tweet_id: number) => {
    customAxios
      .post("/saveTweets", {
        reply_tweet_id: tweet_id,
        content: "",
        user_id: id,
        tag: ["retweet"],
      })
      .then((res) => {
        customAxios
          .get("/getTweets/select", {
            params: { getCurrentPage },
          })
          .then((result: any) => {
            queryClient.invalidateQueries(["select"]);
          });
      });
  };

  const quoteRetweet = ({ t, i }: any) => {
    setModalIsOpen(true);

    setNowData(data[i]);
    openRetweet({
      tweet_id: t.tweet_id,
      open: t.retweet_opened,
      index: i,
    });
  };

  const openComments = ({ id, number }: any) => {
    customAxios
      .post("/getComments", {
        tweet_id: id,
      })
      .then((response) => {
        data[number].is_opened = response.data.is_opened;

        setGetData([...data]);
        setGetComments(response.data.data);
      });
  };

  const closeComments = (number: number) => {
    data[number].is_opened = false;
    setGetComments([]);
  };

  const openRetweet = ({ tweet_id, open, index }: any) => {
    data[index].retweet_opened = open === false ? true : false;

    setGetData([...data]);
  };

  const checkData = getData.filter(
    (data: { email: string }) => data.email === id
  );

  return (
    <>
      {/* <input type="checkbox" value={id} onChange={onCheck} /> */}

      <div className="tweetBox">
        {(check ? checkData : getData).map((t: any, i: number) => {
          return (
            <>
              <div className="tweet" key={t.tweet_id} id={`${t.tweet_id}`}>
                <img
                  className="w-10 h-10 pt-0 m-1  rounded-full"
                  alt={
                    t.profile === null
                      ? `/assets/회색.png`
                      : `http://localhost:1234/static/uploads/${t.profile}`
                  }
                  src={
                    t.profile === null
                      ? `/assets/회색.png`
                      : `http://localhost:1234/static/uploads/${t.profile}`
                  }
                />
                <div className="info">
                  <div className="userInfo">
                    <p className="font-bold pt-1">{t.email}</p>
                    <div>{t.write_date}</div>
                  </div>
                  <div className="pt-2 pb-1">
                    {t.content}
                    {t.reply_tweet_id && (
                      <div className="m-3 border-2  rounded-3xl   border-neutral-200">
                        {<TweetBox data={t.retweet_data} />}
                      </div>
                    )}
                  </div>
                  {t.upload_file && (
                    <img
                      className=" background "
                      alt={`http://localhost:1234/static/tweets/${t.upload_file}`}
                      src={`http://localhost:1234/static/tweets/${t.upload_file}`}
                    />
                  )}
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
                    <div className=" flex pr-3">
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
                            deleteHearts(t.tweet_id);
                          }

                          if (t.is_like === false) {
                            addHearts(t.tweet_id);
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
                          t.is_opened === true
                            ? closeComments(i)
                            : openComments({ id: e.target.id, number: i });
                        }}
                        id={t.tweet_id}
                      />
                      <div className="font-light text-sm pl-2">
                        {t.comment.length}
                      </div>
                      <img
                        className="w-6 h-4 pl-2"
                        alt="#"
                        src={
                          t.is_bookmark
                            ? "/assets/bookmark.png"
                            : "/assets/bookmark_before.png"
                        }
                        onClick={() => {
                          if (t.is_bookmark === true) {
                            deleteBookmark(t.tweet_id);
                          }

                          if (t.is_bookmark === false) {
                            addBookmark(t.tweet_id);
                          }
                        }}
                      />
                      <div className=" ">
                        <img
                          className="w-6 h-4 pl-2"
                          alt="#"
                          src={"/assets/retweet.png"}
                          onClick={(e: any) => {
                            openRetweet({
                              tweet_id: t.tweet_id,
                              open: t.retweet_opened,
                              index: i,
                            });
                          }}
                        />
                        <div key={t.write_date}>
                          {t.retweet_opened ? (
                            <div className="ml-2 flex flex-col border-2 rounded border-stone-200">
                              <button
                                className="p-2 hover:bg-slate-100 rounded "
                                onClick={() => {
                                  retweet(t.tweet_id);
                                }}
                              >
                                Retweet
                              </button>
                              <button
                                className="p-2 hover:bg-slate-100 rounded"
                                onClick={() => {
                                  quoteRetweet({ t: t, i: i });
                                }}
                              >
                                Quote Tweet
                              </button>
                            </div>
                          ) : (
                            modalIsOpen && (
                              <Modal
                                className=" commentModal"
                                isOpen={modalIsOpen}
                                ariaHideApp={false}
                              >
                                <div className="list">
                                  <button
                                    onClick={() => setModalIsOpen(false)}
                                    className=" text-end"
                                  >
                                    X
                                  </button>
                                  <AddTweet nowData={[nowData]} />
                                </div>
                              </Modal>
                            )
                          )}
                        </div>
                      </div>

                      <div className="commentBox font-black" key={t.comment.id}>
                        {t.is_opened ? (
                          <>
                            <div
                              className="comment_inputBox "
                              id={`${t.tweet_id}`}
                            >
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
                            </div>

                            {getComments.map((t: any) => {
                              return (
                                <>
                                  <div className="comment_title">Comments</div>
                                  <div key={t.id} className="comment">
                                    {`작성자 : ${t.email} ${t.comment}`}
                                  </div>
                                </>
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
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
