import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Tweets.css";

function Tweets() {
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:1234/getTweets",
    }).then((res) => {
      setData(res.data.data);
      setId(res.data.email);
    });
  });

  interface Tweet {
    email: string;
    number: string;
    content: string;
    write_date: string;
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  const saveTweets = async () => {
    axios
      .post("http://localhost:1234/saveTweets", {
        content: tweet,
      })
      .then((res) => {
        if (res.data === "login again") {
          alert("로그인이 만료되었습니다");
          window.location.reload();
        }
      });
  };

  const onLogout = () => {
    axios.get("http://localhost:1234/logout");
    alert("로그아웃 되었습니다");
    window.location.reload();
  };

  const [tweet, setTweet] = useState([]);

  const [login, setLogin] = useState(true);
  const [data, setData] = useState<Tweet[]>([]);

  const onClick = (event: any) => {
    saveTweets();
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

  const onLogin = () => {
    axios
      .get("http://localhost:1234/refreshTokenRequest")
      .then((res) => {
        setId(res.data.email);
        if (res.data.data === null) {
          alert("로그인이 만료되었습니다");
          window.location.reload();
        }
      })
      .catch((err) => {});
  };

  const [id, setId] = useState("");
  const [check, setCheck] = useState(false);
  const checkData = data.filter((data) => data.email === id);

  const onCheck = (e: any) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setCheck(true);
    } else if (e.target.checked === false) {
      setCheck(false);
    }
  };

  return (
    <>
      <div className="logout">
        <button onClick={onLogout}>로그아웃</button>
      </div>
      <form className="form">
        <input
          className="text"
          placeholder="트윗 입력란"
          value={tweet}
          onClick={onLogin}
          onChange={onChange}
          disabled={login ? false : true}
        />
        <button className="inputBtn" onClick={onClick}>
          업로드
        </button>
        <input type="checkbox" value={id} onChange={onCheck} />
        <div className="tweetBox">
          {check
            ? checkData.map((t) => {
                return (
                  <div className="tweet" key={t.number}>
                    <p>작성자 : {t.email}</p>
                    <p>{t.content}</p>
                  </div>
                );
              })
            : data.map((t) => {
                return (
                  <div className="tweet" key={t.number}>
                    <p>작성자 : {t.email}</p>
                    <p>{t.content}</p>
                  </div>
                );
              })}
        </div>
      </form>
    </>
  );
}

export default Tweets;
