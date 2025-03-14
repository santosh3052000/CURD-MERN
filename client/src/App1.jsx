import { useState,useEffect } from "react";
import axios from "axios";

function App1(){
    const [users,setUsers] = useState([])
    const [filtredUsers,setFilteredUsers] = useState([])
    const getAllUsers = async()=>{
        try{
            const res = await axios.get("http://localhost:8000/users")
            setUsers(res.data)
            setFilteredUsers(res.data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getAllUsers()
    },[])
    function handleChange(e){
        const searchText = e.target.value.toLowerCase()
        const filtred = users?.filter((user)=>
        user.Name.toLowerCase().includes(searchText) ||
        user.City.toLowerCase().includes(searchText))
        setFilteredUsers(filtred)
    }
    return(
        <>
        <input className="search" placeholder="Search something ..."
        onChange={handleChange}/>
        <tbody>
        {filtredUsers.map((user,index)=>{
                    return(
                        <tr key={user.ID}>
                        <td>{index + 1}</td>
                        <td>{user.Name}</td>
                        <td>{user.Age}</td>
                        <td>{user.City}</td>
                        </tr>
                    )
                })}
        </tbody>
        <button></button>
        </>
    )
}

export default App1