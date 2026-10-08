import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import Image from "react-bootstrap/Image";
import useimg from "./image/book.jpeg";
import userimg from "./image/book1.jpeg";



function Home() {
  return (
    <div style={{ margin: "10px" }}>

      <Row style={{ display: "flex", margin: "30px", textAlign: "center", height: "500px", background: "linear-gradient(135deg, #a0c9f1, #f1c0df)" }}>
        <Col>
          <h1 style={{ textAlign: "center", margin: "60px", color: " #134681", fontSize: "75px" }}><b>The  Books Collection<br></br>Library
          </b></h1>
        </Col>
        <Col style={{ margin: "30px" }}>
          <Image src={useimg} height="400px" rounded />
        </Col>

      </Row>
      <Row style={{ display: "flex", gap: "160px" }} >

        <Col>
          <h1 style={{ color: "#134681" }}> <b>Computer Application<br></br> Books library</b></h1>
        </Col>
        <Col>
          <h1 style={{ color: "#134681" }}><b>Bachelor of Art<br></br> Books Library</b></h1>
        </Col>
        <Col>
          <h1 style={{ color: "#134681" }}><b>Bachelor Business Administration<br></br> Books Library</b></h1>

        </Col>
        <Col>
          <h1 style={{ color: "#134681" }}><b>Bachelor of science Books Library </b></h1>
        </Col>
      </Row >
      <Row>
        <Col>
          <Image src={userimg} height="300px" width="1200px"></Image>
        </Col>

      </Row>
    </div >
  );
}

export default Home;