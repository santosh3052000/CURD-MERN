import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [users, setUsers] = useState([])
  const [filteredUsers,setFilteredUsers] = useState([])
  const getUsers = async()=>{
    try{
      const res = await axios.get("http://localhost:8000/users")
      setUsers(res.data)
      setFilteredUsers(res.data)
    }catch(err){
      console.error("Error fetching users:", err);
    }
  }
  useEffect(()=>{
    getUsers()
  },[])
  function handleSearchchange(e){
    const searchText = e.target.value.toLowerCase()
    const filtered = users?.filter((user)=>
      user.Name.toLowerCase().includes(searchText) || 
      user.City.toLowerCase().includes(searchText))
      setFilteredUsers(filtered)
  }
  return (
    <>
      <div className='container'>
      <h1>CURD APP using  Vite + React</h1>
      <div className='search'>
        <input 
          className='input-search' 
        type='search' placeholder='Search text here ...'
        onChange={handleSearchchange}/>
        <button className='green'>Add User</button>
      </div>
        <table className='table'>
          <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.map((user,index)=>{
              return(
                <tr key={user.ID}>
            <td>{index + 1}</td>
            <td>{user.Name}</td>
            <td>{user.Age}</td>
            <td>{user.City}</td>
            <td><button className='green'>Edit</button></td>
            <td><button className='red'>Delete</button></td>
            </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App