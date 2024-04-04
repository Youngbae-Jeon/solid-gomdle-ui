export class Month {
	readonly date0: Date;

	constructor(date: Date) {
		this.date0 = new Date(date.getFullYear(), date.getMonth(), 1);
	}

	getYear(): number {
		return this.date0.getFullYear();
	}
	getMonth(): number {
		return this.date0.getMonth();
	}
	getFirstWeek(): Week{
		return new Week(this.date0);
	}
	getWeeks(count?: number): Week[] {
		const weeks: Week[] = [];
		let cursor = this.getFirstWeek();
		while (cursor.date0.compareMonth(this.date0) <= 0) {
			weeks.push(cursor);
			cursor = cursor.getNextWeek();
		}
		return weeks;
	}
	add(months: number): Month {
		const next = new Date(this.date0);
		next.setMonth(next.getMonth() + months);
		return new Month(next);
	}
	toString(): string {
		return this.date0.getFullYear() + '-' + pad2(this.date0.getMonth() + 1);
	}
}

export class Week {
	readonly date0: Date;

	constructor(date: Date) {
		const d = new Date(date);
		if (d.getDay() > 0) {
			d.setDate(d.getDate() - d.getDay());
		}
		this.date0 = d;
	}

	getNextWeek(): Week {
		const next = new Date(this.date0);
		next.setDate(next.getDate() + 7);
		return new Week(next);
	}
	getFirstDate(): Date {
		return new Date(this.date0);
	}
	getDates(): Date[] {
		const first = this.getFirstDate();
		return [0,1,2,3,4,5,6].map(i => {
			const next = new Date(first);
			next.setDate(next.getDate() + i);
			return next;
		});
	}
}

declare global {
	interface Date {
		compareMonth(date: Date): number;
		compareDate(date: Date): number;
		format(fmt: 'yyyy-MM' | 'yyyy-MM-dd'): string;
	}
}

Date.prototype.compareMonth = function(date: Date): number {
	return this.getFullYear() * 12 + this.getMonth() - (date.getFullYear() * 12 + date.getMonth());
};

Date.prototype.compareDate = function(date: Date): number {
	const r = this.compareMonth(date);
	if (r !== 0) return r;
	return this.getDate() - date.getDate();
};

Date.prototype.format = function(fmt: 'yyyy-MM' | 'yyyy-MM-dd'): string {
	switch (fmt) {
		case 'yyyy-MM':
			return this.getFullYear() + '-' + pad2(this.getMonth() + 1);
		case 'yyyy-MM-dd':
			return this.getFullYear() + '-' + pad2(this.getMonth() + 1) + '-' + pad2(this.getDate());
		default:
			return 'unsupported format';
	}
}

function pad2(num: number): string {
	if (num < 10) {
		return '0' + num;
	} else {
		return num.toString();
	}
}
