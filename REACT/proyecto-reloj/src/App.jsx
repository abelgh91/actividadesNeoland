import { useState } from 'react'
import './App.css'
import { Chronometer, CountDown, DigitalClock } from './components';
export const App = () => {

  return (
    <>
    <DigitalClock/>
    <CountDown/>
    <Chronometer/>
    </>
  )
};
