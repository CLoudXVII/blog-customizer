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
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

interface ArticleParamsFormProps {
	fontFamily: (select: OptionType) => void;
	fontSize: (select: OptionType) => void;
	fontColor: (select: OptionType) => void;
	backgroundColor: (select: OptionType) => void;
	contentWidth: (select: OptionType) => void;
	resetButton: () => void;
	applyButton: (event: FormEvent) => void;
	sideBarState: ArticleStateType;
}

export const ArticleParamsForm = ({
	fontFamily,
	fontSize,
	fontColor,
	backgroundColor,
	contentWidth,
	resetButton,
	applyButton,
	sideBarState,
}: ArticleParamsFormProps) => {
	const ref = useRef<HTMLFormElement | null>(null);
	const [open, setOpen] = useState(false);

	const toggleForm = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	return (
		<>
			<ArrowButton isOpen={open} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} ref={ref} onSubmit={applyButton}>
					<Text as={'h3'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={sideBarState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={fontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={sideBarState.fontSizeOption}
						onChange={fontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={sideBarState.fontColor}
						options={fontColors}
						onChange={fontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={sideBarState.backgroundColor}
						options={backgroundColors}
						onChange={backgroundColor}
						title='Цвет фона'
					/>
					<Select
						selected={sideBarState.contentWidth}
						options={contentWidthArr}
						onChange={contentWidth}
						title='Ширина контента'
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button
							title='Сбросить'
							type='clear'
							htmlType='reset'
							onClick={resetButton}
						/>
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
