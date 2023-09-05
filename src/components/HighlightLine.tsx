import React from 'react';

interface Line {
	  line: string;
	  index: number;
}

const editor = ({line, index}: Line) => {
const lines = [
	'Жаз гүліндей жайнаған',
	'With its <0>blooming</0> summer flowers',
	'Земля столь <1>прекрасна</1>',
  ];

  const color = [
	'bg-green-200',
	'bg-pink-200',
	'bg-blue-200',
	'bg-yellow-200'
  ]
  
  const renderLines = () => {
	const words = line.split(/(<\d+>.*?<\/\d+>)/g);
	const renderedLine = words.map((word: string, wordIndex: number) => {
	  const match = word.match(/<(\d+)>(.*?)<\/\d+>/);
	  if (match) {
		const tagNumber = match[1];
		const wordContent = match[2];
		const spanClass = color[tagNumber as keyof typeof color]

		return <span key={wordIndex} className={`${spanClass}`}>{wordContent}</span>;
	  }
	  return <React.Fragment key={wordIndex}>{word}</React.Fragment>;
	});
  
	return <p key={index}>{renderedLine}</p>;
  }
  
  return <div>{renderLines()}</div>;
}
export default editor;