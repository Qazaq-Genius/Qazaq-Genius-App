import axios from "axios";
import SongOverview from "../../components/SongOverview";

const lyricsApi = process.env.LYRICS_API_HOST;

export async function getStaticPaths() {
  const header = {
    headers: {
      Authorization: `Bearer ${process.env.LYRICS_API_JWT}`,
    },
  };

  const songs = await axios.get(lyricsApi + "/songs/id", header);
  const paths = songs.data.map((id: any) => ({
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
  const header = {
    headers: {
      Authorization: `Bearer ${process.env.LYRICS_API_JWT}`,
    },
  };

  const { data: songData } = await axios.get(
    lyricsApi + "/song/" + params.id,
    header
  );

  return {
    props: {
      songData,
    },
  };
}

export default SongOverview;
