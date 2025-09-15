import React, { useState, useEffect } from "react";
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function MyModal(props) {
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton />
      <Modal.Body>
        <h4>Are you sure you want to cancel this form? </h4>
        <p>All of your input will be lost.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="outline-primary">Close</Button>
        <a href="/scholarships">
          <Button onClick={props.onHide}>Ok</Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
}

const ApplicationForm = () => {
  const userEmail = localStorage.getItem("email");
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [scholarshipName, setScholarshipName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(userEmail || "");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [adharCard, setAdharCard] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [income, setIncome] = useState("");
  const [incomeProof, setIncomeProof] = useState(null);
  const [collegeName, setCollegeName] = useState("");
  const [uid, setUid] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [achievements, setAchievements] = useState("");
  const [extracurricular, setExtracurricular] = useState("");
  const [lor, setLor] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [step, setStep] = useState(1);

  // Fetch single scholarship
  const getSingleScholarship = async () => {
    try {
      const response = await axios.get(`http://localhost:8091/api/scholarships/${id}`);
      if (!response.data) {
        alert("Scholarship not found.");
        navigate("/scholarships");
        return;
      }
      const scholarship = response.data.scholarship || response.data;
      setScholarshipName(scholarship.scholarshipName);
      setAmount(scholarship.amount);
      setCategory(scholarship.category);
    } catch (error) {
      console.error("Error fetching scholarship:", error);
      alert("Failed to fetch scholarship.");
      navigate("/scholarships");
    }
  };

  useEffect(() => {
    getSingleScholarship();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData();
  
    // Append form data
    formData.append("scholarshipName", scholarshipName);
    formData.append("category", category);
    formData.append("amount", amount);
    formData.append("name", name);
    formData.append("mobile", mobile); // Ensure no extra spaces in keys
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("country", country);
    formData.append("adharCard", adharCard);
    formData.append("bankName", bankName);
    formData.append("accountNumber", accountNumber);
    formData.append("branch", branch);
    formData.append("income", income);
    formData.append("collegeName", collegeName);
    formData.append("uid", uid);
    formData.append("collegeEmail", collegeEmail);
    formData.append("degree", degree);
    formData.append("cgpa", cgpa);
    formData.append("achievements", achievements);
    formData.append("extracurricular", extracurricular);
  
    try {
      // Make the POST request
      const res = await axios.post(`http://localhost:8091/api/scholarships/application-form`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set the correct content type
        }
      });
  
      // Handle the response
      if (res.data.success) {
        alert(res.data.message); // Show success message
        navigate("/user-dashboard"); // Redirect to user dashboard
        window.location.reload(); // Reload the page (optional)
      } else {
        alert(res.data.message); // Show error message from the server
      }
    } catch (error) {
      console.error("Error submitting application:", error); // Log the error
      alert("Something went wrong. Please try again."); // Show a generic error message
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Personal-Details
        return (
          <Container>
            <div className="pd-20 card-box mb-30">
              <h3 className="text-blue" style={{ color: "#2b50c7" }}>Personal Details</h3>
              <Container>
                {/* Name */}
                <div className="form-group">
                  <Row>
                    <Col xs={12} sm={12} md={2}>
                      <label className="col-form-label">Name <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={10}>
                      <input name="name" className="form-control" type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                  </Row>
                </div>
                {/* Mobile Number and Email */}
                <div className="form-group">
                  <Row>
                    <Col xs={12} sm={12} md={2}>
                      <label className="col-form-label">Mobile Number <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={3}>
                      <input name="mobile" required className="form-control" type="text" placeholder="Enter Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </Col>
                    <Col xs={12} sm={12} md={1}>
                      <label className="col-form-label">Email <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                      <Form.Control name="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                  </Row>
                </div>
                {/* DOB, Age and Gender */}
                <div className="form-group">
                  <Row>
                    <Col xs={12} sm={12} md={2}>
                      <label className="col-form-label">Date of Birth <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={3}>
                      <input name="dob" className="form-control datepicker" placeholder="Select Date" type="date" required value={dob} onChange={(e) => setDob(e.target.value)} />
                    </Col>
                    <Col xs={12} sm={12} md={1}>
                      <label className="col-form-label">Age <span ></span>
                      <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={3}>
                      <input name="age" className="form-control" type="number" required placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </Col>
                    <Col xs={12} sm={12} md={1}>
                      <label className="col-form-label">Gender <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={2}>
                      <select required className="custom-select" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option defaultValue="">Choose Gender</option>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                        <option value={"other"}>Other</option>
                      </select>
                    </Col>
                  </Row>
                </div>
                {/* Address */}
                <div className="form-group">
                  <Row>
                    <Col xs={12} sm={12} md={2}>
                      <label className="col-form-label">Address <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                      <input name="address" required className="form-control" type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Col>
                    <Col xs={12} sm={12} md={1}>
                      <label className="col-form-label">Country <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={3}>
                      <input name="country" className="form-control" type="text" required placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </Col>
                  </Row>
                </div>
                {/* Adhar Card */}
                <div className="form-group">
                  <Row>
                    <Col xs={12} sm={12} md={2}>
                      <label className="col-form-label">Adhar Card <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                      <input name="adharCard" className="form-control" type="text" placeholder="Enter Adhar Card number" required value={adharCard} onChange={(e) => setAdharCard(e.target.value)} />
                    </Col>
                    <Col xs={12} md={2}>
                      <button type="button" className="btn btn-outline-primary" onClick={() => setModalShow(true)}>Cancel</button>
                    </Col>
                    <Col xs={12} md={2}>
                      <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
                    </Col>
                  </Row>
                </div>
                <MyModal show={modalShow} onHide={() => setModalShow(false)} />
              </Container>
            </div>
          </Container>
        );
      case 2: // Bank and Income Details
        return (
          <Container>
            <div className="pd-20 card-box mb-30">
              <h3 className="text-blue" style={{ color: "#2b50c7" }}>Bank Details</h3>
              <Container>
                {/* Bank Name */}
                <div className="form-group">
                  <Row>
                    <Col xs={12} sm={12} md={2}>
                      <label className="col-form-label">Bank Name <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={10}>
                      <input name="bankName" className="form-control" required type="text" placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                    </Col>
                  </Row>
                </div>
                {/* Account Number */}
                <div className="form-group">
                  <Row>
                    <Col xs={12} sm={12} md={2}>
                      <label className="col-form-label">Account Number <span className="compulsory">*</span></label>
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                      <input name="accountNumber" className="form-control" 
                      required
                      type="text"
                      placeholder="Enter Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} sm={12} md={1}>
                    <label className="col-form-label">Branch <span className="compulsory">*</span></label>
                  </Col>
                  <Col xs={12} sm={12} md={5}>
                    <input
                      name="branch"
                      className="form-control"
                      required
                      type="text"
                      placeholder="Enter Bank Branch name"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>

              <h3 className="text-blue" style={{ color: "#2b50c7" }}>
                Income Details
              </h3>

              {/* Income and Proof of Income */}
              <div className="form-group">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="col-form-label">Income <span className="compulsory">*</span></label>
                  </Col>
                  <Col xs={12} sm={12} md={4}>
                    <input
                      name="income"
                      className="form-control"
                      type="number"
                      placeholder="Enter Income"
                      required
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </Col>
                  
                </Row>
              </div>

              {/* Submit Button */}
              <div className="form-group">
                <Row>
                  <Col xs={12} md={2}>
                    <button type="button" className="btn btn-primary" onClick={handlePrev}>
                      Previous
                    </button>
                  </Col>
                  <Col xs={12} md={6}>
                    <label className="col-form-label" />
                  </Col>
                  <Col xs={12} md={2}>
                    <button type="button" className="btn btn-outline-primary" onClick={() => setModalShow(true)}>
                      Cancel
                    </button>
                  </Col>
                  <Col xs={12} md={2}>
                    <button type="button" className="btn btn-primary" onClick={handleNext}>
                      Next
                    </button>
                  </Col>
                </Row>
                <MyModal show={modalShow} onHide={() => setModalShow(false)} />
              </div>
            </Container>
          </div>
        </Container>
      );
    case 3: // Academic Details
      return (
        <Container>
          <div className="pd-20 card-box mb-30">
            <h3 className="text-blue" style={{ color: "#2b50c7" }}>Academic Details</h3>
            <Container>
              {/* College Name */}
              <div className="form-group">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="col-form-label">Name of College <span className="compulsory">*</span></label>
                  </Col>
                  <Col xs={12} sm={12} md={10}>
                    <input
                      name="collegeName"
                      className="form-control"
                      type="text"
                      required
                      placeholder="Enter College Name"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              {/* UID and Email */}
              <div className="form-group">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="col-form-label">UID <span className="compulsory">*</span></label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <input
                      name="uid"
                      className="form-control"
                      type="text"
                      required
                      placeholder="Enter UID"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                    />

                  </Col>
                  <Col xs={12} sm={12} md={1}>
                    <label className="col-form-label">Email <span className="compulsory">*</span></label>
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <input
                      name="collegeEmail"
                      className="form-control"
                      required
                      type="email"
                      placeholder="Enter your college email id"
                      value={collegeEmail}
                      onChange={(e) => setCollegeEmail(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              {/* Degree and GPA */}
              <div className="form-group">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="col-form-label">Degree <span className="compulsory">*</span></label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <select
                      className="custom-select"
                      name="degree"
                      required
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                    >
                      <option defaultValue="">Choose Degree</option>
                      <option value={"B.E."}>B.E.</option>
                      <option value={"B.Tech"}>B.Tech</option>
                      <option value={"B.Sc"}>B.Sc</option>
                    </select>
                  </Col>
                  <Col xs={12} sm={12} md={1}>
                    <label className="col-form-label">GPA <span className="compulsory">*</span></label>
                  </Col>
                  <Col xs={12} sm={12} md={3}>
                    <input
                      name="cgpa"
                      className="form-control"
                      type="number"
                      placeholder="Enter Current GPA"
                      required
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              {/* Achievements */}
              <div className="form-group">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="col-form-label">Achievements</label>
                  </Col>
                  <Col xs={12} sm={12} md={10}>
                    <input
                      name="achievements"
                      className="form-control"
                      type="text"
                      placeholder="Enter Achievements"
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              {/* Extracurricular Activities */}
              <div className="form-group">
                <Row>
                  <Col xs={12} sm={12} md={3}>
                    <label className="col-form-label">Extracurricular Activities</label>
                  </Col>
                  <Col xs={12} sm={12} md={9}>
                    <input
                      name="extracurricular"
                      className="form-control"
                      type="text"
                      placeholder="Enter Extracurricular Activities (if any)"
                      value={extracurricular}
                      onChange={(e) => setExtracurricular(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              {/* Letter Of Recommendation */}
              <div className="form-group">
                
              </div>
              {/* Submit Button */}
              <div className="form-group">
                <Row>
                  <Col xs={12} md={2}>
                    <button type="button" className="btn btn-primary" onClick={handlePrev}>
                      Previous
                    </button>
                  </Col>
                  
                  <Col xs={12} md={6}>
                    <label className="col-form-label" />
                  </Col>
                  <Col xs={12} md={2}>
                    <button type="button" className="btn btn-outline-primary">
                      Cancel
                    </button>
                  </Col>
                  <Col xs={12} md={2}>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </Container>
      );
    default:
      return null;
  }
};

return (
  <>
    <form className="bg-transparent">
      <h2 className="text-blue" style={{ color: "#2b50c7", textAlign: "center" }}>
        Application form
      </h2>
      {renderStep()}
    </form>
  </>
);
};

export default ApplicationForm;