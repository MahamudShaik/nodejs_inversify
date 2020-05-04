import { TYPES } from './types';
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces";
import { injectable, inject } from "inversify";


@injectable()
export class Katana implements Weapon {
    hit(): string {
        return "cut!";
    }

}


@injectable()
export class Shuriken implements ThrowableWeapon {
    throw(): string {
        return 'hit!';
    }

}

@injectable()
export class Ninja implements Warrior {

    private _shukrin: ThrowableWeapon;
    private _katana: Weapon;

    constructor(@inject(TYPES.ThrowableWeapon) shukrin: ThrowableWeapon, @inject(TYPES.Weapon) katana: Weapon) {

        this._shukrin = shukrin;
        this._katana = katana;

    }

    fight(): string {
        return this._katana.hit();
    }
    sneak(): string {
        return this._shukrin.throw();
    }

}