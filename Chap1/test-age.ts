
interface User {
    name: string;
    age: number;
}

function canDrive(usr: User) {
    console.log("user is", usr.name);
    if (usr.age >= 18) {
        console.log("allow to drive");
    }
    else {
        console.log("do not allow to drive");
    }
}

const tom = {
    name: "tom"
}
canDrive(tom);
//ajaessa saan test-age.ts:1:19 - error TS7006: Parameter 'usr' implicitly has an 'any' type. virheen

// ajaessa saan test-age.ts:20:10 - error TS2741: Property 'age' is missing in type '{ name: string; }' but required in type 'User'. virheen