import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Home.css";

function Home() {
  const onSubmit = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    getTweets();
  });

  interface Tweet {
    id: number;
    number: string;
    content: string;
    write_date: string;
  }

  const getTweets = async () => {
    axios({
      method: "get",
      url: "http://localhost:1234/getTweets",
    }).then((res) => {
      setData(res.data);
    });
  };

  const [tweet, setTweet] = useState("");

  const [data, setData] = useState<Tweet[]>([]);

  const onClick = (event: any) => {
    // const newArray = [...data];
    // newArray.push(tweet);
    // setData(newArray);
  };

  const onChange = (event: any) => {
    const { value } = event.target;
    setTweet(value);
    if (value.length >= 6) {
      alert("글자수는 5자리로 제한되어있습니다");
      const text = value.slice(0, 5);
      setTweet(text);
    }
  };

  // <button onClick={onLogout}>Logout</button>
  //     <div>Home</div>

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <input
          className="text"
          placeholder="트윗 입력란"
          value={tweet}
          onChange={onChange}
          // maxLength={5}
        />
        <button className="inputBtn" onClick={onClick}>
          업로드
        </button>
        <div className="tweetBox">
          {data.map((t) => {
            return (
              <div className="tweet" key={t.id}>
                {t.content}
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
}

export default Home;
