import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (formState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const rootRef = useRef<HTMLDivElement>(null);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};
	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h1'
						size={31}
						weight={800}
						uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) =>
							setFormState({
								...formState,
								fontFamilyOption: value,
							})
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState({
								...formState,
								fontSizeOption: value,
							})
						}
					/>
					<Select
						title='Цвет текста'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) =>
							setFormState({
								...formState,
								fontColor: value,
							})
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) =>
							setFormState({
								...formState,
								backgroundColor: value,
							})
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) =>
							setFormState({
								...formState,
								contentWidth: value,
							})
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
