import { Route, Routes, Navigate } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'
import './App.css'
import Layout from './pages/tasks/Layout'
import TaskPage from './pages/tasks/TaskPage'
import UserAuthInit from './components/UserAuthInit'
import ScrumBoard from './pages/tasks/ScrumBoard'
function App() {
  return (
    <>
    <UserAuthInit/>
      <Routes>
        <Route path='/' element={<Navigate to='/auth/signin'/>}></Route>
        <Route path='/auth'>
          <Route path='signup' element={<Signup />}></Route>
          <Route path='signin' element={<Signin />}></Route>
        </Route>
        <Route path='/tasks' element={<Layout />}>
          <Route path='list' element={<TaskPage />}></Route>
          <Route path='scrum-board' element={<ScrumBoard/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
