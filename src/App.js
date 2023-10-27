import './App.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <div id='page-body'>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/articles" element={<ArticleListPage/>}/>
            <Route path="/article/:articleID" element={<ArticlePage/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/create-account" element={<CreateAccountPage/>} />
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>        
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
