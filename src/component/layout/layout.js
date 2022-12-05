import React, { useContext } from 'react'
import Drawer from '../drawer/drawer'
import Header from '../Header/header'
import SideBar from '../sidebar/siderbar'
import { Context } from '../../treeviewContext'

function Layout() {
  const context = useContext(Context);
  const { drawerToggle } = context;
  return (
    <div>
      <Header />
      {drawerToggle && <Drawer />}
      <SideBar />
    </div>
  )
}

export default Layout
