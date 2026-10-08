import { Row, Col, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import useimg from "./image/Al.jpeg";
import userimg from "./image/Are.jpeg";
import useing from "./image/network.jpeg";
import Ai from "./image/Are.jpeg";
import fun from "./image/funda.jpeg";
import soft from "./image/sofr.jpeg";
import pro from "./image/progrc.jpeg";
import ba from "./image/ba.jpeg";
import baa from "./image/baa.jpeg";

import { FaBookReader, FaStar } from "react-icons/fa";


function Book() {
    return (
        <div style={{
            display: "flex", margin: "20px"
        }}>

            <div style={{
                textAlign: "center", background:
                    "linear-gradient(133deg, #a0c9f1, #f1c0df)",
                color: "#06356c", width: "1300px", height: "100px", fontSize: "30px"
            }}>

                <p>  <i>OPEN LIBRARY </i><b><strong>NATIONAL BOOKS LIBRARY</strong></b><i> BOOK COLLECTION</i><br></br><h6>BEST GUIDELINES BOOK</h6></p>
                <Row>
                    <Col>
                        <h2 style={{ textAlign: "left", color: "#09305e" }}><u>Bca all book</u></h2>
                    </Col>
                </Row>
                <Row style={{ display: "flex", gap: "25px", color: "#134681", borderRadius: "6px" }} >
                    <Col>

                        <Image src={useimg} height="250px" width="200px"></Image>

                    </Col>
                    <Col>
                        <Image src={useing} height="250px" width="200px"></Image>
                    </Col>
                    <Col>
                        <Image src={Ai} height="250px" width="200px"></Image>
                    </Col>
                    <Col>
                        <Image src={fun} height="250px" width="200px"></Image>
                    </Col>

                    <Col>
                        <Image src={soft} height="250px" width="200px"></Image>
                    </Col>
                </Row>
                <Row style={{ display: "flex", gap: "435px" }}>
                    <Col>
                        <h4><u> Bachlor of art</u></h4>
                    </Col>
                    <Col>
                        <h4 ><u>Bachlor business administration</u></h4>
                    </Col>
                </Row>
                <Row style={{ display: "flex", gap: "160px" }}>
                    <Card style={{ textAlign: "center", background: "linear-gradient(133deg, #a0c9f1, #f1c0df)", width: "500px", height: "400px", borderRadius: "10px" }}>
                        <Image src={ba} style={{ margin: "40px", width: "300px" }}></Image>


                    </Card>
                    <Card style={{ textAlign: "center", background: "linear-gradient(133deg, #a0c9f1, #f1c0df)", width: "500px", height: "400px", borderRadius: "10px" }}>
                        <Image src={baa} style={{ margin: "40px", height: "300px", width: "300px" }}></Image>

                    </Card>

                </Row>
                <Row style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
                    <Card style={{ textAlign: "center", justifyContent: "", width: "400px", height: "400px", background: "rgba(117, 223, 223, 0.4)", borderRadius: "12px" }}>
                        <   FaBookReader size={50} color="darkblue" />
                        <h3>Books Collection</h3>

                        <p>Explore our latest books</p>
                        <h3> Book Star</h3>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                size={25}
                                color={star <= 4 ? "darkblue" : "gray"}

                            />
                        ))}

                    </Card>
                </Row>
                <Row>
                    <Col>

                    </Col>
                    <Col>

                    </Col>
                </Row>

            </div>
        </div >
    )
}
export default Book;