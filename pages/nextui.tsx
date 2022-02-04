import React from 'react';
import Link from "next/link"
import { NextUIProvider, useTheme, Text, Switch, createTheme } from '@nextui-org/react';
import Button from '@nextui-org/react/button';
import styles from '../styles/css/Nextui.module.css'
import useDarkMode from 'use-dark-mode';

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '60px 100px',
  borderRadius: '10px',
};

const Component = () => <Button>Click me</Button>;

/**
 * darkmode
 * https://nextui.org/docs/theme/dark-mode
 */
// Darkmode
const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      // brand colors
      primaryLight: '$gray600',
      primary: '#333333',
      primaryDark: '$gray900',
      link: '#333333',
      myColor: '#ffffff'
    },
  }
})
const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      // brand colors
      primaryLight: '$gray600',
      primary: '#999999',
      primaryDark: '$gray900',
      link: '#999999',
      myColor: '#999999'
    },
  }
})
const App = () => {
  const darkMode = useDarkMode(false);
  const { type, isDark } = useTheme();
  return (
    <div className={styles.switch}>
      {type}
      <Switch
        initialChecked={darkMode.value}
        onChange={() => darkMode.toggle()}
      />
    </div>
  )
}

export default function Modal() {

  // default
  const { theme } = useTheme();

  // darkmode
  const darkMode = useDarkMode(false);

  return (
    <>
    <div className={styles.container}>
      <div className={styles.containerinner}>
        <NextUIProvider>
          <Component />
        </NextUIProvider>
        <p
          className={styles.textarea}
          style={{
            color: theme.colors.primary.value,
            fontSize: theme.fontSizes.tiny.value,
            padding: `${theme.space[2].value} ${theme.space[4].value}`
          }}
        >
          Using color theme value
        </p>
        <Text
          className={styles.textarea}
          css={{
            color: '$blue800',
            fontSize: '$tiny',
            padding: '$2 $4'
          }}
        >
          Using tokens
        </Text>

        <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
          <App />
        </NextUIProvider>


        <div className="btn-form grid">
          <Link href="/">back</Link>
        </div>
      </div>
    </div>
    </>
  );
};