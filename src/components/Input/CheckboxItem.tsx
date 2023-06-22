interface CheckboxItemProps {
    id: string;
    text: string;
}

const CheckboxItem = (props: CheckboxItemProps) => {
	return (
    <div className="text-center contents">
        <input name={props.id} id={props.id} type="checkbox" className="peer hidden"/>
        <label htmlFor={props.id} className="rounded-md  text-white bg-background border-white border-2 px-1 peer-checked:bg-white peer-checked:text-background duration-200">
            {props.text}
        </label>
    </div>
    );
};

export default CheckboxItem;
