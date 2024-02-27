export type Theme = {
  purple: string;
  green: string;
  yellow: string;
  orange: string;
  blue: string;
  background: string;
  container: string;
  text: string;
  lightText: string;
};

const COMMON_THEME = {
  purple: '#6F59ED',
  green: '#8BE48D',
  yellow: '#FAE079',
  orange: '#E67063',
  blue: '#82DAE9',
};

export const LIGHT_THEME: Theme = {
  ...COMMON_THEME,
  background: '#F5F5F5',
  container: '#FFFFFF',
  text: '#000',
  lightText: '#A9A9A9',
};

export const DARK_THEME: Theme = {
  ...COMMON_THEME,
  background: '#151618',
  container: '#202324',
  text: '#FFFFFF',
  lightText: '#606162',
};
