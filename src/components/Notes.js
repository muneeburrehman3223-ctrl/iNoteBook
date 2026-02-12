import React, { useContext, useEffect, useRef, useState } from "react";

import noteContext from "./context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const updateNote = (currentNote) => {
    console.log("hello world");
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
    ref.current.click();
  };
  const handleClick = (e) => {
    e.preventDefault();
    context.editNote(note.id, note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    refClose.current.click();

    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    console.log("onchange fired");
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter note title"
                    value={note.title}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter note description"
                    rows="3"
                    value={note.description}
                    onChange={onChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    placeholder="Enter note tag"
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.title.length < 5 || note.description.length < 5}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>You Notes</h1>
        <div className="container">
          {notes.length === 0 && "No notes to dispaly"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              showAlert={props.showAlert}
              updateNote={updateNote}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
