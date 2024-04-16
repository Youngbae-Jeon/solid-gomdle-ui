# UI for SolidJs

## Installing
```sh
npm install @gomdle/solid-gomdle-ui
```

## Button
```tsx
import { Button } from "@gomdle/solid-gomdle-ui";
import { FaSolidCheck } from "solid-icons/fa";

// default button
<Button label="Search" onClick={onClick} />

// button with bordered, no background color
<Button outlined label="Search" />

// button with no bordered, no background color
<Button text label="Search" />

// submit button with icon
<Button type="submit"
	icon={<FaSolidCheck class="inline"/>}
	label="Sign In"
	disabled={loading()}
/>
```

## Select Button
```tsx
import { SelectButton } from "@gomdle/solid-gomdle-ui";

const options = [
	{value: 'A', label: 'Apple'},
	{value: 'B', label: 'Banana'},
	{value: 'C', label: 'Cacao'},
];

const [selected, setSelected] = createSignal(options[0].value);

<SelectButton
	value={selected()}
	options={options}
	onChange={e => setSelected(e.value)}
/>
```

## Calendar
```tsx
import { Calendar, Month } from "@gomdle/solid-gomdle-ui";

const [selected, setSelected] = createSignal(new Date());
const month = () => new Month(selected());

<Calendar
	month={month()}
	selected={selected()}
	onClickOnDate={setSelected}
/>
```

## DatePicker
```tsx
import { DatePicker } from '@gomdle/solid-gomdle-ui';

const [value, setValue] = createSignal(new Date());

<DatePicker
	value={value()}
	onChange={e => setValue(e.value)}
/>

<DatePicker
	view="month"
	value={value()}
	onChange={e => setValue(e.value)}
/>
```

## InputSwitch
```tsx
import { InputSwitch } from "@gomdle/solid-gomdle-ui";

const [showSecretValues, setSecretValues] = createSignal(false);

<label>
	<InputSwitch
		class='mr-2 align-text-bottom'
		checked={showFullStats()}
		onChange={(e) => setShowFullStats(e.value)}
	/>
	show secret values
</label>
```

## InputText
```tsx
import { Button, InputText } from "@gomdle/solid-gomdle-ui";

const [signinData, setSigninData] = createSignal({userid: '', passwd: ''});

// default input text
<InputText
	name="userid"
	placeholder="Insert Your ID"
	value={signinData().userid}
	onChange={e => setSigninData(data => ({...data, userid: e.value}))}
/>

// password type
<InputText
	type="password"
	name="passwd"
	value={signinData().passwd}
	onChange={e => setSigninData(data => ({...data, passwd: e.value}))}
/>
```

## DataTable
DataTable component is implemented on [Tanstack Headless Table](https://tanstack.com/table/latest). You may need to `npm install @tanstack/solid-table`.

```tsx
import { createColumnHelper } from '@tanstack/solid-table';
import { DataTable } from '@gomdle/solid-gomdle-ui';

const [selection, setSelection] = createSignal<number[]>([]); 

const columnHelper = createColumnHelper<TableRowData>();
const columns = [
	columnHelper.display({
		header: 'Date',
		cell: ({row: {original: rowData}}) => formatDate(rowData.date),
		size: 100,
		meta: { class: 'text-left' }
	}),
	columnHelper.accessor('sales', {
		header: 'Sales',
		cell: ctx => ctx.getValue()?.toLocaleString(),
		size: 60,
		meta: { class: 'text-center' }
	}),
	// ...
];

<DataTable stripedRows gridLines
	class="border border-gray-300 text-nowrap text-[0.75rem]"
	columns={columns}
	data={data()}
	selection={selection()}
	onRowClick={(data, rowIndex) => setSelection([rowIndex])}
	onRowDoubleClick={(data, rowIndex) => console.log(`double click on data[${rowIndex}]`)}
	rowClass={rowData => (rowData.sales >= 1000000 ? 'font-bold' : undefined)}
/>
```
