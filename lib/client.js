// for connecting Sanity to the app
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

//creating the sanity client
const client = sanityClient({
    //which project to connect with
    projectId: '',
    //a dataset (to know if we're in development/production)
    dataset: '',
    apiVersion: '',
    useCdn: true,
    token: ''
})