import React, { useContext } from 'react'
import './sidebar.css'
import SiderbarItem from '../siderbaritem/sidebaritem'
import { Context } from '../../treeviewContext'
import ReactTooltip from 'react-tooltip'

function SideBar() {
    const context = useContext(Context);
    const { collectionItem, onAddCollection, drawerstate } = context;

    const addnewCollection = () => {
        onAddCollection();
    }

    const ReturnTabs = () => {
        if (drawerstate === "tree") {
            return (
                <>
                    <div>
                        {collectionItem.map((item, id) => (
                            <SiderbarItem key={id} item={item} />
                        ))}
                    </div>
                </>
            )
        }
        if (drawerstate === "Board") {
            return (
                <>
                    <div className='boardview'>
                        <span className='board-block'>
                            Board View
                        </span>
                    </div>
                </>
            )
        }

        if (drawerstate === "Graph") {
            return (
                <>
                    <div className='graphview'>
                        <span className='graph-block'>
                            Graph View
                        </span>
                    </div>
                </>
            )
        }
        if (drawerstate === "Recent") {
            return (
                <>
                    <div className='recentview'>
                        <span className='recent-block'>
                            Recent View
                        </span>
                    </div>
                </>
            )
        }
    }

    return (
        <div className='main'>
            <div className='sidebar'>
                <div className='upper-container'>
                    <span>
                        create collection
                    </span>
                    <ReactTooltip/>
                    <span>
                        <img data-tip='create-collection' onClick={() => addnewCollection()} src='/plus.png' alt='plus-icon' className='icon-plus' />
                    </span>
                </div>
                <div>
                    {ReturnTabs()}
                </div>
            </div>
        </div>
    )
}

export default SideBar




// if(item.childrens){
//     return (
//         <div className={open ? "sidebar-item open" : "sidebar-item"}>
//             <div className="sidebar-title">
//                 <span>
//                     { item.icon && <i className={item.icon}></i> }
//                     {item.title}    
//                 </span> 
//                 <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
//             </div>
//             <div className="sidebar-content">
//                 { item.childrens.map((child, index) => <SidebarItem key={index} item={child} />) }
//             </div>
//         </div>
//     )
// }else{
//     return (
//         <a href={item.path || "#"} className="sidebar-item plain">
//             { item.icon && <i className={item.icon}></i> }
//             {item.title}
//         </a>
//     )
// }