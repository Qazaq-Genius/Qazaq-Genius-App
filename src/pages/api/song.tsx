
import  {NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const lyricsApi = process.env.LYRICS_API_HOST;
	let body = req.body
	let headers = {headers: {
        Authorization: `Bearer ${process.env.LYRICS_API_JWT}`
    }};

	axios.post( lyricsApi + '/song', body, headers).then(response => {
		res.status(200).json({redirect: '/'})
	  })
	  .catch(error => {
		res.status(400).json({error: error.response.data})
	  });

}


export default handler
