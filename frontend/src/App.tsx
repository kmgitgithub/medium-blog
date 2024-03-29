import { BrowserRouter ,Route , Routes} from  'react-router-dom'
import { Signup } from  './pages/Signup'
import {Signin } from './pages/Signin'
import {Blog} from './pages/Blog'

function App(){

  return(
    <>
    <BrowserRouter>
    <Routes>
    <Route path="Signup" element={<Signup/> }/>
    <Route path="Signin" element={<Signin/>} />
    <Route path="/blog/id:" element={<Blog />} />

    </Routes>
    </BrowserRouter>
    
    
    </>
  )}
  export default App