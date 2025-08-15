export const printPdfMobile = () => {
	const content = document.getElementById('section-to-print').outerHTML;

	const blob = new Blob([content], { type: 'text/html' });

	const url = URL.createObjectURL(blob);

	window.open(url);
};
