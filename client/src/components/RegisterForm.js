import {useState} from 'react';
import Error from './Error';

const RegisterForm = ({setCurr})=>{

  const [errors,setErrors] = useState([]);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [password2,setPassword2] = useState("");

  const onSubmitForm = async (e)=>{
    e.preventDefault();
    try{

      let error = [];
      //check if password is okey
      if (!name || !email || !password || !password2){
        error.push({message:'Please fill all fields'});
      }
      if(password.length<6){
        error.push({message:'Password should be at least 6 characters'});
      }
      if(password !== password2){
        error.push({message:'Passwords should match'});
      }
      if(error.length>0){
        setErrors(error);
        error.map(err=>console.log(err.message));
      }

      //if password is okey
      else{
        //check if email exists
        const getAllPromise = fetch("http://localhost:5000/users/mail",{
          method:"POST",
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({ email }),
        });
        getAllPromise.then(response => {
          return response.json();
        }).then(async (users) => {
          //if email exists
          if(users.length>0){
            error.push({message:'Email exists'});
            setErrors(error);
          } 
          //if email doesn't exists
          else{
            const data = {name,email,password};
            await fetch("http://localhost:5000/users/register",{
              method:"POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            }).then(()=> setCurr('login'));
          }  
        })
        .catch(err=>console.log(err));
      }
  
    }catch(err){
      console.log(err.message);
    }
  }

  return(
    <div>
      <h1 className="text-center mt-5">Register</h1>
      <form className="col-6 mx-auto mt-5" onSubmit = {onSubmitForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} className="form-control" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="password2" className="form-label">Password Again</label>
          <input type="password" value={password2} onChange={e=>setPassword2(e.target.value)} className="form-control" id="password2" />
        </div>
        {errors.length>0 ?
        <Error errors={errors} />
        :
        <div>
        
        </div>
        }
        <button className="btn btn-success mb-5">Register</button>
      </form>
    </div>

  )
}

export default RegisterForm;