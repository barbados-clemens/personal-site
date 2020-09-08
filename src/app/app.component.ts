import { ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';
import { ThemeService } from './layout/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  icon = this.theme.getTheme() === 'dark' ? '🌞' : '🌚';

  constructor(
    private render: Renderer2,
    public theme: ThemeService,
  ) {
  }

  toggleTheme(): void {
    const theme = this.theme.toggleTheme();
    this.render.setAttribute(document.body, 'data-theme', theme);
    this.icon = theme === 'dark' ? '🌞' : '🌚';
  }
}
