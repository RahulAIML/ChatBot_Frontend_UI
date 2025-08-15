const KeyCode = {
	C: 67,
	I: 73,
	J: 74,
	U: 85,
};
const isMacOs = () => navigator.platform.toUpperCase().indexOf('MAC') >= 0;

export const disableInspect = function () {
	// Disable right-click
	document.addEventListener('contextmenu', (e) => e.preventDefault());
	document.addEventListener('keydown', (e) => {
		if (e.key === 'F12') e.preventDefault();
		else if (isMacOs()) {
			if (e.metaKey && e.altKey && e.keyCode === KeyCode.U) e.preventDefault();
			else if (e.metaKey && e.altKey && e.keyCode === KeyCode.I) e.preventDefault();
			else if (e.metaKey && e.altKey && e.keyCode === KeyCode.J) e.preventDefault();
			else if (e.metaKey && e.altKey && e.keyCode === KeyCode.C) e.preventDefault();
		} else {
			if (e.ctrlKey && e.keyCode === KeyCode.U) e.preventDefault();
			else if (e.ctrlKey && e.shiftKey && e.keyCode === KeyCode.I) e.preventDefault();
			else if (e.ctrlKey && e.shiftKey && e.keyCode === KeyCode.J) e.preventDefault();
			else if (e.ctrlKey && e.shiftKey && e.keyCode === KeyCode.C) e.preventDefault();
		}
	});
};
