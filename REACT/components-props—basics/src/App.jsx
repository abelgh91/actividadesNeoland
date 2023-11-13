import { useState } from 'react'
import './App.css'
import { Title, SubTitle, Paragraph, Image } from './components'

function App() {

  return (
    <>
      <div>
        <Image 
        src='https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png'
        alt='imagen React js'
        width='600'
        height='400' />
        <Title title='The Boat'/>
        <SubTitle subtitle='The Museum' />
        <Paragraph paragraph='Lorem ipsum...' />
      </div>
    </>
  )
}

export default App
