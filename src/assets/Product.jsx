import { Input } from 'postcss';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import University from '../University';
import Facilities from '../Facilities';
import Login from "../Login";


function Product() {
    return (
        <Container>
            <Navbar style={{ display: "flex", color: "rgba(230, 15, 101, 0.77)" }}>
                <Navbar.Brand style={{ display: "flex", alignItems: "Center", justifyContent: "center" }}>
                    <FaGraduationCap color="rgba(230, 15, 101, 0.77)" size={30} /><b>University Grants Commission</b>



                </Navbar.Brand>
            </Navbar>
            <Nav style={{ display: "flex", gap: "30px", justifyContent: "center", background: "rgba(230, 15, 101, 0.77)", }}>

                <Nav.Link as={Link} to="/University" style={{ textDecoration: "none", color: "rgba(243, 237, 239, 0.77)" }}><b>University</b></Nav.Link>

                <Nav.Link as={Link} to="/courses" style={{ textDecoration: "none", color: "rgba(243, 237, 239, 0.77)" }}><b>Courses</b></Nav.Link>
                <Nav.Link as={Link} to="/Facilities" style={{ textDecoration: "none", color: "rgba(243, 237, 239, 0.77)" }}><b>Facilities</b></Nav.Link>
                <Nav.Link as={Link} to="/Login" style={{ textDecoration: "none", color: "rgba(243, 237, 239, 0.77)" }}><b>Login</b></Nav.Link>
            </Nav>
            <span style={{ textAlign: "center", color: "rgba(230, 15, 101, 0.77)", textDecoration: "underline", textUnderlineOffset: "8px", textDecorationThickness: "2px" }}>University Of College  | Best Education Provide  | Excellence in Education  | Quality Education for a Bright Future  |  Learn Today, Lead Tomorrow | University & College | Login</span>

        </Container >
    )
}
export default Product;
