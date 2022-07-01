import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Main from "./component/Main";
import Nav from "./component/Nav";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";
import PostWrite from "./pages/PostWrite";
import PostEdit from "./pages/PostEdit";
import dummy from "./db/data.json";

import Register from "./component/Register";
import { Component } from "react";
import Mypage from "./component/Mypage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      accessToken: "",
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.problemaccessToken = this.problemaccessToken.bind(this);
  }
  loginHandler(data) {
    this.setState({ isLogin: true });
    this.problemaccessToken(data.data.accessToken);
  }
  problemaccessToken(token) {
    this.setState({ accessToken: token });
  }

  render() {
    const { isLogin } = this.state;
    return (
      <Router>
        <Nav />
        {/* 1. Switch -> Routes */}
        <Routes>
          {/* 2. component -> element, element형태로 넘겨야함 <Home /> */}
          <Route exact path="/" element={<Main />} />
          <Route path="/postlist" element={<PostList />} />
          <Route path="/postlist/:id" element={<PostView />} />
          <Route path="/postwrite" element={<PostWrite />} />
          <Route path="/postedit" element={<PostEdit />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Register />} />
          {/* <Route path="/mypage" element={<Mypage />} /> */}
          {/* { <div className='App'>
      {isLogin ? (
        <Mypage
        accessToken={this.state.accessToken}
        problemaccessToken={this.problemaccessToken}
        />
      ) : (
        <Login loginHandler={this.loginHandler} />
      
      )}
        </div>   } */}
        </Routes>
      </Router>
    );
  }
}
export default App;
