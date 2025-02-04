import { useEffect, useRef } from 'react';

export function useOutsideClick(handlr, listenCapturing = true) {
	// Selecting the element
	const ref = useRef();

	// Global click event to close the window when click happens outside the window
	useEffect(
		function () {
			// Handler function
			function handleClick(e) {
				if (ref.current && !ref.current.contains(e.target)) handlr();
			}

			// listening events on the capturing phase by making: Third argument as true (Here we make an option listenCapturing. So we can listen bubbling or capturing) so default is capturing phase.
			document.addEventListener('click', handleClick, listenCapturing);

			// Remove this event listner as the component unmount
			return () =>
				document.removeEventListener('click', handleClick, listenCapturing);
		},
		[handlr, listenCapturing]
	);

	return ref;
}
