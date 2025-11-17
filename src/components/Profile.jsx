import { Link } from "react-router-dom";

const Profile = () => {

  
  function getUser() {
       const user = JSON.parse(localStorage.getItem("user"));
       return user;
    }
  
  return (
    <>
    <Link className="bg-black text-white w-10 py-1 px-2 rounded-md cursor-pointer relative top-5 left-28" to="/api">Back</Link>
    <div className="flex justify-center w-full my-5 min-h-96">
      <div className="flex flex-col gap-5 bg-white w-[80%] md:w-[60%] lg:w-[50%] h-56 py-5  shadow-md ">
        <p className="flex text-xl md:text-2xl font-bold text-blue-800 justify-center">Your Profile</p>
        <div className="flex flex-col mx-auto gap-4 px-5">
            <p className="md:text-xl font-medium">Username : <span className="text-blue-500">{getUser().username}</span></p>
            <p className="md:text-xl font-medium">Email Id : <span className="text-blue-500">{getUser().email}</span></p>
            <p className="md:text-xl font-medium">Phone No : <span className="text-blue-500">{getUser().phone_no}</span></p>
            
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile
