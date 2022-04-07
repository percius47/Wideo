import "./App.css";
import Navbar from "./Components/Navbar";
import {Toaster} from "react-hot-toast"
import Footer from "./Components/Footer"
import PageRoutes from "./routes/PageRoutes";
function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar/>
   
      <PageRoutes/>
      {/* <Footer/> */}
 
    </div>
  );
}

export default App;
