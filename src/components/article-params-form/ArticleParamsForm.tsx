import clsx from 'clsx';
import { FormEvent, useCallback, useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';

import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { ArrowButton } from 'src/ui/arrow-button';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import { useClose } from './hooks/useClose';

interface ArticleParamsFormProps {
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setFormOpen] = useState(false);
	const [sideBarState, setSideBarState] =
		useState<ArticleStateType>(defaultArticleState);

	const formRef = useRef<HTMLFormElement | null>(null);

	useClose({
		isOpen: isFormOpen,
		onClose: () => setFormOpen(false),
		containerRef: formRef,
	});

	const toggleForm = useCallback(() => {
		setFormOpen((prevOpen) => !prevOpen);
	}, []);

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

	const onReset = () => {
		setArticleState(defaultArticleState);
		setSideBarState(defaultArticleState);
	};

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(sideBarState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={onSubmit}
					onReset={onReset}>
					<Text as={'h3'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={sideBarState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={changeFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={sideBarState.fontSizeOption}
						onChange={changeFontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={sideBarState.fontColor}
						options={fontColors}
						onChange={changeFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={sideBarState.backgroundColor}
						options={backgroundColors}
						onChange={changeBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						selected={sideBarState.contentWidth}
						options={contentWidthArr}
						onChange={changeContainerWidth}
						title='Ширина контента'
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
