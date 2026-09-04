import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

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
	onApply: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const rootRef = useRef<HTMLDivElement>(null);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(articleState);
	};
	const handleReset = () => {
		setArticleState(defaultArticleState);
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
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleState.fontFamilyOption}
						onChange={(value) =>
							setArticleState({
								...articleState,
								fontFamilyOption: value,
							})
						}
					/>
					<Select
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={(value) =>
							setArticleState({
								...articleState,
								fontSizeOption: value,
							})
						}
					/>
					<RadioGroup
						name='fontColor'
						title='Цвет текста'
						options={fontColors}
						selected={articleState.fontColor}
						onChange={(value) =>
							setArticleState({
								...articleState,
								fontColor: value,
							})
						}
					/>
					<RadioGroup
						name='backgroundColor'
						title='Цвет фона'
						options={backgroundColors}
						selected={articleState.backgroundColor}
						onChange={(value) =>
							setArticleState({
								...articleState,
								backgroundColor: value,
							})
						}
					/>
					<RadioGroup
						name='contentWidth'
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleState.contentWidth}
						onChange={(value) =>
							setArticleState({
								...articleState,
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
