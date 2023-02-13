import React from 'react';
import files from '../../../shared/downloadFiles';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { useOutletContextHook } from '../../../shared/helpers/hooks/useOutletContextHook';
import DownloadFilesListComponent from '../../components/DownloadFilesListComponent';

function DownloadPage(props) {

	useOutletContextHook(props.t('downloads'), false);

	return (
		<div className="padding" id="downloads">
			<DownloadFilesListComponent t={props.t} files={files}/>
		</div>
	);
}
export default WithRouter(DownloadPage);
