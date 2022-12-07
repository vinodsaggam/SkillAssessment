import './App.css';
import { Routes, Route } from "react-router-dom"
import CreateAccount from './CreateAccount';
import UpdateAccount from './UpdateAccount';
import ViewAccount from './ViewAccount';
import DeleteAccount from './DeleteAccount';
import Home from './Home';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateAccount />} />
          <Route path='/update' element={<UpdateAccount />} />
          <Route path='/view' element={<ViewAccount />} />
          <Route path='/delete' element={<DeleteAccount />} />
        </Routes>
     
    </div>
  );
}

export default App;