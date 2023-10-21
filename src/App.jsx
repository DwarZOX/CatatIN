import React from "react";
import Navbar from "./components/Navbar";
import NoteInput from "./components/NoteInput";
import { getInitialData, showFormattedDate } from './utils/data'
import Card from "./components/Card";
import './index.css'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      notes: getInitialData(),
      archived:[]
    }

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this)
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this)
    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this)
    this.onToggleArchiveNoteHandler = this.onToggleArchiveNoteHandler.bind(this)
    this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this)
  }

  onAddNoteHandler({title,body,archived}) {
    this.setState((prevState) => {
      return {
        notes : [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: `${showFormattedDate(new Date())}`,
            archived,
          }
        ]
      }
    })
  }

  onDeleteNoteHandler(id) {
    const updatedNotes = this.state.notes.filter(note => note.id !== id)
    const updatedArchived = this.state.archived.filter(note => note.id !== id)
    this.setState({
      notes: updatedNotes,
      archived: updatedArchived,
      search: ""
    })
  }

  onArchiveNoteHandler(id) {
    const updatedNotes = this.state.notes.filter((note) => note.id !== id);
    const archivedNote = this.state.notes.find((note) => note.id === id);
  
    this.setState((prevState) => ({
      notes: updatedNotes,
      archived: [...prevState.archived, archivedNote],
    }));
  }

  onToggleArchiveNoteHandler(id) {
    const updatedArchived = this.state.archived.filter(note => note.id !== id);
    const unarchivedNote = this.state.archived.find(note => note.id === id);
  
    if (unarchivedNote) {
      unarchivedNote.archived = false
    }
  
    this.setState((prevState) => ({
      archived: updatedArchived,
      notes: [
        ...prevState.notes, 
        unarchivedNote
      ]
    }));
  }

  onSearchNoteHandler(e) {
    this.setState({search: e.target.value})
  } 

  render() {
    
    const filteredNotes = this.state.search
  ? this.state.notes.filter(note => !note.archived &&
        note.title.toLowerCase().includes(this.state.search.toLowerCase())
    )
  : this.state.notes;

    return (
      <>
        <Navbar value={this.search} onChange={this.onSearchNoteHandler}/>
        <div className="container">
          <h1>Create New Note</h1>
          <NoteInput addNote={this.onAddNoteHandler}/>
          <h2>Note(s) List</h2>
          <div className="card-list">
          {filteredNotes.length > 0 ? (
            <Card
              notes={filteredNotes}
              onDelete={this.onDeleteNoteHandler}
              onToggleArchive={this.onArchiveNoteHandler}
              isArchived={false}
            />
            ) : (
              this.state.notes.length > 0 ? (
                <h3>Notes not found</h3>
              ) : (
                <h3>No notes have been made yet</h3>
              )
            )}
          </div>
          <h2>Archived*</h2>
          <div className="card-list">
          {this.state.archived.length > 0 ? (
            <Card notes={this.state.archived} onDelete={this.onDeleteNoteHandler}
            onToggleArchive={this.onToggleArchiveNoteHandler} isArchived={true}/>
          ) :
          (
            <h3>No notes have been archived yet</h3>
          )
          }
          </div>
        </div>
      </>
    )
  }
}

export default App