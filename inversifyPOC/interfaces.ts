export interface Warrior {
    fight(): string;
    sneak(): string;
}

export interface Weapon {
    hit(): string;
}

export interface ThrowableWeapon {
    throw(): string;
}


// Our goal is to write code that adheres to the dependency inversion principle.
//  This means that we should "depend upon Abstractions and do not depend upon concretions". 
// Let's start by declaring some interfaces (abstractions).