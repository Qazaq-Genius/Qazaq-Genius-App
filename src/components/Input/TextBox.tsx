interface TextBoxProps {
    name: string;
    placeholder?: string;
    className?: string;
}

const TextBox = (props: TextBoxProps) => {
    let placeholder = props.placeholder ?? "";
    let className = props.className ?? "";
	return (
        <input type="text" placeholder={`${placeholder}`} className={`border-gray-300 bg-white bg-opacity-80 focus:bg-opacity-95 h-10 rounded-md focus:outline-none px-2 ${className}`} name={props.name}/>
    );
};

export default TextBox;
