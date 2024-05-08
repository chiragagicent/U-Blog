import {useNavigate} from "react-router-dom";

export default function NotFound(){
    localStorage.removeItem("token");
    const navigate = useNavigate();
    return(
        <>
        <div>
           404 Page Not Found
        </div>
        <div>
            <button onClick={()=>{navigate("/login")}}>Go to Login</button>
        </div>
        </>
    )
}