export default props => {
	const { diagnosticId } = props;
	const TargetItem = ({ questionData }) => {
		if (questionData?.target_item_type === 'image') return <img src={'/' + questionData.target_item} />;
		else if (questionData?.target_item_type == 'text')
			return <p dangerouslySetInnerHTML={{ __html: questionData.target_item }} />;
	};

	return { TargetItem };
};
