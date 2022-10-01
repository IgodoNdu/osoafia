//going to be dynamic
import React, { useState } from 'react'
//importing the icons for use
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
//using the global Context 
import { useStateContext } from '../../context/StateContext'

//using sanity
import { client, urlFor } from '../../lib/client'

const ProductDetails = ({ product, similarProducts }) => {
  //destructure for easy use
  const { image, name, details, price } = product;

  //creating a new state field for (building the product image detail (hover) feature: Image carousel)
  const [index, setIndex] = useState(0);

  //using the state like a hook
  const { qty, incQty, decQty } = useStateContext();

  return (
    <div>
      <div className='product-detail-container'>
        <div>
            <div className='image-container'>
                <img src={urlFor(image && image[index])} className='product-detail-image' />
            </div>
            {/** Image Carousel with useState */}
            <div className='small-images-container'>
              {image?.map((item, i) => (
                <img src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)} />
              ))}
            </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            {/**No of reviews */}
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity: </h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
              <span className='num' onClick=''>{qty}</span>
              <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick=''>Add to Cart</button>
            <button type='button' className='buy-now' onClick=''>Buy Now</button>
          </div>
        </div>
      </div>

      {/**recommended products section */}
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {similarProducts.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

//get all the static products paths for possible render, see: 'getStaticPaths' documentation for more
export const getStaticPaths = async () => {
  //get all such similar products path (get only the current property of the slug, for each of these products)
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  //generating the paths
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

//for pre-rendering this page at build time, since i've got the data already, using the props returned (see: 'getStaticProps' documentation)
export const getStaticProps = async ({ params: { slug }}) => {
    //getting the particular product that owns/matches this slug
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    //also fetch similar products (here, i'll fetch all products for now, as there's no schema implement for similar products)
    const similarProductsQuery = '*[_type == "product"]'
    
    //holding the individual product
    const product = await client.fetch(query);
    //holding similar products, here: all products
    const similarProducts = await client.fetch(similarProductsQuery);
  
    //return the fetched result (will be passed as props to the app components)
    return {
      props: { product, similarProducts }
    }
  }

export default ProductDetails
