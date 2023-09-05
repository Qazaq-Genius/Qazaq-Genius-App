import { get } from "http";

const Test = () =>  {

	var singleLine = "<0>Someone</0> is a brother, someone is a <1>friend</1>"

	function getCurrentHiglightPositions(singleLine) {
		var regex = /<\d+>(.*?)<\/(\d+)>/g;
		var match;
		var positions = [];
		while ((match = regex.exec(singleLine)) !== null) {

			positions.push([match[2], match.index, match.index + match[1].length]);
	
			singleLine = singleLine.replace(match[0], match[1]);
			
			// LastIndex ohne tags (<0>) berechnen und setzen 
			regex.lastIndex = match.index + match[1].length;
		}
		return positions;
	}


	function isNumberBetween(number, start, end) {
		return number > start && number < end;
	}

	function areNumbersBetween(number1, number2, start, end) {
		if(number1 <= start && number2 >= end){
			return true;
		}
		return false;
	}

	function calculateNewPosition(positions, selectedStart, selectedEnd) {
		var newPositions = [];

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


	function getSingleLineWithOutTags(singleLine) {
		var regex = /<\d+>(.*?)<\/\d+>/g;
		var match;
		while ((match = regex.exec(singleLine)) !== null) {
			singleLine = singleLine.replace(match[0], match[1]);
		}

		return singleLine;
	}

	function saveNewPositions(newPositions, singleLine) {
		var newSingleLine = singleLine;
		var offset = 0;
		newPositions.forEach((position) => {
			var nextNumber = position[0];

			if (nextNumber == 'new') {
				nextNumber = 4;
			}

			var markTags = ["<"+nextNumber+">", "</"+nextNumber+">"];
			newSingleLine = newSingleLine.slice(0, position[1] + offset) +  markTags[0]  + newSingleLine.slice(position[1] + offset, position[2] + offset) + markTags[1] + newSingleLine.slice(position[2] + offset, newSingleLine.length)
			
			offset += markTags[0].length + markTags[1].length;

		})
		return newSingleLine;
	}



	var newPositions = calculateNewPosition(getCurrentHiglightPositions(singleLine), 0, 2)
	console.log("newPositions: ", newPositions)

	var lineWithouTags = getSingleLineWithOutTags(singleLine)
	var newSingleLine = saveNewPositions(newPositions, lineWithouTags)
	console.log("newSingleLine: ", newSingleLine)
	singleLine = newSingleLine;

	
	  return (
		<div>
		{singleLine}
		</div>
	  )
}
export default Test;