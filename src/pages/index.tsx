import axios from 'axios';
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

import React, { useState } from 'react';

const khyay = localFont({ src: '../../styles/Khyay-Regular.ttf' })

const HomePage: React.FC = () => {

  const [songData,     setSongdata]     = useState<any>(null);

	const setSongdataState = (songData: any) => {
		setSongdata(songData);
	}

  async function songSearchHandler(event: React.ChangeEvent<HTMLInputElement>)
  {
    const search = event.target.value;

    if (search.length < 1) {
      return setSongdataState(null);
    }

    const { data: songData } = await axios.get(`/api/findSong?keyword=${search}`);

    const uniqueSongs: any = [];
    const allSearchResults: any = [...songData.song, ...songData.artist];

    allSearchResults.map((song: any) => {
      var findItem = uniqueSongs.find((x: any) => x.id === song.id);
      if (!findItem) {
        uniqueSongs.push(song);
      }
    });

    setSongdataState(uniqueSongs);
  }

  return (
    <>
      <main>
        <div className="flex flex-col justify-center items-center h-screen">
          <span className={`${khyay.className} text-center text-white text-75xl mx-4 lg:text-9xl md:text-8xl md:whitespace-nowrap`}>
            QAZAQ GENIUS
          </span>
          <div className="w-11/12 md:w-3/6 lg:w-3/6 xl:w-2/6">
            <input
              className="border-gray-300 bg-white h-10 rounded-md focus:outline-none px-2 text-center w-full"
              type="search"
              name="search"
              placeholder="Type in a song name"
              onChange={songSearchHandler}
              autoComplete='off'
            />
            <div className='w-full flex flex-col absolute w-11/12 md:w-3/6 lg:w-3/6 xl:w-2/6'>
            {
            /* searchresults*/
            songData && songData.map((song: any) => {
              return (
                <Link href={`/song/${song.id}`} key={song.title_lat} className="bg-gray-50 rounded-xl mt-2 hover:bg-gray-200 p-2">
                  <div key={song.title_lat} className="flex flex-row items-start flex-nowrap" >
                  <div className="relative h-16 w-16 self-center flex-shrink-0 mr-10"> {/*Size of the image is specified here*/}
                    <Image
                        src={song.cover_art ?? '/apple-touch-icon.png'}
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
            )} {/* searchresults*/}
            </div>
          </div>

        </div>
      </main>
    </>
  );
};


export default HomePage;
