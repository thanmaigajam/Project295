import { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Router } from "react-router-dom";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgk12XD0v__6r69N0b9j43mKbZbHfcnbs",
  authDomain: "know-your-business.firebaseapp.com",
  projectId: "know-your-business",
  storageBucket: "know-your-business.appspot.com",
  messagingSenderId: "173040266126",
  appId: "1:173040266126:web:31044aab279337a96dd2df",
  measurementId: "G-K1BKG9C8GR"
};

initializeApp(firebaseConfig);

class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <div className="App">
       <Main/>
    </div>
    </BrowserRouter>
  );
  }
}

export default App;
