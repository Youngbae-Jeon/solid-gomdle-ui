import { JSX } from "solid-js/jsx-runtime";
import { Dialog } from "./Dialog";
import { Button } from "../buttons/Button";
import { FaSolidCheck } from "solid-icons/fa";
import clsx from "clsx";
import './ConfirmDialog.scss';
import { Show } from "solid-js";

interface Props {
	visible: boolean;
	header?: JSX.Element;
	message: JSX.Element;
	acceptLabel?: string;
	cancelLabel?: string;
	class?: string;
	style?: JSX.CSSProperties;
	onAccept?: () => void;
	onReject?: () => void;
	onClose?: () => void;
}
export function ConfirmDialog(props: Props) {
	return (
		<Dialog
			visible={props.visible}
			header={props.header}
			class={clsx("ConfirmDialog", props.class)}
			style={props.style}
			onClose={props.onClose}
		>
			<div class="message">
				{props.message}
			</div>
			<div class="button-bar">
				<Show when={props.onReject}>
					<Button text
						class="btn-reject"
						label={props.cancelLabel || "아니요"}
						onClick={() => props.onReject?.()}
					/>
				</Show>
				<Button
					class="btn-accept"
					icon={<FaSolidCheck />}
					label={props.acceptLabel || "예"}
					onClick={() => props.onAccept?.()}
				/>
			</div>
		</Dialog>
	);
}
