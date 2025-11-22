const fs = require("fs");
const path = require("path");

const URL = "http://localhost:1234/";

// TODO: update new image URL to localhost URL

// function updateData(key, newValue, filename, file) {
//   const filePath = path.join(__dirname, "..", "static");
// }

async function fetchImage(imageUrl, filename, uuid, type) {
  const res = await fetch(imageUrl); // => []

  const arrayBuffer = await res.arrayBuffer();
  //   console.log(arrayBuffer);

  const imageBuffer = Buffer.from(arrayBuffer);

  const outputPath = path.join(
    __dirname,
    "..",
    "static",
    "agents",
    "images",
    uuid,
    type
  );

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  fs.writeFileSync(path.join(outputPath, filename), imageBuffer);
}

async function findURLAndFetch(agentData, uuid, type) {
  //   const downloadedURL = [];
  for (const key in agentData) {
    const value = agentData[key];
    if (typeof value === "string" && value.startsWith("https")) {
      //   if (downloadedURL.includes(value)) {

      //   }
      const parts = value.split("/");
      const filename = parts[parts.length - 1];

      fetchImage(value, filename, uuid, type);

      const sourcePath = "agents/images/" + uuid + "/" + type + "/" + filename;
      // const newAgentData = { ... agentData};
      agentData[key] = URL + sourcePath;
      // agentData = newAgentData;
      // console.log('done changing');
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        findURLAndFetch(value[i], uuid, "abilities/" + value[i].slot);
      }
    } else if (typeof value === "object") {
      findURLAndFetch(value, uuid, "role");
    }
  }
}

const langOpts =
  "ar-AE / de-DE / en-US / es-ES / es-MX / fr-FR / id-ID / it-IT / ja-JP / ko-KR / pl-PL / pt-BR / ru-RU / th-TH / tr-TR / vi-VN / zh-CN / zh-TW";
const langs = langOpts.split(" / ");

for (const lang of langs) {
  const DATA_DIR = path.join(__dirname, "..", "data", "agents");
  const filePath = `${DATA_DIR}/agents_${lang}.json`;
  const content = fs.readFileSync(filePath);
  const agentsData = JSON.parse(content);
  const agents = [];

  for (const agent of agentsData) {
    agents.push(agent);
    //   console.log(">>>", agent);
  }
  for (const agent of agents) {
    findURLAndFetch(agent, agent.uuid, "agent_image");
    fs.writeFileSync(filePath, JSON.stringify(agents, null, 4), 'utf8');
  }
}
