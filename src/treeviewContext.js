import React, { useEffect, useState } from "react";
export const Context = React.createContext("AppContext");

const AppContextProvider = (props) => {
    const [collectionItem, setCollectionItem] = useState([
        {
            id: 0,
            title: 'containernode',
            children: [
                {
                    id: 1,
                    title: 'childnode1'
                },
                {
                    id: 2,
                    title: 'childnode2'
                }
            ]
        },
        {
            id: 3,
            title: 'leafnode'
        },

        {
            id: 4,
            title: 'container',
            children: [
                {
                    id: 5,
                    title: 'childnode1'
                },
                {
                    id: 6,
                    title: 'childnode2'
                }
            ]

        }
    ])

    const [drawerToggle, setDrawerToggle] = useState(false);
    const [drawerstate, setDrawerState] = useState('tree');

    useEffect(() => {
        localStorage.setItem("treeData", JSON.stringify(collectionItem))
    }, [collectionItem])

    useEffect(() => {
        const data = localStorage.getItem("treeData");
        setCollectionItem(JSON.parse(data))
    }, [])

    const generateId = (childrens) => {
        const maxId = childrens.length > 0
            ? Math.max(...childrens.map(n => n.id))
            : 0
        return maxId + 1
    }

    const onADDleaf = (id) => {
        const updateCollection = collectionItem.find(item => item.id === id);
        const newleafID = generateId(updateCollection.children)
        const updatedcollection = [...updateCollection.children, { id: newleafID, title: 'new leaf node' }]
        setCollectionItem(collectionItem.map(leafs => {
            if (leafs.id === id) {
                return { ...leafs, children: updatedcollection };
            } else {
                return leafs;
            }
        }));
    }

    const onRemoveCollection = (id) => {
        setCollectionItem(
            collectionItem.filter(collection => collection.id !== id)
        );
    }

    const onAddCollection = () => {
        const newcollectionId = generateId(collectionItem);
        setCollectionItem([...collectionItem, { id: newcollectionId, title: 'new collection', children: [] }])
    }


    let contextValue = {
        collectionItem,
        onADDleaf,
        onRemoveCollection,
        onAddCollection,
        drawerToggle,
        setDrawerToggle,
        drawerstate,
        setDrawerState
    }



    return (
        <>
            <Context.Provider value={contextValue}>
                {props.children}
            </Context.Provider>
        </>
    );
}


export default AppContextProvider;