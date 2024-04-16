import { For, JSX, createEffect } from "solid-js";
import './Calendar.scss';
import { Month } from "../utils/datelike";
import clsx from "clsx";

interface Props {
	month: Month;
	selected?: Date;
	alwaysShowSixWeeks?: boolean;
	onClickOnDate?: (date: Date) => void;
	class?: string;
	classList?: Record<string, boolean>;
	style?: JSX.CSSProperties;
}

export function Calendar(props: Props) {
	const weeks = () => props.month.getWeeks(props.alwaysShowSixWeeks ? 6 : undefined);

	return (
		<div
			class={clsx("Calendar", props.class)}
			classList={props.classList}
			style={props.style}
		>
			<For each={weeks()}>
				{week => (
					<For each={week.getDates()}>
						{date => (
							<div
								classList={{
									'day': true,
									'selected': props.selected?.compareDate(date) === 0,
									'sunday': date.getDay() === 0,
									'saturday': date.getDay() === 6,
									'other-month': date.compareMonth(props.month.date0) !== 0,
								}}
								onClick={() => props.onClickOnDate?.(date)}
							>
								{date.getDate()}
							</div>
						)}
					</For>
				)}
			</For>
		</div>
	);
}
