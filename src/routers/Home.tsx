import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { text } from "stream/consumers";
import { getValue, isDisabled } from "@testing-library/user-event/dist/utils";

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
    console.log(event.target.value);
  };
  function newData() {
    var newArray = [...data];
    newArray.push(tweet);
    setData(newArray);
  }

  const onChange = (event: any) => {
    const { value } = event.target;
    setTweet(value);
    console.log(value.length);
    if (value.length >= 6) {
      console.log(value.length);
      alert("글자수는 5자리로 제한되어있습니다");

      const text = value.substr(0, 5);
      setTweet(text);
    }
  };
  return (
    <>
      <button onClick={onLogout}>Logout</button>
      <div>Home</div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="how are you today"
          value={tweet}
          onChange={onChange}
          maxLength={5}
        />
        <button onClick={onClick}>Send</button>
        {data.map((t, i) => {
          return <div key={i}>{t}</div>;
        })}
      </form>
    </>
  );
}

export default Home;
