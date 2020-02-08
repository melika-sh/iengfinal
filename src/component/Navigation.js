import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'

const items = [
    {
        name:'خانه',
        to:'/',
        exact:true
    },
    {
        name:'در باره ما',
        to:'/about-us'
    },
    {
        name:'بلاگ',
        to:'/blog'
    },
    {
        name:'پست',
        to:'/post'
    }
];
function Navigation() {
    return(
        <ul>
        {items.map((item)=>(
            <li key={item.to} >
            <NavLink exact={item.exact || false} activeClassName='bg-info' to={item.to}>{item.name}</NavLink>
            </li>
        ))}
        </ul>
    );
}

export default withRouter (Navigation )