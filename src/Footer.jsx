import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaGraduationCap, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer
            style={{
                display: "flex",
                marginTop: "60px",
                background: "  rgba(230, 15, 101, 0.77)",
                color: "white",
                padding: "30px"
            }}
        >
            <Row style={{ display: "flex", gap: "200px", textAlign: "center" }}>
                <Col>
                    {/* University */}
                    <h2>

                        <FaGraduationCap /> University
                    </h2>

                    <h3>
                        Best Education Provide
                    </h3>

                    <p>
                        We provide quality education,<br></br>
                        modern facilities and better<br></br>
                        career opportunities.
                    </p>
                </Col>




                <Col>
                    <h2>QUICK LINKS</h2>

                    <p>University</p>

                    <p>Courses</p>
                    <p>Facilities</p>
                    <p>Login</p>
                </Col>

                {/* Courses */}


                {/* Contact */}
                <Col>
                    <h5>CONTACT US</h5>

                    <p> University Campus</p>
                    <p> +91 98765 43210</p>
                    <p>✉ university@gmail.com</p>

                    <div style={{ fontSize: "25px" }}>
                        <FaFacebook style={{ marginRight: "15px" }} />
                        <FaInstagram style={{ marginRight: "15px" }} />
                        <FaTwitter />
                    </div>


                </Col>


            </Row>

            {/*  <div style={{ textAlign: "center" }}>
                <p >  2026 University College</p>
            </div>*/}
        </footer >

    )
}
export default Footer;