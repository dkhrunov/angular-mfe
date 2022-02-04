import { ModuleWithProviders, NgModule } from '@angular/core';

import { CONFIG_TOKEN } from './injection-tokens';
import { IConfig } from './interfaces';

@NgModule({})
export class ConfigModule {
	/**
	 * Используется для определения файла конфигурации приложения
	 *
	 * @param config объект конфигурации приложения
	 */
	public static forRoot(config: IConfig): ModuleWithProviders<ConfigModule> {
		return {
			ngModule: ConfigModule,
			providers: [
				{
					provide: CONFIG_TOKEN,
					useValue: config,
				},
			],
		};
	}
}