import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as trLang } from './modules/i18n/vocabs/tr';
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as ruLang } from './modules/i18n/vocabs/ru';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService
  ) {
    // register translations
    this.translationService.loadTranslations(
      trLang,
      enLang,
      ruLang
    );
  }

  ngOnInit() {
    this.modeService.init();
  }
}
