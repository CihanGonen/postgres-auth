
const Error = ({errors})=>{
  return(
    <div>
      {errors.map(err=>{
        return(<div className="bg-danger text-white mb-3 p-2">{err.message}</div>)
      })}
    </div>
  )

}

export default Error;