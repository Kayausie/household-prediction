
import './App.css';
import NavBar from './components/appbar';
import {BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom';
import Home from './pages/home';
import Predict from './pages/predict';
import About from './pages/about';
function App() {
  return (
    <div className="App">
      
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/predict' element={<Predict/>}/>
      </Routes>
    </div>
  );
}

export default App;
