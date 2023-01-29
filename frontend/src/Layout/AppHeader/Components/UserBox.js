import React from 'react';
import { DropdownToggle, DropdownMenu, Nav, Button, NavItem, NavLink, UncontrolledTooltip, UncontrolledButtonDropdown } from 'reactstrap';
import { faCalendarAlt, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UserLogin } from '../../../Actions/AuthAction';
import { Redirect } from 'react-router-dom';

const UserBox = (props) => {
    const user = useSelector(state => state.AuthReducer.user);
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.clear();
        dispatch(UserLogin('Logout'));
        window.location.href = 'login';
    }


    return (
        <div className="header-btn-lg pe-0">
            <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                    <div className="widget-content-left">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="link" className="p-0">
                                {/* <img width={42} className="rounded-circle" src={avatar1} alt="" /> */}
                                <FontAwesomeIcon className="ms-2 opacity-8" icon={faAngleDown} />
                            </DropdownToggle>
                            <DropdownMenu end className="rm-pointers dropdown-menu-sm">
                                <Nav vertical>
                                    <NavItem>
                                        <NavLink href='/#/changePass'>
                                            Change Pin
                                        </NavLink>
                                        <NavLink onClick={logout}>
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                    <div className="widget-content-left  ms-3 header-user-info">
                        <div className="widget-heading">
                            {user?.firstname}  {user?.middleName} {user?.lastname}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserBox;