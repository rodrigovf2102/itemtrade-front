import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Signin from "./pages/login";
import Signup from "./pages/logup";
import Main from "./pages/main";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Main/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
