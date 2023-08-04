import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'



const Questionbanner = () => {
    return <div className='question_banner1'>
        <Container>
            <div className='question_banner mt-3'>
                <Row>
                    <Col md={12}>
                        <div className='complete_para text-center'>
                            <div className='text_bannwr'>
                                <h3>Good Luck For Your <span className='assignment_color'>Assignment.</span></h3>
                            </div>

                            <div className='para_exam pt-3'>
                                <p>Wishing you success in your exams. May good luck be in your favour, <br />
                                    and your preparation brings fantastic outcomes. All the best!</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    </div>
}

export default Questionbanner;