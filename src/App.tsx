import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Signin from "./pages/login";
import Signup from "./pages/logup";
import Main from "./pages/main";
import GamePage from "./pages/games";
import ServerPage from "./pages/server";
import ItemPage from "./pages/item";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/games" element={<GamePage/>}/>
          <Route path="/servers/:gameId" element={<ServerPage/>}/>
          <Route path="/items/:serverId" element={<ItemPage/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
