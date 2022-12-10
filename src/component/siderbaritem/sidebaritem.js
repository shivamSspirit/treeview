import React, { useContext, useState } from 'react'
import { Context } from '../../treeviewContext'
import ReactTooltip from 'react-tooltip'
import './sidebaritem.css'

function SiderbarItem({ item }) {
    const context = useContext(Context)
    const { onADDleaf, onRemoveCollection, setCurrentlyOpen } = context;

    const [toggle, setToggle] = useState(false)

    const opentoggle = (id) => {
        setCurrentlyOpen(id);
        setToggle(!toggle)
    }

    const addleaf = (item) => {
        onADDleaf(item)
    }

    const removeCollection = (id) => {
        onRemoveCollection(id)
    }

    return (
        <>
            {item?.iscontainernode ?
                <>
                    <div className='siderbar-item'>
                        <div className='sidebar-title'>
                            <span className='title-block'>
                                <span>
                                    <img onClick={() => opentoggle(item?.id)} className={`siderbar-item-icon ${toggle ? "open" : ''}`} src='/morethan.png' alt='more-icon' />
                                </span>
                                <span>
                                    {item?.title}
                                </span>
                                <span className='action-item'>
                                    <ReactTooltip />
                                    <img data-tip="add leaf" onClick={() => addleaf(item)} className='siderbar-item-icon' src='/plus.png' alt='plus-icon' />
                                    <img data-tip="remove collection" onClick={() => removeCollection(item?.id)} className='siderbar-item-icon' src='/dots.png' alt='dot-icon' />
                                </span>
                            </span>
                        </div>
                        <div className={`sidebar-content ${toggle ? "open" : ''}`}>
                            {item?.children?.map((childitem, id) => <SiderbarItem key={id} item={childitem} />)}
                        </div>
                    </div>
                </>
                :
                <>
                    <div className='sidebar-title'>
                        <span className='leaf-title-block'>
                            <span className='title-name'>
                                {item?.title}
                            </span>
                        </span>
                    </div>
                </>
            }
        </>
    )
}

export default SiderbarItem
