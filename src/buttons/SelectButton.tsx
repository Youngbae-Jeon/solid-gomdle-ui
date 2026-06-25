import { For, JSX, JSXElement, createMemo } from "solid-js";
import { Button } from "./Button";
import clsx from "clsx";
import "./SelectButton.scss";

interface SelectButtonProps<T> {
	value: T;
	options: ({value: T, label?: string, icon?: JSX.Element} | T)[];
	class?: string;
	style?: JSX.CSSProperties;
	onChange?: (e: {value: T}) => void;
}

export function SelectButton<T extends string | number>(props: SelectButtonProps<T>) {

	const options = createMemo(() => {
		return props.options.map((option): {value: T, label?: string, icon?: JSX.Element} => {
			if (typeof option === 'string' || typeof option === 'number') {
				return {value: option, label: option.toString()};
			}
			return option;
		});
	});

	return <div class={clsx('SelectButton', props.class)}>
		<For each={options()}>
			{option => (
				<Button
					label={option.label}
					icon={option.icon}
					outlined={option.value !== props.value}
					onClick={() => props.onChange?.({value: option.value})}
				/>
			)}
		</For>
	</div>;
}
