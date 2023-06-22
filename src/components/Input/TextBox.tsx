interface TextBoxProps {
    name: string;
    placeholder?: string;
}

const TextBox = (props: TextBoxProps) => {
    let placeholder = props.placeholder ?? "";
	return (
        <input type="text" placeholder={`${placeholder}`} className="border-gray-300 bg-white h-10 rounded-md focus:outline-none px-2" name={props.name}/>
    );
};

export default TextBox;
