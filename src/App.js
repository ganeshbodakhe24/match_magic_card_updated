import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Cards_main from './Components/Cards_main';
import Swap from './Components/Swap';
import { createContext,useState } from 'react';
export const GlobalStore=createContext();
function App() {
  const[swapCount,setSwapCount]=useState(0);
  function swapHandler(){
    setSwapCount(swapCount+1);
  }
  function resetHandler(){
    setSwapCount(0);
  }
  return (
   <>
    <Header></Header>
    <GlobalStore.Provider value={{swapCount:swapCount,swapHandler:swapHandler,resetHandler:resetHandler}}>
    <Cards_main></Cards_main>
    <Swap></Swap>
    </GlobalStore.Provider>
    <Footer></Footer>
   </>
  );
}

export default App;
