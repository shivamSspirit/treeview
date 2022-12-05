import React, { useState, useContext } from 'react'
import { Context } from '../../treeviewContext'
import ReactTooltip from 'react-tooltip'
import './sidebaritem.css'

function SiderbarItem({ item }) {
    const [toggle, setToggle] = useState(false)
    const context = useContext(Context)
    const { onADDleaf, onRemoveCollection } = context

    const opentoggle = () => {
        setToggle(!toggle)
    }

    const addleaf = (id) => {
        onADDleaf(id)
    }

    const removeCollection = (id) => {
        onRemoveCollection(id)
    }

    return (
        <>
            {item.children ? <>
                <div className='siderbar-item'>
                    <div className='sidebar-title'>
                        <span className='title-block'>
                            <span>
                                <img onClick={opentoggle} className={`siderbar-item-icon ${toggle ? "open" : ''}`} src='/morethan.png' alt='more-icon' />
                            </span>
                            <span>
                                {item.title}
                            </span>
                            <span className='action-item'>
                                <ReactTooltip />
                                <img data-tip="add leaf" onClick={() => addleaf(item.id)} className='siderbar-item-icon' src='/plus.png' alt='plus-icon' />
                                <img data-tip="remove collection" onClick={() => removeCollection(item.id)} className='siderbar-item-icon' src='/dots.png' alt='dot-icon' />
                            </span>
                        </span>
                    </div>

                    <div className={`sidebar-content ${toggle ? "open" : ''}`}>
                        {item.children.map((childitem, id) => (
                            <div key={id} className='sidebar-title'>
                                <span className='title-block'>
                                    <span className='title-name'>
                                        {childitem.title}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </> : <>
                <div className='sidebar-title'>
                    <span className='leaf-title-block'>
                        <span className='title-name'>
                            {item.title}
                        </span>
                    </span>
                </div>
            </>
            }
        </>
    )
}

export default SiderbarItem
