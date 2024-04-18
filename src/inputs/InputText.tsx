import clsx from "clsx";
import { JSX } from "solid-js";
import "./InputText.scss";

interface Props {
	id?: string;
	name?: string;
	type?: 'text' | 'password';
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	readOnly?: boolean;
	autoComplete?: 'off' | 'on';
	ref?: HTMLInputElement;
	class?: string;
	classList?: {[key: string]: boolean};
	style?: JSX.CSSProperties;
	onInput?: (e: {value: string}) => void;
	onChange?: (e: {value: string}) => void;
}

export function InputText(props: Props) {
	return (
		<input
			ref={props.ref}
			class={clsx('InputText', props.class)}
			classList={props.classList}
			style={props.style}
			id={props.id}
			name={props.name}
			type={props.type || 'text'}
			placeholder={props.placeholder}
			value={props.value || ''}
			disabled={props.disabled}
			readOnly={props.readOnly}
			autocomplete={props.autoComplete}
			onInput={e => props.onInput?.({value: e.currentTarget.value})}
			onChange={e => props.onChange?.({value: e.currentTarget.value})}
		/>
	);
}
