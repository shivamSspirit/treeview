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
                    id: 2,
                    title: 'childnode1',
                    iscontainernode: false
                },
                {
                    id: 3,
                    title: 'childnode2',
                    iscontainernode: true,
                    children: [
                        {
                            id: 4,
                            title: "childnode3",
                            iscontainernode: false,
                        }
                    ]
                }
            ]
        },
        {
            id: 8,
            title: 'container',
            iscontainernode: true,
            children: [
                {
                    id: 9,
                    title: 'childnode1',
                    iscontainernode: false,
                },
                {
                    id: 10,
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


    const onADDleaf = (item) => {
        let updatedCollection;
        const newLeafId = generateId(item?.children);
        if (item?.children?.length === 0) {
            updatedCollection = item?.children?.concat([{ id: newLeafId, title: 'new leaf node', iscontainernode: false }])
        } else {
            updatedCollection = [...item?.children, { id: newLeafId, title: 'new leaf node', iscontainernode: false }]
        }
            setCollectionItem(collectionItem.map(collection => {
                if (collection?.id === item?.id) {
                    return { ...collection, children: updatedCollection };
                }
                else {
                    return collection;
                }
            }))
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
        setCollectionItem,
        currentlyopen
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