import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Verse, Artist } from '../types';


const submitForm = async (e: any, artists: Array<Artist>, verse: Array<Verse>) => {
	e.preventDefault();

	// Formular Daten holen
	let formData = Object.fromEntries(new FormData(e.target).entries());

	let finalData: {[key: string]: any} = {};

	// title
	finalData['title_cyr'] = formData.title_cyr ?? '';
	finalData['title_lat'] = formData.title_lat ?? '';

	// artists geordnet hinzufügen
	let all_artists: Array<object> = [];
	all_artists.push({
		name_cyr: formData['artist-cyr'],
		name_lat: formData['artist-lat']
	});

	artists.forEach(artist => {
		all_artists.push({
			name_cyr: artist.cyr,
			name_lat: artist.lat
		})
	});

	finalData['artists'] = all_artists;

	// album
	finalData['album'] = {
		name_cyr: formData['album-cyr'],
		name_lat: formData['album-lat']
	};

	// lines
	finalData['lyrics'] = {'1': {}}
	verse.forEach((verse, index) => {
		var correctIndex: number = index +1
		var newVerse = {
			"line_nr": correctIndex ?? '',
			"qazaq_cyr": verse.cyr ?? '',
			"qazaq_lat": verse.lat ?? '',
			"english": verse.eng ?? '',
			"russian": verse.rus ?? '',
			"original_lang": "qazaq_cyr",
			"words": []
		}
		finalData['lyrics']['1'][correctIndex] = newVerse
	});


	try {
		const response = await axios.post('/api/song', finalData, {
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  }
		});

		if (response.status === 200) {
			if (response.data.redirect) {
			window.location.href = response.data.redirect;
			}
		} else {
			toast(response.data.error.message ?? 'something went wrong');
		}
	  } catch (error: any) {
		toast(error.response.data.error.message ?? 'Something went wrong');
	  }

}

export default submitForm;
