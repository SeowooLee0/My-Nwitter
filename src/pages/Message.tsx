import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import customAxios from "../api/CommonAxios";
import Searchbar from "../components/explore/Searchbar";
import Sidebar from "../components/layouts/Sidebar";
import SidebarRight from "../components/layouts/SidebarRight";
import { userData } from "../redux/createSlice/PeopleDataSlice";
import { RootState } from "../redux/store";
import Modal from "react-modal";
import { socket, SOCKET_EVENT } from "../socketio";
import "../scss/pages/Message.scss";

interface chatType {
  key: string;
  roomId: string;
  data: {
    send: string;
    receive: string;
    message: string;
    date: string;
  };
}

const Message = () => {
  function peopleApi() {
    return customAxios
      .get(`/getTweets/people`, {
        params: { search },
      })
      .then((e) => {
        setPeople([...e.data.data]);
      });
  }

  const [message, setMessage] = useState("");
  const [sortId, setSortId] = useState<chatType[]>([]);
  const [roomId, setroomId] = useState("");
  const [send, setSend] = useState<any>([""]);
  const [chatRoomData, setChatRoomData] = useState<any>([""]);
  const [room, setRoom] = useState(false);
  const [people, setPeople] = useState<userData[]>([]);
  const [selectUser, setSelectUser] = useState<any>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const search = useSelector(
    (state: RootState) => state.changeSearchState.search
  );
  const id = useSelector((state: RootState) => state.getData.id);

  const receiveMessage = (m: any) => {
    setSend((prev: any) => [m, ...prev]);
  };

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data: any) => {
      console.log(data);
      setSend(data);
    });
    socket.emit("REQUEST_DATA", {
      id: id,
    });
    socket.on("RESPOND_DATA", (data: any) => {
      let sortData = data.sort(function (a: any, b: any) {
        let newA = a.date
          .replace(" ", "")
          .replace(/-/gi, "")
          .replace(/:/gi, "");
        let newB = b.date
          .replace(" ", "")
          .replace(/-/gi, "")
          .replace(/:/gi, "");
        return newB - newA;
      });
      console.log(sortData);
      setChatRoomData(data);
    });
    socket.on("BEFORE_DATA", (data: any) => {
      let change = data.map((d: any) => {
        return JSON.parse(d);
      });

      setSend(change);
    });
    return () => {
      socket.off("RECEIVE_MESSAGE", (data: any) => {});
    };
  }, [socket]);

  const sendMessage = (receiveUser: number, event: any) => {
    // event.preventDefault();
    let date = Date();
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
      message,
      receiveUser,
      id,
      time,
      score,
      sortId,
    });
  };

  const peopleClick = (user_id: number, data: any) => {
    setRoom(true);
    setModalIsOpen(false);
    setSelectUser({
      user_id: user_id,
      email: data.email,
      profile: data.profile,
    });
    setSend([]);
    let users = [id, user_id];
    let sortUsers = users.sort();
    setSortId(sortUsers);
    setroomId(`${time}${sortUsers.length}${id}`);

    socket.emit(SOCKET_EVENT.START_CHAT, {
      users: sortUsers,
      roomId: `${time}${sortUsers.length}${id}`,
      date: time,
    });
  };

  const nowDate = new Date();
  const time = new Date(nowDate.getTime())
    .toISOString()
    .replace("T", " ")
    .slice(0, -5);

  const score = time.replace(" ", "").replace(/-/gi, "").replace(/:/gi, "");
  let chat = {};

  //   const year = time.getFullYear();
  // const month = time.getMonth() + 1;
  // const date = time.getDate();

  return (
    <>
      <div className=" flex ">
        <Sidebar />
        <div className="w-1/3 border-spacing-r-10  border-black">
          <div className="flex justify-between pl-3 pr-3">
            <div className=" text-lg font-semibold  p-5 ">Message</div>

            <div className="pt-5 pr-5">
              <img
                className="w-7 h-7"
                alt="#"
                src={"/assets/addMessage.png"}
                onClick={() => {
                  setModalIsOpen(true);
                }}
              />

              <Modal className=" commentModal" isOpen={modalIsOpen}>
                <div className="list">
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className=" text-end"
                  >
                    X
                  </button>
                  <Searchbar onSearchbar={peopleApi} />
                  <div className="pt-3">
                    {people.map((t: any, i: number) => {
                      return (
                        <div
                          className="peopleBox hover:bg-slate-200 "
                          key={t.user_id}
                          onClick={() => peopleClick(t.user_id, t)}
                        >
                          <div className="imgBox">
                            <img
                              className="profileImg rounded-full "
                              alt={`http://localhost:1234/static/${t.profile}`}
                              src={`http://localhost:1234/static/${t.profile}`}
                            />
                          </div>
                          <div>
                            <div className="peopleInfo ">
                              <p className="font-bold pt-1">사용자</p>
                              <p className="from-neutral-400 text-sm">
                                {t.email}
                              </p>
                              <p className="from-neutral-400 text-sm">소개글</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Modal>
            </div>
          </div>

          {chatRoomData.map((t: any, i: number) => {
            console.log(chatRoomData);

            return (
              <div className="peopleBox hover:bg-slate-200 " key={t.date}>
                <div>
                  <div className=" font-bold pl-3">{t.receive}</div>
                  <div className=" pl-3">{t.message}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-slate-900  border-spacing-3  w-7/12  justify-end flex  flex-col">
          <div className=" messageBox">
            {room ? (
              <>
                <div className="flex items-center ">
                  <div className=" ">
                    <img
                      className="w-10 h-10 rounded-full "
                      alt={`http://localhost:1234/static/${selectUser.profile}`}
                      src={`http://localhost:1234/static/${selectUser.profile}`}
                    />
                  </div>

                  <p className="from-neutral-400 text-sm  font-bold pl-4">
                    {selectUser.email}
                  </p>
                </div>

                <div className=" ">
                  {send.map((t: any, i: number) => {
                    return (
                      <div
                        className={
                          `${id}` === t.send
                            ? " flex justify-end"
                            : " flex justify-start"
                        }
                      >
                        <div
                          className={
                            `${id}` === t.send ? "myChatBox" : "chatBox"
                          }
                          key={i}
                        >
                          {t.message}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className=" flex p-2">
            <input
              className="input"
              type="text"
              placeholder="전송하려는 메세지를 입력하세요."
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
            />
            <button
              className="sendButton w-10"
              onClick={(e) => {
                let newData = {
                  send: `${id}`,
                  message: message,
                  date: time,
                };
                sendMessage(selectUser.user_id, id);

                setSend([...send, newData]);
              }}
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
