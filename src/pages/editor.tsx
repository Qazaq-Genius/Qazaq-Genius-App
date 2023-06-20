import Languages from "../components/Input/Languages"
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
				<form method="POST">
					<Languages />
					<br />
					<br />

					{/* Title */}
					<div className="flex justify-between">
						<label htmlFor="title">Title: </label>
						<input type="text" name="title_cyr" className="rounded-md" />
						<input type="text" name="title_lat" className="rounded-md ml-2" />
					</div>
					<br />
					
					{/* Artists *********************************** start *** */}
					<label htmlFor="artist-1-cyr">Artists 1: </label>
						<input type="text" name="artist-1-cyr" className="rounded-md" />
						<input type="text" name="artist-1-lat" className="rounded-md ml-2" />
						<span className="ml-2" onClick={addArtist}>Plus</span>
					<br />
					{artists.map((value, index) => (
						<>
						<br />
						<label htmlFor={`artist-${index}-cyr`}>Artists {index + 2}:</label>
						<input
						className="rounded-md ml-2"
						name={`artist-${index +2}-cyr`}
						key={`${index +2 }-cyr`}
						/>

						<input
						className="rounded-md ml-2"
						name={`artist-${index +2 }-lat`}
						key={`${index +2}-lat`}
						/>
						<br />
						</>
					))}
					{/* Artists *********************************** end ***** */}

					<br />
					{/* Album */}
					<div className="flex justify-between">
						<label htmlFor="album">Album: </label>
						<input type="text" name="album-cyr" className="rounded-md" />
						<input type="text" name="album-lat" className="rounded-md ml-2" />
					</div>
					<br />


					{/* Verse */}
					<span onClick={addVerse}>Add Verse</span>
					{verse.map((value, index) => (
						<>
						<p>Das ist ein Verse</p>
						</>
					))}


				</form>
            </div>
        </div>
      </main>
    </>
  );
};


export default Editor;
