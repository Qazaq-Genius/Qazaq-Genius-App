import axios from 'axios';
import localFont from 'next/font/local'

const lyricsApi = process.env.LYRICS_API_HOST;
const khyay = localFont({ src: '../../styles/Khyay-Regular.ttf' })


export async function getStaticProps() {
  const { data: songData } = await axios.get(lyricsApi + '/song/50000001');
  return {
    props: {
      songData,
    },
  };
};

const HomePage: React.FC = ({products}: any) => {
  return (
    <>
      <main>
        <div className="flex flex-col justify-center items-center h-screen">
          <span className={`text-white text-9xl ${khyay.className}`}>QAZAQ GENIUS</span>
          <input
            className="border-1 border-gray-300 bg-white h-10 px-2 rounded-md focus:outline-none w-96"
            type="search"
            name="search"
            placeholder="Type in a song name"
          />
        </div>
      </main>
    </>
  );
};


export default HomePage;
