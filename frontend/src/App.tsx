import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom' 
import UserTable from './components/UserTable'
import UserForm from './components/UserForm'

function App() {


  return (
    <>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/add-user">Add User</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>} />
          <Route path='/users' element={<UserTable/>}/>
          <Route path='/add-user' element={<UserForm adduser={() => {}} />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
