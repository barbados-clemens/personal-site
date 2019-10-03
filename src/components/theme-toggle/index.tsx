import React from 'react';

import './theme-toggle.scss';
import { getFirebaseInstance } from "../../utils/firebase"

class ThemeToggle extends React.Component {
  analytics: any;
  perf: any;

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
    const fireApp = import('firebase/app');
    const fireAnalytics = import('firebase/analytics');
    const firePerf = import('firebase/performance');

    Promise.all([fireApp, fireAnalytics, firePerf])
      .then(([firebase]) => {
        this.analytics = getFirebaseInstance(firebase).analytics();
        this.perf = getFirebaseInstance(firebase).performance();
        this.analytics.logEvent('theme_set', { value: selectedTheme } )
      })
      .catch(err => {
        console.error('Issue loading Firebase sdk', err)
        throw err;
      })
  }

  changeTheme = ($event) => {
    $event.preventDefault();
    const trace = this.perf.trace('switch_theme');
    trace.start();

    const selectedTheme = this.getTheme();

    this.analytics.logEvent('switch_theme', { value: selectedTheme === 'light' ? 'dark' : 'light' })

    if (selectedTheme === 'light') {
      this.setDarkTheme()
    } else {
      this.setLightTheme()
    }

    trace.stop();
  }

  getTheme = () => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (!!storedTheme) {
        return storedTheme
      }
      else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      } else {
        return 'light'
      }

    } catch (e) {
      return 'light';
    }
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
    return (
      <div aria-label="Click to change theme" title="Change Theme" className="button-theme-toggler" onClick={this.changeTheme}>
        {this.state.theme === 'light' ? '🌚' : '🌞' }
        ️</div>
    )


  }
}
export default ThemeToggle;
