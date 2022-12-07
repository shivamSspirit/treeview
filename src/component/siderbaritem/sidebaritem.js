import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../treeviewContext'
import ReactTooltip from 'react-tooltip'
import './sidebaritem.css'

function SiderbarItem({ item }) {
    const [toggle, setToggle] = useState(false);
    const context = useContext(Context)
    const { onADDleaf, onRemoveCollection, setCurrentlyOpen, collectionItem, setCollectionItem } = context

    const opentoggle = (id) => {
        setCurrentlyOpen(id)
        setToggle(!toggle)
    }

    const addleaf = (id,...rest) => {
        onADDleaf(id,...rest)
    }

    const removeCollection = (id) => {
        onRemoveCollection(id)
    }

    return (
        <>
            {item.iscontainernode ? <>
                <div className='siderbar-item'>
                    <div className='sidebar-title'>
                        <span className='title-block'>
                            <span>
                                <img onClick={() => opentoggle(item.id)} className={`siderbar-item-icon ${toggle ? "open" : ''}`} src='/morethan.png' alt='more-icon' />
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
                        {item.children.map((childitem, id) => {

                            if (!childitem.iscontainernode) {
                                return (
                                    <div key={id} className='sidebar-title'>
                                        <span className='title-block'>
                                            <span className='title-name'>
                                                {childitem.title}
                                            </span>
                                        </span>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={id} className='sidebar-title'>
                                        <span className='title-block'>
                                            <span>
                                                <img onClick={() => opentoggle(childitem.id)} className={`siderbar-item-icon ${toggle ? "open" : ''}`} src='/morethan.png' alt='more-icon' />
                                            </span>
                                            <span>
                                                {childitem.title}
                                            </span>
                                            <span className='action-item'>
                                                <ReactTooltip />
                                                <img data-tip="add leaf" onClick={() => addleaf(childitem.id,item?.children?.find(item=>item?.iscontainernode))} className='siderbar-item-icon' src='/plus.png' alt='plus-icon' />
                                                <img data-tip="remove collection" onClick={() => removeCollection(childitem.id)} className='siderbar-item-icon' src='/dots.png' alt='dot-icon' />
                                            </span>
                                        </span>
                                    </div>
                                )
                            }
                        }
                        )}
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
