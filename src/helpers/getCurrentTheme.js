export const getCurrentTheme = () => {
	const theme = localStorage.getItem('theme');
	if (theme) return JSON.parse(theme);
	return window.matchMedia('(prefers-color-scheme: light)').matches ? true : false;
};
