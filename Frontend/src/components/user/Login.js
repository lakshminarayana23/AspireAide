import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import userLogin from "../../images/userLogin.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";
import { notification } from "antd"; // Import notification from antd
import "./Login.css";

const Login = () => {
  const {
    setLoggedIn,
    setUser,
    setAdminLoggedIn,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      description: "You have logged in successfully.",
      placement: "topRight", // Set to top-right
      duration: 2, // Duration in seconds before the notification disappears
    });
  };

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8091/api/users/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        openNotification("success", res.data.message); // Success notification
        setLoggedIn(true);
        setAdminLoggedIn(false);
        setUser({ user: res.data.email });
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("user", JSON.stringify(res.data.email));
        setTimeout(() => navigate("/scholarships"), 1000); // Redirect after 1 second
      } else {
        openNotification("error", res.data.message); // Error notification
      }
    } catch (error) {
      console.log(error);
      openNotification("error", "Something went wrong."); // Error notification
    }
  };

  return (
    <Container className="login-container">
      <Row>
        <Col md={6}>
          <img src={userLogin} alt="User Login" />
        </Col>
        <Col md={6}>
          <Form onSubmit={PostData}>
            <h2>Login</h2>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className="form-control"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                className="form-control"
              />
            </Form.Group>
            <Button type="submit">LOGIN</Button>
            <p className="mt-3 text-center">
              Don't have an account?{" "}
              <a href="/user/register">Register here</a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
