// InversifyJS need to use the type as identifiers at runtime.
//  We use symbols as identifiers but you can also use classes and or string literals.

export const TYPES = {
    Warrior: Symbol('Warrior'),
    Weapon: Symbol('Weapon'),
    ThrowableWeapon: Symbol('ThrowableWeapon')
}