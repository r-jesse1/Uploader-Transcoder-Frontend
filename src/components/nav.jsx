import { Link } from 'react-router-dom';
import React from 'react';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
//import LogoutButton from "./Logout"
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
import { useContext } from 'react';
import { UserContext } from '../App';

function Navibar(props) {
    const { user, setUser } = useContext(UserContext);
  if (user) {
    return (
        <div>
          <Navbar className={'Navibar'} fixed={"top"} container={"fluid"} expand={"md"}>
  
            <Nav className="me-auto" style={{ color: '#F9F5F1' }} navbar>
              <NavItem>
                <NavLink className={'Navibar'} tag={Link} to="/">Public Videos</NavLink>
              </NavItem>
  
              <NavItem>
                <NavLink className={'Navibar'} tag={Link} to="/myvideos" >My Videos</NavLink>
              </NavItem>
  
              <NavItem>
                <NavLink className={'Navibar'} tag={Link} to="/upload" >Upload</NavLink>
              </NavItem>
  
              <NavItem>
                <NavLink className={'Navibar'} tag={Link} to="/stats">Stats</NavLink>
              </NavItem>
  
              <NavItem>
                <NavLink className={'Navibar'} tag={Link} to="/load">Load Server</NavLink>
              </NavItem>
  
              <NavItem>
                <NavLink className={'Navibar'} tag={Link} to="/logout">Logout</NavLink>
              </NavItem>
            </Nav>
  
          </Navbar>
        </div>
      )
  }
  else {
    return (
      <div>
        <Navbar className={'Navibar'} fixed={"top"} container={"fluid"} expand={"md"}>

          <Nav className="me-auto" style={{ color: '#F9F5F1' }} navbar>
            <NavItem>
              <NavLink className={'Navibar'} tag={Link} to="/">Public Videos</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className={'Navibar'} tag={Link} to="/myvideos" >My Videos</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className={'Navibar'} tag={Link} to="/upload" >Upload</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className={'Navibar'} tag={Link} to="/stats">Stats</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className={'Navibar'} tag={Link} to="/load">Load Server</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className={'Navibar'} tag={Link} to="/login">Login</NavLink>
            </NavItem>
          </Nav>

        </Navbar>
      </div>
    )
  }
}

export default Navibar;