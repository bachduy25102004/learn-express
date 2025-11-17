const Router = require("express").Router;
const router = Router();
const fs = require("fs");

const langOpts =
  "ar-AE / de-DE / en-US / es-ES / es-MX / fr-FR / id-ID / it-IT / ja-JP / ko-KR / pl-PL / pt-BR / ru-RU / th-TH / tr-TR / vi-VN / zh-CN / zh-TW";
const langs = langOpts.split(" / ");
const langData = {};

for (const lang of langs) {
  const fileContent = fs.readFileSync(
    `./data/weapons/weapons_${lang}.json`,
    "utf8"
  );
  // console.log('>file:', fileContent);

  const data = JSON.parse(fileContent);
  // console.log('>data: ', data);

  // langData = {...langData, lang: data};
  langData[lang] = data;
}

// const USFilePath = fs.readFileSync("./data/maps/maps_en-US.json", "utf8");
// const USMaps = JSON.parse(USFilePath).data;
// const TWFilePath = fs.readFileSync("./data/maps/maps_zh-TW.json", "utf8");
// const TWMaps = JSON.parse(TWFilePath).data;
// const VNFilePath = fs.readFileSync("./data/maps/maps_vi-VN.json", "utf8");
// const VNMaps = JSON.parse(VNFilePath).data;

// const langData = {
//   "en-US": USMaps,
//   "zh-TW": TWMaps,
//   "vi-VN": VNMaps,
// };

router.route("/weapons").get((req, res) => {
  const weaponsData = langData[req.selectedLanguage];

  if (!weaponsData) {
    return res.status(404).send("Invalid language!!");
  }

  return res.json(weaponsData);
});

router.get("/weapons/:weapon", (req, res) => {
  const weaponsData = langData[req.selectedLanguage];

  if (!weaponsData) {
    return res.status(404).send("Invalid language!!");
  }

  const { weapon } = req.params;

  for (const weaponData of weaponsData) {
    if (
      weaponData.uuid === weapon ||
      weaponData.displayName.toLowerCase() === weapon.toLowerCase()
    ) {
      return res.json(weaponData);
    }
  }
  return res.status(404).send("Invalid weapon");
});

module.exports = {
    router,
    langData
}
