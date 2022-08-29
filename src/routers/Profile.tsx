import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface UserInfo {
  email: string;
  password: string;
  id: string;
  profile: string;
}

function Profile() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    // axios({
    //   method: "get",
    //   url: "http://localhost:1234/getUsers",
    // }).then((res) => {
    //   setUserInfo(res.data.data.profile);
    //   setEmail(res.data.email);
    // });
  });
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  const [userInfo, setUserInfo] = useState("");

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
  console.log(`http://localhost:1234/static/${userInfo}`);

  return (
    <div>
      <button>
        <Link to={"/"}>홈</Link>
      </button>
      <form>
        <div>
          <h1>프로필</h1>
          {userInfo}
          <div>
            <img
              alt={`http://localhost:1234/static/${userInfo}`}
              src={`http://localhost:1234/static/${userInfo}`}
            />
          </div>
          <h3>사용자 아이디 {email}</h3>
          <h2>이미지 업로드</h2>
        </div>
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
      </form>
    </div>
  );
}

export default Profile;
