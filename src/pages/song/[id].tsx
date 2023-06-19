import axios from 'axios';
import SongOverview from '../../components/SongOverview';
import type { GetStaticProps } from 'next';

const lyricsApi = process.env.LYRICS_API_HOST;


export async function getStaticPaths() {
    const songs = (await axios.get(lyricsApi + '/songs')).data;
    const paths = songs.map((id: any) => ({
      params: {
        id: id.toString(),
      },
    }));
    return {
      paths,
      fallback: "blocking", // generate a new page if the user visits a page that doesn't exist
    };
  }

export async function getStaticProps({ params }: any) {
  const { data: songData } = await axios.get(lyricsApi + '/song/' + params.id);
  return {
    props: {
      songData,
    },
  };
};

export default SongOverview;
