// const express = require('express');
// const router = express.Router();
const Router = require("express").Router;
const router = Router();
const fs = require("fs");

const langOpts = 'ar-AE / de-DE / en-US / es-ES / es-MX / fr-FR / id-ID / it-IT / ja-JP / ko-KR / pl-PL / pt-BR / ru-RU / th-TH / tr-TR / vi-VN / zh-CN / zh-TW';
const langs = langOpts.split(' / ');
const langData = {};

for ( const lang of langs ) {
  const fileContent = fs.readFileSync(`./data/agents/agents_${lang}.json`, 'utf8');
  // console.log('>file:', fileContent);
  
  const data = JSON.parse(fileContent);
  // console.log('>data: ', data);
  
  // langData = {...langData, lang: data};
  langData[lang] = data;
}
// console.log(langData);

// const USFilePath = fs.readFileSync("./data/agents/agents_en-US.json", "utf8");
// const USAgents = JSON.parse(USFilePath).data;
// const TWFilePath = fs.readFileSync("./agents/agents_zh-TW.json", "utf8");
// const TWAgents = JSON.parse(TWFilePath).data;
// const VNFilePath = fs.readFileSync("./agents/agents_vi-VN.json", "utf8");
// const VNAgents = JSON.parse(VNFilePath).data;



// const langData = {
//   "en-US": USAgents,
//   "zh-TW": TWAgents,
//   "vi-VN": VNAgents,
// };

router.route("/agents").get((req, res) => {
  const agentsData = langData[req.selectedLanguage];
  if (!agentsData) {
    return res.status(404).send("Invalid language!!");
  }
  const { role } = req.query;

  //   const agents = req.agents;
  console.log(role);

  if (!role) {
    return res.json(agentsData);
  }
  const filteredData = agentsData.filter(
    (agent) => agent.role.displayName.toLowerCase() === role.toLowerCase()
  );
  // const roleAgent = agents.filter((agent) => {
  //   return agent.role.displayName.toLowerCase() === role.toLowerCase();
  // });

  // for (let i = 0; i < agents.length; i++) {
  //   if (agent[i].role.dis)
  // }
  // console.log(roleAgent);
  // return res.json(roleAgent);

  return res.json(filteredData);
});

router.get("/agents/:agent", (req, res) => {
  const agentsData = langData[req.selectedLanguage];

  if (!agentsData) {
    return res.status(404).send("Invalid language!!");
  }
  
  const { agent } = req.params;
  // const { lang } = req.query;
  // console.log(uuid);
  // console.log(agents);

  for (let i = 0; i < agentsData.length; i++) {
    // console.log(req.data.agents[i].uuid);

    if (
      agentsData[i].uuid === agent ||
      agentsData[i].displayName.toLowerCase() === agent.toLowerCase()
    ) {
      return res.json(agentsData[i]);
    }
  }

  return res.status(404).send("Invalid agent");

  // for (let i = 0; i < langData; i++) {
  //   if (langData.find)
  // }
  // }
});

module.exports = router;
