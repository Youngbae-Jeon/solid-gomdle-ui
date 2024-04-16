import { For, JSX, Match, Switch, createMemo, createSignal } from "solid-js";
import { Month } from "../utils/datelike";
import { Overlay } from "../overlays/Overlay";
import { FaSolidChevronLeft, FaSolidChevronRight } from "solid-icons/fa";
import { Button } from "../buttons/Button";
import { Calendar } from "./Calendar";
import "./DatePicker.scss";

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
			<Switch>
				<Match when={props.view !== 'month'}>
					<DatePickerPanel class="p-2" value={props.value} onSelect={props.onChange} />
				</Match>
				<Match when={props.view === 'month'}>
					<MonthPickerPanel class="p-2"
						value={props.value && new Month(props.value)}
						onSelect={e => props.onChange?.({value: e.value.date0})}
					/>
				</Match>
			</Switch>
		</Overlay>
	</>;
}

interface DatePickerPanelProps {
	value?: Date;
	onChange?: (e: {value: Date}) => void;
	onSelect?: (event: {value: Date}) => void;
	class?: string;
}
function DatePickerPanel(props: DatePickerPanelProps) {
	const [showMonthPicker, setShowMonthPicker] = createSignal(false);
	const [page, setPage] = createSignal(new Month(props.value || new Date()));
	const pages = createMemo(() => {
		const p = page();
		return [p.add(-1).getTime(), p.getTime(), p.add(1).getTime()];
	});

	const onMove = (pages: number) => setPage(page => page.add(pages));
	const onClickOnHead = () => setShowMonthPicker(true);

	const onClickOnDate = (date: Date) => {
		props.onSelect?.({value: date});
		if (page().date0.compareMonth(date) !== 0) {
			setPage(new Month(date));
		}
	};

	return (
		<Switch>
			<Match when={showMonthPicker()}>
				<MonthPickerPanel
					class="p-2"
					value={page()}
					onSelect={e => {
						setShowMonthPicker(false);
						setPage(e.value);
					}}
					onClickOnHead={() => setShowMonthPicker(false)}
				/>
			</Match>
			<Match when={!showMonthPicker()}>
				<div class={props.class}>
					<div class="flex items-center gap-1 mb-2">
						<Button class="grow-0" text icon={<FaSolidChevronLeft/>} onClick={() => onMove(-1)} />
						<Button class="grow" text label={page().toString()} onClick={onClickOnHead} />
						<Button class="grow-0" text icon={<FaSolidChevronRight/>} onClick={() => onMove(1)} />
					</div>
					<div class="DatePickerSlidePlace">
						<For each={pages()}>
							{time => {
								const month = new Month(new Date(time));
								return (
									<Calendar
										classList={{
											"slide-item": true,
											"slide-left": month.compare(page()) < 0,
											"slide-right": month.compare(page()) > 0,
										}}
										month={month}
										selected={props.value}
										onClickOnDate={onClickOnDate}
									/>
								);
							}}
						</For>
					</div>
				</div>
			</Match>
		</Switch>
	);
}

interface MonthPickerPanelProps {
	value?: Month;
	onSelect?: (event: {value: Month}) => void;
	onClickOnHead?: () => void;
	class?: string;
}
function MonthPickerPanel(props: MonthPickerPanelProps) {
	const [page, setPage] = createSignal(props.value?.getYear() || new Date().getFullYear());
	const pages = createMemo(() => {
		const p = page();
		return [p - 1, p, p + 1];
	});

	const onMove = (pages: number) => setPage(page => page + pages);
	const onClickOnHead = () => {
		if (props.onClickOnHead) {
			props.onClickOnHead();
		} else {
			setPage(new Date().getFullYear());
		}
	};

	const onClickOnMonth = (month: Month) => {
		props.onSelect?.({value: month});
		if (page() !== month.getYear()) {
			setPage(month.getYear());
		}
	};

	return (
		<div class={props.class}>
			<div class="flex items-center gap-1 mb-2">
				<Button class="grow-0" text icon={<FaSolidChevronLeft/>} onClick={() => onMove(-1)} />
				<Button class="grow" text label={page().toString()} onClick={onClickOnHead} />
				<Button class="grow-0" text icon={<FaSolidChevronRight/>} onClick={() => onMove(1)} />
			</div>
			<div class="DatePickerSlidePlace">
				<For each={pages()}>
					{year => {
						return (
							<MonthListView
								classList={{
									"slide-item": true,
									"slide-left": year < page(),
									"slide-right": year > page(),
								}}
								year={year}
								selected={props.value}
								onClickOnMonth={onClickOnMonth}
							/>
						);
					}}
				</For>
			</div>
		</div>
	);
}

interface MonthListViewProps {
	year: number;
	selected?: Month;
	classList?: Record<string, boolean>;
	onClickOnMonth?: (month: Month) => void;
}
function MonthListView(props: MonthListViewProps) {
	const months = () => {
		const m = new Month(new Date(props.year, 0, 1));
		return [0,1,2,3,4,5,6,7,8,9,10,11].map(i => m.add(i));
	}

	return (
		<div
			class="MonthList"
			classList={props.classList}
		>
			<For each={months()}>
				{month => (
					<div
						classList={{
							'month': true,
							'selected': props.selected?.compare(month) === 0,
						}}
						onClick={() => props.onClickOnMonth?.(month)}
					>
						{month.date0.toLocaleString('default', {month: 'long'})}
					</div>
				)}
			</For>
		</div>
	);
}
