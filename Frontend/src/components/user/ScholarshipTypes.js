import React from "react";
import { Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ScholarshipTypes = () => {
  return (
    <>
      <style>
        {`
          .grid-cols-3 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }

          .grid-col-item {
            display: flex;
            justify-content: center;
            align-items: stretch;
          }

          .grid-col-item .card {
            width: 100%;
            height: 100%;
            min-height: 350px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .grid-col-item .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .grid-col-item .card .icon {
            margin-bottom: 20px;
            text-align: center;
            font-size: 40px;
          }

          .featured_info {
            text-align: center;
          }

          .featured_info span {
            font-weight: bold;
            font-size: 18px;
          }

          .featured_info p {
            margin-top: 10px;
            color: #555;
          }
        `}
      </style>

      <section id="services">
        <div className="container service-section">
          <br />
          <Row>
            <div className="grid-cols-3" data-aos="fade-up" data-aos-duration="1000">
              <div className="grid-col-item">
                <Card>
                  <Card.Body>
                    <div className="icon">
                      {/* SVG Icon */}
                    </div>
                    <div className="featured_info">
                      <span>Merit Based Scholarship</span>
                      <p>
                        Awarded to students with outstanding academic performance and achievements. Unlock opportunities to grow academically and professionally.
                      </p>
                      <Link to={"/merit-based-scholarships"}>
                        <Button variant="primary" style={{ width: "200px" }}>
                          View Scholarships
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="grid-col-item">
                <Card>
                  <Card.Body>
                    <div className="icon">
                      {/* SVG Icon */}
                    </div>
                    <div className="featured_info">
                      <span>Need Based Scholarship</span>
                      <p>
                        Scholarship opportunities for students with financial needs. Apply and get assistance based on your requirements.
                      </p>
                      <Link to={"/need-based-scholarships"}>
                        <Button variant="primary" style={{ width: "200px" }}>
                          View Scholarships
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="grid-col-item">
                <Card>
                  <Card.Body>
                    <div className="icon">
                      {/* SVG Icon */}
                    </div>
                    <div className="featured_info">
                      <span>International Scholarships</span>
                      <p>
                        Explore scholarships for international students looking to study abroad. Open doors to global education.
                      </p>
                      <Link to={"/international-based-scholarships"}>
                        <Button variant="primary" style={{ width: "200px" }}>
                          View Scholarships
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Row>

          <Row>
            <div className="grid-cols-3" data-aos="fade-up" data-aos-duration="1000">
              <div className="grid-col-item">
                <Card>
                  <Card.Body>
                    <div className="icon">
                      {/* SVG Icon */}
                    </div>
                    <div className="featured_info">
                      <span>Minority Scholarship</span>
                      <p>
                        Scholarship for students belonging to minority groups to promote diversity in education and support their growth.
                      </p>
                      <Link to={"/minority-based-scholarships"}>
                        <Button variant="primary" style={{ width: "200px" }}>
                          View Scholarships
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="grid-col-item">
                <Card>
                  <Card.Body>
                    <div className="icon">
                      {/* SVG Icon */}
                    </div>
                    <div className="featured_info">
                      <span>Research Scholarship</span>
                      <p>
                        Funding opportunities for students and researchers to support their academic and research-based endeavors.
                      </p>
                      <Link to={"/research-based-scholarships"}>
                        <Button variant="primary" style={{ width: "200px" }}>
                          View Scholarships
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="grid-col-item">
                <Card>
                  <Card.Body>
                    <div className="icon">
                      {/* SVG Icon */}
                    </div>
                    <div className="featured_info">
                      <span>All Scholarships</span>
                      <p>
                        Discover all the available scholarships in one place, offering a range of opportunities to help you pursue your dreams.
                      </p>
                      <Link to="/view-scholarships">
                        <Button variant="primary" style={{ width: "200px" }}>
                          View Scholarships
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Row>
        </div>
      </section>
    </>
  );
};

export default ScholarshipTypes;
