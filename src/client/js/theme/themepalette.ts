import { BoardTheme } from '../../../protocol/boardtheme';
import { PreferenceSaver } from '../preferences/preferencesaver';
import { BoardThemeButtons } from './boardthemebuttons';
import { BoardThemeSetter } from './boardthemesetter';

declare var tippy: any;

export class ThemePalette {
  private boardThemeSetter_: BoardThemeSetter;
  private preferenceSaver_: PreferenceSaver;

  constructor(
      boardThemeSetter: BoardThemeSetter,
      preferenceSaver: PreferenceSaver) {
    this.boardThemeSetter_ = boardThemeSetter;
    this.preferenceSaver_ = preferenceSaver;
  }

  initializePalette(
      themePaletteEl: HTMLElement,
      themePaletteTooltipEl: HTMLElement,
      boardThemeButtons: BoardThemeButtons): void {
    boardThemeButtons.forEach(
        (buttonEl, boardTheme) => this.bindTheme_(buttonEl, boardTheme));

    tippy(
        themePaletteEl,
        {
          a11y: false,
          content: themePaletteTooltipEl,
          delay: 0,
          duration: 0,
          interactive: true,
          trigger: 'mouseenter click'
        });
    themePaletteTooltipEl.classList.remove('hidden');
  }

  private bindTheme_(buttonEl: HTMLElement, boardTheme: BoardTheme): void {
    buttonEl.onclick = () => {
      this.boardThemeSetter_.set(boardTheme);
      this.preferenceSaver_.save({boardTheme});
    };

    buttonEl.onmouseenter = () => {
      this.boardThemeSetter_.preview(boardTheme);
    };

    buttonEl.onmouseleave = () => {
      this.boardThemeSetter_.endPreview();
    };
  }
}
