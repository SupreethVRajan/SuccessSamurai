import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import LandingPage from "./Pages/LandingPage";
import Article from "./Pages/Articles";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import ArticlesPlan from "./Pages/ArticlesPlan";
import ArticleView from "./Pages/ArticleView";

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/articles" element={<ProtectedRoute/>}>
          <Route path="/articles" element={<Article/>}/>
        </Route>
        <Route path="/articleplans" element={<ProtectedRoute/>}>
          <Route path="/articleplans" element={<ArticlesPlan/>}/>
        </Route>
        <Route path="/articleview/:articleid" element={<ProtectedRoute/>}>
          <Route path="/articleview/:articleid" element={<ArticleView/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
