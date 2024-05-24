// optimizedImageUtils.js

import imageCompression from "browser-image-compression";

const OptimizedImageUtils = async (
  originalImageUrl: string,
  setStateFunc: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const options = {
      maxSizeMB: 0.05, // 최대 이미지 크기를 더 낮은 값으로 설정
      maxWidthOrHeight: 300, // 이미지 최대 너비 또는 높이를 더 작은 값으로 설정
      useWebWorker: true, // 웹 워커 사용 여부 유지
    };

    // 이미지 Blob 가져오기
    const imageBlob = await fetch(originalImageUrl).then((res) => res.blob());

    // Blob을 File로 변환
    const imageFile = new File([imageBlob], "image.png", {
      type: "image/png",
    });

    // 이미지 최적화
    const compressedImage = await imageCompression(imageFile, options);

    // 최적화된 이미지 URL 설정
    const optimizedImageUrl = await imageCompression.getDataUrlFromFile(
      compressedImage
    );

    setStateFunc(optimizedImageUrl);
  } catch (error) {
    console.log(error);
  }
};

export default OptimizedImageUtils;
