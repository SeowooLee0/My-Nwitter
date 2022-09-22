import { useEffect, useState } from "react";
import { likeButton } from "./TweetBox";

const HeartButton = ({ like, onHeartButton, id }: any) => {
  useEffect(() => {
    console.log(like.likes);
  }, []);

  // let data = like.filter((like.tweet_id = id));
  // const [check, setCheck] = useState();

  // like.map(
  //   (Like: any) => {
  //     console.log(Like.tweet_id, Number(id));
  //     if (Like.tweet_id === Number(id)) {
  //       setCheck(Like.like);
  //     }
  //   }
  //   // if (Like.tweet_id !== e.target.id) {
  //   //   console.log(Like.like);
  //   // }
  // );

  return (
    <img
      className="w-5 h-5 "
      alt="#"
      src={like ? "/assets/heart.png" : "/assets/EmptyHeart.png"}
      onClick={onHeartButton}
      // onChange={onHeartButton}
      id={id}
    />
  );
};

export default HeartButton;
