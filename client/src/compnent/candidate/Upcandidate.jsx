import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import candidateform from "../../assets/pana.png";
import { useNavigate, useParams } from "react-router-dom";
import Candibar from "./Candibar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const Upcandidate = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState({});
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [rdoc, setRdoc] = useState("");
  const [pimage, setPimage] = useState("");
  const [title, setTitle] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [experience, setExperience] = useState("");
  const [otherEducation, setotherEducation] = useState("");
  const [Courses, setCourses] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [futureDateSelected, setFutureDateSelected] = useState(false);

  const navigate = useNavigate();

  //This api used for the prefill 
  useEffect(() => {
    fetch(`/api/candidates/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch candidate data");
        }
        return response.json();
      })
      .then((data) => {
        setCandidate(data);
        setFullname(data.fullname);
        setDob(data.dob);
        setState(data.state);
        setSalary(data.salary);
        setLocation(data.location);
        setEducation(data.education);
        setGender(data.gender);
        setSkills(data.skills);
        setRdoc(data.rdoc);
        setPimage(data.pimage);
        setTitle(data.title);
        setAboutme(data.aboutme);
        setExperience(data.experience);
        setotherEducation(data.otherEducation);
        setCourses(data.Courses);
        setCity(data.city)
        setCountry(data.country)
      })
      .catch((error) => {
        // console.error(error);
        // Handle the error, e.g., display an error message or redirect to an error page
      });
  }, [id]);


  const upcandiSubmit = () => {
    const formData = new FormData();
    formData.append("pimage", pimage);
    formData.append("rdoc", rdoc);
    formData.append("fullname", fullname);
    formData.append("state", state);
    formData.append("salary", salary);
    formData.append("location", location);
    formData.append("education", education);
    formData.append("gender", gender);
    formData.append("skills", skills);
    formData.append("dob", dob);
    formData.append("title", title);
    formData.append("about_me", aboutme);
    formData.append("Experience", experience);
    formData.append("Courses", Courses);
    formData.append("country", country);
    formData.append("city", city);


    // Add the 'otherEducation' field to the formData if education is 'Others'
    if (education === "Others") {
      formData.append("otherEducation", otherEducation);
    }


    fetch(`/api/update/${id}`, {
      method: "PUT",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        // console.error(error);
      });

    navigate("/profile");
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setRdoc(file);
    } else {
      // Display an error message or perform any other validation logic
      alert("Invalid file format. Please upload a PDF file.");
    }
  };

  // check data
  const checkFutureDate = (selectedDate) => {
    const currentDate = new Date();
    const selectedDateTime = new Date(selectedDate).getTime();

    if (selectedDateTime > currentDate.getTime()) {
      setFutureDateSelected(true);
    } else {
      setFutureDateSelected(false);
    }
  };

  return (
    <section className="upcandidate">
      <Candibar />

      <Container>
        <Row className="py-4">
          <Col md={12}>
            <Breadcrumb className="heading_properties">
              <Breadcrumb.Item href="#" className="link_breadcrumb">
                Candidate Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="link_breadcrumb" href="#">
                Create Profile
              </Breadcrumb.Item>
              <Breadcrumb.Item className="link_breadcrumb" active>
                candidate profile edit
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={12}>
            <div className="candidate_head">
              <h3>
                Candidate
                <span className="job_profile"> Profile edit</span>
              </h3>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={5} className="mt-4">
            <Form>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicDob">
                    <Form.Label className="form_title">DOB</Form.Label>
                    <Form.Control
                      type="date"
                      className="candidate_inputs"
                      placeholder="Enter DOB"
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value);
                        checkFutureDate(e.target.value); // Check for future date
                      }}

                    />
                  </Form.Group>
                  {futureDateSelected && (
                    <div className="error-popup">
                      Future dates are not allowed.
                    </div>
                  )}
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicDob">
                    <Form.Label className="form_title">Salary</Form.Label>
                    <Form.Control
                      type="text"
                      className="candidate_inputs"
                      placeholder="Enter Your Salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEducation">
                    <Form.Label className="form_title">Education</Form.Label>
                    <Form.Control
                      as="select"
                      className="candidate_inputs"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="" disabled selected>
                        Select Education
                      </option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Others">Others</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                {education === "Others" && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicCustomEducation">
                      <Form.Label className="form_title">Others Education</Form.Label>
                      <Form.Control
                        type="text"
                        className="candidate_inputs"
                        placeholder="Enter Others Education"
                        value={otherEducation}
                        onChange={(e) => setotherEducation(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                )}
                {!["Others"].includes(education) && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEducation">
                      <Form.Label className="form_title">Courses</Form.Label>
                      <Form.Control
                        type="text"
                        className="candidate_inputs"
                        placeholder="Enter Your Courses"
                        value={Courses}
                        onChange={(e) => setCourses(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                )}
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEducation">
                    <Form.Label className="form_title">Skills</Form.Label>
                    <Form.Control
                      type="text"
                      className="candidate_inputs"
                      placeholder="Enter Your Skills"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={2} />
          <Col md={5} className="backgroud">
            <img src={candidateform} alt="candidate" />
          </Col>
        </Row>

        <Row className="pt-4">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicCimage">
              <Form.Label className="form_title">Candidate image</Form.Label>
              <Form.Control
                type="file"
                className="candidate_inputs"
                placeholder="Enter png jpg format"
                onChange={(e) => setPimage(e.target.files[0])}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicResume">
              <Form.Label className="form_title">Candidate Resume</Form.Label>
              <Form.Control
                type="file"
                className="candidate_inputs"
                placeholder="Enter doc, word"
                onChange={handleResumeChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label className="form_title">Gender</Form.Label>
                <Form.Control
                  type="text"
                  className="candidate_inputs"
                  placeholder="Enter Gender (male, female, others)"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Col>

          <Col md={6}>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label className="form_title">Job Title</Form.Label>
                <Form.Control
                  type="text"
                  className="candidate_inputs"
                  placeholder="Enter Fresher, Current job Position"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Col md={12}>
              <Form.Label className="form_title">About Me</Form.Label>
              <FloatingLabel controlId="floatingTextarea2" label="About Me">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "300px" }}
                  value={aboutme}
                  onChange={(e) => setAboutme(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Col>
        </Row>

        <Row className="py-3">
          <Col md={6}>
            <section className="button_more">
              <Button className="more_view mr-4" onClick={upcandiSubmit}>
                Submit
              </Button>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Upcandidate;