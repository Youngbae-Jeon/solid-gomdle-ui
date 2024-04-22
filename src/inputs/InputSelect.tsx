import clsx from "clsx";
import { For, JSX, Show, createSignal } from "solid-js";
import { Button } from "../buttons/Button";
import { FaSolidChevronDown } from "solid-icons/fa";
import { Overlay } from "../overlays/Overlay";
import "./InputSelect.scss";
import { isString } from "lodash";

interface Props<T> {
	name?: string;
	placeholder?: string;
	value?: T;
	options: {value: T, label: string, icon?: JSX.Element}[];
	disabled?: boolean;
	readOnly?: boolean;
	class?: string;
	classList?: {[key: string]: boolean};
	style?: JSX.CSSProperties;
	onChange?: (e: {value: T}) => void;
}

export function InputSelect<T>(props: Props<T>) {
	const [value, setValue] = createSignal<T | undefined>(props.value);

	const selected = () => props.options.find(option => option.value === value());
	const valueAsString = () => {
		const v = value();
		if (v === undefined || v === null) return '';
		return v.toString();
	}

	let btn: HTMLButtonElement;

	const [btnBounds, setBtnBounds] = createSignal<DOMRect>();

	// 마우스를 누르는 시점에서의 overlay 상태
	let stateOnMouseDown: boolean = false;

	const onSaveState = () => {
		stateOnMouseDown = !!btnBounds();
	}

	const onToggle = () => {
		// 마우스를 누르는 시점에서의 overlay 상태를 기준으로 토글한다
		setBtnBounds(stateOnMouseDown ? undefined : btn.getBoundingClientRect());
	};

	const onDismiss = () => {
		// console.log('dismiss');
		setBtnBounds(undefined);
	};

	const onItemClick = (item: any) => {
		setValue(item.value);
		props.onChange?.({value: item.value});
		setBtnBounds(undefined);
	};

	const position = () => {
		const offset = {left: 0, top: 2};
		return {
			left: btnBounds()!.left,
			top: btnBounds()!.bottom + offset.top
		};
	}

	return <>
		<Button outlined
			ref={btn!}
			disabled={props.disabled || props.readOnly}
			onClick={onToggle}
			onMouseDown={onSaveState}
			class={clsx("InputSelect", props.class)}
			classList={props.classList}
			style={props.style}
		>
			<span class="selected-label">
				<Show when={selected()} fallback={props.placeholder}>
					{selected()!.label}
				</Show>
				<input type="hidden" name={props.name} value={valueAsString()} />
			</span>
			<FaSolidChevronDown class="dropdown-indicator" />
		</Button>
		<Overlay when={btnBounds()}
			class="InputSelectOverlay"
			style={{
				"min-width": btnBounds() ? `${btnBounds()!.width}px` : undefined
			}}
			transition="drop-down"
			position={position()}
			onDismiss={onDismiss}
		>
			<For each={props.options}>
				{item => 
					<div class="option-item">
						<Button text
							icon={item.icon}
							label={item.label}
							onClick={() => onItemClick(item)}
						/>
					</div>
				}
			</For>
		</Overlay>
	</>;
}
