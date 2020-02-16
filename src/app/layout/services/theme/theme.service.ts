import {Injectable, Renderer2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
  ) {
  }

  getTheme(): string {
    return localStorage.getItem('theme');
  }

  setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    // this.render.setAttribute(document.body, 'data-theme', theme);
  }

  toggleTheme(): string {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    this.setTheme(newTheme);

    return newTheme;
  }
}
