import { FaComputer, FaUserNurse, FaStethoscope } from "react-icons/fa6";
import { motion } from "framer-motion";

function Courses() {
    return (
        <div style={{ margin: "10px" }}>

            <div className="p-5">
                <h1 style={{ textAlign: "center", background: "rgba(230, 15, 101, 0.77)" }}>
                    Courses Provide
                </h1>
            </div>
            <div className="px-5 flex justify-between items-center">



                <div className="w-1/2 text-white">

                    <h2 className="text-left font-bold bg-blue-100 text-blue-900 p-2 underline decoration-2 decoration-blue-500">
                        Available Computer Courses
                    </h2>

                    <p className="text-justify mt-3">
                        <b><i>Here are the computer courses offered</i></b>
                    </p>

                    <ul
                        style={{
                            listStyleType: "circle",
                            fontSize: "20px", color: "darkblue"
                        }}>
                        <li>Computer Science</li>
                        <li>Computer Application</li>
                        <li>Computer Engineering</li>
                        <li>Computer Web Development</li>
                        <li>Computer Programming</li>
                        <li>Computer Database</li>
                        <li>Computer Graphics</li>
                        <li>Computer Artificial Intelligence</li>
                        <li>Computer Python</li>
                    </ul>

                </div>


                <motion.div
                    className="w-1/2 flex justify-center items-center"
                    whileHover={{ scale: 1.2 }}
                >
                    <FaComputer size={400} color="black" />
                </motion.div>

            </div>


            <div className="p-5 mt-8 bg-blue-100">

                <h1 style={{ textAlign: "center", background: "rgba(230, 15, 101, 0.77)" }}>
                    Nursing Courses Provide
                </h1>
            </div>
            <div className="px-5 flex justify-between items-center">
                <div className=" text-left" >
                    <h2 style={{ color: "black" }}><FaUserNurse size={50} /><u>General Nurseing Midwifery</u></h2>
                    <h3 style={{ color: "darkblue" }}>3 Years Study Pluse 6 Months internship</h3>
                </div>
                < div className=" w-1/2 flex justify-center items-center">
                    <div className="text-right">
                        <h2 style={{ color: "black" }}><FaStethoscope size={50} /><u>Bachelor of Science in Nursing</u></h2>
                        <h3 style={{ color: "darkblue" }}>4 Years undergraduate nursing degree course</h3>


                    </div>
                </div>
            </div>

        </div >
    );
}

export default Courses;