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
import { InputText } from "@gomdle/solid-gomdle-ui";

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

## InputNumber
```tsx
import { InputNumber } from "@gomdle/solid-gomdle-ui";

<InputNumber
	name="price"
	value={orderData().price}
	min={0}
	onChange={e => setOrderData(orderData => ({...orderData, price: e.value}))}
/>

```

## InputSelect
```tsx
import { InputSelect } from "@gomdle/solid-gomdle-ui";

const PriceTypes = [
	{ label: 'Fixed Price', value: 'limited' },
	{ label: 'Market Price', value: 'unlimited' },
];

<InputSelect
	name="price_type"
	value={inputs().price_type}
	options={PriceTypes}
	onChange={e => setInputs(orderData => ({...orderData, price_type: e.value}))}
/>
```

## Dialog
```tsx
import { Dialog } from "@gomdle/solid-gomdle-ui";

<Dialog
	visible={showDialog()}
	header="Dialog"
	style={{ width: '20rem' }}
	onClose={() => setShowDialog(false)}
>
	<div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</div>
</Dialog>
```

## ConfirmDialog
```tsx
import { ConfirmDialog } from "@gomdle/solid-gomdle-ui";

<ConfirmDialog
	visible={showDialog()}
	message="Are you sure?"
	onAccept={() => console.log("You said you\'are sure")}
	onReject={() => setShowDialog(false)}
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
