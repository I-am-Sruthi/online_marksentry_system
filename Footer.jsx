import "./Styles.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Footer(){
    const navigate = useNavigate();


    const handleLogout = () => {
        logout(navigate);
    };
    const logout = (navigate) => {
        localStorage.removeItem('token'); // Remove token from localStorage
        navigate('/'); // Redirect to login page
    };
    return(
        <span className="buttonfixed">
            <div className='logoutbutton'>
                <button type="button" class="btn btn-danger" onClick={handleLogout}><i class="bi bi-box-arrow-right"></i> Log Out</button>
            </div>
        </span>
            
        
    )
}
export default Footer;