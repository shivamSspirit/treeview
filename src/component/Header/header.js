import React, { useContext } from 'react'
import { Context } from '../../treeviewContext'
import ReactTooltip from 'react-tooltip'
import './header.css'


function Header() {
    const context = useContext(Context);
    const { setDrawerToggle, drawerToggle } = context
    return (
        <div className='header'>
            <div className='header-block'>
                <ReactTooltip/>
                <span>
                    <img data-tip='open-drawer' onClick={() => setDrawerToggle(!drawerToggle)} className='upper-icon hamburgur' src='/hams.png' alt='hamburgur' />
                </span>
                <span className='search-box'>
                    <input className='search-input' type={'text'} placeholder='' />
                    <img className='search-icon' src='/search.png' alt='search-icon' />
                </span>
                <span className='invite-block'>
                    <img className='upper-icon add-people' src='/team.png' alt='member-icon' />
                    <p className='invite-text'>INVITE TEAM MEMBER</p>
                </span>
                <span>
                    <img className='upper-icon notification-icon' src='/notification.png' alt='notification-icon' />
                </span>
                <span className='profile-icon'>
                    <p className='profile-name'>SS</p>
                </span>
            </div>
        </div>
    )
}

export default Header
