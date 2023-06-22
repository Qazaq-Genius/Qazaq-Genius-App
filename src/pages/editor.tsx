import CheckboxItem from "../components/Input/CheckboxItem";
import TextBox from "../components/Input/TextBox";
import React, { useState } from 'react';


const Editor: React.FC = () => {

	const [artists, setartists] = useState<string[]>([]);
	const [verse,   setVerse]   = useState<string[]>([]);

	const addArtist = () => {
	  setartists([...artists, '']);
	};

	const addVerse = () => {
		setVerse([...verse, '']);
	};


  return (
    <>
    <main>
    	<div>
        	<div className="flex flex-col justify-center items-center">
				<div className="text-2xl white my-4 mt-8 text-white font-medium">Add New Song</div>
				<form method="POST" className="md:min-w-[66.66667%]">
					<fieldset className="flex flex-col md:flex-row border-2 border-white border-opacity-50 rounded-md px-2 py-2 m-2 justify-center gap-2">
						<legend className="bg-white text-black rounded-md px-2">Languages:</legend>
						<CheckboxItem id="rus" text="Russian" />
						<CheckboxItem id="eng" text="English" />
						<CheckboxItem id="cyr" text="Qazaq Cyrillic" />
						<CheckboxItem id="lat" text="Qazaq Latin" />
					</fieldset>

					{/* Title */}
					<fieldset className="flex flex-col border-2 border-white border-opacity-50  rounded-md px-2 py-2 m-2 justify-center gap-2 items-center">
						<legend className="bg-white text-black rounded-md px-2">Title</legend>
							<div className="flex justify-between m-2 gap-2">
								<TextBox name="title_cyr" placeholder="қазақша" className="md:w-96"/>
								<TextBox name="title_lat" placeholder="qazaqşa" className="md:w-96"/>
							</div>
					</fieldset>

						{/* Artists *********************************** start *** */}
					<fieldset className="flex flex-col border-2 border-white border-opacity-50  rounded-md px-2 py-2 m-2 justify-center gap-2 items-center">
						<legend className="bg-white text-black rounded-md px-2">Artists</legend>
						<div className="flex justify-between m-1 mt-2 mx-2 gap-2">
							<TextBox name="artist-1-cyr" placeholder="қазақша" className="md:w-96"/>
							<TextBox name="artist-1-lat" placeholder="qazaqşa" className="md:w-96"/>
							<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold h-6 w-6 mt-2 rounded-full cursor-pointer" type="button"> </button>
						</div>

						{artists.map((value, index) => (
							<>
							<div className="flex justify-between m-1 mx-2 gap-2">
								<TextBox name={`artist-${index}-cyr`} placeholder="қазақша" className="md:w-96"/>
								<TextBox name={`artist-${index}-lat`} placeholder="qazaqşa" className="md:w-96"/>
								<button id={`button-${index}`} onClick={addArtist} className="bg-red-500 hover:bg-red-700 text-white font-bold h-6 w-6 mt-2 rounded-full cursor-pointer" type="button">-</button>
							</div>
							</>
						))}

						<div className="cursor-pointer hover:after:content-['+'] duration-100" onClick={addArtist}>
							Add another artist
						</div>
					</fieldset>
					{/* Artists *********************************** end ***** */}

					{/* Album */}
					<fieldset className="flex flex-col border-2 border-white border-opacity-50  rounded-md px-2 py-2 m-2 justify-center gap-2 items-center">
						<legend className="bg-white text-black rounded-md px-2">Album</legend>
						<div className="flex justify-between m-2 gap-2">
							<TextBox name="album-cyr" placeholder="қазақша" className="md:w-96"/>
							<TextBox name="album-lat" placeholder="qazaqşa" className="md:w-96"/>
						</div>
					</fieldset>


					{/* Verse */}
					<fieldset className="flex flex-col border-2 border-white border-opacity-50 rounded-md px-2 py-2 m-2 justify-center gap-2">
						<legend className="bg-white text-black rounded-md px-2">Lyrics</legend>
						{verse.map((value, index) => (
							<>
							<fieldset className="flex flex-col rounded-md p-2 justify-center gap-2 bg-white bg-opacity-40">
								<legend className="bg-white text-black rounded-md px-2">Line {index+1}</legend>
								<TextBox name="line-cyr" placeholder="қазақша"/>
								<TextBox name="line-lat" placeholder="qazaqşa"/>
								<TextBox name="line-eng" placeholder="english"/>
								<TextBox name="line-rus" placeholder="russian"/>
							</fieldset>
							</>
						))}
						<span onClick={addVerse}>Add Verse</span>
					</fieldset>

				</form>
            </div>
        </div>
    </main>
    </>
  );
};


export default Editor;
