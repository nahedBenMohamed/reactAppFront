import { useContext } from 'react';
const PdssResultKeyboardComponent = props => {
	const { ContextExtendedResult } = props;
	const {
		setExpandKeyboard,
		setElements,
		elements,
		selected,
		setUpdate
	} = useContext(ContextExtendedResult);
	const handleCloseKeyboard = () => {
		setExpandKeyboard(false);
	};

	const keyboardReplacement = [
		{ group: 'a', letters: ['α', 'ɐ', 'æ'] },
		{ group: 'c', letters: ['ç'] },
		{ group: 'e', letters: ['ɛ', 'ə'] },
		{ group: 'i', letters: ['ɪ'] },
		{ group: 'm', letters: ['ɱ'] },
		{ group: 'n', letters: ['ŋ'] },
		{ group: 'o', letters: ['ɔ', 'ø', 'œ'] },
		{ group: 'r', letters: ['ʀ', 'ʁ'] },
		{ group: 's', letters: ['ʃ', 'ʒ'] },
		{ group: 'u', letters: ['ʊ'] },
		{ group: 'y', letters: ['Y'] },
		{ group: '', letters: ['ʔ'] }
	];

	const handleClick = char => event => {
		elements[selected.key].letters[selected.index].replacement = char;
		elements[selected.key].letters[selected.index].key = selected.key;
		elements[selected.key].letters[selected.index].index = selected.index;
		if (!elements[selected.key].letters[selected.index].hasClass.includes('replaced'))
			elements[selected.key].letters[selected.index].hasClass =
				elements[selected.key].letters[selected.index].hasClass + ' replaced';
		setElements([...elements]);
		setUpdate(true);

	};
	return (
		<>
			<div className="keyboard" style={{ display: 'block' }}>
				<a className="close" onClick={handleCloseKeyboard}>
					<span className="entypo-cancel-squared"></span>
				</a>
				<ul className="letters">
					{keyboardReplacement.map((element, key) => {
						return (
							<li key={key}>
								<span className="letter group" key={key}>
									{element.group}
								</span>
								{element.letters.map((char, index) => {
									return (
										<span className="letter" key={index} onClick={handleClick(char)}>
											{char}
										</span>
									);
								})}
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default PdssResultKeyboardComponent;
