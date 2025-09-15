import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import scholarshipImage from "../../../../client/src/images/scholarship.jpg";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(to right, #1c92d2, #f2fcfe)",
          padding: "80px 0",
          color: "#333",
        }}
      >
        <div className="container">
          <Row className="align-items-center">
            <Col md={6} data-aos="fade-up" data-aos-duration="800">
              <h1 style={{ fontSize: "3.5rem", fontWeight: "700", lineHeight: "1.2" }}>
                Welcome to <span style={{ color: "#ff6363" }}>Scholarship</span>
              </h1>
              <p style={{ fontSize: "1.2rem", marginTop: "20px", color: "#555" }}>
                Empowering the Next Generation with Opportunities
              </p>
              <Button
  href="/scholarships"
  style={{
    backgroundColor: "#ff6363", 
    color: "#fff", 
    fontWeight: "600", 
    border: "none", 
    padding: "12px 30px", 
    fontSize: "0.7rem", 
    marginTop: "20px", 
    borderRadius: "50px", // Rounded corners
    textTransform: "uppercase", // All text uppercase for more impact
    boxShadow: "0 4px 12px rgba(255, 99, 99, 0.3)", // Subtle shadow effect
    transition: "all 0.3s ease-in-out", // Smooth transition for hover
  }}
  className="shadow-sm"
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#ff4c4c"; // Change color on hover
    e.target.style.transform = "scale(1.05)"; // Slightly enlarge the button
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#ff6363"; // Return to original color
    e.target.style.transform = "scale(1)"; // Return to normal size
  }}
>
  View Scholarships
</Button>

            </Col>
            <Col md={6} data-aos="fade-up" data-aos-duration="1000">
              <img
                src={scholarshipImage}
                alt="Scholarship"
                style={{
                  maxWidth: "100%",
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Col>
          </Row>
        </div>
      </section>

      {/* Statistics Section */}
      <div id="statistics" style={{ background: "#f9f9f9", padding: "70px 0" }}>
        <div className="container text-center">
          <h2 style={{ marginBottom: "50px", fontWeight: "700", color: "#333" }}>
            Our Impact Statistics
          </h2>
          <Row>
            <Col md={3} data-aos="fade-up" data-aos-duration="500">
              <Card
                style={{
                  background: "#1c92d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 8px 20px rgba(28, 146, 210, 0.2)",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "2.5rem", fontWeight: "700" }}>
                    214,532
                  </Card.Title>
                  <Card.Text>Total Applications</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} data-aos="fade-up" data-aos-duration="1000">
              <Card
                style={{
                  background: "#ff6363",
                  color: "#fff",
                  border: "none",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 8px 20px rgba(255, 99, 99, 0.2)",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "2.5rem", fontWeight: "700" }}>
                    53,246
                  </Card.Title>
                  <Card.Text>Scholarships Awarded</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} data-aos="fade-up" data-aos-duration="1500">
              <Card
                style={{
                  background: "#f0c929",
                  color: "#fff",
                  border: "none",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 8px 20px rgba(240, 201, 41, 0.2)",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "2.5rem", fontWeight: "700" }}>
                    ₹76,565.98
                  </Card.Title>
                  <Card.Text>Amount Disbursed</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} data-aos="fade-up" data-aos-duration="2000">
              <Card
                style={{
                  background: "#2ecc71",
                  color: "#fff",
                  border: "none",
                  borderRadius: "15px",
                  padding: "25px",
                  boxShadow: "0 8px 20px rgba(46, 204, 113, 0.2)",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "2.5rem", fontWeight: "700" }}>
                    100
                  </Card.Title>
                  <Card.Text>Scholarship Schemes</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Home;
