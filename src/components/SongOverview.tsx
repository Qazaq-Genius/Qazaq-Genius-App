import Song from './Song';
import { Analytics } from '@vercel/analytics/react';
import SongInfo from './SongInfo';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '500'],
    subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext'],
    display: 'swap',
  })

interface SongOverviewPageProps {
    songData: any;
}

const SongOverview: React.FC<SongOverviewPageProps> = ({ songData }) => {
    return <>
        <div className={`px-4 mt-0 text-lg font-extralight ${roboto.className} sm:mx-1% md:mx-10% lg:mx-25% xl:mx-30% bg-white`} key={`site`}> {/*SiteContainer*/}
            <SongInfo {...songData} />
            <Song {...songData} />
            <Analytics />
        </div> {/*SiteContainer*/}

    </>;
};

export default SongOverview;
