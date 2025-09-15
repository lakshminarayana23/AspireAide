import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Col, Button, Modal, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";

const MinorityBased = () => {
  const { loggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get function
  const getScholarships = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8091/api/scholarships/category/minority-based`
      );
      setScholarships(data); // Assuming the response is an array of scholarships
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getScholarships();
  }, []);

  const handleButtonClick = (index) => {
    setSelected(index);
    setShowModal(true);
  };

  return (
    <>
      <Container>
        <br /><br />
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : scholarships.length === 0 ? (
          <div className="text-center">
            <p>No minority-based scholarships available at the moment.</p>
          </div>
        ) : (
          <Row>
            {scholarships.map((item, index) => (
              <Col sm={12} md={4} style={{ padding: "20px" }} key={item.id}>
                <Card style={{ padding: "20px" }}>
                  <h3>{item.scholarshipName}</h3>
                  <br />
                  <p>Deadline: {item.deadline}</p>
                  <p>Amount: {item.amount}</p>
                  <Button onClick={() => handleButtonClick(index)}>
                    View More
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{scholarships[selected]?.scholarshipName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col sm={3} className="modal-label">Deadline:</Col>
                <Col sm={9}>{scholarships[selected]?.deadline}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Amount:</Col>
                <Col sm={9}>{scholarships[selected]?.amount}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Category:</Col>
                <Col sm={9}>{scholarships[selected]?.category}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Eligibility:</Col>
                <Col sm={9}>{scholarships[selected]?.eligibility}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Documents Required:</Col>
                <Col sm={9}>{scholarships[selected]?.documents}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Note:</Col>
                <Col sm={9}>{scholarships[selected]?.description}</Col>
              </Row>
              <br />
            </Container>
          </Modal.Body>
          <Modal.Footer>
            {loggedIn ? (
              <Link to={`/application-form/${scholarships[selected]?.id}`}>
                <Button variant="primary">Apply Now</Button>
              </Link>
            ) : (
              <Button variant="primary" disabled>Apply Now</Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default MinorityBased;