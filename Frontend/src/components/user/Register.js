import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import userRegister from "../../images/userRegister.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd"; // Import notification

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      placement: "topRight", // Position: top-right
      duration: 3, // Display duration in seconds
    });
  };

  const PostData = async (e) => {
    e.preventDefault();

    // Password confirmation check
    if (password !== confirmPassword) {
      openNotification("error", "Passwords do not match");
      return;
    }

    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      openNotification("error", "Please enter a valid email");
      return;
    }

    setIsSubmitting(true); // Start loading

    try {
      const res = await axios.post(`http://localhost:8091/api/users/register`, {
        name,
        email,
        password,
      });

      if (res && res.data.success) {
        openNotification("success", res.data.message);
        setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
      } else {
        openNotification("error", res.data.message); // Error from backend
      }
    } catch (error) {
      console.error(error);
      openNotification(
        "error",
        error.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <section className="registration">
      <Container>
        <Row>
          <Col>
            <Form onSubmit={PostData} method="POST">
              <h2 style={{ textAlign: "center" }}>Registration</h2>

              {/* Name */}
              <Form.Group className="mb-3" controlId="formGroupName">
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <label>Email address</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                <label>Confirm Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
              <br />
              <br />
              <div>
                <p>
                  Already Registered?{" "}
                  <span>
                    <a href="/login">Login</a>
                  </span>
                </p>
              </div>
            </Form>
          </Col>
          <Col>
            <img src={userRegister} alt="User Registration" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
