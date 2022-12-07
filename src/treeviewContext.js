import React, { useEffect, useState } from "react";
export const Context = React.createContext("AppContext");

const AppContextProvider = (props) => {
    const [collectionItem, setCollectionItem] = useState([
        {
            id: 1,
            title: 'containernode',
            iscontainernode: true,
            children: [
                {
                    id: 8,
                    title: 'childnode1',
                    iscontainernode: false
                },
                {
                    id: 2,
                    title: 'childnode2',
                    iscontainernode: false
                }
            ]
        },
        {
            id: 3,
            title: 'leafnode',
            iscontainernode: false
        },

        {
            id: 4,
            title: 'container',
            iscontainernode: true,
            children: [
                {
                    id: 5,
                    title: 'childnode1',
                    iscontainernode: false,
                },
                {
                    id: 6,
                    title: 'childnode2',
                    iscontainernode: false,
                }
            ]

        }
    ]);

    const [drawerToggle, setDrawerToggle] = useState(false);
    const [drawerstate, setDrawerState] = useState('tree');
    const [currentlyopen, setCurrentlyOpen] = useState();


    useEffect(() => {
        localStorage.setItem("treeData", JSON.stringify(collectionItem))
    }, [collectionItem])

    useEffect(() => {
        const data = localStorage.getItem("treeData");
        setCollectionItem(JSON.parse(data))
    }, [])

    const generateId = (childrens) => {
        const maxId = childrens?.length > 0 ? Math.max(...childrens?.map(n => n.id)) : 0
        return maxId + 1
    }

    const onADDleaf = (id, ...rest) => {
        const updateCollection = collectionItem.find(item => item.id === id);
        const newleafID = generateId(updateCollection?.children);
        const updatedcollection = [...updateCollection?.children, { id: newleafID, title: 'new leaf node', iscontainernode: false }]
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
        if (currentlyopen) {
            const updateCollection = collectionItem.find(item => item.id === currentlyopen);
            const newContainerId = generateId(updateCollection.children);
            const updatedcollection = [...updateCollection.children, { id: newContainerId, title: 'new container node', children: [], iscontainernode: true }];
            setCollectionItem(collectionItem.map(containernode => {
                if (containernode.id === currentlyopen) {
                    return { ...containernode, children: updatedcollection };
                } else {
                    return containernode;
                }
            }));
        } else {
            const newcollectionId = generateId(collectionItem);
            setCollectionItem([...collectionItem, { id: newcollectionId, title: 'new collection', children: [], iscontainernode: true }])
        }
    }


    let contextValue = {
        collectionItem,
        onADDleaf,
        onRemoveCollection,
        onAddCollection,
        drawerToggle,
        setDrawerToggle,
        drawerstate,
        setDrawerState,
        setCurrentlyOpen,
        setCollectionItem
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