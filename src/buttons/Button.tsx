import clsx from "clsx";
import { JSX, Match, Show, Switch, createMemo } from "solid-js";
import "./Button.scss";

interface Props {
	type?: 'button' | 'submit' | 'reset';
	icon?: JSX.Element;
	label?: string;
	children?: JSX.Element;
	outlined?: boolean;
	text?: boolean;
	disabled?: boolean;
	ref?: HTMLButtonElement;
	class?: string;
	classList?: {[key: string]: boolean};
	style?: JSX.CSSProperties;
	onClick?: (e: {currentTarget: HTMLButtonElement}) => void;
	onMouseDown?: (e: {currentTarget: HTMLButtonElement}) => void;
	onMouseUp?: (e: {currentTarget: HTMLButtonElement}) => void;
	onFocus?: (e: {currentTarget: HTMLButtonElement}) => void;
	onBlur?: (e: {currentTarget: HTMLButtonElement}) => void;
}
export function Button(props: Props) {
	const severity = () => {
		if (props.text) return "text";
		return 'primary';
	};

	return (
		<button
			ref={props.ref}
			class={clsx(
				'Button',
				severity(),
				props.class,
				props.outlined && 'border-only',
			)}
			classList={props.classList}
			style={props.style}
			type={props.type || 'button'}
			onClick={props.onClick}
			onMouseDown={props.onMouseDown}
			onMouseUp={props.onMouseUp}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
			disabled={props.disabled}
		>
			<Switch>
				<Match when={props.icon && props.label}>
					{props.icon}
					<span class="label">{props.label}</span>
				</Match>
				<Match when={props.icon}>
					{props.icon}
				</Match>
				<Match when={props.label}>
					{props.label}
				</Match>
			</Switch>
			{props.children}
		</button>
	);
}
