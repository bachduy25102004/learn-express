const bcrypt = require("bcrypt");

const saltRounds = 3;
const pwd = "qwerty";
const plainText = "notme";

// Synchronously hashing method
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(pwd, salt, saltRounds);
console.log(hash);

console.log(bcrypt.compareSync(plainText, hash));

// Asynchronously hashing method
// let hash = '';

bcrypt.genSalt(saltRounds, (err,salt) => {
    bcrypt.hash(pwd, salt, (err, hash) => {
        // hash = this.hash;
        console.log(hash);        
        bcrypt.compare(plainText, hash, (err, result) => {
            console.log(result);    
        } )
    })
})
