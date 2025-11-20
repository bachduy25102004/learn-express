const axios = require("axios");
const path = require('path');
const fs = require('fs');

async function testing() {
  const res = await axios.get(
    `https://valorant-api.com/v1/weapons`
  );
   const { data : weapons } = res.data;
 
   for ( const weapon of weapons) {
    const uuidArray = [];
    for ( let i = 0; i < weapon.skins.length; i++) {
      console.log(weapon.skins[i]);
      
      uuidArray.push(weapon.skins[i].uuid);
    };
    weapon.skins = uuidArray;
   }
   console.log(weapons);
   
 
try {
        const filePath = `${__dirname}/test.json`;
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    } catch (err) {
        console.error(err);        
    }
    
}

testing();

 
