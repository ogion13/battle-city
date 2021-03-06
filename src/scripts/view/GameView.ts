import { map } from "lodash";
import { Application, Container, DisplayObject, ITextureDictionary, Sprite, Texture } from "pixi.js";
import { Battlefield } from "../components/Map/Battlefield";
import { MapGenerator } from "../components/Map/MapGenerator";
import { COLORS } from "../constants/colors";
import { SETTINGS } from "../constants/settings";
import { IComponent } from "../interface/IComponent";
import { ISize } from "../interface/ISize";

const APP_CONFIG = {
	width: SETTINGS.WIDTH,
	height: SETTINGS.HEIGHT,
	antialiasing: true,
	transparent: false,
	backgroundColor: COLORS.APP_COLOR,
	resolution: 1,
};

export class GameView {
	public textures: ITextureDictionary = {};
	private _canvasContainer: HTMLElement;
	private _app: Application;
	private _mapGenerator: MapGenerator;

	constructor() {
		this.initializeApplication();
		this._mapGenerator = new MapGenerator(this.createComponent.bind(this));
	}

	public addToStage<TChildren extends DisplayObject[]>(...children: TChildren): void {
		this._app.stage.addChild(...children);
	}

	public get app(): Application {
		return this._app;
	}

	public get screenSize(): ISize {
		return {
			height: this._app.screen.height,
			width: this._app.screen.width,
		};
	}

	public getTextures(textureNames: string | Array<string>): Texture | Array<Texture> {
		if (this.textures) {
			if (Array.isArray(textureNames)) {
				return map(textureNames, (name: string) => {
					return this.textures[name];
				});
			}
			return this.textures[textureNames];
		}
		throw new Error("Textures has not been loaded!");
	}

	public generateMap(schema: Array<Array<number>>): Battlefield {
		return this._mapGenerator.generateMap(schema);
	}

	public alignComponentCenterX(component: Container | Sprite): void {
		component.x = (this.screenSize.width - component.width) / 2;
	}

	public alignComponentCenterY(component: Container | Sprite): void {
		component.y = (this.screenSize.height - component.height) / 2;
	}

	public createComponent<T extends IComponent>(component: T): T {
		if (component.requiredTextures) {
			const textures: Texture | Array<Texture> = this.getTextures(component.requiredTextures);
			Array.isArray(textures) ? component.setTextureSet(textures) : component.setTexture(textures);
			return component;
		}
		return component;
	}

	private initializeApplication(): void {
		this._canvasContainer = document.getElementById("canvasContainer");
		this._app = new Application(APP_CONFIG);
		this._canvasContainer.appendChild(this._app.view);
	}
}
