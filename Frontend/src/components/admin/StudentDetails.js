import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal, Row, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";

const StudentDetails = () => {
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState([]);
  const [finalReason, setFinalReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [reasons, setReasons] = useState([]);

  const openNotification = (type, message) => {
    notification[type]({
      message: type === "success" ? "Success" : "Error",
      description: message,
    });
  };

  const getScholarships = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8091/api/scholarships/get-applications`);
      setScholarship(data);
      openNotification("success", "Scholarship applications loaded.");
    } catch (error) {
      openNotification("error", "Failed to fetch applications.");
    }
  };

  useEffect(() => {
    getScholarships();
  }, []);

  const handleAccept = async () => {
    try {
      const longId = scholarship[selected]?._id;
      await axios.put(`http://localhost:8091/api/scholarships/set-status/${longId}`, { status: "Accepted" });
      openNotification("success", "Scholarship application accepted.");
      getScholarships();
      setShowModal(false);
    } catch (error) {
      openNotification("error", "Failed to accept application.");
    }
  };

  const handleReject = async () => {
    try {
      const longId = scholarship[selected]?._id;
      await axios.put(`http://localhost:8091/api/scholarships/set-status/${longId}`, { 
        status: "Rejected", 
        rejectionReasons: reasons, 
        additionalComments: finalReason
      });
      openNotification("success", "Scholarship application rejected.");
      getScholarships();
      setShowModal(false);
    } catch (error) {
      openNotification("error", "Failed to reject application.");
    }
  };

  const handleButtonClick = (index) => {
    setSelected(index);
    setShowModal(true);
  };

  console.log(scholarship[selected]); // Check the selected item’s data

  return (
    <>
      <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Scholarship Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scholarship.map((item, index) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.scholarshipName}</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                <td>
                  <Button onClick={() => handleButtonClick(index)}>View More</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{scholarship[selected]?.scholarshipName || "Scholarship Name"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col sm={2}>Student Name:</Col>
                <Col sm={3}>{scholarship[selected]?.name || "Not Available"}</Col>
                <Col sm={2}>Email:</Col>
                <Col sm={3}>{scholarship[selected]?.email || "Not Available"}</Col>
                <Col sm={2}>Phone:</Col>
                <Col sm={3}>{scholarship[selected]?.phone || "Not Available"}</Col>
              </Row>
              <Row>
                <Col sm={2}>Scholarship Amount:</Col>
                <Col sm={3}>{scholarship[selected]?.amount || "Not Available"}</Col>
                <Col sm={2}>Category:</Col>
                <Col sm={3}>{scholarship[selected]?.category || "Not Available"}</Col>
              </Row>
              <Row>
                <Col sm={2}>Rejection Reasons:</Col>
                <Col sm={10}>
                  <Form>
                    <Form.Check type="checkbox" label="Incomplete Application" value="Incomplete Application" onChange={(e) => {
                      const value = e.target.value;
                      setReasons(reasons.includes(value) ? reasons.filter((r) => r !== value) : [...reasons, value]);
                    }} />
                    <Form.Check type="checkbox" label="Not Eligible" value="Not Eligible" onChange={(e) => {
                      const value = e.target.value;
                      setReasons(reasons.includes(value) ? reasons.filter((r) => r !== value) : [...reasons, value]);
                    }} />
                    <Form.Group controlId="rejectionReason">
                      <Form.Label>Additional Comments:</Form.Label>
                      <Form.Control as="textarea" rows={3} onChange={(e) => setFinalReason(e.target.value)} />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="danger" onClick={handleReject}>Reject</Button>
            <Button variant="success" onClick={handleAccept}>Accept</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default StudentDetails;
