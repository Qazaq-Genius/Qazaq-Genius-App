import Song from '../components/Song';
import { Analytics } from '@vercel/analytics/react';
import SongInfo from '../components/SongInfo';


interface HomePageProps {
    songData: any;
}

const Home: React.FC<HomePageProps> = ({ songData }) => {
    return <>
        <Song {...songData} />
        <SongInfo {...songData} />
        <Analytics />
    </>;
};

export default Home;
