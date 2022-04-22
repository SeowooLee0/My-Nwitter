import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
//Firebase 앱은 일반적인 구성을 저장하고 Firebase 서비스 간에 인증을 공유하는 컨테이너와 유사한 객체입니다.
//코드에서 Firebase 앱 객체를 초기화한 후 Firebase 서비스를 추가하고 사용할 수 있습니다.
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(firebase);
