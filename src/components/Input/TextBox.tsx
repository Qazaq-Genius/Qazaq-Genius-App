interface TextBoxProps {
    name: string;
    placeholder?: string;
    className?: string;
}

const TextBox = (props: TextBoxProps) => {
    let placeholder = props.placeholder ?? "";
    let className = props.className ?? "";
	return (
        <input type="text" placeholder={`${placeholder}`} className={`border-background border-2 bg-white h-10 rounded-md focus:outline-none px-2 ${className}`} name={props.name}/>
    );
};

export default TextBox;
