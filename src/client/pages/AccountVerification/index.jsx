import React, { Fragment } from 'react';
import ContainerHeaderLayout from '../../layouts/ContainerHeaderLayout';
import DefaultLayout from '../../layouts/DefaultLayout';

export default function AccountVerify({ t }) {
	return (
		<DefaultLayout>
			<ContainerHeaderLayout hideWhiteBox>
				<div class="box text-center">
					<div class="padding">
						<p>{t('unauthorized_account_msg')}</p>
					</div>
				</div>
			</ContainerHeaderLayout>
		</DefaultLayout>
	);
}
