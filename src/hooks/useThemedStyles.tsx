import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {selectTheme} from '../store/themeSlice';
import {DARK_THEME, LIGHT_THEME, Theme} from '../config';

type useThemedStylesType = <T>(getStyles: (theme: Theme) => T) => T;

export const useThemedStyles: useThemedStylesType = getStyles => {
  const currentTheme = useSelector(selectTheme);

  const theme = useMemo(() => {
    return currentTheme.theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  }, [currentTheme]);

  return getStyles(theme);
};
