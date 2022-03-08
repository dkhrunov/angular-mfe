import { Compiler, ComponentFactory, Injectable, Injector, Type } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { validateMfeString } from '../helpers';
import { LoadedMfe } from '../interfaces';
import { loadMfeComponent, loadMfeModule } from '../loaders';
import { MfeComponentsCache } from './mfe-components-cache.service';

// TODO jsDoc
@Injectable({
	providedIn: 'root',
})
export class MfeService {
	constructor(
		private readonly _compiler: Compiler,
		private readonly _injector: Injector,
		private readonly _cache: MfeComponentsCache
	) {}

	public async get<TModule = unknown, TComponent = unknown>(
		mfe: string,
		injector?: Injector
	): Promise<ComponentFactory<TComponent>> {
		try {
			validateMfeString(mfe);

			if (this._cache.isMfeRegistered(mfe)) {
				return lastValueFrom(this._cache.getValue(mfe));
			}

			this._cache.registerMfe(mfe);

			const { module, component } = await this.load<TModule, TComponent>(mfe);
			const componentFactory = await this._resolveMfeComponentFactory<TModule, TComponent>(
				module,
				component,
				injector
			);

			this._cache.setValue(mfe, componentFactory);

			return componentFactory;
		} catch (error) {
			console.error(error);

			if (this._cache.isMfeRegistered(mfe)) {
				this._cache.setError(mfe, error);
			}

			throw new Error(error);
		}
	}

	private async load<TModule = unknown, TComponent = unknown>(
		mfe: string
	): Promise<LoadedMfe<TModule, TComponent>> {
		validateMfeString(mfe);

		const module = await this.loadModule<TModule>(mfe);
		const component = await this.loadComponent<TComponent>(mfe);

		return { module, component };
	}

	public async loadModule<T>(mfe: string): Promise<Type<T>> {
		validateMfeString(mfe);

		return await loadMfeModule<T>(mfe);
	}

	public async loadComponent<T>(mfe: string): Promise<Type<T>> {
		validateMfeString(mfe);

		return await loadMfeComponent<T>(mfe);
	}

	/**
	 * Compile micro-frontend module and resolve component factory.
	 *
	 * @param Module
	 * @param Component
	 * @param injector
	 * @internal
	 */
	private async _resolveMfeComponentFactory<TModule = unknown, TComponent = unknown>(
		Module: Type<TModule>,
		Component: Type<TComponent>,
		injector: Injector = this._injector
	): Promise<ComponentFactory<TComponent>> {
		const moduleFactory = await this._compiler.compileModuleAsync(Module);
		const moduleRef = moduleFactory.create(injector);

		return moduleRef.componentFactoryResolver.resolveComponentFactory(Component);
	}
}