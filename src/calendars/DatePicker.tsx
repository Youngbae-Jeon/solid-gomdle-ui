import { JSX, createSignal } from "solid-js";
import { Month } from "../utils/datelike";
import { Overlay } from "../overlays/Overlay";
import { FaSolidChevronLeft, FaSolidChevronRight } from "solid-icons/fa";
import { Button } from "../buttons/Button";
import { Calendar } from "./Calendar";

interface Props {
	value?: Date;
	view?: "date" | "month";
	anchor?: HTMLElement;
	class?: string;
	style?: JSX.CSSProperties;
	onChange?: (e: {value: Date}) => void;
}
export function DatePicker(props: Props) {
	const text = () => {
		if (props.value) {
			if (props.view === 'month') {
				return props.value?.format('yyyy-MM') || '';
			} else {
				return props.value?.format('yyyy-MM-dd') || '';
			}
		}
		return '';
	}

	let btn: HTMLButtonElement;

	const [btnBounds, setBtnBounds] = createSignal<DOMRect>();

	// 마우스를 누르는 시점에서의 overlay 상태
	let stateOnMouseDown: boolean = false;

	const onSaveState = () => {
		stateOnMouseDown = !!btnBounds();
		// console.log('click to', stateOnMouseDown ? 'close' : 'show');
	}

	const onToggle = () => {
		// 마우스를 누르는 시점에서의 overlay 상태를 기준으로 토글한다
		const anchor = props.anchor || btn;
		setBtnBounds(stateOnMouseDown ? undefined : anchor.getBoundingClientRect());
	};

	const onDismiss = () => {
		// console.log('dismiss');
		setBtnBounds(undefined);
	};

	const onItemClick = (item: any) => {
		item.command();
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
		<Button ref={btn!}
			class={props.class}
			style={props.style}
			outlined
			label={text()}
			onClick={onToggle}
			onMouseDown={onSaveState}
		/>
		<Overlay when={btnBounds()}
			class="border border-gray-200 rounded-md shadow-lg drop-shadow-md"
			transition="drop-down"
			position={position()}
			onDismiss={onDismiss}
		>
			<DatePickerPanel value={props.value} onSelect={props.onChange} />
		</Overlay>
	</>;
}

interface DatePickerPanelProps {
	value?: Date;
	onChange?: (e: {value: Date}) => void;
	onSelect?: (event: {value: Date}) => void;
}
function DatePickerPanel(props: DatePickerPanelProps) {
	const [page, setPage] = createSignal(new Month(props.value || new Date()));

	const onMove = (pages: number) => setPage(page => page.add(pages));
	const onMoveToday = () => setPage(new Month(new Date()));

	return (
		<div class="p-2">
			<div class="flex items-center gap-1 mb-2">
				<Button class="grow-0" text icon={<FaSolidChevronLeft/>} onClick={() => onMove(-1)} />
				<Button class="grow" text label={page().toString()} onClick={() => onMoveToday() } />
				<Button class="grow-0" text icon={<FaSolidChevronRight/>} onClick={() => onMove(1)} />
			</div>
			<Calendar month={page()} selected={props.value} onClickOnDate={date => props.onSelect?.({value: date})} />
		</div>
	);
}