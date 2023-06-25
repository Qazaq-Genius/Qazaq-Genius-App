import CheckboxItem from "./CheckboxItem";

interface LanguageCheckboxItemProps {
    id: string;
    text: string;
    className?: string
	clickHandler: any
}

const LanguageCheckboxItem = (props: LanguageCheckboxItemProps) => {
    let className = props.className ?? "";

	const selectLanguage = (language: string) => {
		props.clickHandler(language)
	}

    return (
        <CheckboxItem onChange={() => selectLanguage(props.id)} id={props.id} text={props.text} className={props.className}/>
    );
};

export default LanguageCheckboxItem;
