import Link from 'next/link';
import React from 'react';
import baseUrl from '../helpers/baseUrl';
export default function Home({ products })
{

  return (
    <>
      <div className="row">
        {products.map(product => (
          <div className="col s4" key={product._id}>
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={product.image} />

              </div>
              <div className="card-content">
                <span className="card-title  grey-text text-darken-4">
                  <Link href={'/product/[id]'} as={`/product/${product._id}`}><a>{product.name}</a ></Link>

                  <span className='activator'>
                    <i className="material-icons right tooltipped" data-position="bottom" data-tooltip="Details">
                      more_vert
                    </i>
                  </span>
                </span>
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
    </>
  )
}

export async function getStaticProps()
{
  const prodRes = await fetch(`${baseUrl}/api/products`)
  const products = await prodRes.json()
  return {
    props: {
      products: products.data,
    },
  }
}