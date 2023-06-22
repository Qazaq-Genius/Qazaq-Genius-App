interface TextBoxProps {
    name: string;
}

const TextBox = (props: TextBoxProps) => {
	return (
        <input type="text" className="border-gray-300 bg-white h-10 rounded-md focus:outline-none px-2" name={props.name}/>
    );
};

export default TextBox;
