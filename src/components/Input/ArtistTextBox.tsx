interface TextBoxProps {
    name: string;
    placeholder?: string;
    className?: string;
	changeHandler: any,
	value: string,
	index: number,
	language: string,
}

const ArtistTextBox = (props: TextBoxProps) => {
    let placeholder = props.placeholder ?? "";
    let className = props.className ?? "";

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		// werte aufbereiten 
		var value = event.target.value
		var index = props.index
		var language = props.language

		// Parent fuction mit Argumenten aufrufen 
		props.changeHandler(value, index, language)
	}
	return (
        <input key={ "input" + props.language}  type="text" value={props.value} placeholder={`${placeholder}`} onChange={inputChangeHandler} className={`border-gray-300 bg-white bg-opacity-80 focus:bg-opacity-95 h-10 rounded-md focus:outline-none px-2 ${className}`} name={props.name}/>
    );
};

export default ArtistTextBox;
