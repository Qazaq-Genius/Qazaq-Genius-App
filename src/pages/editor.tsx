import CheckboxItem from "../components/Input/CheckboxItem";
import TextBox from "../components/Input/TextBox";
import React, { useState } from 'react';


const Editor: React.FC = () => {

	const [artists, setartists] = useState<string[]>([]);
	const [verse, setVerse] = useState<string[]>([]);

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
				<form method="POST" className="md:w-3/6">
					<fieldset className="flex flex-col md:flex-row border-2 rounded-md px-2 py-2 m-2 justify-center gap-2">
						<legend className="bg-white text-black rounded-md px-2">Languages:</legend>
						<CheckboxItem id="rus" text="Russian" />
						<CheckboxItem id="eng" text="English" />
						<CheckboxItem id="cyr" text="Qazaq Cyrillic" />
						<CheckboxItem id="lat" text="Qazaq Latin" />
					</fieldset>

					{/* Title */}
					<fieldset className="flex flex-col md:flex-row border-2 rounded-md px-2 py-2 m-2 justify-center gap-2 items-center">
						<legend className="bg-white text-black rounded-md px-2">Title</legend>
							<div className="flex justify-between m-2 gap-2">
								<TextBox name="title_cyr" placeholder="қазақша"/>
								<TextBox name="title_lat" placeholder="qazaqşa"/>
							</div>
					</fieldset>

						{/* Artists *********************************** start *** */}
					<fieldset className="flex flex-col border-2 rounded-md px-2 py-2 m-2 justify-center gap-2 items-center">
						<legend className="bg-white text-black rounded-md px-2">Artists</legend>
						<div className="flex justify-between m-1 mt-2 mx-2 gap-2">
							<TextBox name="artist-1-cyr" placeholder="қазақша"/>
							<TextBox name="artist-1-lat" placeholder="qazaqşa"/>
						</div>

						{artists.map((value, index) => (
							<>
							<div className="flex justify-between m-1 mx-2 gap-2">
								<TextBox name={`artist-${index +2}-cyr`} placeholder="қазақша"/>
								<TextBox name={`artist-${index +2}-lat`} placeholder="qazaqşa"/>
							</div>
							</>
						))}

						<div className="cursor-pointer hover:after:content-['+'] duration-100" onClick={addArtist}>
							Add another artist
						</div>
					</fieldset>
					{/* Artists *********************************** end ***** */}

					{/* Album */}
					<fieldset className="flex flex-col md:flex-row border-2 rounded-md px-2 py-2 m-2 justify-center gap-2">
						<legend className="bg-white text-black rounded-md px-2">Album</legend>
						<div className="flex justify-between m-2 gap-2">
							<TextBox name="album-cyr" placeholder="қазақша"/>
							<TextBox name="album-lat" placeholder="qazaqşa"/>
						</div>
					</fieldset>


					{/* Verse */}
					<fieldset className="flex flex-col border-2 rounded-md px-2 py-2 m-2 justify-center gap-2">
						<legend className="bg-white text-black rounded-md px-2">Lyrics</legend>
						{verse.map((value, index) => (
							<>
							<fieldset className="flex flex-col md:flex-col rounded-md p-2 justify-center gap-2 bg-white bg-opacity-40">
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
