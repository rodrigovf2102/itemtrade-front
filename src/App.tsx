import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import { UserProvider } from "./contexts/UserContext";
import Signin from "./pages/login";
import Signup from "./pages/logup";
import Main from "./pages/main";
import GamePage from "./pages/games";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/games" element={<GamePage/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
