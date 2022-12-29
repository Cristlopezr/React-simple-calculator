export const getCurrentTheme = () => {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? true : false;
};
