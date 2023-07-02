
import { ToastContainer } from "react-toastify";
import React, { useState } from 'react';

import CheckboxItem from "@/components/Input/CheckboxItem";
import RadioButton from "@/components/Input/RadioButton";
import TextBox from "@/components/Input/TextBox";
import ArtistTextBox from "@/components/Input/ArtistTextBox";
import VerseTextBox from "@/components/Input/VerseTextBox";
import submitForm from "@/helper/submitForm";
import { Verse, Artist } from '@/types';

const Editor: React.FC = () => {

	const [languages, setLanguages] = useState<string[]>([]);
	const [artists,   setArtists]   = useState<Artist[]>([]);
	const [verse,     setVerse]     = useState<Verse[]>([]);
	const [album,     setAlbum]     = useState<boolean>(false);

	const setAlbumState = () => {
		setAlbum(!album);
	}

	const addArtist = () => {
		// add new Artist
		setArtists([...artists, { lat: "", cyr: "" }]);
	};

	const addVerse = () => {
		// add new verse
		setVerse([...verse, { lat: '', cyr: '', rus: '', eng: '' }]);
	};

	const setArtistValue = (inputValue: string, index: number, language: keyof Artist) => {

		setArtists((prev) => {
			var updateArtists = [...prev];
			updateArtists[index][language] = inputValue;
			return updateArtists;
		})
	}

	const setVerseValue = (inputValue: string, index: number, language: keyof Verse) => {

		setVerse((prev) => {
			var updateVerse = [...prev];
			updateVerse[index][language] = inputValue;
			return updateVerse;
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

			// lines durchrattern
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
		submitForm(e, artists, verse);
	};

	return (
        <div  key={`site`}> {/*SiteContainer*/}
			<div>
				<div className="py-10">
					<div className="text-white flex justify-center text-3xl">Add New Song</div>
					<form method="POST" className="" onSubmit={submitSong}>

						<div className={`px-4  py-3 my-3  m:mx-1% md:mx-10% lg:mx-25% xl:mx-30% bg-white font-extralight text-lg`}>
							<fieldset className="flex-row flex my-5 items-center">
								<div className="w-1/6">Languages</div>
								<div className="flex flex-row justify-evenly gap-2">
									<CheckboxItem clickHandler={languageHandler} id="rus" text="Russian" />
									<CheckboxItem clickHandler={languageHandler} id="eng" text="English" />
									<CheckboxItem clickHandler={languageHandler} id="cyr" text="Qazaq Cyrillic" />
									<CheckboxItem clickHandler={languageHandler} id="lat" text="Qazaq Latin" />
								</div>
							</fieldset>

							{/* Title */}
							<fieldset className="flex-row flex my-5 items-center">
								<div className="bg-white text-black rounded-md w-1/6">Title</div>
								<div className="flex gap-2 w-5/6">
									<TextBox name="title_cyr" placeholder="қазақша" className="" />
									<TextBox name="title_lat" placeholder="qazaqşa" className="" />
									<div className="w-0 md:w-4"></div>
								</div>
							</fieldset>

							{/* Artists *********************************** start *** */}
							<fieldset className="flex-col flex mt-5 mb-2 gap-1">
								<div className="flex-row flex">
									<div className="bg-white text-black rounded-md w-1/6">Artists</div>
									<div className="flex gap-2 w-5/6">
										<TextBox name="artist-cyr" placeholder="қазақша" className="" />
										<TextBox name="artist-lat" placeholder="qazaqşa" className="" />
										<div className="w-0 md:w-4"></div>
									</div>
								</div>
								{artists.map((value, index) => (
									<div key={`artist-${index}`} className="flex-row flex">
										<div className="bg-white text-black rounded-md w-1/6"></div>
										<div className="flex w-5/6">
											<ArtistTextBox changeHandler={setArtistValue} index={index} language="cyr" value={value.cyr} name={`artist-${index}-cyr`} placeholder="қазақша" className=" mr-2" />
											<ArtistTextBox changeHandler={setArtistValue} index={index} language="lat" value={value.lat} name={`artist-${index}-lat`} placeholder="qazaqşa" className=" mr-0 rounded-r-none border-r-0" />
											<button id={`button-${index}`} onClick={() => removeArtist(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold ml-0 h-10 px-3 rounded-r-md w-2 cursor-pointer" type="button">-</button>
										</div>
									</div>
								))}
							</fieldset>
							<div className="cursor-pointer hover:after:content-['+'] duration-100 mb-5" onClick={addArtist}>
								Add another artist
							</div>
						</div>


						{/* Artists *********************************** end ***** */}

						<div className={`px-4 py-3 my-3  m:mx-1% md:mx-10% lg:mx-25% xl:mx-30% bg-white font-extralight text-lg`}>
						{/* Album */}
							<fieldset className="">
								<div className="flex-row flex mb-2">
									<div className="bg-white text-black rounded-md w-1/6">Album</div>
									<div className="flex w-5/6 gap-2" >
										<RadioButton id="album" text="Album" className="" checked={album === true} onChange={setAlbumState} />
										<RadioButton id="no-album" text="No Album" className="" checked={album === false} onChange={setAlbumState} />
										<div className="w-0 md:w-4"></div>
									</div>
								</div>
								{album &&
									<>
										<div className="flex-row flex">
											<div className="bg-white text-black rounded-md w-1/6">Album Name</div>
											<TextBox name="album-cyr" placeholder="қазақша" className="mr-2" />
											<TextBox name="album-lat" placeholder="qazaqşa" className="" />
											<div className="w-0 md:w-4"></div>
										</div>
										<div>
											{/* drag and drop image uploader */}
											<div className="flex-row flex mt-2">
												<div className="bg-white text-black rounded-md w-1/6">Album Cover</div>
												<input type="file" name="album-cover" id="album-cover" className="hidden" />
												<label htmlFor="album-cover" className="flex flex-row items-center gap-2 w-4/6 h-48  border-background border-2 rounded-md justify-center flex">
													<div className="text-gray-400 ">Drag and drop cover image</div>
													<div className="w-0 md:w-4"></div>
												</label>
											</div>
										</div>
									</>
								}
							</fieldset>
						</div>

						<div className={`px-4 py-3 my-3 m:mx-1% md:mx-10% lg:mx-25% xl:mx-30% bg-white font-extralight text-lg`}>
							{/* Verse */}
							<fieldset className="my-5">
								<legend className="bg-white text-black rounded-md px-2">Lyrics</legend>
								{verse.map((value, index) => (
									<fieldset key={`line-${index}`} className="flex flex-col rounded-md p-2 gap-2 bg-white bg-opacity-40">
										<legend className="bg-white text-black rounded-md px-2">Line {index + 1}</legend>
										{languages.includes('cyr') && (
											<VerseTextBox changeHandler={setVerseValue} onPasteHandler={pastedVerse} language='cyr' index={index} value={value.cyr} name="line-cyr" placeholder="қазақша" />
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
								))}
								<span onClick={addVerse}>Add Verse</span>
							</fieldset>
							<div className="">
								<button className="border-2 border-background rounded-md w-28">Submit</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};


export default Editor;
