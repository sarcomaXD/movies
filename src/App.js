import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Detail from "./views/Detail";
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/movie/:id" element={<Detail />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
