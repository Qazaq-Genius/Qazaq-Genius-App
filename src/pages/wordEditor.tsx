import React from 'react';
import { useState } from 'react';
import HighlightLine from '../components/HighlightLine';
import Modal from '../components/Modal';

const editor = () => {


	interface song{
		[key:string]: string | number | any[];
	}
	var orig_data: song[]  = [
		{
			"line_nr": 1,
			"qazaq_cyr": "<0>Ð‘Ñ–Ñ€Ñ–Ò£<\/0> Ð±Ð°ÑƒÑ‹Ñ€, Ð±Ñ–Ñ€Ñ–Ò£ <1>Ð´Ð¾Ñ<\/1>",
			"qazaq_lat": "<0>BÄ±rÄ±Ã±<\/0> bauyr, bÄ±rÄ±Ã± <1>dos<\/1>",
			"english": "<0>Someone</0> is a brother, <0>someone</0> is a <1>friend</1>",
			"russian": "<0>ÐšÑ‚Ð¾-Ñ‚Ð¾<\/0> Ð±Ñ€Ð°Ñ‚, ÐºÑ‚Ð¾-Ñ‚Ð¾ <1>Ð´Ñ€ÑƒÐ³<\/1>",
			"original_lang": "qazaq_cyr",
			"words": []
		},
		{
			"line_nr": 2,
			"qazaq_cyr": "<0>Ð–Ð¸Ñ‹Ð»ÑÑ‹Ð½<\/0> Ð±Ó™Ñ€Ñ– Ð±Ð°ÑÑ‹Ð½ Ò›Ð¾Ñ",
			"qazaq_lat": "<0>Jiylsyn<\/0> bÃ¤rÄ± basyn qos",
			"english": "<0>Get them<\/0> all together",
			"russian": "<0>ÐžÐ±ÑŠÐµÐ´Ð¸Ð½Ð¸<\/0> Ð¸Ñ… Ð²ÑÐµÑ… Ð²Ð¾ ÐµÐ´Ð¸Ð½Ð¾",
			"original_lang": "qazaq_cyr",
			"words": [
				{
					"word_in_line_nr": 0,
					"qazaq_cyr": "Ð¶Ð¸ÑŽ",
					"qazaq_lat": "jiÃ¼",
					"english": "collect\/unite",
					"russian": "ÑÐ¾Ð±Ð¸Ñ€Ð°Ñ‚ÑŒ"
				}
			]
		},
		{
		"line_nr": 3,
		"qazaq_cyr": "<0>ÐÐ»Ñ‹Ñ<\/0>-<1>Ð¶Ð°Ò›Ñ‹Ð½<\/1> <2>Ñ‚Ð°Ò£Ð´Ð°Ð¼Ð°<\/2>",
		"qazaq_lat": "<0>Alys<\/0>-<1>jaqyn<\/1> <2>taÃ±dama<\/2>",
		"english": "<2>Don't<\/2> choose between them",
		"russian": "<2>ÐÐµ Ð²Ñ‹Ð±Ð¸Ñ€Ð°Ð¹<\/2> <0>Ð´Ð°Ð»ÑŒÐ½ÐµÐ³Ð¾<\/0> Ð¸Ð»Ð¸ <1>Ð±Ð»Ð¸Ð¶Ð½ÐµÐ³Ð¾<\/1>",
		"original_lang": "qazaq_cyr",
		"words": [
			{
				"word_in_line_nr": 0,
				"qazaq_cyr": "Ð°Ð»Ñ‹Ñ",
				"qazaq_lat": "alys",
				"english": "far away",
				"russian": "Ð´Ð°Ð»ÑŒÐ½Ð¸Ð¹"
			},
			{
				"word_in_line_nr": 1,
				"qazaq_cyr": "Ð¶Ð°ÐºÑ‹Ð½",
				"qazaq_lat": "jakyn",
				"english": "closest",
				"russian": "Ð±Ð»Ð¸Ð¶Ð½Ð¸Ð¹"
			},
			{
				"word_in_line_nr": 2,
				"qazaq_cyr": "Ñ‚Ð°Ð½Ð´Ð°Ñƒ",
				"qazaq_lat": "tandau",
				"english": "choice",
				"russian": "Ð²Ñ‹Ð±Ð¾Ñ€"
			}
		]
	}
		
]
const colors = {
	0:'highlight-green',
	1:'highlight-pink',
	2:'highlight-blue',
	3:'highlight-yellow'
}
const [songData, setSongData] = useState(orig_data);
const [showModal, setShowModal] = useState(false);
const [selectedColor, setSelectedColor] = useState(0);

	  const getFirstParentDiv = (element : any) => {
		let parent = element.parentNode;
		while (parent !== null) {
		  if (parent.tagName === 'DIV') {
			return parent;
		  }
		  parent = parent.parentNode;
		}
		return null; // No parent <div> found
	  }


	const onMouseUp = (event: Event) => {
		const lineDiv: Element = event.target as Element;
		var languageShort: string = ""
		var lineNumber: number = 0 
		var lineDivId: string = lineDiv.id;
		

		if (lineDiv.id == "") {
			lineDivId = getFirstParentDiv(lineDiv).id;
		}

		[languageShort, lineNumber] = lineDivId.split('-') as [string, number];

		
		const lang_map: Record<string, string> = {
			"cyr": "qazaq_cyr",
			"lat": "qazaq_lat",
			"eng": "english",
			"rus": "russian"
		};

		const language = lang_map[languageShort];
		var lineWithTags: any = songData[lineNumber -1][language];

		var selectedText = getSelectionText();
		var startPosition = getSelectionStartPosition(lineDivId);
	  
		if (selectedText && startPosition !== -1) {
			var endPosition = startPosition + selectedText.length;	
			var newPositions = calculateNewPosition(getCurrentHiglightPositions(lineWithTags), startPosition, endPosition)
			var lineWithouTags = getSingleLineWithOutTags(lineWithTags)
			var newSingleLine = saveNewPositions(newPositions, lineWithouTags)	
	
			songData[lineNumber -1][language] = newSingleLine;

			setSongData([...songData])
		}
	}

	const getSelectionText = () => {
		if (window.getSelection) {
			return window.getSelection().toString();
		  } else if (document.selection && document.selection.type !== 'Control') {
			return document.selection.createRange().text;
		  }
		  return '';
	}

	const getSelectionStartPosition = (divId) => {
		if (window.getSelection && window.getSelection().rangeCount > 0) {
			var range = window.getSelection().getRangeAt(0);
			var preSelectionRange = range.cloneRange();
			preSelectionRange.selectNodeContents(document.getElementById(`${divId}`));
			preSelectionRange.setEnd(range.startContainer, range.startOffset);
			return preSelectionRange.toString().length;
		  }
		  return -1;
	}


	function getCurrentHiglightPositions(singleLine: string): any[] {
		var regex = /<\d+>(.*?)<\/(\d+)>/g;
		var match;
		var positions: any[] = [];
		while ((match = regex.exec(singleLine)) !== null) {

			positions.push([match[2], match.index, match.index + match[1].length]);
	
			singleLine = singleLine.replace(match[0], match[1]);
			
			// LastIndex ohne tags (<0>) berechnen und setzen 
			regex.lastIndex = match.index + match[1].length;
		}

		return positions;
	}


	function isNumberBetween(number: number, start: number, end: number) {
		return number > start && number < end;
	}

	function areNumbersBetween(number1:number, number2:number, start:number, end:number) {
		if(number1 <= start && number2 >= end){
			return true;
		}
		return false;
	}

	function calculateNewPosition(positions:  any[] , selectedStart: number, selectedEnd: number) {
		var newPositions: any[] = [];

		newPositions.push(['new', selectedStart, selectedEnd])

		positions.forEach((position) => {
			var start = position[1];
			var end = position[2];

			var newPos = false
			if(isNumberBetween(selectedStart, start, end)){
				newPositions.push([position[0], start, selectedStart]);
				newPos = true;
			}
			if(isNumberBetween(selectedEnd, start, end)){
				newPositions.push([position[0], selectedEnd, end]);
				newPos = true;
			}

			if(areNumbersBetween(selectedStart, selectedEnd, start, end)){
				newPos = true;
			}


			if(!newPos){
				newPositions.push(position)
			}

		})

		newPositions.sort((a, b) => {
			return a[1] - b[1];
		})
		
	 return newPositions;

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
		  className={`cursor-pointer p-0.5 -m-0.5 bg-${color} hover:bg-${color}`}
		  title={mouseover_string}
		  color={color}
		  key={word}
		>
		  {word}
		</span> /*HighlightedWord*/
	  );
	});
  };


	function getSingleLineWithOutTags(singleLine: string) {
		console.log("in", singleLine)
		var regex = /<\d+>(.*?)<\/\d+>/g;
		var match;
		while ((match = regex.exec(singleLine)) !== null) {
			singleLine = singleLine.replace(match[0], match[1]);
			regex.lastIndex = match.index + match[1].length;
		}
		return singleLine;
	}

	function saveNewPositions(newPositions: any[], singleLine: string) {
		// console.log("pos:  ",newPositions)
		// console.log("single: ",singleLine)
		var newSingleLine = singleLine;
		var offset = 0;
		newPositions.forEach((position) => {
			var nextNumber = position[0];

			if (nextNumber == 'new') {
				nextNumber = selectedColor;
			}

			var markTags = ["<"+nextNumber+">", "</"+nextNumber+">"];
			newSingleLine = newSingleLine.slice(0, position[1] + offset) +  markTags[0]  + newSingleLine.slice(position[1] + offset, position[2] + offset) + markTags[1] + newSingleLine.slice(position[2] + offset, newSingleLine.length)
			
			offset += markTags[0].length + markTags[1].length;

		})
		// console.log("new: ",newSingleLine)
		return newSingleLine;
	}

	function setSelectedTagColor(colorIndex: number) {
		setSelectedColor(colorIndex);
	}


	return(
		<div className='m-auto bg-white w-1/3 sm:w-1/2'>
			<h2 className="text-3xl">Choose a color</h2>
			<div className='flex content-between gap-2 mb-2 ms-2'>
				<button onClick={() => setSelectedTagColor(0)} className={`h-8 w-8 bg-highlight-green ${selectedColor == 0 && "border-cyan-800 border-2 rounded"}`}></button>
				<button onClick={() => setSelectedTagColor(1)} className={`h-8 w-8 bg-highlight-pink ${selectedColor == 1 && "border-cyan-800 border-2 rounded"}`}></button>
				<button onClick={() => setSelectedTagColor(2)} className={`h-8 w-8 bg-highlight-blue ${selectedColor == 2 && "border-cyan-800 border-2 rounded"}`}></button>
				<button onClick={() => setSelectedTagColor(3)} className={`h-8 w-8 bg-highlight-yellow ${selectedColor == 3 && "border-cyan-800 border-2 rounded"}`}></button>
			</div>
			{Object.values(songData).map((line, i) => {

					return(

					<div>
						<div id={`cyr-${line.line_nr}`} onMouseUp={onMouseUp}>
						{line.qazaq_cyr  &&
						renderLine(line.qazaq_cyr, 'cyr', line.words)
						}
						</div>
						<div id={`lat-${line.line_nr}`} onMouseUp={onMouseUp}>
						{
							line.qazaq_lat &&
							renderLine(line.qazaq_lat, 'lat', line.words)
						}
						</div>
						<div id={`eng-${line.line_nr}`} onMouseUp={onMouseUp}>
						{
							line.english &&
							renderLine(line.english, 'eng', line.words)
						}
						</div>
						<div id={`rus-${line.line_nr}`} onMouseUp={onMouseUp}>
						{
							line.russian &&
							renderLine(line.russian, 'rus', line.words)
						}
						</div>
					</div>
				)}
				)

			}

			{showModal &&      <Modal title={"Choose Tag"} onClose={() => setShowModal(false)}>
            </Modal> }
			<div id="modal-root"></div>
		</div>
	)
}
export default editor;