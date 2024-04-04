import { For, JSX, createMemo } from "solid-js";
import { Button } from "./Button";
import clsx from "clsx";
import "./SelectButton.scss";

interface Props<T> {
	value: T;
	options: ({value: T, label: string} | T)[];
	class?: string;
	style?: JSX.CSSProperties;
	onChange?: (e: {value: T}) => void;
}

export function SelectButton<T extends string | number>(props: Props<T>) {

	const options = createMemo(() => {
		return props.options.map((option): {value: T, label: string} => {
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
					label={option.label} outlined={option.value !== props.value}
					onClick={() => props.onChange?.({value: option.value})}
				/>
			)}
		</For>
	</div>;
}
