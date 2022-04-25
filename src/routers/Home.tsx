import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import "./Home.css";
import // addDoc,
// collection,
// doc,
// getDoc,
// getDocs,
// setDoc,
"firebase/firestore";
// import { db } from "../firebase";

function Home() {
  const onLogout = () => {
    signOut(auth);
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
  };
  const [tweet, setTweet] = useState("");

  const [data, setData] = useState(["트윗을 입력하세요"]);

  const onClick = (event: any) => {
    const { value } = event.target;
    newData();
    console.log(value);
  };
  function newData() {
    const newArray = [...data];
    newArray.push(tweet);
    setData(newArray);
  }

  const onChange = (event: any) => {
    const { value } = event.target;
    console.log(value.length);
    setTweet(value);
    if (value.length >= 6) {
      console.log(value.length);
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
          {data.map((t, i) => {
            return (
              <div className="tweet" key={i}>
                {t}
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
}

export default Home;
