import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'
import { divide } from 'lodash'

export default function Notes() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/notes")
    .then(res => res.json())
    .then(data => setNotes(data))
    .catch(err => console.log(err))
  }, [])

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: 'DELETE'
    })

    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry 
        breakpointCols={ breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map(note => (
          <div item sm={6} xs={12} md={3} key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
      ))}
      </Masonry>
    </Container>
  )
}
