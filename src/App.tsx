import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import { store } from "./store/appStore";
import Feed from "./components/Feed";

function App() {

  return (
    <Provider store={ store }>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} ></Route>
            <Route path="/profile" element={<Profile />} ></Route>
            <Route path="/" element={<Feed />} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
