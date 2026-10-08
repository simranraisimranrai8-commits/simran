
import { FaBook, FaLaptop } from "react-icons/fa6";
import { motion } from "framer-motion";
import Image from "react-bootstrap/Image";
import useimg from "./image/compurt.jpeg";
import Card from "react-bootstrap/Card";

function Facilities() {
    return (
        <div style={{ margin: "2px" }}>
            <div className="p-5">
                <h1 style={{ textAlign: "center", background: "rgba(230, 15, 101, 0.77)" }}>
                    University Facilities</h1>
            </div>
            <div className=" px-5 flex justify-between items-center">
                <div className="w-1/2">

                    <motion.div className="text-left"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}>

                        <FaBook size={120} colo="rgb(57, 72, 87)" />
                    </motion.div>
                </div>
                <p className="w-1/1 text-center ">
                    <h1 style={{ textShadow: "3px 3px 8px #000", fontSize: "50px" }}><u><b>Best Centrel Library</b></u>
                    </h1>
                    <h1 style={{ textShadow: "3px 3px 8px #000", fontSize: "50px" }}>Modern library facility for students.</h1></p>


            </div>
            <div className="p-5">
                <h1 style={{ textAlign: "center", background: " #ee1c69" }}>
                    <h2 style={{ textShadow: "3px 3px 8px #000" }}> <u>Computer Lab</u></h2>
                    <h3 style={{ textShadow: "3px 3px 8px #000" }}>Advanced computer facilities</h3>
                </h1>

            </div>
            <div className=" px-5 flex justify-between items-center">
                <div className="w-1/1text-left">
                    <Card style={{ textAlign: "center", background: "white", width: "300px" }}>
                        <h3>Laptop</h3>
                        <FaLaptop size={200} color="black" /><h3>Student Learning</h3>
                        <p>Learn with modern technology</p>
                    </Card>
                </div>
                <div className="w-3/2 text-right">
                    <Image src={useimg} style={{ width: "600px", height: "300px", padding: "2px" }}></Image>
                </div>
                {/*  <div className="px-5 flex justify-between item-center">*/}



            </div>

        </div>




    )
}
export default Facilities;