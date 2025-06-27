import clsx from 'clsx';
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [sideBarState, setSideBarState] =
		useState<ArticleStateType>(defaultArticleState);
	const [articleState, setArticleState] = useState(defaultArticleState);

	const changeFontFamily = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontFamilyOption: select });
	};

	const changeFontSize = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontSizeOption: select });
	};

	const changeFontColor = (select: OptionType) => {
		setSideBarState({ ...sideBarState, fontColor: select });
	};

	const changeBackgroundColor = (select: OptionType) => {
		setSideBarState({ ...sideBarState, backgroundColor: select });
	};

	const changeContainerWidth = (select: OptionType) => {
		setSideBarState({ ...sideBarState, contentWidth: select });
	};

	const resetSidebarState = () => {
		setArticleState(defaultArticleState);
		setSideBarState(defaultArticleState);
	};

	const applySideBarState = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(sideBarState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				changeFontFamily={changeFontFamily}
				changeFontSize={changeFontSize}
				changeFontColor={changeFontColor}
				changeBackgroundColor={changeBackgroundColor}
				changeContainerWidth={changeContainerWidth}
				onReset={resetSidebarState}
				onSubmit={applySideBarState}
				sideBarState={sideBarState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
