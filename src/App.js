
import './App.css';
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard/Dashboard';
import PostUser from './components/PostUser/PostUser';
import UpdateUser from './components/UpdateUser/UpdateUser';
import NoMatch from './components/noMatch/noMatch';
import Navbar from './components/Header/Header'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/user' element={<PostUser/>}></Route>
        <Route path='/user/:id' element={<UpdateUser/>}></Route>
        <Route path='*' element={<NoMatch/>}></Route>
      </Routes>
    
    </div>
  );
}

export default App;