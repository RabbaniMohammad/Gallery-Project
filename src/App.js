import Home from "./pages/Home";
import AddImage from "./pages/AddImage";
import {Routes, Route} from "react-router-dom"
import { ImageProvider } from "./context/ImageContext";
import Image from "./pages/Image";
import Header from "./components/Header"
import Edit from "./pages/Edit";
import History from "./pages/History";

function App() {
  return (
    <>
      <ImageProvider>
        <Routes>
          <Route path="/" exact element={<Header />} >
            <Route index element = {<Home />} />
            <Route path="addimage" element={<AddImage/>} />
            <Route path="image/:pk" element ={<Image />} />
            <Route path="edit/:pk"  element ={<Edit />} />
            <Route path="history/:pk"  element ={<History />} />
          </Route>
        </Routes>
      </ImageProvider>
    </>
  );
}

export default App;
