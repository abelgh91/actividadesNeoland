import './App.css'
import { Title, SubTitle, Image, Paragraph } from './components'

function App() {
  const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png'
  

  return (
    <>
      
      <div className="card">
        <Title />{}
        <SubTitle />{}
        <Image src={imageUrl} alt='logo React js' />{}
        <Paragraph />{}
      </div>
    </>
  )
}

export default App
