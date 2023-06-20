import "../../../node_modules/flag-icons/css/flag-icons.min.css";
const Languages = () => {
	return (
		<>
		<p>Languages:</p>
				
		<label htmlFor="russian">
			<span className="fi fi-ru mr-1"></span> 
			Russian
		</label>
		<input name="russian" type="checkbox"  className="ml-1"/>
			
		<label htmlFor="english">
			<span className="fi fi-gb mr-1 ml-3"></span> 
			English
		</label>
		<input name="english" type="checkbox"  className="mr-8 ml-1"/>
		
		<label htmlFor="cyrillic">Cyrillic</label>
		<input name="cyrillic" type="checkbox"  className="mr-8 ml-1"/>
		<label htmlFor="latin">Latin</label>
		<input name="latin" type="checkbox"  className="mr-8 ml-1"/>
		</>
	)
}

export default Languages