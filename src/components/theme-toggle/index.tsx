import React from 'react';

import './theme-toggle.scss';

class ThemeToggle extends React.Component {

  darkTheme: { [appStyleName: string]: string } = {
    ['--app-primary-color']: '--dark-primary-color',
    ['--app-secondary-color']: '--dark-bg-color',
    ['--app-link-color']: '--dark-link-color',
    ['--app-text-color']: '--dark-text-color',
    ['--app-card-bg']: '--dark-card-bg',
    ['--app-tag-bg']: '--dark-tag-bg',
    ['--app-tag-border']: '--dark-tag-border',
  }

  lightTheme: { [appStylename: string]: string } = {
    ['--app-primary-color']: '--light-primary-color',
    ['--app-secondary-color']: '--light-bg-color',
    ['--app-link-color']: '--light-link-color',
    ['--app-text-color']: '--light-text-color',
    ['--app-card-bg']: '--theme-white',
    ['--app-tag-bg']: '--theme-light-blue',
    ['--app-tag-border']: '--app-primary-color',
  }
  constructor(props) {
    super(props);
    const selectedTheme = this.getTheme();
    this.state = {theme: selectedTheme || 'light'}
  }

  componentDidMount(): void {
    const selectedTheme = this.getTheme();

    if (selectedTheme === 'dark') {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  changeTheme = ($event) => {
    $event.preventDefault();
    const selectedTheme = this.getTheme();

    if (selectedTheme === 'light') {
      this.setDarkTheme()
    } else {
      this.setLightTheme()
    }
  }

  getTheme = () => {
    return localStorage.getItem('theme');
  }

  setLightTheme() {
    Object.entries(this.lightTheme).forEach(([appProp, themeProp]) => {
      document.documentElement.style.setProperty(appProp, `var(${themeProp})`);
    })

    localStorage.setItem('theme', 'light')
    this.setState({ theme: 'light' })
  }

  setDarkTheme() {
    Object.entries(this.darkTheme).forEach(([appProp, themeProp]) => {
      document.documentElement.style.setProperty(appProp, `var(${themeProp})`);
    })

    localStorage.setItem('theme', 'dark')
    this.setState({ theme: 'dark' })
  }

  render() {
    console.log(this.state);
    return (
      <div aria-label="Click to change theme" title="Change Theme" className="button-theme-toggler" onClick={this.changeTheme}>
        {this.state.theme === 'light' ? '🌑' : '☀️' }
        ️</div>
    )


  }
}
export default ThemeToggle;
