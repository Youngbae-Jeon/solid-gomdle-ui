# UI for SolidJs

## Installing
```sh
npm install @gomdle/solid-gomdle-ui solid-transition-group
```

## Button
```jsx
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
```jsx
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
```jsx
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
```jsx
import { DatePicker } from '@gomdle/solid-gomdle-ui';

const [value, setValue] = createSignal(new Date());

<DatePicker
	value={value()}
	onChange={e => setValue(e.value)}
/>
```

## InputSwitch
```jsx
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
```jsx
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
