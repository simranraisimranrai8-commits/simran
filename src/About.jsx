import Col from "react-bootstrap/Col";
import { motion } from "framer-motion";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import useimg from "./image/books.jpeg";
import userimg from "./image/girl.jpeg";
import bbimg from "./image/bb.jpeg";
import girlimg from "./image/bbk.jpeg";
import { FaBook, FaUser } from "react-icons/fa";
function About() {
    return (
        <div>
            <Row style={{ display: "flex", marginLeft: "30px", gap: "30px" }}>
                <Col>
                    <p style={{ color: "#134681" }}><b><i><u>MY BOOKS</u> <br></br> LIBRARY</i></b></p>
                </Col>
                <Col>
                    <p style={{ background: "linear-gradient(135deg, #a0c9f1, #f1c0df)", color: "#134681" }}><b> THE LARGE  COLLECTION BOOKS LIBRARY.
                    </b></p>
                </Col>
                <Col>
                    <p style={{ color: "#134681" }}><b><i>WELCOME TO MY LIBRARY  ENJOYABLE FOR EVERYONE...</i></b></p>
                </Col>
            </Row>
            <Row style={{ display: "flex", gap: "30px" }}>
                <Col>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}>

                        <Image src={useimg} style={{ height: "500px", borderRadius: "10px" }}></Image>
                    </motion.div>
                </Col>
                <Col>
                    <p style={{ marginLeft: "120px", background: "linear-gradient(133deg, #a0c9f1, #f1c0df)", color: "#134681", fontSize: "50px" }}><b>THE BOOKS DISCUSION...</b></p>
                    <h3 style={{ color: "#134681", marginLeft: "120px", fontSize: "37px" }}><i> Share your thoughts, reviews, questions and recommendations
                        about your favourite books.......</i></h3>
                    <Image src={userimg} style={{ marginLeft: "120px", height: "215px", width: "550px", borderRadius: "10px" }}></Image>
                </Col>
            </Row>
            <Row style={{ display: "flex", gap: "20px" }}>
                <Col>
                    <h2 style={{ background: "linear-gradient(133deg, #a0c9f1, #f1c0df", color: "#134681", borderRadius: "8px" }}><string>📖 BOOKS REVIEWS...</string></h2>

                    <h3 style={{ color: "#134681", }}><b><strong>Share your opinion about books.<br></br>Recommend books to other readers.<br></br>Discuss stories, characters and ideas<br></br>Discuss your favorite authors.<br></br>Share memorable quotes.<br></br>Discuss trending and popular books.<br></br>Discuss newly added books.<br></br>Discuss upcoming releases.<br></br>Share reading habits and tips.</strong></b></h3>
                </Col>
                <Col>
                    <h2 style={{ color: "#134681", marginLeft: "133px", fontSize: "50px" }}>THE BOOKS....</h2>

                    <Image src={bbimg} style={{ marginLeft: "133px", height: "122px", width: "290px" }}></Image></Col>
                <Col>
                    <h2 style={{ marginLeft: "20px", color: "#134681" }}><Image src={girlimg} height="122px" width="290px"></Image>
                    </h2>
                    <motion.div
                        whileHover={{ scale: 1.5 }}>
                        <p style={{ color: "#134681" }}>THE LAEGE COLLECTION BOOKS<br></br>DISCUSS NOWDAY</p>
                    </motion.div>
                </Col>

            </Row>
            <Row>
                <Col>
                    <p style={{ textAlign: "center", background: "linear-gradient(133deg, #a0c9f1, #f1c0df)", padding: "50px" }}>
                        <motion.div
                            whileHover={{ scale: 2 }}>
                            {/*transition={{ duration: 1, repeat: Infinity }}*/}

                            <FaUser size={30} color="blue" />
                        </motion.div>

                    </p>

                </Col>
            </Row>

        </div>

    );
}
export default About;