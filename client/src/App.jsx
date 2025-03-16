import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [users, setUsers] = useState([])
  const [filteredUsers,setFilteredUsers] = useState([])
  const [isModelOpen,setIsModelOpen] = useState(false)
  const [userData,setUserData] = useState({Name:'',Age:'',City:''})
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
  const deleteHandler = async(id)=>{
    const isConfirmed = window.confirm('Wanna delete user ?')
    if(isConfirmed){
      const res = await axios.delete(`http://localhost:8000/users/${id}`)
      setUsers(res.data)
      setFilteredUsers(res.data)
    }
  }
  const handleAddUser = ()=>{
    setUserData({Name:'',Age:'',City:''})
    setIsModelOpen(true)
  }
  const handleClose = ()=>{
    setIsModelOpen(false)
  }
  const handleInput = (e)=>{
    const {name , value} = e.target
    setUserData({
      ...userData,
      [name]: name === "Age" ? Number(value) : value,
    })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(userData.id){
      if(Name && Age && City){
        await axios.put(`http://localhost:8000/users/${userData.id}`,userData)
        setIsModelOpen(false)
        getUsers()
        window.alert('User Edited !')
      }else{window.alert('All fields are required !')}
    }else{
      const {Name,Age,City} = userData
    if(Name && Age && City){
      await axios.post("http://localhost:8000/users",userData)
      setIsModelOpen(false)
      getUsers()
      window.alert('User added !')
    }else{window.alert('All fields are required !')}
    }
  }
  const handleEdit = (user,id)=>{
    setUserData({ ...user, id })
    setIsModelOpen(true)
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
        <button className='green' onClick={handleAddUser}>Add User</button>
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
                <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.Name}</td>
            <td>{user.Age}</td>
            <td>{user.City}</td>
            <td><button className='green' onClick={()=>handleEdit(user,user._id)}>Edit</button></td>
            <td><button className='red' onClick={()=> deleteHandler(user._id)}>Delete</button></td>
            </tr>
              )
            })}
          </tbody>
        </table>
        {isModelOpen && (
          <div className='model'>
            <div className='model-content'>
              <span className='close' onClick={handleClose}>&times;</span>
              <h2>User Record</h2>
              <div className="input-group">
                <label>Name : </label>
                <input type='text' name="Name" value={userData.Name} id='Name' onChange={handleInput}/>
                <label>Age : </label>
                <input type='number' name="Age" value={userData.Age} id='Age' onChange={handleInput}/>
                <label>City : </label>
                <input type='text' name="City" value={userData.City} id='City' onChange={handleInput}/>
                <button className='green' onClick={handleSubmit}>{userData.id?'Update':'Add'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App