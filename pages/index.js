import React from 'react';

//for using sanity client in the project
import { client } from '../lib/client';

//importing the components I'll be needing here
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => {
  return (
    <>
      
      {/**If bannerData exists, return the 0 index (as can be seen via console.log, [0] has get the needed data) */}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData)}
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many varieties</p>
      </div>

      <div className='products-container'>
        {/**Loop over the products (received as a prop from sanity) to return each product's entire details */}
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      {/**If bannerData exists, return the first index. See console.log of bannerData, and identify the needed details are on the first index */}
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

//for next js getting/fetching data/props
export const getServerSideProps = async () => {
  //forming a sanity query to fetch all products from my sanity dashboard
  const query = '*[_type == "product"]';
  //hold the result of the query in the products const
  const products = await client.fetch(query);

  //to fetch all banners from my sanity
  const bannerQuery = '*[_type == "banner"]';
  //hold the result of the query in the banner const
  const bannerData = await client.fetch(bannerQuery);

  //return the fetched result (will be passed as props to the app components)
  return {
    props: { products, bannerData }
  }
}

export default Home;
