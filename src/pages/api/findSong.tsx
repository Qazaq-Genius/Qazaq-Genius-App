
import  {NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const lyricsApi = process.env.LYRICS_API_HOST;
	let search = req.query.keyword
	let headers = {headers: {
        Authorization: `Bearer ${process.env.LYRICS_API_JWT}`
    }};

	const songData = await axios.get(lyricsApi + `/songs?keyword=${search}`, headers);

	return res.status(200).json(songData.data);
}

export default handler
