import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";
import { notification } from "antd"; // Import notification from Ant Design
import AdminRegistrationImage from "../../images/userRegistration.jpg";

const AdminLogin = () => {
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
      placement: "topRight", // Position of the notification
      duration: 3, // Display duration in seconds
    });
  };

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8091/api/admins/login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        openNotification("success", res.data.message); // Success notification
        setLoggedIn(false);
        setAdminLoggedIn(true);
        setUser({ email: email });
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("adminLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(email));
        navigate("/adminDashboard");
      } else {
        openNotification("error", res.data.message); // Error notification from backend
      }
    } catch (error) {
      console.error(error);
      openNotification("error", "Something went wrong. Please try again."); // Network error notification
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src={AdminRegistrationImage} alt="Admin Login" />
          </Col>
          <Col>
            <Form onSubmit={PostData} method="POST">
              <h2 style={{ textAlign: "center" }}> Admin Login</h2>
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
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLogin;
