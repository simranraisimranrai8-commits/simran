import Home from "./Home";
import About from "./About";
import Book from "./Book";
import Naa from "./Naa";
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Product from "./assets/Product";
import University from "./University";
import Courses from "./Courses";
import Facilities from "./Facilities";
import Login from "./Login";
import Footer from "./Footer";




function App() {
  return (
    <div>





      <BrowserRouter>
        <Naa />

        <Routes>
          {/* <Route path="/University" element={<University />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Facilities" element={<Facilities />} />
          <Route path="/Login" element={<Login />} />*/}
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Book" element={<Book />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;