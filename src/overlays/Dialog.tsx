import { JSX, Show } from "solid-js";
import { Overlay } from "./Overlay";
import clsx from "clsx";
import { Button } from "../buttons/Button";
import { FaSolidXmark } from "solid-icons/fa";
import './Dialog.scss';

interface Props {
	visible: boolean;
	header?: JSX.Element;
	children: JSX.Element | JSX.Element[];
	class?: string;
	style?: JSX.CSSProperties;
	onClose?: () => void;
}
export function Dialog(props: Props) {
	return (
		<Overlay
			when={props.visible}
			transition="fade-up"
			position={{left: 'center', top: 'center'}}
			class="Dialog"
			style={props.style}
		>
			<Show when={props.header || props.onClose}>
				<div class="header">
					<div>
						{props.header}
					</div>
					<Show when={props.onClose}>
						<Button text
							class="closer"
							icon={<FaSolidXmark/>}
							onClick={() => props.onClose?.()}
					/>
					</Show>
				</div>
			</Show>
			<div class={clsx("body", props.class)}>
				{props.children}
			</div>
		</Overlay>
	);
}
