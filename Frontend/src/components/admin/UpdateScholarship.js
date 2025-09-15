import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Cancel Confirmation Modal Component
function CancelConfirmModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Cancel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to cancel?</h4>
        <p>All unsaved changes will be lost.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onConfirm}>
          Confirm Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Main UpdateScholarship Component
const UpdateScholarship = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);
  const [scholarshipData, setScholarshipData] = useState({
    scholarshipName: "",
    deadline: "",
    amount: "",
    category: "",
    eligibility: "",
    documents: "",
    description: ""
  });

  // Fetch scholarship details
  const fetchScholarshipDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8091/api/scholarships/${id}`);
      
      // More robust data extraction
      const scholarshipInfo = response.data.scholarship || response.data;
      
      setScholarshipData({
        scholarshipName: scholarshipInfo.scholarshipName || "",
        deadline: scholarshipInfo.deadline || "",
        amount: scholarshipInfo.amount || "",
        category: scholarshipInfo.category || "",
        eligibility: scholarshipInfo.eligibility || "",
        documents: scholarshipInfo.documents || "",
        description: scholarshipInfo.description || ""
      });
    } catch (error) {
      console.error("Error fetching scholarship:", error);
      setError("Failed to fetch scholarship details. Please try again.");
      navigate("/adminDashboard");
    }
  };

  // Validate form data
  const validateFormData = () => {
    const requiredFields = [
      'scholarshipName', 
      'deadline', 
      'amount', 
      'category', 
      'eligibility', 
      'documents'
    ];

    for (let field of requiredFields) {
      if (!scholarshipData[field] || scholarshipData[field].trim() === '') {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Additional specific validations
    if (isNaN(parseFloat(scholarshipData.amount)) || parseFloat(scholarshipData.amount) <= 0) {
      setError("Amount must be a valid positive number");
      return false;
    }

    // Date validation (basic)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(scholarshipData.deadline)) {
      setError("Invalid date format. Use YYYY-MM-DD");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form before submission
    if (!validateFormData()) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8091/api/scholarships/${id}`, 
        scholarshipData
      );
      
      // More flexible success checking
      if (response.data && (response.data.success || response.status === 200)) {
        alert(response.data.message || "Scholarship updated successfully");
        navigate("/adminDashboard");
      } else {
        setError(response.data.message || "Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setError(
        error.response?.data?.message || 
        "Something went wrong during update. Please try again."
      );
    }
  };

  // Handle input changes with trimming
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScholarshipData(prevData => ({
      ...prevData,
      [name]: name === 'amount' ? value.replace(/[^0-9]/g, '') : value
    }));
  };

  // Fetch scholarship on component mount
  useEffect(() => {
    if (id) {
      fetchScholarshipDetails();
    } else {
      setError("Scholarship ID is missing");
      navigate("/adminDashboard");
    }
  }, [id, navigate]);

  // Handle cancel confirmation
  const handleCancelConfirm = () => {
    setModalShow(false);
    navigate("/adminDashboard");
  };

  return (
    <Container>
      <div className="pd-20 card-box mb-30">
        <h3 className="text-blue" style={{ color: "#2b50c7", textAlign: "center" }}>
          Update Scholarship
        </h3>

        {error && (
          <Alert 
            variant="danger" 
            onClose={() => setError(null)} 
            dismissible
          >
            {error}
          </Alert>
        )}

        <Form onSubmit={handleUpdate}>
          <Container>
            {/* Scholarship Name */}
            <div className="form-group">
              <Row>
                <Col xs={12} sm={12} md={2}>
                  <label className="col-form-label">
                    Scholarship Name <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col xs={12} sm={12} md={10}>
                  <input
                    name="scholarshipName"
                    className="form-control"
                    type="text"
                    placeholder="Enter Scholarship Name"
                    required
                    value={scholarshipData.scholarshipName}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
            </div>

            {/* Deadline and Amount Row */}
            <div className="form-group">
              <Row>
                <Col xs={12} sm={12} md={2}>
                  <label className="col-form-label">
                    Deadline <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col xs={12} sm={12} md={2}>
                  <input
                    name="deadline"
                    className="form-control"
                    type="date"
                    required
                    value={scholarshipData.deadline}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col xs={12} sm={12} md={1}>
                  <label className="col-form-label">
                    Amount <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col xs={12} sm={12} md={2}>
                  <input
                    name="amount"
                    className="form-control"
                    type="number"
                    required
                    value={scholarshipData.amount}
                    onChange={handleInputChange}
                    min="0"
                  />
                </Col>

                <Col xs={12} sm={12} md={1}>
                  <label className="col-form-label">
                    Category <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col xs={12} sm={12} md={4}>
                  <Form.Select
                    name="category"
                    value={scholarshipData.category}
                    className="custom-select"
                    onChange={handleInputChange}
                    required
                  >
                    <option value={""}>Choose Scholarship Category</option>
                    <option value="merit-based">Merit</option>
                    <option value="minority-based">Minority</option>
                    <option value="need-based">Need based</option>
                    <option value="international">International</option>
                    <option value="research-based">Research Based</option>
                  </Form.Select>
                </Col>
              </Row>
            </div>

            {/* Eligibility Criteria */}
            <div className="form-group">
              <Row>
                <Col xs={12} sm={12} md={2}>
                  <label className="col-form-label">
                    Eligibility Criteria <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col xs={12} sm={12} md={10}>
                  <textarea
                    name="eligibility"
                    className="form-control"
                    placeholder="Enter Eligibility Criteria"
                    value={scholarshipData.eligibility}
                    onChange={handleInputChange}
                    required
                    rows="3"
                  />
                </Col>
              </Row>
            </div>

            {/* Documents Required */}
            <div className="form-group">
              <Row>
                <Col xs={12} sm={12} md={2}>
                  <label className="col-form-label">
                    Documents Required <span className="compulsory">*</span>
                  </label>
                </Col>
                <Col xs={12} sm={12} md={10}>
                  <textarea
                    name="documents"
                    className="form-control"
                    placeholder="Enter Documents Required"
                    value={scholarshipData.documents}
                    onChange={handleInputChange}
                    required
                    rows="3"
                  />
                </Col>
              </Row>
            </div>

            {/* Extra Information */}
            <div className="form-group">
              <Row>
                <Col xs={12} sm={12} md={2}>
                  <label className="col-form-label">Extra Information</label>
                </Col>
                <Col xs={12} sm={12} md={10}>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Add Extra information if any"
                    value={scholarshipData.description}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </Col>
              </Row>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="form-group">
              <Row>
                <Col>
                  <div style={{ textAlign: "center" }}>
                    <Button 
                      type="submit" 
                      variant="primary"
                    >
                      Update Scholarship
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div style={{ textAlign: "center" }}>
                    <Button 
                      type="button" 
                      variant="outline-secondary"
                      onClick={() => setModalShow(true)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>

            <CancelConfirmModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              onConfirm={handleCancelConfirm}
            />
          </Container>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateScholarship;