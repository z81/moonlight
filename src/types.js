import Type from './type';


const makeType = type => length => (new Type(type)).length(length);

export const String  = makeType('string');
export const Integer = makeType('integer');
export const Number  = makeType('number');
export const Text  = makeType('text');
export const Bool  = makeType('boolean');