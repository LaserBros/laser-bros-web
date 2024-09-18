// ThemeToggle.js
import React from 'react';
import Form from 'react-bootstrap/Form';
import { Icon } from '@iconify/react';
import { useTheme } from '../components/Themecontext';

const ThemeToggle = () => {
  const { theme, togglenewTheme } = useTheme();

  return (
    <Form.Check
    style={{marginRight:10}}
      type="switch"
      id="custom-switch"
      label={theme === 'light' ? <Icon icon="solar:moon-line-duotone" className='light-icon'/> : <Icon icon="solar:sun-outline" className='dark-icon'/>}
      checked={theme === 'dark'}
      onChange={togglenewTheme}
    />
  );
};

export default ThemeToggle;
