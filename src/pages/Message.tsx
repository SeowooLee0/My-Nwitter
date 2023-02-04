import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import customAxios from "../api/CommonAxios";
import Searchbar from "../components/explore/Searchbar";
import Sidebar from "../components/layouts/Sidebar";
import SidebarRight from "../components/layouts/SidebarRight";
import { userData } from "../redux/createSlice/PeopleDataSlice";
import { RootState } from "../redux/store";
import { socket, SOCKET_EVENT } from "../socketio";
import "../scss/pages/Message.scss";

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
  const [send, setSend] = useState<any>([""]);
  const [room, setRoom] = useState(false);
  const [people, setPeople] = useState<userData[]>([]);
  const [user, setUser] = useState<any>();
  const search = useSelector(
    (state: RootState) => state.changeSearchState.search
  );
  const id = useSelector((state: RootState) => state.getData.id);

  const receiveMessage = (m: any) => {
    setSend((prev: any) => [m, ...prev]);
  };

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data: any) => {
      receiveMessage(data);
      console.log("성공");
    });
    return () => {
      socket.off("RECEIVE_MESSAGE", (data: any) => {});
    };
  }, [socket]);

  const sendMessage = (receiveUser: number, event: any) => {
    // event.preventDefault();
    let date = Date();
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, { message, receiveUser, id, date });
  };

  // let { data } = useQuery(["selectPeopleData"], peopleApi, {
  //   refetchOnWindowFocus: true,
  //   // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
  //   retry: 0, // 실패시 재호출 몇번 할지

  //   onSuccess: (res: any) => {
  //     console.log(res);
  //   },
  //   onError: (e: any) => {
  //     // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
  //     // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
  //     console.log(e.message);
  //   },
  // });
  // console.log(undefined);
  // // dispatch(changSearchState(prop));
  // event.preventDefault();

  return (
    <>
      <div className=" flex">
        <Sidebar />
        <div className="w-1/3 border-spacing-r-10  border-black">
          <div className=" text-lg font-semibold  p-5 ">Message</div>
          <Searchbar onSearchbar={peopleApi} />
          <div className="mt-5">
            {people.map((t: any, i: number) => {
              return (
                <div
                  className="peopleBox hover:bg-slate-200 "
                  key={t.user_id}
                  onClick={(e) => {
                    console.log("클릭");
                    setRoom(true);
                    setUser({
                      user_id: t.user_id,
                      email: t.email,
                      profile: t.profile,
                    });
                    setSend([]);
                  }}
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
                      <p className="from-neutral-400 text-sm">{t.email}</p>
                      <p className="from-neutral-400 text-sm">소개글</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-slate-900  border-spacing-3  w-7/12  justify-end flex  flex-col">
          <div className=" messageBox">
            {room ? (
              <>
                <div className="flex items-center ">
                  <div className=" ">
                    <img
                      className="w-10 h-10 rounded-full "
                      alt={`http://localhost:1234/static/${user.profile}`}
                      src={`http://localhost:1234/static/${user.profile}`}
                    />
                  </div>

                  <p className="from-neutral-400 text-sm  font-bold pl-4">
                    {user.email}
                  </p>
                </div>

                <div className=" ">
                  {send.map((t: any, i: number) => {
                    console.log(user.user_id, id);
                    return (
                      <div
                        className={
                          user.user_id === t.id
                            ? " flex justify-end"
                            : " flex justify-start"
                        }
                      >
                        <div
                          className={
                            user.user_id === t.id ? "myChatBox" : "chatBox"
                          }
                          key={i}
                        >
                          {t.id}
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
                console.log(e);
                let newData = {
                  id: id,
                  message: message,
                  date: Date(),
                };
                sendMessage(user.user_id, id);
                if (user.user_id !== id) {
                  setSend([newData, ...send]);
                }
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
