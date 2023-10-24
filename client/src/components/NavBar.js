import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Button,
    Collapse,
    Nav,
    NavLink,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";


export default function NavBar({ loggedInUser, setLoggedInUser }) {
    const [open, setOpen] = useState(false);

    const toggleNavbar = () => setOpen(!open);

    return (
        <div>
            <Navbar color="light" light fixed="true" expand="lg">
                <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
                    🎨 ✂ ✒ Crafty Corner
                </NavbarBrand>
                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav navbar>

                                <NavItem onClick={() => setOpen(false)}>
                                    <NavLink tag={RRNavLink} to="/items">
                                        Items
                                    </NavLink>
                                </NavItem>


                                <NavItem onClick={() => setOpen(false)}>
                                    <NavLink tag={RRNavLink} to="/categories">
                                        Categories
                                    </NavLink>
                                </NavItem>

                                <NavItem onClick={() => setOpen(false)}>
                                    <NavLink tag={RRNavLink} to="/profile">
                                        My Profile
                                    </NavLink>
                                </NavItem>


                            </Nav>
                        </Collapse>


                        <Button
                            className="logoutButton"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(false);
                                logout().then(() => {
                                    setLoggedInUser(null);
                                    setOpen(false);
                                });
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                                <Button color="primary">Login</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
            </Navbar>
        </div>
    );
}