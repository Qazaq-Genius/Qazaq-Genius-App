interface CheckboxItemProps {
    id: string;
    text: string;
    className?: string
	clickHandler: any
}

const CheckboxItem = (props: CheckboxItemProps) => {
    let className = props.className ?? "";

	const selectLanguage = (language: string) => {
		props.clickHandler(language)
	}
	return (
    <div className="text-center contents">
        <input name={props.id} onChange={() => selectLanguage(props.id)} id={props.id} type="checkbox" className="peer hidden"/>
        <label htmlFor={props.id} className={`${className} flex items-center justify-center cursor-pointer rounded-md h-9 text-white bg-background hover:bg-white hover:bg-opacity-25 border-opacity-80 border-white border-2 px-1 peer-checked:border-opacity-0 peer-checked:hover:bg-opacity-70 peer-checked:hover:border-opacity-50 peer-checked:bg-white peer-checked:bg-opacity-80 peer-checked:text-background duration-200`}>
            {props.text}
        </label>
    </div>
    );
};

export default CheckboxItem;
