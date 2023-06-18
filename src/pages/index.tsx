import axios from 'axios';
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

const lyricsApi = process.env.LYRICS_API_HOST;
const khyay = localFont({ src: '../../styles/Khyay-Regular.ttf' })



export async function getStaticProps() {
  const { data: songData1 } = await axios.get(lyricsApi + '/song/50000001');
  const { data: songData2 } = await axios.get(lyricsApi + '/song/50000002');
  const songData = [songData1, songData2];
  return {
    props: {
      songData,
    },
  };
};

const HomePage: React.FC = ({songData}: any) => {
  return (
    <>
      <main>
        <div className="flex flex-col justify-center items-center h-screen">
          <span className={`${khyay.className} text-center text-white text-75xl mx-4 lg:text-9xl md:text-8xl md:whitespace-nowrap`}>
            QAZAQ GENIUS
          </span>
          <input
            className="border-1 border-gray-300 bg-white h-10 rounded-md focus:outline-none text-center w-11/12 md:w-3/6 lg:w-3/6 xl:w-2/6"
            type="search"
            name="search"
            placeholder="Type in a song name"
          />
          {
          /*placeholder searchresults*/
          songData.map((song: any) => {
            return (
              <Link href={`/song/${song.id}`} key={song.title_lat} className="bg-gray-50 rounded-xl mt-2 hover:bg-gray-200 p-2 w-11/12 md:w-3/6 lg:w-3/6 xl:w-2/6">
                <div key={song.title_lat} className="flex flex-row items-start flex-nowrap" >
                <div className="relative h-16 w-16 self-center flex-shrink-0 mr-10"> {/*Size of the image is specified here*/}
                  <Image
                      src={song.cover_art}
                      alt={`Cover art: ${song.title_lat}`}
                      fill
                      style={{
                          borderRadius: '50%',
                          objectFit: 'cover',
                          alignSelf: 'center',
                      }}
                  />
                  </div>
                  <div className="flex text-lg flex-col items-start flex-nowrap text-left">
                    <span className="text-gray-400 line-clamp-2">{song.artists.map(({ name_cyr }: any) => name_cyr).join(', ')}</span>
                    <span>{
                      song.title_cyr === song.title_lat ? song.title_cyr : song.title_cyr + ' (' + song.title_lat + ')'
                      }
                    </span>
                  </div>
                </div>
              </Link>
            );
          }
          )} {/*placeholder searchresults*/}

        </div>
      </main>
    </>
  );
};


export default HomePage;
