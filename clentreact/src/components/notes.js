import { React, useEffect, useState } from "react";
import "../styles/notes.css";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaCopy, FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Notes = () => {
  const hist = useHistory();
  const token = localStorage.getItem("Token");
  const [show, setShow] = useState(false);
  const [modalState, setModalState] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (val) => {
    setModalState(val);
    setShow(true);
  };

  const [newNote, setNewNote] = useState({
    title: "",
    subTitle: "",
    description: "",
  });
  const [note, setNote] = useState([]);
  const [updateModalValue, setUpdateModalValue] = useState({
    id: "",
    title: "",
    subTitle: "",
    description: "",
  });

  if (!token) {
    hist.push("/login");
  }

  // Get Notes
  const getNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/getNote", {
        method: "Get",
        headers: {
          "content-type": "application/json",
          AuthToken: token,
        },
      });

      const json = await res.json();
      if (res.status === 200) {
        setNote(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add Notes
  const handleNote = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/addNote", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          AuthToken: token,
        },
        body: JSON.stringify(newNote),
      });

      const json = await res.json();
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Yeyy",
          text: json,
        });
        setNewNote({ title: "", subTitle: "", description: "" });
        handleClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: json,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update Notes
  const openUpdateModal = (id, title, subTitle, description) => {
    handleShow("update");
    setUpdateModalValue({ id, title, subTitle, description });
  };

  const handleUpdate = (e) => {
    setUpdateModalValue({
      ...updateModalValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/updateNote/" + updateModalValue.id,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            AuthToken: token,
          },
          body: JSON.stringify(updateModalValue),
        }
      );

      const json = await res.json();
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Yeyy",
          text: json,
        });
        getNotes();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: json,
        });
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  // Delete Notes
  const deleteNote = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/deleteNote/" + id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          AuthToken: token,
        },
      });

      const json = await res.json();
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Yeyy",
          text: json,
        });
        getNotes();
      } else {
        Swal.fire({
          icon: "success",
          title: "Yeyy",
          text: json,
        });
      }
    } catch (error) {
      console.log("Some Error To Access Delete Button");
    }
  };

  // Delete All Notes
  const deleteAllNote = async (note) => {
    note.map(async (note) => {
      console.log(note);
      const res = await fetch("http://localhost:5000/deleteNote/" + note._id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          AuthToken: token,
        },
      });

      getNotes();

      if (res.status !== 200) {
        return;
      }
    });
  };

  // Copy Text
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    getNotes();
    console.log("UseEffect is running");
  }, [newNote, show]);

  return (
    <>
      <div className="btnContainer my-3">
        <Button
          className="mx-2"
          variant="dark"
          type="button"
          onClick={() => {
            handleShow("add");
          }}
        >
          <FaPlus className="icon" />
          Add Note
        </Button>
        <Button
          className="mx-2"
          variant="dark"
          type="button"
          onClick={() => {
            deleteAllNote(note);
          }}
        >
          <FaTrashAlt className="icon" />
          Delete All
        </Button>
      </div>

      <div className="rowcard">
        {note.length !== 0 ? (
          note.map((note) => {
            return (
              <Card
                className="mainCard my-5 mx-4 text-light"
                bg="dark"
                style={{ width: "20rem", height: "12.5rem" }}
                key={note._id}
              >
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {note.subTitle}
                  </Card.Subtitle>
                  <Card.Text className="cardText">{note.description}</Card.Text>
                  <div className="bottomDiv">
                    <Card.Link
                      onClick={() => {
                        openUpdateModal(
                          note._id,
                          note.title,
                          note.subTitle,
                          note.description
                        );
                      }}
                    >
                      <FaEdit />
                    </Card.Link>
                    <Card.Link
                      onClick={() => {
                        deleteNote(note._id);
                      }}
                    >
                      <FaTrashAlt />
                    </Card.Link>
                    <Card.Link
                      onClick={() => {
                        copyText(note.description);
                      }}
                    >
                      <FaCopy />
                    </Card.Link>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <div className="noteNotAdded">
            <h3>Add Your Notes ... Nothing To show Now !!</h3>
          </div>
        )}
      </div>

      {modalState === "add" ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="title"
                value={newNote.title}
                onChange={handleNote}
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="subTitle"
                value={newNote.subTitle}
                onChange={handleNote}
                placeholder="SubTitle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="description"
                value={newNote.description}
                onChange={handleNote}
                placeholder="Description"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleNoteSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="title"
                value={updateModalValue.title}
                onChange={handleUpdate}
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="subTitle"
                value={updateModalValue.subTitle}
                onChange={handleUpdate}
                placeholder="SubTitle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="description"
                value={updateModalValue.description}
                onChange={handleUpdate}
                placeholder="Description"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleUpdateSubmit}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Notes;
