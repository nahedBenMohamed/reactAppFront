export default props => {
	const parser = new DOMParser();
	const handleFirstLevelSyllable = (data, obj) => {
		data.childNodes.forEach((syllableSpans, index) => {
			if (
				['SPAN', 'span'].includes(syllableSpans.nodeName) &&
				(syllableSpans.classList.value.includes('letter') ||
					syllableSpans.classList.value.includes('diphthong ei') ||
					syllableSpans.classList.value.includes('bond') ||
					syllableSpans.classList.value.includes('affricate'))
			) {
				if (
					syllableSpans.classList.value.includes('bond') ||
					syllableSpans.classList.value.includes('diphthong ei') ||
					syllableSpans.classList.value.includes('affricate')
				) {
					obj = handleSecondLevelSyllable(syllableSpans, obj);
				} else {
					let newLetter = {
						letter: '',
						hasClass: '',
						type: '',
						replacement: '',
						replacements: {
							key: '',
							index: '',
							firstOption: {
								value: 0,
								name: ''
							},
							secondOption: {
								value: 0,
								name: ''
							},
							thirdOption: {
								value: 0,
								name: ''
							}
						}
					};
					newLetter.letter = syllableSpans.innerHTML;
					newLetter.hasClass = syllableSpans.classList.value;
					if (!syllableSpans.classList.value.includes('vowel')) newLetter.type = 'consonants';
					obj.letters.push(newLetter);
				}
			}
		});
		return obj;
	};
	const handleSecondLevelSyllable = (data, obj) => {
		data.childNodes.forEach(element => {
			if (['SPAN', 'span'].includes(element.nodeName)) {
				if (element.classList.value.includes('affricate')) {
					if (['SPAN', 'span'].includes(element.nodeName)) {
						element.childNodes.forEach(subElement => {
							if (['SPAN', 'span'].includes(subElement.nodeName)) {
								let newLetter = {
									letter: '',
									hasClass: '',
									type: '',
									replacement: '',
									replacements: {
										key: '',
										index: '',
										firstOption: {
											value: 0,
											name: ''
										},
										secondOption: {
											value: 0,
											name: ''
										},
										thirdOption: {
											value: 0,
											name: ''
										}
									}
								};
								newLetter.letter = subElement.innerHTML;
								newLetter.hasClass = subElement.classList.value;
								if (!subElement.classList.value.includes('vowel')) newLetter.type = 'consonants';
								obj.letters.push(newLetter);
							}
						});
					}
				}
				let newLetter = {
					letter: '',
					hasClass: '',
					type: '',
					replacement: '',
					replacements: {
						key: '',
						index: '',
						firstOption: {
							value: 0,
							name: ''
						},
						secondOption: {
							value: 0,
							name: ''
						},
						thirdOption: {
							value: 0,
							name: ''
						}
					}
				};
				newLetter.letter = element.innerHTML;
				newLetter.hasClass = element.classList.value;
				if (!element.classList.value.includes('vowel')) newLetter.type = 'consonants';
				obj.letters.push(newLetter);
			}
		});
		return obj;
	};
	const handleThirdLevelSyllable = (data, obj) => {
		data.childNodes.forEach(childNode => {
			if (['SPAN', 'span'].includes(childNode.nodeName)) {
				if (childNode.classList.value.includes('affricate')) {
					childNode.childNodes.forEach(element => {
						if (['SPAN', 'span'].includes(element.nodeName)) {
							let newLetter = {
								letter: '',
								hasClass: '',
								type: '',
								replacement: '',
								replacements: {
									key: '',
									index: '',
									firstOption: {
										value: 0,
										name: ''
									},
									secondOption: {
										value: 0,
										name: ''
									},
									thirdOption: {
										value: 0,
										name: ''
									}
								}
							};
							newLetter.letter = element.innerHTML;
							newLetter.hasClass = element.classList.value;
							if (!element.classList.value.includes('vowel')) newLetter.type = 'consonants';

							obj.letters.push(newLetter);
						}
					});
				}
				let newLetter = {
					letter: '',
					hasClass: '',
					type: '',
					replacement: '',
					replacements: {
						key: '',
						index: '',
						firstOption: {
							value: 0,
							name: ''
						},
						secondOption: {
							value: 0,
							name: ''
						},
						thirdOption: {
							value: 0,
							name: ''
						}
					}
				};
				newLetter.letter = childNode.innerHTML;
				newLetter.hasClass = childNode.classList.value;
				if (!childNode.classList.value.includes('vowel')) newLetter.type = 'consonants';

				obj.letters.push(newLetter);
			}
		});
		return obj;
	};
	const handleForthLevelSyllable = (data, obj) => {
		data.childNodes.forEach((syllableSpans, index) => {
			if (
				(['SPAN', 'span'].includes(syllableSpans.nodeName) &&
					syllableSpans.classList.value.includes('letter')) ||
				syllableSpans.classList.value.includes('diphthong ei')
			) {
				if (
					syllableSpans.classList.value.includes('bond') ||
					syllableSpans.classList.value.includes('diphthong ei') ||
					syllableSpans.classList.value.includes('double')
				) {
					obj = handleFifthLevelSyllable(syllableSpans, obj);
				} else {
					let newLetter = {
						letter: '',
						hasClass: '',
						type: '',
						replacement: '',
						replacements: {
							key: '',
							index: '',
							firstOption: {
								value: 0,
								name: ''
							},
							secondOption: {
								value: 0,
								name: ''
							},
							thirdOption: {
								value: 0,
								name: ''
							}
						}
					};
					syllableSpans.childNodes.forEach(child => {
						if (['SPAN', 'span'].includes(child.nodeName)) {
							if (child.classList.value === 'l') {
								newLetter.letter = child.innerHTML;
							}
						}
					});
					syllableSpans.classList.remove('active');
					newLetter.hasClass = syllableSpans.classList.value;
					if (!syllableSpans.classList.value.includes('vowel')) newLetter.type = 'consonants';
					obj.letters.push(newLetter);
				}
			}
		});
		return obj;
	};
	const handleFifthLevelSyllable = (data, obj) => {
		data.childNodes.forEach(element => {
			if (['SPAN', 'span'].includes(element.nodeName)) {
				let newLetter = {
					letter: '',
					hasClass: '',
					type: '',
					replacement: '',
					replacements: {
						key: '',
						index: '',
						firstOption: {
							value: 0,
							name: ''
						},
						secondOption: {
							value: 0,
							name: ''
						},
						thirdOption: {
							value: 0,
							name: ''
						}
					}
				};
				if (element.classList.value === 'l') {
					newLetter.letter = element.innerHTML;
					element.classList.remove('active');
					newLetter.hasClass = 'letter';
					if (!element.classList.value.includes('vowel')) newLetter.type = 'consonants';
					obj.letters.push(newLetter);
				}
			}
		});
		return obj;
	};

	// data parser for original word
	const updateCurrentSpans = item => {
		const htmlDoc = parser.parseFromString(item, 'text/html');
		let items = [...htmlDoc.body.children];
		let formattedData = [];
		items.forEach(syllable => {
			let obj = {
				hasClass: '',
				letters: []
			};
			if (syllable.classList.value.includes('syllable')) {
				obj.hasClass = syllable.classList.value;
				obj = handleFirstLevelSyllable(syllable, obj);
			}
			if (syllable.classList.value.includes('letter')) {
				let newLetter = {
					letter: '',
					hasClass: '',
					type: '',
					replacement: '',
					replacements: {
						key: '',
						index: '',
						firstOption: {
							value: 0,
							name: ''
						},
						secondOption: {
							value: 0,
							name: ''
						},
						thirdOption: {
							value: 0,
							name: ''
						}
					}
				};
				newLetter.letter = syllable.innerHTML;
				newLetter.hasClass = syllable.classList.value;
				if (!syllable.classList.value.includes('vowel')) newLetter.type = 'consonants';

				obj.letters.push(newLetter);
			}
			if (
				syllable.classList.value.includes('double') ||
				syllable.classList.value.includes('diphthong') ||
				syllable.classList.value.includes('affricate') ||
				syllable.classList.value.includes('bond')
			) {
				obj = handleThirdLevelSyllable(syllable, obj);
			}

			formattedData.push(obj);
		});
		return formattedData;
	};
	// data parser for modified word
	const updateCurrentSpansAnswers = item => {
		const htmlDoc = parser.parseFromString(item, 'text/html');
		let items = [...htmlDoc.body.children];
		let formattedData = [];
		items.forEach((syllable, key) => {
			let obj = {
				hasClass: '',
				letters: []
			};
			if (key === 0 && syllable.getAttribute('data-json')?.length > 0) {
				obj.dataJson = JSON.parse(decodeURIComponent(atob(syllable.getAttribute('data-json'))));
			}
			obj.hasClass = syllable.classList.value;
			obj = handleForthLevelSyllable(syllable, obj);

			formattedData.push(obj);
		});
		return formattedData;
	};
	// get original word and modified word and detect changed chars
	const swapAndCheckData = (elements, prevElements) => {
		let modifiedSyllable = [];
		let originalSyllable = [];

		// get each char position
		elements.forEach((item, key) => {
			item.letters.map((letter, index) => {
				let obj = { key, index, char: letter.letter, hasClass: letter.hasClass };
				modifiedSyllable.push(obj);
			});
		});

		// get each char position and eliminate added chars
		prevElements.forEach((item, key) => {
			item.letters.forEach((letter, index) => {
				if (!letter.hasClass.includes('added')) {
					let obj = { key, index, char: letter.letter, hasClass: letter.hasClass };
					originalSyllable.push(obj);
				}
			});
		});
		modifiedSyllable.forEach((element, key) => {
			// add missing data to original data
			if (element.hasClass.includes('added')) {
				originalSyllable.splice(key, 0, element);
			}
			// compare and swap data from letter to replacement
			if (element.char !== originalSyllable[key].char && !element.hasClass.includes('added')) {
				elements[originalSyllable[key].key].letters[originalSyllable[key].index].replacement = element.char;
				elements[originalSyllable[key].key].letters[originalSyllable[key].index].letter =
					originalSyllable[key].char;
			}
		});
		return elements;
	};

	return { updateCurrentSpans, updateCurrentSpansAnswers, swapAndCheckData };
};
