import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/login";
import Signup from "./pages/logup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
