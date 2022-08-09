import axios from "axios";
import React, { useRef, useState } from "react";

function Profile() {
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  const onChange = (e: any) => {
    setFileImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  // 파일 저장
  // const saveFileImage = (e: any) => {
  //   setFileImage(URL.createObjectURL(e.target.files[0]));
  // };

  const onUpload = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("profile_img", fileImage);
    // const config = {
    //   headers: { "Content-Type": "multipart/form-data" },
    // };
    console.log(formData);
    axios
      .post("http://localhost:1234/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      //
      .then(
        (res) => {
          console.log({ res });
        }
        //handle success
      )
      .catch((res) => {
        //handle error

        console.log(res);
      });
  };
  // 파일 삭제
  // const deleteFileImage = () => {
  //   URL.revokeObjectURL(fileImage);
  //   setFileImage("");
  // };

  return (
    <form>
      <h1>프로필</h1>

      {/* <div>
        {fileImage && (
          <img
            alt="sample"
            src={fileImage}
            style={{ margin: "auto", width: 200 }}
          />
        )}
      </div> */}

      <input
        name="profile_img"
        type="file"
        accept="image/*"
        onChange={onChange}
        placeholder="업로드"
      />

      {/* <button onClick={() => deleteFileImage()}>삭제</button> */}
      <button type="submit" onClick={onUpload}>
        업로드
      </button>
    </form>
  );
}

export default Profile;
