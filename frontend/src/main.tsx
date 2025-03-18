import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
// import AdminVideoAccess from './AdminVideoAccess.tsx'
import {Toaster} from "sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors/>
    <BrowserRouter>
    <Routes>

    
    <Route path='/' element={<App/>} />
    {/* <Route path='/admin/videos' element={<AdminVideoAccess/>}/> */}
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
