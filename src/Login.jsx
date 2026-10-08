
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaSignInAlt, FaUser } from 'react-icons/fa';



function Login() {
    const [user, setUser] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [email, setEmail] = useState("");


    function handleLogin() {


        alert("Succesful");
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "50px",
            }}
        >
            <Card
                style={{
                    textAlign: "center",
                    background: "rgb(237, 240, 243)", border: "5px solid rgba(230, 15, 101, 0.77)", borderRadius: "10px", color: "rgba(230, 15, 101, 0.77)",
                    width: "400px",
                    padding: "50px",
                }}
            >
                <FaUser size={30} />
                <h2>

                    <b>Login Page</b><br></br>
                    <p style={{ color: "dark" }}>Acount</p>
                </h2>

                <br />

                <label>

                    <input
                        type="text"
                        value={user}
                        placeholder="User"
                        onChange={(e) => setUser(e.target.value)}
                        style={{ marginLeft: "30px", marginBottom: "15px", borderRadius: "6px" }}
                    />
                </label>



                <input
                    type="text"
                    value={phoneno}
                    placeholder="PhoneNo"
                    onChange={(e) => setPhoneno(e.target.value)}
                    style={{ marginLeft: "30px", marginBottom: "15px", borderRadius: "6px" }}
                />

                <label>

                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginLeft: "30px", marginBottom: "15px", borderRadius: "6px" }}
                    />
                </label>
                <br />

                <label>

                    <Button variant="dark" onClick={handleLogin}><FaSignInAlt color="rgba(230, 15, 101, 0.77)" />
                        Login
                    </Button>
                </label>
                <h2>
    
                </h2>


            </Card>
        </div >
    );
}

export default Login;

