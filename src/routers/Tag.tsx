import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Tweets from "./Tweets";

const Tag = ({ match }: any) => {
  interface Tweet {
    email: string;
    number: string;
    content: string;
    tag: Array<string>;
    write_date: string;
  }
  const location = useLocation();
  const [tagData, setTagData] = useState<Tweet[]>([]);
  useEffect(() => {
    let tag = location.state;

    axios
      .get(`http://localhost:1234/tag/${tag}`, {
        params: { tag },
      })
      .then((res) => {
        setTagData(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => console.log("Network Error : ", error));
  });

  return (
    <div>
      {tagData.map((t, i) => {
        return (
          <>
            <div className="tweet" key={t.number}>
              <p>작성자 : {t.email}</p>
              <p>{t.content}</p>
              {t.tag}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Tag;
