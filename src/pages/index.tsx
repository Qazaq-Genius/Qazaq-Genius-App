   // Import necessary libraries and components at the top
   import axios from 'axios';
   import Song from '../components/Song';
   import type { GetStaticProps } from 'next';

   interface HomePageProps {
     songData: any;
   }

   const Home: React.FC<HomePageProps> = ({ songData }) => {
     return <Song {...songData} />;
   };

   // Fetch the song data from your API
   export const getStaticProps: GetStaticProps = async () => {
     const { data: songData } = await axios.get('http://localhost/api/v1/song/50000001');
     return {
       props: {
         songData,
       },
     };
   };

   export default Home;
