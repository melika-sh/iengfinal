import React from 'react'
import {Collapse, Navbar,Nav, NavbarBrand,NavbarToggler, NavItem} from 'reactstrap'
import {NavLink} from 'react-router-dom'
function Header(){
    const [open, setOpen] = React.useState(false);
    return(
        <Navbar bg="dark" variant="dark" color="secondary" expand='md' fixed='top'>
            <NavbarBrand href='/'>پروژه مهندسی نرم افزار</NavbarBrand>
            <NavbarToggler onClick={()=>setOpen(o=>!o)} />
            <Collapse isOpen={open} navbar >
            <Nav className='ml-auto' navbar>
                <NavItem>
                    <NavLink to='/AdminForm' exact className='nav-link' activeClassName='active'>
                    مدیر فرم
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink to='/AdminArea' exact className='nav-link' activeClassName='active'>
                    مدیر منطقه
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink to='/Agent' exact className='nav-link' activeClassName='active'>
                    نماینده
                    </NavLink>
                </NavItem>

                <NavItem>
                <NavLink to='/Center' exact className='nav-link' activeClassName='active'>
                مرکز
                </NavLink>
                </NavItem>

                <NavItem>
                <NavLink to='/about-us' exact className='nav-link' activeClassName='active'>
                در باره ما
                </NavLink>
                </NavItem>

            </Nav>
        </Collapse>
        </Navbar>
    );
}

export default Header