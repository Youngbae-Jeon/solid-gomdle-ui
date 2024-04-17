import { Portal } from "solid-js/web";
import { JSX, Show, createSignal, onCleanup, onMount, splitProps } from "solid-js";
import clsx from "clsx";
import { Transition } from "solid-transition-group";
import "./Overlay.scss";

interface Props {
	when: any;
	transition?: string;
	position: {left: number | 'center', top: number | 'center'};
	children: JSX.Element | JSX.Element[];
	class?: string;
	style?: JSX.CSSProperties;
	onDismiss?: () => void;
}
export function Overlay(props: Props) {
	const [local, others] = splitProps(props, ["when"]);
	return (
		<Portal>
			<Show when={props.transition}
				fallback={(
					<Show when={local.when}>
						<OverlayInner {...others} />
					</Show>
				)}
			>
				<Transition name={props.transition}>
					<Show when={local.when}>
						<OverlayInner {...others} />
					</Show>
				</Transition>
			</Show>
		</Portal>
	);
}

type RectSize = {width: number, height: number};

function OverlayInner(props: Omit<Props, 'when'>) {
	const [windowSize, setWindowSize] = createSignal<RectSize>({width: window.innerWidth, height: window.innerHeight});
	const [overlaySize, setOverlaySize] = createSignal<RectSize>({width: 0, height: 0});

	let el: HTMLDivElement;

	const onWindowClick = (e: MouseEvent) => {
		el.contains(e.target as Node) || props.onDismiss?.();
	};
	const onWindowKeydown = (e: KeyboardEvent) => {
		e.key === "Escape" && props.onDismiss?.();
	};
	const onWindowResize = () => {
		setWindowSize({width: window.innerWidth, height: window.innerHeight});
	};
	const ro = new ResizeObserver((entries, observer) => {
		entries.forEach(entry => {
			const borderBox = entry.borderBoxSize[0];
			if (borderBox) {
				setOverlaySize({width: borderBox.inlineSize, height: borderBox.blockSize});
			}
		});
	});

	onMount(() => {
		window.addEventListener("mousedown", onWindowClick);
		window.addEventListener("keydown", onWindowKeydown);
		window.addEventListener("resize", onWindowResize);
		ro.observe(el);
	});

	onCleanup(() => {
		window.removeEventListener("mousedown", onWindowClick);
		window.removeEventListener("keydown", onWindowKeydown);
		window.removeEventListener("keydown", onWindowResize);
		ro.disconnect();
	});

	const position = () => {
		const {width: windowWidth, height: windowHeight} = windowSize();
		const {width: overlayWidth, height: overlayHeight} = overlaySize();
		const {left, top} = props.position;

		return {
			left: Math.round(left === "center" ? (windowWidth - overlayWidth) / 2 : left),
			top: Math.round(top === "center" ? (windowHeight - overlayHeight) / 2 : top),
		};
	}

	return (
		<div ref={el!}
			class={clsx("Overlay", props.class)}
			style={{
				...props.style,
				top: position().top + "px",
				left: position().left + "px",
			}}
		>
			{props.children}
		</div>
	);
}
