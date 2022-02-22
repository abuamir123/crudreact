import Edit from "./components/patients/Edit";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Home from "./components/pages/Home"
import View from "./components/patients/View";

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/view/:id" element={<View/>} />
          <Route path="/edit" element={<Edit/>} />
      {/* <Route exact path="/" component={< Home />}></Route> */}
      </Routes>
      </BrowserRouter>
      
     
    </div>
  );
}

export default App;
