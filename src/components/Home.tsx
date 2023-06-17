import Song from '../components/Song';
import { Analytics } from '@vercel/analytics/react';
import SongInfo from '../components/SongInfo';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '500'],
    subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext'],
    display: 'swap',
  })

interface HomePageProps {
    songData: any;
}

const Home: React.FC<HomePageProps> = ({ songData }) => {
    return <>
        <div className={`p-4 mt-0 text-lg font-extralight ${roboto.className} sm:mx-1% md:mx-10% lg:mx-25% xl:mx-30% bg-white`} key={`site`}> {/*SiteContainer*/}
            <SongInfo {...songData} />
            <Song {...songData} />
            <Analytics />
        </div> {/*SiteContainer*/}

    </>;
};

export default Home;
