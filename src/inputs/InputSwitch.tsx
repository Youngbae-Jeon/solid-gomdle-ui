import clsx from "clsx";
import { JSX, createEffect } from "solid-js";
import "./InputSwitch.scss";

interface Props {
	checked?: boolean;
	disabled?: boolean;
	class?: string;
	style?: JSX.CSSProperties;
	onChange?: (e: {value: boolean}) => void;
}
export function InputSwitch(props: Props) {
	return (
		<div class={clsx('InputSwitch', props.class, props.checked && 'on')}
			style={props.style}
			
		>
			<input type="checkbox" checked={props.checked} disabled={props.disabled}
				onChange={e => props.onChange?.({value: e.target.checked})}
			/>
			<span class="slider" />
		</div>
	);
}