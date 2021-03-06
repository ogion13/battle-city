import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IBonus } from "../../interface/IBonus";
import { ITank } from "../../interface/ITank";
import { AbstractBonus } from "./AbstractBonus";

export class BonusIncreaseSpeed extends AbstractBonus implements IBonus {
	public name: string = EComponentName.BONUS_INCREASE_SPEED;
	public readonly requiredTextures: string | Array<string> = ETextureName.BONUS_INCREASE_SPEED;
	public timeout: number = 60 * 4;
	private _valueToIncrease = 2;

	public upgrade(tank: ITank): void {
		tank.speed += this._valueToIncrease;
	}

	public restore(tank: ITank): void {
		tank.speed -= this._valueToIncrease;
	}
}
