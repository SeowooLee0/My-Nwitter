import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import customAxios from "../../api/CommonAxios";
import "../../scss/components/CommentList.scss";

export default function CommentsList() {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    customAxios.get("/getComments/newComments").then((res) => {
      setCommentList(res.data.newComments);
    });
  }, []);

  return (
    <div>
      <span className="messageBtn relative inline-block ml-8 ">
        <svg
          onClick={() => {
            setModalIsOpen(true);
          }}
          className="w-6 h-6 text-gray-700 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-300 rounded-full">
          1
        </span>
        <Modal className=" commentModal" isOpen={modalIsOpen}>
          <div className="list">
            <button onClick={() => setModalIsOpen(false)} className=" text-end">
              X
            </button>
            {commentList.map((c: any) => {
              return (
                <div className="subList">
                  <div className="profile">
                    <img
                      className=" profileImg"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="listContent" key={c.id}>
                    <div>
                      {c.email}님이 회원님의 게시물에 댓글을 남겼습니다. "
                      {c.comment}"
                    </div>
                    <div>{c.write_date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      </span>
    </div>
  );
}
