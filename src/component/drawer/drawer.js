import React, { useContext } from 'react'
import { Context } from '../../treeviewContext'
import './drawer.css'
function Drawer() {
  const context = useContext(Context);
  const { setDrawerState,drawerstate } = context;
  return (
    <div className='drawer'>
      <div className='drawer-block'>
        <span onClick={()=>setDrawerState("tree")} className= {`${drawerstate==='tree'?'active-drawer':''} drawer-item`}>
          All
        </span>
        <span onClick={()=>setDrawerState("Board")} className= {`${drawerstate==='Board'?'active-drawer':''} drawer-item`}>
          Board
        </span>
        <span onClick={()=>setDrawerState("Graph")} className= {`${drawerstate==='Graph'?'active-drawer':''} drawer-item`}>
          Graph
        </span>
        <span onClick={()=>setDrawerState("Recent")} className= {`${drawerstate==='Recent'?'active-drawer':''} drawer-item`}>
          Recent
        </span>
      </div>
    </div>
  )
}

export default Drawer
