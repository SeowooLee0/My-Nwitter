import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../components/explore/Searchbar";
import Sidebar from "../components/layouts/Sidebar";
import SidebarRight from "../components/layouts/SidebarRight";
import "../scss/pages/Profile.scss";

interface UserInfo {
  email: string;
  password: string;
  id: string;
  profile: string;
}

const Profile = () => {
  const [email, setEmail] = useState("");
  const [fileImage, setFileImage] = useState("");
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:1234/getUsers",
    }).then((res) => {
      console.log(res.data.data.profile);
      setUserInfo(res.data.data.profile);
      setEmail(res.data.email);
    });
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
    axios
      .post("http://localhost:1234/upload", formData, {
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

  console.log(userInfo);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <form className="w-3/5">
          <div className=" relative h-auto">
            <img
              className=" background "
              alt={
                userInfo === null
                  ? `/assets/회색.png`
                  : `http://localhost:1234/static/${userInfo}`
              }
              src={
                userInfo === null
                  ? `/assets/회색.png`
                  : `http://localhost:1234/static/${userInfo}`
              }
            />
            <div className="relative">
              <img
                className="profile absolute"
                alt={
                  userInfo === null
                    ? `/assets/회색.png`
                    : `http://localhost:1234/static/${userInfo}`
                }
                src={
                  userInfo === null
                    ? `/assets/회색.png`
                    : `http://localhost:1234/static/${userInfo}`
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
                <img className="dateIcon " alt="#" src={"/assets/user.png"} />
              </div>
              <div className="date text-neutral-500">Joined August 2022</div>
            </div>

            <div className="flex h-auto">
              <div className="grow">
                <div className="p-5"></div>

                <div className=" font-semibold   w-full  text-center flex justify-around ">
                  <button
                    className={" button w-1/4 p-3  hover:bg-slate-200 "}
                    onClick={() => {}}
                  >
                    Tweets
                  </button>
                  <button
                    className={" button w-1/4 p-3  hover:bg-slate-200 "}
                    onClick={() => {}}
                  >
                    Tweets & replies
                  </button>
                  <button
                    className={" button w-1/4 p-3  hover:bg-slate-200 "}
                    onClick={() => {}}
                  >
                    Media
                  </button>
                  <button
                    className={" button w-1/4 p-3  hover:bg-slate-200 "}
                    onClick={() => {}}
                  >
                    Likes
                  </button>
                </div>
              </div>
            </div>
            <div>
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
            </div>
          </div>
        </form>
        <SidebarRight />
      </div>
    </>
  );
};

export default Profile;
