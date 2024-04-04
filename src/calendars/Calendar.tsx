import { For } from "solid-js";
import './Calendar.scss';
import { Month } from "../utils/datelike";

interface Props {
	month: Month;
	selected?: Date;
	onClickOnDate?: (date: Date) => void;
}

export function Calendar(props: Props) {
	const weeks = () => props.month.getWeeks(6);

	return (
		<div class="Calendar">
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
