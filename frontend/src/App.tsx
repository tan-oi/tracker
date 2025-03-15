

import './App.css'


import { MainContent } from './components/main-content'
import Navbar from './components/navbar'


function App() {

  return (
    <>  
    
      {/* <ContestsList/> */}
      <div className='min-h-screen bg-background flex flex-col'>

        <header className='border-b'>
         <Navbar/>
        </header>
          <MainContent/>
      </div>
    </>
  )
}

export default App
