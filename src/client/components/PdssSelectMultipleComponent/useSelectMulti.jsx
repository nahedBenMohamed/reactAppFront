/* eslint-disable */
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

const useOutsideClick = callback => {
	const ref = useRef();
	useEffect(() => {
		const handleClick = event => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback(ref.current, event.target);
			}
		};
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [ref]);

	return ref;
};

export default props => {
	const { languages, clearErrors, setValue, form_action_edit, child } = props;
	const [isActive, setIsActive] = useState(false);
	const [checkedValue, setCheckedValue] = useState([41]);
	const [searchInput, setSearchInput] = useState();
	const [list, setList] = useState('Deutsch,');
	useEffect(() => {
		setValue('languages', checkedValue);
	}, [checkedValue]);

	useEffect(() => {
		if (form_action_edit && child?.languages && languages?.length > 0) {
			let languageId = [];
			let languageName = '';
			languages.forEach(language => {
				if (child.languages.includes(language.id.toString())) {
					languageId.push(language.id);
					languageName += language.name + ',';
				}
			});
			setCheckedValue(languageId);
			setList(languageName);
		}
	}, [form_action_edit, child]);

	const handleClick = () => {
		setIsActive(current => !current);
	};
	const handleChange = e => {
		setSearchInput(e.target.value);
	};

	const getFilteredLanguages = () => {
		if (!searchInput) return languages;
		return languages.filter(patient => patient.name.toLowerCase().includes(searchInput.toLowerCase()));
	};
	const filteredLanguages = getFilteredLanguages();

	const handleSelectLanguage = async (e, language) => {
		e.preventDefault();
		clearErrors('languages');
		if (checkedValue.includes(language.id)) {
			await setCheckedValue(checkedValue.filter(item => item !== language.id));
			await setList(list.replace(language.name + ',', ''));
		} else {
			await setCheckedValue(old => [...old, language.id]);
			await setList(list + language.name + ',');
		}
	};
	const handleClickOutside = (current, target) => {
		if (current.id != target.id) setIsActive(current => !current);
	};

	const ref = useOutsideClick(handleClickOutside);

	return {
		isActive,
		handleClick,
		handleSelectLanguage,
		list,
		ref,
		handleChange,
		searchInput,
		getFilteredLanguages,
		filteredLanguages,
		checkedValue
	};
};
