const HeartButton = ({ like, onHeartButton }: any) => {
  return (
    <img
      className="w-5 h-5 "
      alt="#"
      src={like ? "/assets/heart.png" : "/assets/EmptyHeart.png"}
      onClick={onHeartButton}
    />
  );
};

export default HeartButton;
