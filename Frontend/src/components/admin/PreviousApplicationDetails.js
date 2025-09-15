import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Row,
  Col,
  Form,
} from "react-bootstrap";

const PreviousApplicationDetails = () => {
  const [scholarship, setScholarship] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [reasonText, setReasonText] = useState("");

  // Mock data fetch for testing
  const getPreviousApplication = async () => {
    try {
      const data = [
        {
          id: 1,
          name: "Ram",
          email: "ram@gmail.com",
          scholarshipName: "Merit-based Scholarship",
          category: "Merit-based",
          amount: 1000.0,
          status: "Pending",
        },
        {
          id: 2,
          name: "Shyam",
          email: "Shyam@gmail.com",
          scholarshipName: "Need-based Scholarship",
          category: "Need-based",
          amount: 2000.0,
          status: "Accepted",
        },
        {
          id: 3,
          name: "Krishna",
          email: "Krishna@gmail.com",
          scholarshipName: "Athletic Scholarship",
          category: "Athletic",
          amount: 1500.0,
          status: "Rejected",
        },
      ];
      setScholarship(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      alert("Failed to fetch applications. Please try again later.");
    }
  };

  useEffect(() => {
    getPreviousApplication();
  }, []);

  const handleAccept = () => {
    const updatedScholarship = [...scholarship];
    updatedScholarship[selected].status = "Accepted";
    setScholarship(updatedScholarship);
    alert("Application accepted successfully.");
    setShowModal(false);
  };

  const handleReject = () => {
    const updatedScholarship = [...scholarship];
    updatedScholarship[selected].status = "Rejected";
    setScholarship(updatedScholarship);
    alert("Application rejected successfully.");
    setShowDeleteModal(false);
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setReasons((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleTextAreaChange = (e) => {
    setReasonText(e.target.value);
  };

  return (
    <Container>
      <h3 className="mt-4">Previous Scholarship Applications</h3>
      {scholarship?.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <Table responsive className="mt-3">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Scholarship Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarship.map((item, index) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.scholarshipName}</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      setSelected(index);
                      setShowModal(true);
                    }}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selected !== null && (
        <>
          {/* View Details Modal */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {scholarship[selected]?.scholarshipName}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={4}><strong>Student Name:</strong></Col>
                <Col>{scholarship[selected]?.name}</Col>
              </Row>
              <Row>
                <Col sm={4}><strong>Email:</strong></Col>
                <Col>{scholarship[selected]?.email}</Col>
              </Row>
              <Row>
                <Col sm={4}><strong>Category:</strong></Col>
                <Col>{scholarship[selected]?.category}</Col>
              </Row>
              <Row>
                <Col sm={4}><strong>Amount:</strong></Col>
                <Col>{scholarship[selected]?.amount}</Col>
              </Row>
              <Row>
                <Col sm={4}><strong>Status:</strong></Col>
                <Col>{scholarship[selected]?.status}</Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleAccept}>
                Accept
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setShowDeleteModal(true);
                  setShowModal(false);
                }}
              >
                Reject
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Reject Confirmation Modal */}
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Rejection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to reject this application?</p>
              <Form>
                <Form.Group>
                  <Form.Label>Add reason for rejection (optional):</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reasonText}
                    onChange={handleTextAreaChange}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Select predefined reasons:</Form.Label>
                  <div>
                    <Form.Check
                      type="checkbox"
                      label="Incomplete documents"
                      value="Incomplete documents"
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Not eligible"
                      value="Not eligible"
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Other"
                      value="Other"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleReject}>
                Reject
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default PreviousApplicationDetails;
