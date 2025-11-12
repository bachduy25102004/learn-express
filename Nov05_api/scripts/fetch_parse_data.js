const axios = require("axios");
const fs = require("fs");
const path = require("path");

const dataTypes = ["agents", "maps", "weapons"];

const langOpts =
  "ar-AE / de-DE / en-US / es-ES / es-MX / fr-FR / id-ID / it-IT / ja-JP / ko-KR / pl-PL / pt-BR / ru-RU / th-TH / tr-TR / vi-VN / zh-CN / zh-TW";
const langs = langOpts.split(" / ");

async function fetchData(dataType, lang) {
  try {
    const res = await axios.get(
      `https://valorant-api.com/v1/${dataType}?language=${lang}`
    );
    const { data } = res.data;

    const DATA_DIR = path.join(__dirname, "..", "data", dataType);

    const filePath = `${DATA_DIR}/${dataType}_${lang}.json`;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8");
  } catch (err) {
    console.error(err);
  }
}

// for ( const dataType of dataTypes ) {
//     for ( const lang of langs) {
//         fetchData(dataType, lang);
//     }
// }

async function parse() {
  for (const lang of langs) {
    try {
      const res = await axios.get(
        `https://valorant-api.com/v1/weapons?language=${lang}`
      );
      const { data: weapons } = res.data;

      for (const weapon of weapons) {
        const uuidArray = [];
        for (let i = 0; i < weapon.skins.length; i++) {
          console.log(weapon.skins[i]);

          uuidArray.push(weapon.skins[i].uuid);
        }
        weapon.skins = uuidArray;
      }
      console.log(weapons);
      const DATA_DIR = path.join(__dirname, "..", "data", 'weapons');
      const filePath = `${DATA_DIR}/weapons_${lang}.json`;
      fs.writeFileSync(filePath, JSON.stringify(weapons, null, 4), "utf8");
    } catch (err) {
      console.error(err);
    }
  }
}

parse();

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
