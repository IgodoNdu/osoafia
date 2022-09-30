// for connecting Sanity to the app
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

//creating the sanity client (export immediately for use)
export const client = sanityClient({
    //which project to connect with
    projectId: '9fmbmyam',
    //a dataset (to know if we're in development/production)
    dataset: 'production',
    apiVersion: '2022-09-30',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

//To use the sanity images
const builder = imageUrlBuilder(client);

//(sanity giving access to the url where the images are stored)
export const urlFor = (source) => builder.image(source);