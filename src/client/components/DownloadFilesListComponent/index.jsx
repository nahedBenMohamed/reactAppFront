import React from 'react';


function DownloadFilesListComponent({ t, files }) {
	return (
		<div className="grid-x grid-margin-x">
			<table className='striped bordered'>
				<thead>
					<tr>
					<th>{t('folder_cell')}</th>
					<th>{t('option_cell')}</th>
					</tr>
				</thead>
				<tbody>
                    { files &&
                        files.map(file => (
                            <tr>
                                <td>{file.name}</td>
                                <td>
                                <a href={`/files/downloads/all/${file.path}`}  target="_blank">
                                    {t('download_btn')}
                                </a>
                                </td>
                            </tr>
                        ))
                    }
				</tbody>
			</table> 
		</div>
	);
}

export default DownloadFilesListComponent;
