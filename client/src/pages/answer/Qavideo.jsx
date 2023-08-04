import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Video1 from '../../assets/video1.png'
import Questionbanner from '../../compnent/hr/Questionbanner'
import Hrappbar from '../../compnent/hr/Hrappbar';


const Qavideo = () => {
  const { id, applicantId } = useParams();
  // console.log(appid,"cl");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get-job/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log(jsonData); // Display the fetched data in the console

        // Assuming the API response contains a 'questions' array
        if (jsonData && jsonData[0].questions) {
          setQuestions(jsonData[0].questions);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);
  console.log(questions)

  // this is question id

  // this the fetch video
  const fetchVideo = async (questionId) => {
    // console.log(questionId,"i called")

    try {
      const response = await fetch(`/videos/${id}/${applicantId}/${questionId}`); // Replace this URL with the correct endpoint for fetching the video

      if (!response.ok) {
        throw new Error('Failed to fetch recorded video');
      }
      const videoBlob = await response.blob(); // Fetch the video as a binary blob
      const videoUrl = URL.createObjectURL(videoBlob); // Create a URL for the blob data

      // Now you can display the video using the videoUrl
      // For example, you can create an HTML5 video element and append it to the DOM
      const videoElement = document.createElement('video');

      let videoElement2 = document.getElementById("videoplay");


      videoElement.src = videoUrl;
      videoElement.controls = true; // Show video controls (play, pause, etc.)
      // Append the video element to the document or a specific container
      videoElement2.innerHTML = '';
      videoElement2.appendChild(videoElement);


      // todo
      // let videoElement2 =  document.getElementById("videoplay");
      // const videoElement = document.createElement('video');
      // videoElement.src = videoUrl;
      // videoElement.controls = true; 

      // videoElement2.innerHTML = '';
      // videoElement2.appendChild(videoElement);
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., show an error message to the user.
    }
  }

  return <div>
    <Hrappbar />
    <Questionbanner />
    <div>
      <Container>
        <Row className='mt-5'>
          <Col md={7} >
            <Card className='card_box py-5'>
              <div className='heading_interview'>
                <h3>interview questions</h3>
              </div>
              <ul>
                {questions.map((question, index) => (
                  <li className='pt-4 question_ty py-2' key={index} onClick={() => fetchVideo(question._id)}>Q.{question.question}</li>
                ))}
              </ul>

            </Card>
          </Col>
          <Col md={5}>
            <Card>
              <div className='videobox' >
                <div id="videoplay">
                  <img src={Video1} alt="Default Image" className='video1_img' />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
}

export default Qavideo;