
import React from "react";
import Navbar from "./components/navbar/navbar";
import Banner from "./components/Banner/banner";
import Rowpost from "./components/rowpost/rowpost";
import {action,orginals} from './urls'

import "./App.css"
function App() {
  return (
    <div className="App">
   <Navbar/>
   <Banner/>
 
   <Rowpost url={orginals} title="NetFLix Originals "/> 
   <Rowpost  url={action} title="Action" isSmall/>      
    </div>
  );
}

export default App;
