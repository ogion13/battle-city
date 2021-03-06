import { EStateName } from "../../enum/EStateName";
import { IState } from "../../interface/IState";
import { LoadingBar } from "../../components/LoadingBar/LoadingBar";
import { AbstractState } from "./AbstractState";

export class LoadingState extends AbstractState implements IState {
	private _loadingBar: LoadingBar;

	public onEnter(): void {
		this._loadingBar = new LoadingBar();
		this.view.alignComponentCenterX(this._loadingBar);
		this.view.alignComponentCenterY(this._loadingBar);
		this.scene.addChild(this._loadingBar);
		this.scene.visible = true;
	}

	public onLeave(): void {
		this.scene.visible = false;
	}

	public updateFrame(): void {
		this._loadingBar.updateProgress(this.model.loadingProgress);
		if (this.model.isAssetsLoaded) {
			this.transition(EStateName.MENU);
		}
	}
}
