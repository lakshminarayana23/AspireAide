import React from "react";

const Information = () => {
  return (
    <section id="about_us" className="py-5">
      <div className="container">
        <div className="row">
          {/* Eligibility Criteria Section */}
          <div
            className="col-lg-6 mb-4"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h3 className="text-primary mb-4">Eligibility Criteria</h3>
            <ul className="list-unstyled">
              <li>
                <i className="ri-arrow-right-line me-2" />
                Meet all necessary requirements specified by the scholarship program.
              </li>
              <li>
                <i className="ri-arrow-right-line me-2" />
                Criteria may include maintaining a certain GPA, demonstrating financial need, or being enrolled in a specific course.
              </li>
              <li>
                <i className="ri-arrow-right-line me-2" />
                Carefully review eligibility for each scholarship opportunity.
              </li>
              <li>
                <i className="ri-arrow-right-line me-2" />
                Ensure all requirements are met before applying.
              </li>
              <li>
                <i className="ri-arrow-right-line me-2" />
                Meeting the criteria is necessary, but doesn't guarantee the scholarship.
              </li>
            </ul>
          </div>

          {/* Application Process Section */}
          <div
            className="col-lg-6"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <h3 className="text-primary mb-4">Application Process</h3>
            <ul className="list-unstyled">
              <li>
                <i className="ri-arrow-right-line me-2" />
                Research scholarships to find those you're eligible for and interested in.
              </li>
              <li>
                <i className="ri-arrow-right-line me-2" />
                Gather required materials (transcripts, test scores, recommendation letters, etc.).
              </li>
              <li>
                <i className="ri-arrow-right-line me-2" />
                Complete the application form thoroughly and accurately.
              </li>
              <li>
                <i className="ri-arrow-right-line me-2" />
                Submit applications by the specified deadlines.
              </li>
              <li>
                <i className="ri-arrow-right-line me-2" />
                Follow up with the scholarship provider to confirm receipt or provide additional documents.
              </li>
              <li>
                <i className="ri-arrow-right-line me-2" />
                Await the decision, which will depend on eligibility and application strength.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
