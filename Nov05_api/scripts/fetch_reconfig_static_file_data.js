const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "..",
  "data",
  "agents",
  "agents_en-US.json"
);
const content = fs.readFileSync(filePath);
const agentsData = JSON.parse(content);

const agents = [];

for (const agent of agentsData) {
  agents.push(agent);
  //   console.log(">>>", agent);
}

// TODO: update new image URL to localhost URL

function updateData(agent, key, newValue) {

}

async function fetchImage(imageUrl, filename, uuid, type) {
  const res = await fetch(imageUrl); // => []

  const arrayBuffer = await res.arrayBuffer();
//   console.log(arrayBuffer);

  const imageBuffer = Buffer.from(arrayBuffer);

  const outputPath = path.join(__dirname, '..', 'static', "images", uuid, type);

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
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        findURLAndFetch(value[i], uuid, "abilities/" + value[i].slot);
      }
    } else if (typeof value === "object") {
      findURLAndFetch(value, uuid, "role");
    }
  }
}

for (const agent of agents) {
  findURLAndFetch(agent, agent.uuid, "agent");
}
