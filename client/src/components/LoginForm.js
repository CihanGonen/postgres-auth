import {useState} from 'react' ;

import Error from './Error';

const LoginForm = ({setLoggedIn,setUser})=>{

  const [errors,setErrors] = useState([]);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const onSubmitForm = async (e)=>{
    e.preventDefault();
    let error = [];
    //check if password is okey
    if (!email || !password){
      error.push({message:'Please fill all fields'});
    }
    if(error.length>0){
      setErrors(error);
    }else{
      await fetch("http://localhost:5000/users/login",{
        method:"POST",
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ email,password }),
      }).then(response => {
        return response.json();
      }).then(async (user) => {
        if(user.msg){
          error.push({message:user.msg});
          setErrors(error);
        }
        else{
          setLoggedIn(true);
          setUser(user);
        }
      });
    }

  }

  return(
    <div>
    <h1 className="text-center mt-5">Login</h1>
    <form className="col-6 mx-auto mt-5" onSubmit = {onSubmitForm}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" id="password" />
      </div>
      {errors.length>0 ?
      <Error errors={errors} />
      :
      <div>
      
      </div>
      }
      <button className="btn btn-success">Login</button>
    </form>
  </div>
  )
}


export default LoginForm;