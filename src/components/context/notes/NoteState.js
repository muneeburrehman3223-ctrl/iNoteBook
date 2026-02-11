import React, { useState } from "react";
import NoteContext from "./noteContext";

// 🔹 Step 1: Centralized backend URL
// Local backend
const API_URL = "http://localhost:5000";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // 🔹 1. Fetch all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("Failed to fetch notes:", json);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // 🔹 2. Add a new note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${API_URL}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // 🔹 3. Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      console.log("Deleted note:", json);

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // 🔹 4. Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${API_URL}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log("Updated note:", json);

      const newNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });

      setNotes(newNotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
