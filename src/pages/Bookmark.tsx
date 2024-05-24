import { useState } from "react";
import { useQuery } from "react-query";
import customAxios from "../api/CommonAxios";
import Sidebar from "../components/layouts/Sidebar";
import SidebarRight from "../components/layouts/SidebarRight";
import TweetBox from "../components/tweets/TweetBox";
import { Data } from "./Tweets";
import "../scss/pages/Bookmark.scss";

const Bookmark = () => {
  const [bookmarkData, setBookmarkData] = useState<Data[]>([]);

  const BookmarkApi = () => {
    return customAxios.get(`/getTweets/bookmark`);
  };

  const { isLoading, isError, data, error } = useQuery(
    ["setBookmarkData"],
    BookmarkApi,
    {
      refetchOnWindowFocus: true,
      // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지

      onSuccess: (res: any) => {
        setBookmarkData(res.data);
      },
      onError: (e: any) => {
        console.log(e.message);
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className=" flex  justify-center items-center w-full h-5/5 ">
          <div className="middleBox ">
            <div className="bookmarkTitle" />
            <div className="bookmarks">
              <TweetBox data={bookmarkData} />
              <div className="memo">
                <div className=" font-bold text-lg p-1 w-20 text-center text-white rounded-full bg-black m-5  ">
                  Memo
                </div>
                <textarea className="memoBox" />
                <div className=" w-full flex justify-center">
                  <button className=" font-bold text-lg p-1 w-60  text-center text-black rounded-full bg-zinc-200     mt-10">
                    Save
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

export default Bookmark;
