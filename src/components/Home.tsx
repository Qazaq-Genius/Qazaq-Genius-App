import Song from '../components/Song';


interface HomePageProps {
    songData: any;
}

const Home: React.FC<HomePageProps> = ({ songData }) => {
    return <Song {...songData} />;
};

export default Home;
