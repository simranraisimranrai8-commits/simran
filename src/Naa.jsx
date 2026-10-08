import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaBook } from "react-icons/fa";
import { Link } from 'react-router-dom';



function Naa() {
    return (
        <>

            <Navbar style={{ background: "#134681", padding: "5px" }} >

                <Container>

                    <Navbar.Brand style={{ textAlign: "center", color: "white", }}><FaBook color="white" /><b><i>BOOKS LIBRARY</i></b>
                    </Navbar.Brand>
                    <Nav style={{ display: "flex", justifyContent: "center", gap: "20px" }}>

                        <Nav.Link as={Link} to="/Home" style={{ textDecoration: "none", color: "white" }}><b>Home</b></Nav.Link>
                        <Nav.Link as={Link} to="/About" style={{ textDecoration: "none", color: "white" }} ><b>
                            About</b></Nav.Link>
                        <Nav.Link as={Link} to="/Book" style={{ textDecoration: "none", color: "white" }}><b>Book</b></Nav.Link>

                    </Nav>

                </Container>
            </Navbar >
        </>
    )
}
export default Naa;