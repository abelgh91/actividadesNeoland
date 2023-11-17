import './App.css'
import { Footer, Header, Main, NavBar, Title } from './components';
import { Outlet } from 'react-router-dom';

export const App=()=> {

  return (
    <>
    <div>
    <Header>
      <Title text='Bienvenido al mundo de Hiru' />
      <NavBar />
    </Header>
    <div>
    <Main>
      <Outlet />
    </Main>
    </div>
    <Footer text='AyGorrion Studios S.A'/>
    </div>
    </>
  )
};