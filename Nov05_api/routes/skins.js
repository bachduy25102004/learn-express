const Router = require("express").Router;
const router = Router();
const fs = require("fs");
const { langData: weaponLangData } = require("./weapons");

const langOpts =
  "ar-AE / de-DE / en-US / es-ES / es-MX / fr-FR / id-ID / it-IT / ja-JP / ko-KR / pl-PL / pt-BR / ru-RU / th-TH / tr-TR / vi-VN / zh-CN / zh-TW";
const langs = langOpts.split(" / ");
const langData = {};
// const weaponLangdata = {};

for (const lang of langs) {
  // console.log(lang);

  const fileContent = fs.readFileSync(
    `./data/skins/skins_${lang}.json`,
    "utf8"
  );

  //   const weaponFileContent = fs.readFileSync(
  //     `./data/weapons/weapons_${lang}.json`,
  //     "utf8"
  //   );
  //   console.log('>file:', fileContent);

  const data = JSON.parse(fileContent);

  //   console.log('>data: ', data);

  // langData = {...langData, lang: data};
  langData[lang] = data;
}

router.get("/weapons/skins", (req, res) => {
  const { offset } = req.query;
  const { limit } = req.query;
  // console.log(req.selectedlanguage);

  const skinsData = langData[req.selectedLanguage];

  //   console.log(skinsData);
  //   console.log(langData['en-US']);

  if (!skinsData) {
    return res.status(404).send("Invalid language!!");
  }

  const returnData = [];

  for (let i = 0; i < (limit ?? 20); i++) {
    console.log(skinsData[i]);

    returnData.push(skinsData[i + (parseInt(offset) || 0)]);
  }

  const returnObj = {
    length: skinsData.length,
    data: returnData,
  };

  return res.json(returnObj);
});

router.get("/weapons/:weapon/skins", (req, res) => {
  const { weapon: searchWeapon } = req.params;
  console.log(searchWeapon);
  
  const skinsData = langData[req.selectedLanguage];
  const weaponsData = weaponLangData[req.selectedLanguage];
//   console.log(weaponsData);
  
  //   console.log(skinsData);
  //   console.log(langData['en-US']);

  if (!skinsData) {
    return res.status(404).send("Invalid language!!");
  }

    // const filteredData = skinsData.filter((skin) => {
    //   weaponsData
    //     .filter(
    //       (weapon) =>
    //         weapon.uuid === searchWeapon ||
    //         weapon.displayName.toLowerCase() === searchWeapon.toLowerCase()
    //     ).skins
    //     .includes(skin.uuid);
    // });
    // return res.json(filteredData);
  const returnData = [];

  for (const weapon of weaponsData) {
    console.log(weapon.displayName);
    
    if (
      weapon.uuid === searchWeapon ||
      weapon.displayName.toLowerCase() === searchWeapon.toLowerCase()
    ) {
      for (const skin of skinsData) {
        if (weapon.skins.includes(skin.uuid)) {
            returnData.push(skin);
        }
      }
    }
  }

  return res.json(returnData);
});

module.exports = router;
