import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '500'],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext'],
})


interface SongProps {
  id: number;
  title_cyr: string;
  title_lat: string;
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


const Song: React.FC<SongProps> = ({ id, title_cyr, title_lat, artists, lyrics }) => {
  const renderLyrics = () => {
    return Object.values(lyrics).flatMap((lines, index) => {
      const renderVerse = (line: any, lang: string) => {
        return Object.values(lines).map(({ line_nr, qazaq_cyr, qazaq_lat, english, russian, original_lang, words }: Lyrics) => {
          const qazaq_line = eval(original_lang);

          const renderLine = (line: string, lang: string) => {
            const parts = line.split(/<(?<digit>\d)>(?:.+?)<\/\k<digit>>/gu);
            const match = line.matchAll(/<(?<digit>[0-9])>(?<original_word>.+?)<\/\k<digit>>/gu);

            return parts.map((part, i) => {
              if (i % 2 === 0) {
                return part;
              }
              const currentWordIndex = parseInt(part);

              //find the current word
              const currentWordInfo: Word = words.find(({word_in_line_nr}: Word) =>
                   word_in_line_nr === currentWordIndex
              )  ?? {word_in_line_nr: -1, qazaq_cyr: '', qazaq_lat: '', english: '', russian: ''};

              const color = ['#D7FF63', '#FFACD6', '#AEDEF8', 'FFFF4F'][currentWordIndex] || '#ffff0077';

              const word = match.next().value.groups.original_word;

              return (
                <HighlightedWord
                  title={`${
                    [currentWordInfo?.qazaq_cyr, currentWordInfo?.english, currentWordInfo?.russian]
                    .filter((word) => word !== '')
                    .join(' - ')}`
                  }
                  color={color}
                  key={`${word}`}
                >
                  {word}
                </HighlightedWord>
              );
            });
          };
          return (
            <Container key={`${index}-${line_nr}`}>
              <OriginalLangLine key={`${index}-${line_nr}-qazaq_cyr`}>
                {renderLine(qazaq_line, "qazaq_cyr")}
              </OriginalLangLine>
              <Line key={`${index}-${line_nr}-english`}>
                {renderLine(english, "english")}
              </Line>
              <Line key={`${index}-${line_nr}-russian`}>
                {renderLine(russian, "russian")}
              </Line>
            </Container>
          );
        });
      };
      return (
        <VerseContainer key={`${index}`}>
          {renderVerse(lines, "qazaq_cyr")}
        </VerseContainer>
      );
    });
  };

  return (
    <SiteContainer key={`site`}>
      <Site/>
      <Title key={`title`}>
        <TitleWrapper>
          {title_cyr} ({title_lat}) - {artists.map(({ name_cyr }) => `${name_cyr}`).join(', ')}
        </TitleWrapper>
        <Hr/>
      </Title>
      <Lyrics key={`lyrics`}>
        {renderLyrics()}
      </Lyrics>
    </SiteContainer>
  );
};

// hr tag with margina above
const Hr = styled.hr`
  border-style: solid;
  border-color: #ccc;
  margin-top: 4vh;
`;

const TitleWrapper = styled.span`
  background-color: #ffff0077;
`;

const Title = styled.h3`
  margin-top: 0;
`;

const Site = createGlobalStyle`
  body {
    background-color: #AEDEF877;
  }
`;

const SiteContainer = styled.div`
  background-color: #FFFFFF;
  margin-inline: 30%;
  padding: 16px;
  margin-top: 0px;
  font-size: 14pt;
  font-weight: 300;
  font-family: ${roboto.style.fontFamily};
`;

const VerseContainer = styled.div`
  padding: 16px;
  margin-bottom: 16px;
`;

const Container = styled.div`
  padding: 16px;
  margin-bottom: 16px;
`;


const Lyrics = styled.div`
  white-space: pre-wrap;
`;

const Line = styled.p`
  margin-block: 1.5vh;
  margin: 0;
`;

const OriginalLangLine = styled.p`
  font-weight: 500;
  margin-block: 1.5vh;
  margin: 0;
`;

const HighlightedWord = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.color) + '55'}};
  }
`;

export default Song;
