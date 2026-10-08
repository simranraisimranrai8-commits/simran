
import { FaUniversity, FaBook, FaUserGraduate, FaGraduationCap, FaBuilding, FaCertificate } from 'react-icons/fa';
import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function University() {


    return (
        <div style={{ margin: "10px" }}>
            <div style={{ display: "flex", width: "1200px", height: "400px", background: "linear-gradient(133deg, rgba(252, 27, 128, 0.93), #ed0f0f", border: "10px" }}>
                <p style={{ textAlign: "center", marginLeft: "20px", color: "black", fontSize: "50px" }}><b><i>Welcome to University<br></br>College</i></b> </p>
                <p style={{ marginLeft: "180px", textAlign: "center" }} > <FaUniversity size={300} Color="black" /></p>

            </div>
            <div style={{ display: "flex", gap: "50px" }}>
                <Card
                    style={{
                        width: "200px",
                        marginTop: "30px",
                        padding: "20px",
                        textAlign: "center", background: "white"
                    }}
                >
                    <FaBook size={50} color="black" />

                    <h4>Courses</h4>

                    <p>
                        Explore University Courses
                    </p>
                </Card>
                <Card
                    style={{
                        width: "200px",
                        marginTop: "30px",
                        padding: "20px",
                        textAlign: "center", background: "white"
                    }}
                >
                    <FaUserGraduate size={50} color="black" />
                    <h3>Students</h3>
                    <p>University Students</p>
                </Card>
                <Card
                    style={{
                        width: "200px",
                        marginTop: "30px",
                        padding: "20px",
                        textAlign: "center", background: "white"
                    }}>
                    <FaGraduationCap size={50} color="black" />

                    <h3>Education</h3>

                    <p>University Courses</p>

                </Card>
                <Card
                    style={{
                        width: "200px",
                        marginTop: "30px",
                        padding: "20px",
                        textAlign: "center", background: "white"
                    }}
                >
                    <FaBuilding size={50} color="black" />
                    <h3>Facilities</h3>
                    <p>University Facilities</p>
                </Card>
                <Card
                    style={{
                        width: "200px",
                        marginTop: "30px",
                        padding: "20px",
                        textAlign: "center", background: "white"
                    }}
                >
                    <FaCertificate size={50} color="black" />
                    <h3>Certificates</h3>
                    <p>University Certificates</p>
                </Card>
            </div>












        </div >
    )
}
export default University;