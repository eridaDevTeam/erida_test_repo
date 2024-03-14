import React, {useEffect} from 'react';
import './userpopup.css'
import {IoClose} from "react-icons/io5";

function UserPopupModal({user, setSingleUser, showPopup, setShowPopup}) {

    const handleCloseModal = () => {
        setSingleUser({})
        setShowPopup(false);
    }
    return (
        <div id="userPopup" className="popup" onClick={handleCloseModal}>
            <div className="popup-content">
                <span className="close" onClick={handleCloseModal}><IoClose size={30}/></span>
                <div id="userInfo">
                    <h2>{user?.name}</h2>
                    <p><strong>Phone:</strong> <span>{user?.phone}</span></p>
                    <p><strong>Mail:</strong> <span>{user?.email}</span></p>
                    <p><strong>Address:</strong> <span>{user?.address}</span></p>
                    <p><strong>Date of admission:</strong> <span>{user?.hire_date}</span></p>
                    <p><strong>Position:</strong> <span className="text-width-80">{user?.position_name}</span></p>
                    <p><strong>Branch:</strong> <span className="text-width-80">{user?.department}</span></p>
                </div>
            </div>
        </div>
    );
}

export default UserPopupModal;