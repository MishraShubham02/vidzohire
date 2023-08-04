import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aplicantbanner from './Aplicantbanner';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Hrappbar from '../../compnent/hr/Hrappbar';

const Applicate = () => {
  const { id } = useParams();
  const [applicantDetails, setApplicantDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [appid, setAppid] = useState("64bf5e88cb5f73c56dc2c97c");
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch applicant details
    const fetchApplicantDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/applicants/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch applicant details');
        }
        const data = await response.json();
        const applicants = data.applicants; // Update this with the correct property holding the applicant details
        console.log(applicants,'applicants');
        setApplicantDetails(applicants);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchApplicantDetails();
  }, [id]);

  const handleCheckExamClick = async (id, applicantId) => {
    navigate(`/qavideo/${id}/${applicantId}`);
  };

  // console.log(applicantDetails,"checking")

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (

    <div className='applicant_bg'>
      <Hrappbar />,
      <Aplicantbanner />,
      <Container>
        <Row className='py-4'>
          <Col md={12}>
            <Breadcrumb className="heading_properties">
              <Breadcrumb.Item href="#" className="link_breadcrumb">
                Employer Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="link_breadcrumb" href="">
                All Jobs Applicants
              </Breadcrumb.Item>
              <Breadcrumb.Item className="link_breadcrumb" active>
                Check Exam
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Container>
      <Container className='py-4'>
        <Table  striped="columns" bordered hover size="lg" responsive>
          <thead className='t_head Table_heading'>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Position</th>
              <th>Skills</th>
              <th>Exam</th>
            </tr>
          </thead>
          <tbody>
            {applicantDetails.map((applicant, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="images_user_applicant d-flex">
                    <span className='name_applicant'>
                      {/* <img src={applicant.pimage} alt="" /> */}
                      {applicant.name} <br />
                      {applicant.email}
                    </span>
                  </div>
                </td>
                <td>
                  <span className='name_applicant'>{applicant.title}</span>
                </td>
                <td>
                  <span className='name_applicant'>{applicant.skills}</span>
                </td>
                <td>
                  {/* <span className='name_applicant'>
                  <Button
                    className='secondary_btn'
                    onClick={() => handleCheckExamClick(applicant.jobId, applicant.questionId, applicant.candidateId)}
                  >
                    Check Exam
                  </Button>
                </span> */}

                  <button className='check_btn' onClick={() => handleCheckExamClick(id, applicant._id)}>Check Exam</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>


    </div>
  );
};

export default Applicate;
