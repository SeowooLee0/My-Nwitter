// import axios from "axios";
// import React, { useRef, useState } from "react";

// function Profile() {
//   //파일 미리볼 url을 저장해줄 state
//   const [fileImage, setFileImage] = useState("");

//   // 파일 저장
//   const saveFileImage = (e: any) => {
//     setFileImage(URL.createObjectURL(e.target.files[0]));
//     const uploadFile = e.target.files[0];
//     const formData = new FormData();
//     formData.append("files", uploadFile);
//   };

//   const onUpload = () => {
//     const formData = new FormData();
//     formData.append("files", fileImage);
//     // axios({
//     //   method: "post",
//     //   url: "/api/files/images",
//     //   data: formData,
//     //   headers: {
//     //     "Content-Type": "multipart/form-data",
//     //   },
//     // });
//   };
//   // 파일 삭제
//   const deleteFileImage = () => {
//     URL.revokeObjectURL(fileImage);
//     setFileImage("");
//   };

//   return (
//     <form>
//       <h1>프로필</h1>

//       <div>
//         {fileImage && (
//           <img
//             alt="sample"
//             src={fileImage}
//             style={{ margin: "auto", width: 200 }}
//           />
//         )}
//       </div>

//       <input
//         name="imgUpload"
//         type="file"
//         accept="image/*"
//         onChange={saveFileImage}
//       />

//       <button onClick={() => deleteFileImage()}>삭제</button>
//       <button onClick={onUpload}>업로드</button>
//     </form>
//   );
// }

// export default Profile;
