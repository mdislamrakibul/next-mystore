/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';


const data = {
    id: 'root',
    name: 'Admin',
    children: [
        {
            id: '1',
            name: 'Dashboard',
            route: '/admin/dashboard',
        },
        {
            id: '3',
            name: 'Product',
            children: [
                {
                    id: '4',
                    name: 'Create',
                    route: '/admin/product/create',
                },
                {
                    id: '4',
                    name: 'List',
                    route: '/admin/product/list',
                },
            ],
        },
    ],
};

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
    },
});


function AdminSidebar() 
{
    const classes = useStyles();
    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <>
            <div>
                <TreeView
                    // className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={['root',]}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {renderTree(data)}
                </TreeView>
            </div>
        </>
    )
}

export default AdminSidebar