import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import customAxios from "../api/CommonAxios";
// import "./Tweets.scss";

const Tag = () => {
  interface Tweet {
    email: string;
    number: string;
    content: string;
    tag: Array<string>;
    write_date: string;
  }

  const { tagId } = useParams();

  const [tagData, setTagData] = useState<Tweet[]>([]);
  useEffect(() => {
    customAxios
      .get(`tag/${tagId}`, {
        params: { tagId },
      })
      .then((res) => {
        setTagData(res.data.data);
      })
      .catch((error) => console.log("Network Error : ", error));
  });

  return (
    <div>
      {tagData.map((t) => {
        return (
          <>
            <div className="tweet" key={t.number}>
              <p>작성자 : {t.email}</p>
              <p>{t.content}</p>
              <p>{t.tag}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Tag;
