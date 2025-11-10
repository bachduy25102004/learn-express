// const express = require('express');
// const router = express.Router();
const Router = require("express").Router;
const router = Router();

const USFilePath = fs.readFileSync("./agents/agents_en-US.json", "utf8");
const USAgents = JSON.parse(USFilePath).data;
const CNFilePath = fs.readFileSync("./agents/agents_zh-TW.json", "utf8");
const CNAgents = JSON.parse(CNFilePath).data;
const VNFilePath = fs.readFileSync("./agents/agents_vi-VN.json", "utf8");
const VNAgents = JSON.parse(VNFilePath).data;

router.route("/agents").get((req, res) => {
  const { role } = req.query;
  const agents = req.data.agents;
  console.log(role);

  if (!role) {
    return res.json(agents);
  }

  // const roleAgent = agents.filter((agent) => {
  //   return agent.role.displayName.toLowerCase() === role.toLowerCase();
  // });

  // for (let i = 0; i < agents.length; i++) {
  //   if (agent[i].role.dis)
  // }
  // console.log(roleAgent);
  // return res.json(roleAgent);
  return res.json(
    req.data.agents.filter(
      (agent) => agent.role.displayName.toLowerCase() === role.toLowerCase()
    )
  );
});

router.route("/agents/:agent").get((req, res) => {
  const { agent } = req.params;
  // const { lang } = req.query;
  // console.log(uuid);
  // console.log(agents);

  for (let i = 0; i < req.data.agents.length; i++) {
    // console.log(req.data.agents[i].uuid);

    if (
      req.data.agents[i].uuid === agent ||
      req.data.agents[i].displayName.toLowerCase() === agent.toLowerCase()
    ) {
      return res.json(req.data.agents[i]);
    }
  }

  return res.status(404).send("Invalid agent");

  // for (let i = 0; i < langData; i++) {
  //   if (langData.find)
  // }
  // }
});
