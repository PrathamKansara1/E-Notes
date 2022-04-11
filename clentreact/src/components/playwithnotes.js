import React, { useEffect, useState } from 'react'
import { FaCopy, FaPlus, FaRegCopy, FaWindowClose } from 'react-icons/fa'
import { Button,Card } from 'react-bootstrap'
import '../styles/playwithnotes.css'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const PlayWithNotes = () => {

  const hist = useHistory();

  const token = localStorage.getItem('Token');
  if (!token) {
    hist.push('/login');
  }

  toast.configure()

  const [note, setNote] = useState([]);
  const [selectedNote, setSelectedNote] = useState([])
  const [className, setClassName] = useState('selectNoteContainer hidden')
  const [mainClassName, setMainClassName] = useState('container maincontent')
  const [selectedNoteClassName, setSelectedNoteClassName] = useState('selectedNoteContainer hidden')
  const [updatedTextFeature, setUpdatedTextFeature] = useState('')
  const notify = () => toast("Copied");

  // Get Notes
  const getNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/getNote", {
        method: "Get",
        headers: {
          "content-type": "application/json",
          "AuthToken": token
        }
      })

      const json = await res.json();
      if (res.status === 200) {
        setNote(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Handling Clicks 
  const handleSelectClick = () => {
    setClassName('selectNoteContainer');
    setMainClassName('container maincontent hidden')
    setSelectedNoteClassName('selectedNoteContainer hidden')
  }

  const handleCloseBtn = () => {
    console.log("Clicked");
    setClassName('selectNoteContainer hidden')
    setMainClassName('container maincontent')
  }

  const handleNoteClick = (note) => {
    console.log(note._id);
    console.log(note.subTitle);
    console.log(note.title);
    console.log(note.description);
    setSelectedNoteClassName('selectedNoteContainer')
    setClassName('selectNoteContainer hidden')
    setSelectedNote(note)
    setUpdatedTextFeature(note.description)
  }

  const handleCopyBtn = (text)=>{
    navigator.clipboard.writeText(text);
    notify();
  }

  const handleUpperCase = (text)=>{
    let upperCaseText = text.toUpperCase();
    setUpdatedTextFeature(upperCaseText)
  }

  const handleLowerCase = (text)=>{
    let lowerCaseText = text.toLowerCase();
    setUpdatedTextFeature(lowerCaseText)
  }

  const handleRemoveSpaces = (text)=>{
    let removeSpaceText = text.replaceAll(/\s/g,' ');
    setUpdatedTextFeature(removeSpaceText)
  }

  const handleRemoveNumbers = (text)=>{
    let removeNumberText = text.replace(/[0-9]/g, '');    
    setUpdatedTextFeature(removeNumberText)
  }

  const handleRemoveExtraSpace = (text)=>{
    let removeExtraSpaceText = text.trim();    
    setUpdatedTextFeature(removeExtraSpaceText);
  }

  const handleSpecialCharacter = (text)=>{
    let removeSpecialCharacter = text.replace(/[&\/\\#,+()$@~%.'":*?<>{}]/g, '');
    setUpdatedTextFeature(removeSpecialCharacter)
  }

  useEffect(() => {
    getNotes();
    console.log("UseEffect is Running");
  }, [])

  return (
    <>
      <div className={mainClassName}>
        <button onClick={handleSelectClick}><FaPlus className='icon' />Select Note</button>
      </div>


      <div className={className}>
        <div className="selectNote">
          <div className="closeContainer">
            <p>Your Notes</p>
            <Button onClick={handleCloseBtn} className='closeBtn' variant='dark'>X</Button>
          </div>
          {
            note.length !== 0 ?
              note.map((note) => {
                return <div className="noteSection" key={note._id}>
                  <div className="textContainer">
                    <h4> {note.title} </h4>
                    <h5> {note.subTitle} </h5>
                  </div>
                  <div className="btncontainer">
                    <Button onClick={() => { handleNoteClick(note) }} variant='dark'> Select Note </Button>
                  </div>
                </div>
              }) :
              <div className="noteNotAvailable">
                <h3>Notes Are Not Available </h3>
              </div>
          }
        </div>
      </div>


      <div className={selectedNoteClassName}>
        <Card className='mainCard my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
          <Card.Body>
            <Card.Title>{selectedNote.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{selectedNote.subTitle}</Card.Subtitle>
            <Card.Text className='cardText'>
              {selectedNote.description}
            </Card.Text>
          </Card.Body>
        </Card>
        <Button className='selectAnotherBtn' onClick={handleSelectClick} variant='dark'>Select Another</Button>
        <div className="noteFeatures">
          <Button variant='dark mx-2 my-4' onClick={()=>{handleUpperCase(updatedTextFeature)}}>Convert to UpperCase</Button>
          <Button variant='dark mx-2 my-4' onClick={()=>{handleLowerCase(updatedTextFeature)}}>Convert to LowerCase</Button>
          <Button variant='dark mx-2 my-4' onClick={()=>{handleRemoveSpaces(updatedTextFeature)}}>Remove Spaces</Button>
          <Button variant='dark mx-2 my-4' onClick={()=>{handleRemoveNumbers(updatedTextFeature)}}>Remove Numbers</Button>
          <Button variant='dark mx-2 my-4' onClick={()=>{handleRemoveExtraSpace(updatedTextFeature)}}>Remove Extra Space</Button>
          <Button variant='dark mx-2 my-4' onClick={()=>{handleSpecialCharacter(updatedTextFeature)}}>Remove Special Characters</Button>
        </div>
        <div className="displayText container">
          <div className="copyBtnContainer"><FaRegCopy className='copyBtn' onClick={()=> { handleCopyBtn(updatedTextFeature) }}></FaRegCopy></div>
          <h5 id='updatedText'> { updatedTextFeature } </h5>
        </div>
      </div>
    </>
  )
}

export default PlayWithNotes