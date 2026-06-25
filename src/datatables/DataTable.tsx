import { For, JSX, Show, createEffect, createMemo } from "solid-js";
import { Cell, ColumnDef, Header, HeaderGroup, Row, RowData, createSolidTable, flexRender, getCoreRowModel } from "@tanstack/solid-table";
import { isEmpty, isFunction, isString, last } from "lodash";
import clsx from "clsx";
import "./DataTable.scss";

type ClassConfig<TData, TValue> = string | ((value: TValue, cell: Cell<TData, TValue>) => string | undefined);
type ClassConfigOption<TData, TValue> = ClassConfig<TData, TValue> | ClassConfig<TData, TValue>[];

declare module '@tanstack/table-core' {
	interface ColumnMeta<TData extends RowData, TValue> {
		style?: JSX.CSSProperties;
		class?: ClassConfigOption<TData, TValue>;
	}
}

interface DataTableProps<TData> {
	columns: ColumnDef<TData, any>[];
	data: TData[];
	selection?: number[];
	hiddenColumns?: string[];
	stripedRows?: boolean;
	gridLines?: boolean;
	height?: string;
	leftStickyColumns?: number;
	class?: string;
	style?: JSX.CSSProperties;
	rowClass?: string | ((data: TData, rowIndex: number, row: Row<TData>) => string | undefined);
	onRowClick?: (data: TData, rowIndex: number, row: Row<TData>) => void;
	onRowDoubleClick?: (data: TData, rowIndex: number, row: Row<TData>) => void;
}
export function DataTable<TData>(props: DataTableProps<TData>) {
	const table = createMemo(() => createSolidTable({
		columns: props.columns,
		get data () { return props.data; },
		getCoreRowModel: getCoreRowModel(),
	}));

	createEffect(() => {
		if (isEmpty(props.selection)) {
			table().resetRowSelection(true);
		} else {
			const rowSelection = props.selection!.reduce((acc, selectedIndex) => {
				acc[selectedIndex] = true;
				return acc;
			}, {} as {[key: string]: boolean})
			table().setRowSelection(rowSelection);
		}
	});

	createEffect(() => {
		if (isEmpty(props.hiddenColumns)) {
			table().resetColumnVisibility(true);
		} else {
			const columnVisibility = props.hiddenColumns!.reduce((acc, columnId) => {
				acc[columnId] = false;
				return acc;
			}, {} as {[key: string]: boolean})
			table().setColumnVisibility(columnVisibility);
		}
	});

	const style = () => {
		if (props.height) {
			return {...props.style, height: props.height};
		} else {
			return props.style;
		}
	};

	const lastHeaderGroup = () => last(table().getHeaderGroups());
	const hasAnyFooter = createMemo(() => !!table().getFooterGroups().find(hasAnyFooterColumn));

	createEffect(() => {
		console.log("gridLines", props.gridLines);
	});
	return (
		<div class={clsx(props.class, {
				"DataTable": true,
				"striped-rows": props.stripedRows,
				"grid-lines": props.gridLines,
				"fixed-height": !!props.height
			})}
			style={style()}>
			<table>
				<colgroup>
					<For each={lastHeaderGroup()?.headers}>
						{header => (
							<col style={{width: header.getSize() + 'px'}} />
						)}
					</For>
				</colgroup>
				<thead>
					<For each={table().getHeaderGroups()}>
						{headerGroup => (
							<tr>
								<For each={headerGroup.headers}>
									{(header, colIdx) => {
										const classConfig = header.column.columnDef.meta?.class;
										return (
											<th class={clsx(
												classConfig && renderHeaderCellClass(classConfig, header),
												colIdx() < (props.leftStickyColumns || 0) && 'sticky-left'
											)}
												style={header.column.columnDef.meta?.style}
												colSpan={header.colSpan}
											>
												{header.isPlaceholder
													? null
													: flexRender(header.column.columnDef.header, header.getContext())
												}
											</th>
										)
									}}
								</For>
							</tr>
						)}
					</For>
				</thead>
				<tbody>
					<For each={table().getRowModel().rows}>
						{(row, rowIndex) => (
							<tr
								class={isFunction(props.rowClass) ? props.rowClass(row.original, rowIndex(), row) : props.rowClass}
								classList={{ selected: row.getIsSelected() }}
								onClick={() => props.onRowClick?.(row.original, rowIndex(), row)}
								onDblClick={() => props.onRowDoubleClick?.(row.original, rowIndex(), row)}
							>
								<For each={row.getVisibleCells()}>
									{(cell, colIdx) => {
										const classConfig = cell.column.columnDef.meta?.class;
										return (
											<td class={clsx(
												classConfig && renderDataCellClass(cell.getValue(), classConfig, cell),
												colIdx() < (props.leftStickyColumns || 0) && 'sticky-left'
											)}
												style={cell.column.columnDef.meta?.style}
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</td>
										);
									}}
								</For>
							</tr>
						)}
					</For>
				</tbody>
				<Show when={hasAnyFooter()}>
					<tfoot>
						<For each={table().getFooterGroups()}>
							{footerGroup => (
								<Show when={hasAnyFooterColumn(footerGroup)}>
									<tr>
										<For each={footerGroup.headers}>
											{(footer, colIdx) => {
												const classConfig = footer.column.columnDef.meta?.class;
												return (
													<td class={clsx(
														classConfig && renderHeaderCellClass(classConfig, footer),
														colIdx() < (props.leftStickyColumns || 0) && 'sticky-left'
													)}
														style={footer.column.columnDef.meta?.style}
														colSpan={footer.colSpan}
													>
														{footer.isPlaceholder
															? null
															: flexRender(footer.column.columnDef.footer, footer.getContext())
														}
													</td>
												)
											}}
										</For>
									</tr>
								</Show>
							)}
						</For>
					</tfoot>
				</Show>
			</table>
		</div>
	);
}

function hasAnyFooterColumn(headerGroup: HeaderGroup<any>): boolean {
	return headerGroup.headers.some(header => !header.isPlaceholder && header.column.columnDef.footer);
}

function renderHeaderCellClass<TData, TValue>(config: ClassConfigOption<TData, TValue>, header: Header<TData, TValue>): string | undefined {
	if (config) {
		if (isString(config)) {
			return config;
		}
		if (Array.isArray(config)) {
			return clsx(config.map(c => renderHeaderCellClass(c, header)));
		}
	}
}

function renderDataCellClass<TData, TValue>(value: TValue, config: ClassConfigOption<TData, TValue>, cell: Cell<TData, TValue>): string | undefined {
	if (config) {
		if (isFunction(config)) {
			return config(value, cell);
		}
		if (isString(config)) {
			return config;
		}
		if (Array.isArray(config)) {
			return clsx(config.map(c => renderDataCellClass(value, c, cell)));
		}
	}
}
