import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthModule } from '@nx-mfe/client/auth';
import { CONFIG, ConfigModule, IConfig } from '@nx-mfe/client/config';

import { InjectorContainerModule } from './injector-container.module';

@NgModule({
	imports: [AuthModule, ConfigModule, InjectorContainerModule],
})
export class CoreModule {
	/**
	 * Используется в app.module.ts файлах в приложениях и микрофронтах для определения ядра приложения.
	 *
	 * Можно задать собственные конфигурации для микроприложений в режиме запуска standalone app.
	 *
	 * **Ограничение:**
	 *
	 * Если Remote-микрофронт запущен не как standalone app, то Remote-микрофронт
	 * всегда будет использовать конфиг полученный из Host-микрофронта (shell) внутри которого он используется.
	 *
	 * @param config объкет конфигурации приложения
	 */
	public static forRoot(config: IConfig): ModuleWithProviders<CoreModule> {
		return {
			ngModule: CoreModule,
			providers: [
				{
					provide: CONFIG,
					useValue: config,
				},
			],
		};
	}
}
