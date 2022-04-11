import React from 'react'
import '../styles/history.css'
import { Card } from 'react-bootstrap'
import { FaClock, FaCalendar } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

const History = () => {

    const hist = useHistory();

    const token = localStorage.getItem('Token');
    if(!token){
        hist.push('/login');
    }

    return (
        <div className="rowcard">
            <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Text>
                        <FaClock className='icon clock'/> 12:59:22 A.M.
                        <FaCalendar className='icon calendar'/> 19/2/22
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Text>
                        <FaClock className='icon clock'/> 12:59:22 A.M.
                        <FaCalendar className='icon calendar'/> 19/2/22
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Text>
                        <FaClock className='icon clock'/> 12:59:22 A.M.
                        <FaCalendar className='icon calendar'/> 19/2/22
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Text>
                        <FaClock className='icon clock'/> 12:59:22 A.M.
                        <FaCalendar className='icon calendar'/> 19/2/22
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Text>
                        <FaClock className='icon clock'/> 12:59:22 A.M.
                        <FaCalendar className='icon calendar'/> 19/2/22
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Text>
                        <FaClock className='icon clock'/> 12:59:22 A.M.
                        <FaCalendar className='icon calendar'/> 19/2/22
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Text>
                        <FaClock className='icon clock'/> 12:59:22 A.M.
                        <FaCalendar className='icon calendar'/> 19/2/22
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Text>
                        <FaClock className='icon clock'/> 12:59:22 A.M.
                        <FaCalendar className='icon calendar'/> 19/2/22
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default History