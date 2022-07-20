import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';

const data = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
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
export default function Home({ products })
{
  const classes = useStyles();
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );
  return (
    <>
      <div className="rootcard">
        <div className="row">
          <div className="col s3">
            <TreeView
              className={classes.root}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={['root', '3']}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {renderTree(data)}
            </TreeView>
          </div>
          <div className="col s9">
            <div className="row">
              {products.map(product => (
                <div className="col s4" key={product._id}>
                  <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img className="activator" src={product.image} />

                    </div>
                    <div className="card-content">
                      <span className="card-title activator grey-text text-darken-4">{product.name}<i className="material-icons right">more_vert</i></span>
                      <p>$&nbsp;{product.price}</p>
                    </div>
                    <div className="card-action">
                      <a href="#">This is a link</a>
                      <a href="#">This is a link</a>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">{product.name}<i className="material-icons right">close</i></span>
                      <p>{product.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps()
{
  const prodRes = await fetch('http://localhost:3000/api/products')
  const products = await prodRes.json()
  return {
    props: {
      products: products.data,
    },
  }
}