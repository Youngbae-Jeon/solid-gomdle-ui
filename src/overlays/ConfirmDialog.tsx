import { JSX } from "solid-js/jsx-runtime";
import { Dialog } from "./Dialog";
import { Button } from "../buttons/Button";
import { FaSolidCheck } from "solid-icons/fa";
import clsx from "clsx";
import './ConfirmDialog.scss';

interface Props {
	visible: boolean;
	header?: JSX.Element;
	message: JSX.Element;
	class?: string;
	style?: JSX.CSSProperties;
	onAccept?: () => void;
	onCancel?: () => void;
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
				<Button text
					label="아니오"
					onClick={() => props.onCancel?.()}
				/>
				<Button
					icon={<FaSolidCheck />}
					label="예"
					onClick={() => props.onAccept?.()}
				/>
			</div>
		</Dialog>
	);
}
