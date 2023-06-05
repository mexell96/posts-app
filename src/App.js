import { Routes, Route } from "react-router-dom";

import Posts from "./pages/Posts";
import About from "./pages/About";
import User from "./pages/User";

const App = () => (
  <Routes>
    <Route path="/" element={<Posts />} />
    <Route path="/:page" element={<Posts />} />
    <Route path="/about" element={<About />} />
    <Route path="/users/:id" element={<User />} />
  </Routes>
);

export default App;
