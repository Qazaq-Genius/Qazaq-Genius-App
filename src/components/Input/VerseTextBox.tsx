import { useState } from "react";

interface TextBoxProps {
    name: string;
    placeholder?: string;
    className?: string;
	value?: string,
	index: number,
	language: string,
	changeHandler: any,
	onPasteHandler: any

}

const VerseTextBox = (props: TextBoxProps) => {
	const [isPaste, setPaste] = useState(false)
    let placeholder = props.placeholder ?? "";
    let className = props.className ?? "";

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		// werte aufbereiten
		var value = event.target.value
		var index = props.index
		var language = props.language

		// Parent fuction mit Argumenten aufrufen
		if(!isPaste){
			props.changeHandler(value, index, language)
		}else
		setPaste(false)
	}

	const onPasteHandler = (event: any) =>  {
		setPaste(true)
		props.onPasteHandler(event.clipboardData.getData('text'), props.index)
	}


	return (
        <input type="text" onPaste={onPasteHandler} value={props.value} placeholder={`${placeholder}`} onChange={inputChangeHandler} className={`border-background border-2 bg-white bg-opacity-80 focus:bg-opacity-95 h-10 rounded-md focus:outline-none px-2 ${className}`} name={props.name}/>
    );
};

export default VerseTextBox;
