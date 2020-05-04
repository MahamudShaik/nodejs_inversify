



function log<T>(arg: T): T {
    return arg;
}

console.log(log<string>("asdc"));
console.log(log<Number>(3));


function add<T, U, V>(x: T, y: U, z: V): V {
    return z;
}

console.log(add<Number, string, boolean>(2, "avb", true));
