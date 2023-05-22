import axios from "axios";

import { useState } from "react";

import { useMutation } from "react-query";
import customAxios from "../../api/CommonAxios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "../../scss/pages/Tweets.scss";
import TweetBox from "./TweetBox";

interface saveTweets {
  content: string;
  tag: any;
  reply_tweet_id: number;
}

const AddTweet = (prop: any) => {
  console.log(prop);
  const id = useSelector((state: RootState) => state.getData.id);

  const [tweet, setTweet] = useState("");
  const [saveTag, setSaveTag] = useState("");
  {
    const updateTweet = useMutation(
      (newData: saveTweets) =>
        customAxios.post("/saveTweets", newData).then((res: any) => {
          console.log(res);
        }),
      {
        onSuccess: () => {
          console.log("onSuccess");
          // queryClient.invalidateQueries(["select"]); // queryKey 유효성 제거
        },
        onError: (res) => {
          console.log(res);
          // queryClient.invalidateQueries(["select"]); // queryKey 유효성 제거
        },
      }
    );

    // const onClick = (event: any) => {
    //   saveTweets();
    //   event.preventDefault();
    // };

    const onChange = (event: any) => {
      const { value } = event.target;

      setTweet(value);
      if (value.length >= 101) {
        alert("글자수는 100자리로 제한되어있습니다");
        const text = value.slice(0, 100);
        setTweet(text);
      }
    };

    const onTag = (event: any) => {
      const { value } = event.target;
      setSaveTag(value.match(/(#[^\s#]+)/g));
    };

    const onLogin = () => {
      customAxios
        .get("/refreshTokenRequest")
        .then((res) => {
          // if (res.data.data === null) {
          //   alert("로그인이 만료되었습니다");
          // }
        })
        .catch((err) => {});
    };

    const [file, setFile] = useState("");

    const onFileChange = (e: any) => {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    };

    const onUpload = (e: any) => {
      e.preventDefault();
      const formData = new FormData();

      formData.append("upload_file", file);
      formData.append("id", id);
      formData.append("tweet", tweet);
      formData.append("tag", saveTag);

      console.log(formData, tweet, saveTag);
      axios
        .post("http://localhost:1234/upload/tweets", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log({ res });
        })
        .catch((res) => {
          console.log({ res });
        });
    };

    return (
      <>
        {/* <Header /> */}

        <div className=" flex">
          <div className="middleBox flex-col grow">
            <form>
              <div className="tweetTop">
                <div className="flex p-5 tweetWritingBox ">
                  <img
                    className="w-10 h-10 pt-0 m-1  rounded-full"
                    alt={
                      prop.profile === null
                        ? `/assets/회색.png`
                        : `http://localhost:1234/static/uploads/${prop.profile}`
                    }
                    src={
                      prop.profile === null
                        ? `/assets/회색.png`
                        : `http://localhost:1234/static/uploads/${prop.profile}`
                    }
                  />
                  <div className="w-full">
                    <input
                      className="input"
                      name="tweet"
                      placeholder="What's happening?"
                      value={tweet}
                      onClick={onLogin}
                      onChange={onChange}
                    />
                    <input
                      className="input"
                      name="tag"
                      placeholder="#태그"
                      onClick={onLogin}
                      onChange={onTag}
                    />
                    {prop.nowData && <TweetBox data={prop.nowData} />}
                    <input
                      name="upload_file"
                      type="file"
                      accept="*"
                      onChange={onFileChange}
                      placeholder="업로드"
                    />
                    <div className="inputBtn">
                      <button
                        onClick={
                          file
                            ? onUpload
                            : (e: any) => {
                                e.preventDefault();
                                updateTweet.mutate({
                                  content: tweet,
                                  tag: saveTag,
                                  reply_tweet_id: prop.nowData
                                    ? prop.nowData[0].tweet_id
                                    : null,
                                });
                              }
                        }
                      >
                        업로드
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default AddTweet;
