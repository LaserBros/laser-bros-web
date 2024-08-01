// ThemeToggle.js
import React from 'react';
import Form from 'react-bootstrap/Form';
import { Icon } from '@iconify/react';
import { useTheme } from '../components/Themecontext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Form.Check
      type="switch"
      id="custom-switch"
      label={theme === 'light' ? <Icon icon="solar:moon-line-duotone" className='light-icon'/> : <Icon icon="solar:sun-outline" className='dark-icon'/>}
      checked={theme === 'dark'}
      onChange={toggleTheme}
    />
  );
};

export default ThemeToggle;
