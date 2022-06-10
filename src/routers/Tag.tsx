import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import "./Tweets.css";

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
    axios
      .get(`http://localhost:1234/tag/${tagId}`, {
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
