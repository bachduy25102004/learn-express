const axios = require("axios");
const fs = require("fs");
const path = require("path");

const dataTypes = ['agents', 'maps', 'weapons'];

const langOpts =
  "ar-AE / de-DE / en-US / es-ES / es-MX / fr-FR / id-ID / it-IT / ja-JP / ko-KR / pl-PL / pt-BR / ru-RU / th-TH / tr-TR / vi-VN / zh-CN / zh-TW";
const langs = langOpts.split(" / ");


async function fetchData(dataType, lang) {
    const res = await axios.get(`https://valorant-api.com/v1/${dataType}?language=${lang}`);
    const { data } = res.data;
    
    const DATA_DIR = path.join(__dirname, "..", "data", dataType);

    try {
        const filePath = `${DATA_DIR}/${dataType}_${lang}.json`;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
    } catch (err) {
        console.error(err);        
    }
}

for ( const dataType of dataTypes ) {
    for ( const lang of langs) {
        fetchData(dataType, lang);
    }
}

// for (const lang of langs) {
//   axios.get("https://valorant-api.com/v1/weapons?language=" + lang).then((res) => {
//     const { data } = res.data;

//     try {
//       const filePath = `${DATA_DIR}/weapons_${lang}.json`;
//       fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8");
//     } catch (err) {
//       console.error(err);
//     }
//   });
// }
