import { useState } from 'react'
import './App.css'
import { Footer, Header, Main } from './components'


export const App =()=> {

  return (
    <>
    <div>
      <Header text="The Boat"/>
      <Main />
      <Footer SubTitle="SubTitle"/>
    </div>
      
    </>
  )
};