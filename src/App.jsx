import { useState } from 'react'
import axios from 'axios'
import './App.css'

function Notification({info}) {
  if (!info.message)
    return

  const style = {
    color: info.type === 'error' ? 'red' : 'green',
    background: '#1c1c1c',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }


  return (
    <div style={style}>
      {info.message}
    </div>
  )
}

function App() {
  const [newLinkIn, setNewLinkIn] = useState('')
  const [newLinkOut, setNewLinkOut] = useState('')
  const [info, setInfo] = useState({ message: null })

  const clearFields = () => {
    setNewLinkIn('')
    setNewLinkOut('')
  }

  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })
  }

  const addUrl = e => {
    e.preventDefault()
    const newLink = { linkIn: newLinkIn, linkOut: newLinkOut }
    axios.post('/api/links', newLink)
      .then(r => {
        const url = window.location.href + r.data.linkIn
        notifyWith(<a href={url}>{url}</a>)
        clearFields()
      })
      .catch(e => notifyWith(e.response.data.error, 'error'))
  }

  return (
    <>
      <h1>Link-Chan Link Generator</h1>
      <form onSubmit={addUrl}>
        <p>
          link &nbsp;
          <input type="text" required value={newLinkOut} onChange={e => setNewLinkOut(e.target.value)}/>
        </p>
        <p>
          to 
        </p>
        <p>
          {window.location.href}
          <input type="text" placeholder='optional' style={ { width: 100 } }value={newLinkIn} onChange={e => setNewLinkIn(e.target.value)}/>
        </p>
        <button type='submit'>GET URL</button>
        <Notification info={info}/>
      </form>
    </>
  )
}

export default App
