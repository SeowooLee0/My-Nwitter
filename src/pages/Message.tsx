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

interface ChatMessage {
  send: number;
  receive: number;
  message: string;
  date: string;
  score?: number;
  roomId: string;
}

interface ChatRooms {
  [roomId: string]: ChatMessage[];
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
  const [sortedChatRooms, setSortedChatRooms] = useState<ChatRooms>({});

  const [chatRoomData, setChatRoomData] = useState<ChatRooms>({});
  const [selectedMessages, setSelectedMessages] = useState<ChatMessage[]>([]); // 선택된 채팅방의 메시지 상태
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  const [people, setPeople] = useState<userData[]>([]);
  const [selectUser, setSelectUser] = useState<any>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const search = useSelector(
    (state: RootState) => state.changeSearchState.search
  );
  const id = useSelector((state: RootState) => state.getData.id);

  useEffect(() => {
    const onReceiveMessage = (data: ChatMessage[]) => {
      alert("새로운 메세지 도착");
    };

    socket.on("RECEIVE_MESSAGE", onReceiveMessage);

    socket.emit("REQUEST_DATA", {
      id: id,
    });

    socket.on("RESPOND_DATA", (data: ChatMessage[] | ChatMessage) => {
      let updatedChatRooms = { ...sortedChatRooms };

      // 데이터가 배열인지 단일 객체인지 확인
      if (Array.isArray(data)) {
        // 배열일 경우: 기존 로직 사용
        data.forEach((message) => {
          if (!updatedChatRooms[message.roomId]) {
            updatedChatRooms[message.roomId] = [];
          }
          updatedChatRooms[message.roomId].push(message);
        });
        Object.keys(updatedChatRooms).forEach((roomId) => {
          updatedChatRooms[roomId].sort((a, b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
          });
        });

        setChatRoomData(updatedChatRooms);
      } else {
        const newData = data;
        const stringId = id.toString();

        if (newData.send !== stringId) {
          setChatRoomData((prevChatRooms) => {
            // 새 메시지의 roomId를 기반으로 적절한 채팅방 찾기
            const updatedRoom = prevChatRooms[newData.roomId]
              ? [...prevChatRooms[newData.roomId]]
              : [];
            updatedRoom.push(newData);

            // 메시지를 날짜 순으로 정렬
            updatedRoom.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            // 선택된 채팅방의 메시지 업데이트 (만약 선택된 채팅방이 현재 메시지의 채팅방과 동일한 경우)

            console.log("작동중");
            setSelectedMessages(updatedRoom);

            setSelectedRoomId(newData.roomId);

            // 새로운 상태 반환
            return { ...prevChatRooms, [newData.roomId]: updatedRoom };
          });
        }
      }
    });

    socket.on("BEFORE_DATA", (data: string) => {
      setSelectedMessages(chatRoomData[data]);
      setSelectedRoomId(data);
    });

    return () => {
      socket.off("RECEIVE_MESSAGE", onReceiveMessage);
    };
  }, [socket]);

  // const sendMessage = (receiveUser: number, event: any) => {
  //   // event.preventDefault();
  //   socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
  //     message,
  //     receiveUser,
  //     id,
  //     time,
  //     score,
  //     roomId,
  //   });
  // };

  const peopleClick = (user_id: number, data: any) => {
    setModalIsOpen(false);

    const roomId = `chat-${[id, user_id].sort().join("-")}`; // 채팅방 ID 생성
    setSelectedRoomId(roomId); // 선택된 채팅방 ID 업데이트
    setSelectUser(user_id);
    socket.emit("START_CHAT", {
      users: [id, user_id],
      roomId: roomId,
      date: new Date().toISOString(),
    });
  };

  const nowDate = new Date();
  const time = new Date(nowDate.getTime())
    .toISOString()
    .replace("T", " ")
    .slice(0, -5);

  const score = parseInt(
    time.replace(" ", "").replace(/-/g, "").replace(/:/g, ""),
    10
  );

  const handleSendMessage = (receiveUser: number) => {
    if (!selectedRoomId || message.trim() === "") return;

    const newMessage = {
      send: id,
      receive: receiveUser,
      message: message,
      date: time,
      score: score,
      roomId: selectedRoomId,
    };

    socket.emit("SEND_MESSAGE", newMessage);
    setMessage("");
    // 선택된 채팅방의 메시지 목록 업데이트
    const updatedMessages: ChatMessage[] = [...selectedMessages, newMessage];
    setSelectedMessages(updatedMessages);

    // 전역 채팅방 데이터 업데이트
    const updatedChatRoomData: { [key: string]: ChatMessage[] } = {
      ...chatRoomData,
      [selectedRoomId]: updatedMessages,
    };
    setChatRoomData(updatedChatRoomData);
  };

  const handleChatRoomClick = (roomId: string) => {
    console.log(roomId);
    setSelectedMessages(chatRoomData[roomId]);
    setSelectedRoomId(roomId);
    const parts = roomId.split("-");

    // 'chat' 문자열과 현재 사용자 ID를 제외하고 나머지 부분을 추출
    const otherUserId = parts.find(
      (part) => part !== "chat" && part !== id.toString()
    );
    if (otherUserId == undefined) {
      setSelectUser(id);
    } else {
      console.log(otherUserId);
      setSelectUser(parseInt(otherUserId));
    }
  };

  return (
    <>
      <div className=" flex ">
        <Sidebar />
        <div className=" flex  justify-center items-center w-full h-5/5 ">
          <div className="middleBox ">
            <div className="messageTitle" />
            <div className="message ">
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
                                    alt={
                                      t.profile === null
                                        ? `/assets/사람.png`
                                        : `${process.env.REACT_APP_BACKEND_URL}static/uploads/${t.profile}`
                                    }
                                    src={
                                      t.profile === null
                                        ? `/assets/사람.png`
                                        : `${process.env.REACT_APP_BACKEND_URL}static/uploads/${t.profile}`
                                    }
                                  />
                                </div>
                                <div>
                                  <div className="peopleInfo ">
                                    <p className="font-bold pt-1">사용자</p>
                                    <p className="from-neutral-400 text-sm">
                                      {t.email}
                                    </p>
                                    <p className="from-neutral-400 text-sm">
                                      소개글
                                    </p>
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
                <div>
                  {Object.keys(chatRoomData).map((roomKey) => {
                    const lastMessage =
                      chatRoomData[roomKey][chatRoomData[roomKey].length - 1];

                    return (
                      <div
                        className="peopleBox hover:bg-slate-200"
                        key={roomKey}
                        onClick={() => handleChatRoomClick(roomKey)}
                      >
                        <div>
                          <div className="font-bold pl-3">{roomKey}</div>
                          <div className="pl-3">{lastMessage.message}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="border-slate-900  border-spacing-3  w-2/3 justify-end flex  flex-col">
                <div className=" messageBox">
                  <div>{selectedRoomId}</div>
                  {selectedMessages.map((message, i) => (
                    <div
                      className={
                        id == message.send
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                      key={i}
                    >
                      <div
                        className={id == message.send ? "myChatBox" : "chatBox"}
                        key={i}
                      >
                        {message.message}
                      </div>
                    </div>
                  ))}
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
                    onClick={() => {
                      handleSendMessage(selectUser);
                    }}
                  >
                    전송
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
