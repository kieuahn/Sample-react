import React, { useState, useEffect } from "react";
export default function StudentList() {
const [data, setData] = useState([]);
const endPoint = "https://l3k2uf0o64.execute-api.ap-southeast-1.amazonaws.com/test/products" 
const [name, setName] = useState('')
const [id, setId] = useState('')
const save = () => {
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ name: name})
       }).then(data => load())
   }
   else{
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ id: id, name: name})
       }).then(data => load())
   }
 
   }
 
const deleteStudent = (id) => {
     fetch(endPoint + "/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ id: id})
   }).then(data => load())
}
 
const editStudent = (id, name) => {
   setId(id)
   setName(name)
}
//get data from api
const load = () => {
  fetch(endPoint)
    .then(response => response.json())
    .then(data => setData(data.Items));
}
 
//load data automatically
useEffect(() => {
   load()
 }, [])
 
return (
  <div>
      <h1>Form</h1>
 
      Id:<input type="text" value={id} onChange={(e)=>setId(e.target.value)}/><br/> 
      Name:<input type="text" value={name} onChange={(e)=>setName(e.target.value)}/><br/> 
 
      <button onClick={()=> save()}>Save</button>
      <h1>List</h1>
       <table border="1">
       <tr><td>Name</td><td>ID</td><td>Delete</td></tr>
      {data.map(a => (
        <tr>
            <td>{a.name}</td><td>{a.id}</td>
            <td><button onClick={()=> deleteStudent(a.id)}>Delete</button></td>
            <td><button onClick={()=> editStudent(a.id, a.name)}>Edit</button></td>
        </tr>
      ))}
       </table>
  </div>
);
}
