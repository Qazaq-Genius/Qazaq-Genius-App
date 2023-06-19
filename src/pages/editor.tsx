import axios from 'axios';
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

const lyricsApi = process.env.LYRICS_API_HOST;

const HomePage: React.FC = ({songData}: any) => {
  return (
    <>
      <main>
        <div>
            <div className="flex flex-col justify-center items-center h-screen">
                <label>Title:</label>
                <input
                    className="border-1 border-gray-300 bg-white h-10 rounded-md focus:outline-none text-center"
                    type="text"
                    name="title"
                />
            </div>
        </div>
      </main>
    </>
  );
};


export default HomePage;
