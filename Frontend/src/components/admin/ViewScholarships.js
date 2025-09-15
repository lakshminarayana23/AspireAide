import React, { useState, useEffect } from "react";
import { Container, Card, Col, Button, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";

const ViewScholarships = () => {
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState([]);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const getScholarships = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8091/api/scholarships`);
      setScholarship(data);
    } catch (error) {
      console.error(error);
      openNotification("error", "Error", "Failed to fetch scholarships.");
    }
  };

  useEffect(() => {
    getScholarships();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8091/api/scholarships/${scholarship[selected]?.id}`
      );
      openNotification("success", "Success", data.message);
      setScholarship((prevScholarships) =>
        prevScholarships.filter((_, index) => index !== selected)
      );
      setShow(false); // Close the confirmation modal
      setShowModal(false); // Close the details modal
    } catch (error) {
      console.error(error);
      openNotification("error", "Error", "Failed to delete scholarship.");
    }
  };
    

  const handleButtonClick = (index) => {
    setSelected(index);
    setShowModal(true);
  };

  return (
    <>
      <Container>
        <br />
        <Row>
          {scholarship?.map((item, index) => (
            <Col sm={12} md={4} style={{ padding: "20px" }} key={item.id}>
              <Card style={{ padding: "20px" }}>
                <h3>{item.scholarshipName}</h3>
                <br />
                <p>Deadline: {item.deadline}</p>
                <p>Amount: {item.amount}</p>
                <Button onClick={() => handleButtonClick(index)}>View More</Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{scholarship[selected]?.scholarshipName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col sm={3} className="modal-label">Deadline:</Col>
                <Col sm={9}>{scholarship[selected]?.deadline}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Amount:</Col>
                <Col sm={9}>{scholarship[selected]?.amount}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Category:</Col>
                <Col sm={9}>{scholarship[selected]?.category}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Eligibility:</Col>
                <Col sm={9}>{scholarship[selected]?.eligibility}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Documents Required:</Col>
                <Col sm={9}>{scholarship[selected]?.documents}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">Note:</Col>
                <Col sm={9}>{scholarship[selected]?.description}</Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Link to={`/update-scholarship/${scholarship[selected]?.id}`}>
              <Button variant="primary">Update</Button>
            </Link>
            <Button variant="danger" onClick={handleShow}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{scholarship[selected]?.scholarshipName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this Scholarship?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default ViewScholarships;
