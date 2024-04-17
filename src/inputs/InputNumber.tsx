import clsx from "clsx";
import { JSX } from "solid-js";
import "./InputNumber.scss";

interface Props {
	id?: string;
	name?: string;
	value?: number;
	min?: number;
	max?: number;
	disabled?: boolean;
	ref?: HTMLInputElement;
	class?: string;
	classList?: {[key: string]: boolean};
	style?: JSX.CSSProperties;
	onInput?: (e: {value: number}) => void;
	onChange?: (e: {value: number}) => void;
}

export function InputNumber(props: Props) {
	return (
		<input
			ref={props.ref}
			class={clsx('InputNumber', props.class)}
			classList={props.classList}
			style={props.style}
			id={props.id}
			name={props.name}
			type="number"
			value={props.value?.toString() || ''}
			min={props.min}
			max={props.max}
			disabled={props.disabled}
			onInput={e => props.onInput?.({value: Number(e.currentTarget.value)})}
			onChange={e => props.onChange?.({value: Number(e.currentTarget.value)})}
		/>
	);
}
