import { useState } from "react";
import { useSelector } from "react-redux";
import customAxios from "../api/CommonAxios";
import Sidebar from "../components/layouts/Sidebar";
import SidebarRight from "../components/layouts/SidebarRight";
import { RootState } from "../redux/store";
import { socket, SOCKET_EVENT } from "../socketio";

const Message = () => {
  const [message, setMessage] = useState("");
  const id = useSelector((state: RootState) => state.getData.id);
  const saveMessage = (event: any) => {
    event.preventDefault();

    customAxios
      .post("/saveComments", {
        comment: message,
        user_id: id,
      })
      .then((res) => {
        socket.emit(SOCKET_EVENT.SEND_MESSAGE, { message, id });
      });
  };

  return (
    <>
      <div className=" flex">
        <Sidebar />
        <div className="middleBox flex-col grow">
          <form className="form">
            <input
              className="input"
              type="text"
              placeholder="전송하려는 메세지를 입력하세요."
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
            />
            <button className="sendButton">전송</button>
          </form>
        </div>

        <SidebarRight />
      </div>
    </>
  );
};

export default Message;
