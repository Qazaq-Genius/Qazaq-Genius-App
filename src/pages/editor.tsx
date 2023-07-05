
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

	const [languages, setLanguages] = useState<string[]>(['rus', 'eng', 'cyr']);
	const [artists,   setArtists]   = useState<Artist[]>([]);
	const [verse,     setVerse]     = useState<Verse[]>([{ lat: '', cyr: '', rus: '', eng: '' }]);
	const [album,     setAlbum]     = useState<boolean>(false);

	const setAlbumState = () => {
		setAlbum(!album);
	}

	const addArtist = () => {
		setArtists([...artists, { lat: "", cyr: "" }]);
	};

	const addVerse = () => {
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
				<div className="lg:mx-[19%] 2xl:mx-25% mx-1">
					<div className="text-white flex justify-center text-5xl py-10">Add New Song</div>
					<form method="POST" className="gap-3 flex-col flex" onSubmit={submitSong}>

						{/* First block */}
						<div className="sm:px-4 px-2 py-3 bg-white font-extralight flex flex-col text-lg gap-4">
							{/* Language */}
							<fieldset className="sm:flex-row flex-col sm:items-center flex">
								<div className="w-1/6 min-w-[16.66666%]">Languages</div>
								<div className="flex flex-row justify-evenly gap-2">
									<CheckboxItem clickHandler={languageHandler} id="rus" text="Russian" className="h-16 sm:h-auto"/>
									<CheckboxItem clickHandler={languageHandler} id="eng" text="English" className="h-16 sm:h-auto"/>
									<CheckboxItem clickHandler={languageHandler} id="cyr" text="Qazaq Cyrillic" className="h-16 sm:h-auto"/>
									<CheckboxItem clickHandler={languageHandler} id="lat" text="Qazaq Latin" className="h-16 sm:h-auto"/>
								</div>
							</fieldset>

							{/* Title */}
							<fieldset className="sm:flex-row flex-col sm:items-center flex">
								<div className="text-black rounded-md min-w-[16.66666%]">Title</div>
								<div className="flex flex-row gap-2 w-5/6">
									<TextBox name="title_cyr" placeholder="қазақша" className="w-36 sm:w-auto" />
									<TextBox name="title_lat" placeholder="qazaqşa" className="w-36 sm:w-auto" />
									<div className="w-0 sm:min-w-4 sm:w-4"></div>
								</div>
							</fieldset>

							{/* Artists */}
							<fieldset className="sm:flex-row flex-col sm:items-center flex mb-2">
								<div className="text-black rounded-md min-w-[16.66666%]">Artists</div>
								<div className="flex-col flex gap-1">
									<div className="flex-row flex w-5/6">
										<div className="flex gap-2">
											<TextBox name="artist-cyr" placeholder="қазақша" className="w-36 sm:w-auto" />
											<TextBox name="artist-lat" placeholder="qazaqşa" className="w-36 sm:w-auto" />
											<div className="w-0 sm:min-w-4 sm:w-4"></div>
										</div>
									</div>
								{artists.map((value, index) => (
									<div key={`artist-${index}`} className="flex-row flex  w-5/6">
										<div className="flex">
											<ArtistTextBox changeHandler={setArtistValue} index={index} language="cyr" value={value.cyr} name={`artist-${index}-cyr`} placeholder="қазақша" className="w-36 sm:w-auto mr-2" />
											<ArtistTextBox changeHandler={setArtistValue} index={index} language="lat" value={value.lat} name={`artist-${index}-lat`} placeholder="qazaqşa" className="w-32 sm:w-auto mr-0 rounded-r-none border-r-0" />
											<button id={`button-${index}`} onClick={() => removeArtist(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold ml-0 h-10 px-3 rounded-r-md w-2 cursor-pointer" type="button">-</button>
										</div>
									</div>
								))}
							</div>
							</fieldset>
							<div className="cursor-pointer hover:after:content-['+'] duration-100 mb-5" onClick={addArtist}>
								Add another artist
							</div>
						</div>

						{/* Second block */}
						<div className="sm:px-4 px-2 py-3 bg-white font-extralight text-lg">
						{/* Album */}
							<fieldset className="flex flex-col gap-4">
								<div className="sm:flex-row flex-col flex">
									<div className="bg-white text-black rounded-md w-1/6 min-w-[16.66666%]">Album</div>
									<div className="flex w-5/6 gap-2" >
										<RadioButton id="album" text="Album" className="w-44 sm:w-auto" checked={album === true} onChange={setAlbumState} />
										<RadioButton id="no-album" text="No Album" className="w-44 sm:w-auto" checked={album === false} onChange={setAlbumState} />
										<div className="w-0 md:w-4"></div>
									</div>
								</div>
							{album &&
								<div className="">
									<div className="sm:flex-row flex-col flex">
										<div className="bg-white text-black rounded-md w-1/6 min-w-[16.66666%]">Album Name</div>
										<div className="flex gap-2">
											<TextBox name="album-cyr" placeholder="қазақша" className="w-36 sm:w-auto" />
											<TextBox name="album-lat" placeholder="qazaqşa" className="w-36 sm:w-auto" />
											<div className="w-0 md:w-4"></div>
										</div>
									</div>
									<div className="sm:flex-row flex-col flex">
										<div className="bg-white text-black rounded-md w-1/6  min-w-[16.66666%]">Album Cover</div>
										<div className="flex-row flex mt-2">
											<input type="file" name="album-cover" id="album-cover" className="hidden w-0" />
											<label htmlFor="album-cover" className="w-72 h-72 sm:w-[31rem] sm:h-[31rem] flex flex-row items-center gap-2 border-background border-2 rounded-md justify-center">
												<div className="text-gray-400">Drag and drop cover image</div>
											</label>
										</div>
									</div>
								</div>
							}
							</fieldset>
						</div>

						{/* Third block */}
						<div className={`sm:px-4 px-2 py-3 bg-white font-extralight text-lg`}>
							{/* Verse */}
							<fieldset className="gap-2 flex flex-col">
								<div className="bg-white text-black rounded-md px-2">Lyrics</div>
							{verse.map((value, index) => (
								<fieldset key={`line-${index}`} className=" bg-background flex flex-col rounded-md p-2 gap-2">
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
