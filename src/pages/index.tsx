// Import necessary libraries and components at the top
import axios from 'axios';
import Home from '../components/Home';

import type { GetStaticProps } from 'next';

// Fetch the song data from your API
export const getStaticProps: GetStaticProps = async () => {
  const { data: songData } = await axios.get('https://r0.fyi/qazaq-genius/50000001');
  return {
    props: {
      songData,
    },
  };
};

export default Home;
