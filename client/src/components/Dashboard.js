
const Dashboard = ({user,setLoggedIn})=>{
  return(
    <div className="text-center mt-5">
      <button className="btn btn-primary mb-5" onClick={()=>setLoggedIn(false)}>Logout</button>
      <h1>Welcome {user.name}</h1>
    </div>
  )
}

export default Dashboard;