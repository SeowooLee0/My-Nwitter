import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import customAxios from "../api/CommonAxios";
import Searchbar from "../components/explore/Searchbar";
import Sidebar from "../components/layouts/Sidebar";
import SidebarRight from "../components/layouts/SidebarRight";
import TweetBox from "../components/tweets/TweetBox";
import "../scss/pages/Profile.scss";
import { Data } from "./Tweets";

interface UserInfo {
  email: string;
  password: string;
  id: string;
  profile: string;
}

const Profile = () => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("tweets");
  const [fileImage, setFileImage] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [getData, setGetData] = useState<Data[]>([]);
  const [editOpen, setEditOpen] = useState(false);

  const queryClient = useQueryClient();
  function profileApi() {
    return customAxios.get("/getUsers", { params: { type: type } });
  }

  const { data } = useQuery(["profileData", type], profileApi, {
    refetchOnWindowFocus: false,
    onSuccess: (res: any) => {
      setGetData(res.data.tweetData);
      setUserInfo(res.data.data.profile);
      setEmail(res.data.email);
    },
  });

  //파일 미리볼 url을 저장해줄 state
  const onChange = (e: any) => {
    setFileImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  //파일 저장
  // const saveFileImage = (e: any) => {
  //   setFileImage(URL.createObjectURL(e.target.files[0]));
  // };

  const onUpload = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("profile_img", fileImage);
    formData.append("id", email);
    console.log(formData);
    customAxios
      .post("/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log({ res });
      })
      .catch((res) => {
        console.log(res);
      });
  };
  //파일 삭제
  // const deleteFileImage = () => {
  //   URL.revokeObjectURL(fileImage);
  //   setFileImage("");
  // };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <form className="flex justify-center items-center w-full h-5/5">
          <div className="middleBox ">
            <div className="profileTitle" />
            <div className="tweets">
              <div className=" relative ">
                <img
                  className=" background "
                  alt={
                    userInfo === null
                      ? `/assets/회색.png`
                      : `http://localhost:1234/static/uploads/${userInfo}`
                  }
                  src={
                    userInfo === null
                      ? `/assets/회색.png`
                      : `http://localhost:1234/static/uploads/${userInfo}`
                  }
                />
                <div className="relative">
                  <img
                    className="profile absolute"
                    alt={
                      userInfo === null
                        ? `/assets/회색.png`
                        : `http://localhost:1234/static/uploads/${userInfo}`
                    }
                    src={
                      userInfo === null
                        ? `/assets/회색.png`
                        : `http://localhost:1234/static/uploads/${userInfo}`
                    }
                  />
                </div>
              </div>
              <div className=" pt-4">
                <div className="edit">
                  <button className="editBtn">Edit profile</button>
                </div>
                <div className="pl-5 pt-10 text-xl   font-bold   ">사용자</div>
                <div className="pl-5 text-neutral-500  ">{email}</div>

                <div className="dateBox">
                  <div className="pt-0.5 pr-1">
                    <img
                      className="dateIcon "
                      alt="#"
                      src={"/assets/user.png"}
                    />
                  </div>
                  <div className="date text-neutral-500">
                    Joined August 2022
                  </div>
                </div>

                <div className="flex h-auto">
                  <div className="grow">
                    <div className="p-5"></div>

                    <div className=" font-semibold   w-full  text-center flex justify-around ">
                      <button
                        className={" button w-1/3 p-3  hover:bg-slate-200 "}
                        onClick={(e) => {
                          e.preventDefault();
                          setType("tweets");
                          queryClient.invalidateQueries(["profileData"]);
                        }}
                      >
                        Tweets
                      </button>
                      <button
                        className={" button w-1/3 p-3  hover:bg-slate-200 "}
                        onClick={(e) => {
                          e.preventDefault();
                          setType("retweets");
                          queryClient.invalidateQueries(["profileData"]);
                        }}
                      >
                        Tweets & replies
                      </button>

                      <button
                        className={" button w-1/3 p-3  hover:bg-slate-200 "}
                        onClick={(e) => {
                          e.preventDefault();
                          setType("likes");
                          queryClient.invalidateQueries(["profileData"]);
                        }}
                      >
                        Likes
                      </button>
                    </div>
                  </div>
                </div>
                <TweetBox data={getData} />
                {/* <div>
              <input
                name="profile_img"
                type="file"
                accept="image/*, jpeg"
                onChange={onChange}
                placeholder="업로드"
              />
              <button type="submit" onClick={onUpload}>
                업로드
              </button>
            </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
