const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env["OPENAI_ENDPOINT"] ;
const azureApiKey = process.env["OPENAI_KEY"] ;

//const prompt = ["When was Microsoft founded?"];
const prompt = ["Why are interest rates so high this year?"];

async function main() {
  console.log("== Get completions Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "text-davinci-002";
  const result = await client.getCompletions(deploymentId, prompt);

  for (const choice of result.choices) {
    console.log(choice.text);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };