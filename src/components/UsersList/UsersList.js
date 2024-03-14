import React, {useEffect, useState} from 'react';
import './userslist.css';
import {FaPhone} from "react-icons/fa6";
import {MdEmail} from "react-icons/md";
import UserPopupModal from "../UserPopup/UserPopupModal";

function UsersList() {
    const [users, setUsers] = useState([]);
    const [singleUser, setSingleUser] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchUsers('')

    }, []);

    const fetchUsers = (searchTerm) => {
        let url = 'http://127.0.0.1:3000';
        if (searchTerm) {
            url += `?term=${searchTerm}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }

    const handleSearch = (value) => {
        fetchUsers(value)
    }
    const handleShowPopup = (user) => {
        setSingleUser({...user})
        setShowPopup(true)
    }

    return (
        <>
            <div className="container mt-5">
                <input
                    type="text"
                    id="searchInput"
                    className="form-control mb-3"
                    placeholder="Search users..."
                    onChange={(ev) => {
                        handleSearch(ev.target.value)
                    }}
                />
                <div className="userList">
                    {users && users?.length !== 0 ?
                        users?.map(user =>
                            <div
                                key={user.name}
                                className='user-card'
                                onClick={() => handleShowPopup(user)}>
                                <h2>{user?.name}</h2>
                                <p><strong><FaPhone/></strong><span>{user?.phone}</span></p>
                                <p><strong><MdEmail/></strong><span>{user?.email}</span></p>
                            </div>
                        )
                        : null}
                </div>
            </div>
            {showPopup ?
                <UserPopupModal
                    user={singleUser}
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    setSingleUser={setSingleUser}/>
                : null}

        </>
    );
}

export default UsersList;