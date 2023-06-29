import CheckboxItem from "../components/Input/CheckboxItem";
import RadioButton from "../components/Input/RadioButton";
import TextBox from "../components/Input/TextBox";
import ArtistTextBox from "../components/Input/ArtistTextBox";
import React, { useState } from 'react';
import VerseTextBox from "@/components/Input/VerseTextBox";
import submitForm from "@/helper/submitForm";
import { ToastContainer } from "react-toastify";

interface Artist {
	lat: string,
	cyr: string
}

interface Verse {
	lat?: string,
	cyr?: string,
	rus?: string,
	eng?: string
}

const Editor: React.FC = () => {

	const [languages, setLanguages] = useState<string[]>([]);
	const [artists, setArtists] = useState<Artist[]>([]);
	const [verse, setVerse] = useState<Verse[]>([]);
	const [album, setAlbum] = useState<boolean>(false);

	const setAlbumState = () => {
		setAlbum(!album);
	}

	const addArtist = () => {
		// add new Artist
		setArtists([...artists, { lat: "", cyr: "" }]);
	};

	const addVerse = () => {
		// add new verse
		setVerse([...verse, { lat: '', cyr: '', rus: '', eng: '' }])
	};

	const setArtistValue = (inputValue: string, index: number, language: keyof Artist) => {

		setArtists((prev) => {
			var updateArtists = [...prev]
			updateArtists[index][language] = inputValue
			return updateArtists
		})
	}

	const setVerseValue = (inputValue: string, index: number, language: keyof Verse) => {

		setVerse((prev) => {
			var updateVerse = [...prev]
			updateVerse[index][language] = inputValue
			return updateVerse
		})
	}


	const removeArtist = (index: number) => {
		setArtists([...artists.slice(0, index), ...artists.slice(index + 1)]);
	};

	const languageHandler = (language: string) => {
		if (languages.includes(language)) {
			const updatedLanguage = languages.filter(lang => lang !== language);
			setLanguages(updatedLanguage);
		} else {
			const updatedLanguage = [...languages, language];
			setLanguages(updatedLanguage);
		}
	}

	const pastedVerse = (verseText: string, verseIndex: number) => {
		// lines im array speichern
		const splittedText: string[] = verseText
			.trim()
			.split('\n')
			.filter((text) => text !== "");

		const sortedLang: Array<keyof Verse> = ['cyr', 'eng', 'rus'];

		setVerse((prev) => {
			const updatedVerse: Verse[] = [...prev];

			//   lines durchrattern
			splittedText.forEach((line, index) => {
				const sortedLangIndex: number = index % sortedLang.length;
				const currentIndex: number = Math.floor(index / sortedLang.length) + verseIndex;

				// ggf. neuen Verse hinzufügen 
				if (updatedVerse[currentIndex] === undefined) {
					updatedVerse[currentIndex] = {};
				}

				// Verse wert Speichern
				const currentLang: keyof Verse = sortedLang[sortedLangIndex];
				updatedVerse[currentIndex][currentLang] = line;
			});

			return updatedVerse;
		});
	};

	// song wird submitted
	const submitSong = (e: any) => {
		submitForm(e, artists, verse) 
	}



	return (
		<>
			<main>
				<div>
					<div className="flex flex-col justify-center items-center">
						<div className="text-2xl white my-4 mt-8 text-white font-medium">Add New Song</div>
						<form method="POST" className="w-full md:min-w-[66.66667%]" onSubmit={submitSong}>
							<fieldset className="flex flex-col md:flex-row border-2 border-white border-opacity-50   bg-pink-300 lg:w-1/2 lg:m-auto rounded-md px-2 py-2 m-2 justify-center gap-2">
								<legend className="bg-white text-black rounded-md px-2">Languages</legend>
								<CheckboxItem clickHandler={languageHandler} id="rus" text="Russian" />
								<CheckboxItem clickHandler={languageHandler} id="eng" text="English" />
								<CheckboxItem clickHandler={languageHandler} id="cyr" text="Qazaq Cyrillic" />
								<CheckboxItem clickHandler={languageHandler} id="lat" text="Qazaq Latin" />
							</fieldset>
							<br />

							{/* Title */}
							<fieldset className="flex flex-col  border-2 border-white border-opacity-50 bg-pink-300  lg:w-1/2 lg:m-auto rounded-md px-2 py-2 m-2 justify-center gap-2 items-center">
								<legend className="bg-white text-black rounded-md px-2">Title</legend>
								<div className="flex justify-between m-2 gap-2">
									<TextBox name="title_cyr" placeholder="қазақша" className="md:w-96 lg:w-80 w-full" />
									<TextBox name="title_lat" placeholder="qazaqşa" className="md:w-96 lg:w-80 w-full" />
									<div className="w-0 md:w-4"></div>
								</div>
							</fieldset>
							<br />

							{/* Artists *********************************** start *** */}
							<fieldset className="flex flex-col border-2 border-white border-opacity-50 lg:w-1/2 lg:m-auto bg-pink-300 rounded-md px-2 py-2 m-2 justify-center gap-2 items-center">
								<legend className="bg-white text-black rounded-md px-2">Artists</legend>
								<div className="flex justify-between m-1 mt-2 mx-2 gap-2">
									<TextBox name="artist-cyr" placeholder="қазақша" className="md:w-96 lg:w-80 w-full" />
									<TextBox name="artist-lat" placeholder="qazaqşa" className="md:w-96 lg:w-80 w-full" />
									<div className="w-0 md:w-4"></div>
								</div>

								{artists.map((value, index) => (
									<>
										<div className="flex justify-between m-1 mx-2">
											<ArtistTextBox changeHandler={setArtistValue} index={index} language="cyr" value={value.cyr} name={`artist-${index}-cyr`} placeholder="қазақша" className="md:w-96 lg:w-80 w-full mr-2" />
											<ArtistTextBox changeHandler={setArtistValue} index={index} language="lat" value={value.lat} name={`artist-${index}-lat`} placeholder="qazaqşa" className="md:w-96 lg:w-80 w-full mr-0 rounded-r-none" />
											<button id={`button-${index}`} onClick={() => removeArtist(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold ml-0 h-10 px-3 rounded-r-md w-2 cursor-pointer" type="button">-</button>
										</div>
									</>
								))}

								<div className="cursor-pointer hover:after:content-['+'] duration-100" onClick={addArtist}>
									Add another artist
								</div>
							</fieldset>
							<br />

							{/* Artists *********************************** end ***** */}

							{/* Album */}
							<fieldset className="flex flex-col border-2 border-white border-opacity-50 lg:w-1/2 lg:m-auto bg-pink-300 rounded-md px-2 py-2 m-2 justify-center gap-2 items-center">
								<legend className="bg-white text-black rounded-md px-2">Album</legend>
								<div className="flex justify-between m-2 gap-2 w-full md:w-auto" >
									<RadioButton id="album" text="Album" className="w-full lg:w-80 md:w-96" checked={album === true} onChange={setAlbumState} />
									<RadioButton id="no-album" text="No Album" className="w-full lg:w-80 md:w-96" checked={album === false} onChange={setAlbumState} />
									<div className="w-0 md:w-4"></div>
								</div>
								{album &&
									<div className="flex justify-between m-2 gap-2">
										<TextBox name="album-cyr" placeholder="қазақша" className="md:w-96 lg:w-80 w-full" />
										<TextBox name="album-lat" placeholder="qazaqşa" className="md:w-96 lg:w-80 w-full" />
										<div className="w-0 md:w-4"></div>
									</div>
								}
							</fieldset>
							<br />



							{/* Verse */}
							<fieldset className="flex flex-col border-2 border-white border-opacity-50 lg:w-1/2 lg:m-auto bg-pink-300 rounded-md px-2 py-2 m-2 justify-center gap-2">
								<legend className="bg-white text-black rounded-md px-2">Lyrics</legend>
								{verse.map((value, index) => (
									<>
										<fieldset className="flex flex-col rounded-md p-2 justify-center gap-2 bg-white bg-opacity-40">
											<legend className="bg-white text-black rounded-md px-2">Line {index + 1}</legend>
											{languages.includes('cyr') && (
												<VerseTextBox changeHandler={setVerseValue} onPasteHandler={pastedVerse} language='cyr' index={index} value={value.cyr} name="line-cyr" placeholder="қазақша" className="md:min-w-[50rem]" />
											)}
											{languages.includes('lat') && (
												<VerseTextBox changeHandler={setVerseValue} onPasteHandler={pastedVerse} language='lat' index={index} value={value.lat} name="line-lat" placeholder="qazaqşa" />
											)}
											{languages.includes('eng') && (
												<VerseTextBox changeHandler={setVerseValue} onPasteHandler={pastedVerse} language='eng' index={index} value={value.eng} name="line-eng" placeholder="english" />
											)}
											{languages.includes('rus') && (
												<VerseTextBox changeHandler={setVerseValue} onPasteHandler={pastedVerse} language='rus' index={index} value={value.rus} name="line-rus" placeholder="russian" />
											)}
										</fieldset>
									</>
								))}
								<span onClick={addVerse}>Add Verse</span>
							</fieldset>
							<div className="flex justify-end mb-12 mt-2 my-2">
								<button className="bg-white bg-opacity-75 hover:bg-opacity-95 border-opacity-50 rounded-md p-2 mx-2">Submit</button>
							</div>
						</form>
					</div>
				</div>
				<ToastContainer />
			</main>
		</>
	);
};


export default Editor;
