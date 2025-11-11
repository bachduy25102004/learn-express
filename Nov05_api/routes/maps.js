const Router = require("express").Router;
const router = Router();
const fs = require("fs");

const USFilePath = fs.readFileSync("./data/maps/maps_en-US.json", "utf8");
const USMaps = JSON.parse(USFilePath).data;
const TWFilePath = fs.readFileSync("./data/maps/maps_zh-TW.json", "utf8");
const TWMaps = JSON.parse(TWFilePath).data;
const VNFilePath = fs.readFileSync("./data/maps/maps_vi-VN.json", "utf8");
const VNMaps = JSON.parse(VNFilePath).data;

const langData = {
  "en-US": USMaps,
  "zh-TW": TWMaps,
  "vi-VN": VNMaps,
};

router.route("/maps").get((req, res) => {
  const mapsData = langData[req.selectedLanguage];

  if (!mapsData) {
    return res.status(404).send("Invalid language!!");
  }

  return res.json(mapsData);
});

router.get("/maps/:map", (req, res) => {
  const mapsData = langData[req.selectedLanguage];

  if (!mapsData) {
    return res.status(404).send("Invalid language!!");
  }

  const { map } = req.params;

  for (const mapData of mapsData) {
    if (
      mapData.uuid === map ||
      mapData.displayName.toLowerCase() === map.toLowerCase()
    ) {
      return res.json(mapData);
    }
  }
  return res.status(404).send("Invalid map");
});

module.exports = router;
