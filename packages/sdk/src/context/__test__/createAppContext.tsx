import type { DriverClient } from '@teable-group/core';
import { noop } from 'lodash';
import type { IAppContext } from '../app/AppContext';
import { AppContext, ThemeKey } from '../app/AppContext';

export const createAppContext = (context: Partial<IAppContext> = {}) => {
  const defaultContext: IAppContext = {
    driver: 'sqlite3' as DriverClient,
    connected: false,
    theme: ThemeKey.Dark,
    isAutoTheme: false,
    setTheme: noop,
  };
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <AppContext.Provider value={{ ...defaultContext, ...context }}>{children}</AppContext.Provider>
  );
};
