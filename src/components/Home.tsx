import Song from '../components/Song';
import { Analytics } from '@vercel/analytics/react';


interface HomePageProps {
    songData: any;
}

const Home: React.FC<HomePageProps> = ({ songData }) => {
    return <>
        <Song {...songData} />
        <Analytics />
    </>;
};

export default Home;
