import React from 'react';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '500'],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext'],
  display: 'swap',
})


export interface SongProps {
  id: number;
  title_cyr: string;
  title_lat: string;
  cover_art: string;
  release_date: string;
  artists: {
    id: number;
    name_cyr: string;
    name_lat: string;
  }[];
  lyrics: Record<string, Record<string, any>>;
}

interface Word {
  word_in_line_nr: number;
  qazaq_cyr: string;
  qazaq_lat: string;
  english: string;
  russian: string;
}

interface Lyrics {
  line_nr: number;
  qazaq_cyr: string;
  qazaq_lat: string;
  english: string;
  russian: string;
  original_lang: string;
  words: Word[];
}

const renderLine = (line: string, lang: string, words: Word[]) => {
  const parts = line.split(/<(?<digit>\d)>(?:.+?)<\/\k<digit>>/gu);
  const match = line.matchAll(/<(?<digit>[0-9])>(?<original_word>.+?)<\/\k<digit>>/gu);

  return parts.map((part, i) => {
    if (i % 2 === 0) {
      return part;
    }
    const currentWordIndex = parseInt(part);

    //find the current word
    const currentWordInfo: Word = words.find(({ word_in_line_nr }: Word) =>
      word_in_line_nr === currentWordIndex
    ) ?? { word_in_line_nr: -1, qazaq_cyr: '', qazaq_lat: '', english: '', russian: '' };

    const color = [
      'highlight-green',
      'highlight-pink',
      'highlight-blue',
      'highlight-yellow'
    ][currentWordIndex] || 'highlight-dark-yellow';

    const word = match.next().value.groups.original_word;

    const mouseover_string = `${[currentWordInfo?.qazaq_cyr, currentWordInfo?.english, currentWordInfo?.russian]
      .filter((word) => word !== '')
      .join(' - ')}`;

    return (
      <span /*HighlightedWord*/
        className={`cursor-pointer bg-${color} hover:bg-${color}`}
        title={mouseover_string}
        color={color}
        key={word}
      >
        {word}
      </span> /*HighlightedWord*/
    );
  });
};

const renderVerse = (lines: Record<string, Lyrics>, lang: string) => {
  return Object.values(lines).map(({ line_nr, qazaq_cyr, qazaq_lat, english, russian, original_lang, words }: Lyrics) => {
    const original_lang_line = eval(original_lang); // there should be a better way to do this, possibly with a switch statement

    return (
      <div className='p-4 mb-4' key={line_nr}> {/*Container*/}
        <p className='m-0 font-medium' key={`${line_nr}-${lang}`}>  {/*OriginalLangLine*/}
          {renderLine(original_lang_line, lang, words)}
        </p> {/*OriginalLangLine*/}
        <p className='m-0' key={`${line_nr}-english`}> {/*Line*/}
          {renderLine(english, lang, words)}
        </p> {/*Line*/}
        <p className='m-0' key={`${line_nr}-russian`}> {/*Line*/}
          {renderLine(russian, lang, words)}
        </p> {/*Line*/}
      </div> /*Container*/
    );
  });
};

const renderLyrics = (lyrics: Record<string, Record<string, any>>) => {
  return Object.values(lyrics).flatMap((lines, index) => {
    return (
      <div className="p-4 mb-4" key={index}> {/*VerseContainer*/}
        {renderVerse(lines, "qazaq_cyr")}
      </div> /*VerseContainer*/
    );
  });
};

const Song: React.FC<SongProps> = ({ id, release_date, title_cyr, title_lat, artists, lyrics }) => {
  // we need to format the release date with locale because every client will have a different locale
  // and this destroys the hydration
  const formattedReleaseDate = (new Date(Date.parse(release_date))).toLocaleDateString('en-GB');

  return (
    <>
      <div className={`p-4 mt-0 text-lg font-extralight ${roboto.className} sm:mx-1% md:mx-10% lg:mx-25% xl:mx-30% bg-white`} key={`site`}> {/*SiteContainer*/}
        <h3 className='mt-0'> {/*Title*/}
          <span className='bg-highlight-dark-yellow'> {/*TitleWrapper*/}
            {title_cyr} ({title_lat}) - {artists.map(({ name_cyr }) => name_cyr).join(', ')}
          </span> {/*TitleWrapper*/}
        </h3> {/*Title*/}
        <div>Release date {formattedReleaseDate}</div>
        <hr className='border-solid mt-2 border-gray-500' />
        <div> {/*Lyrics*/}
          {renderLyrics(lyrics)}
        </div> {/*Lyrics*/}
      </div> {/*SiteContainer*/}
    </>
  );
};

export default Song;
