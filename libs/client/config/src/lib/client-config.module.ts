import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CONFIG_TOKEN } from './injection-tokens';
import { IConfig } from './interfaces';

@NgModule({
	imports: [CommonModule],
})
export class ClientConfigModule {
	/**
	 * Используется для определения файла конфигурации приложения
	 *
	 * @param config объект конфигурации приложения
	 */
	public static forRoot(config: IConfig): ModuleWithProviders<ClientConfigModule> {
		return {
			ngModule: ClientConfigModule,
			providers: [
				{
					provide: CONFIG_TOKEN,
					useValue: config,
				},
			],
		};
	}
}
