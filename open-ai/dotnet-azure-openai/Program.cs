using Azure;
using Azure.AI.OpenAI;
using static System.Environment;

string endpoint = GetEnvironmentVariable("OPENAI_ENDPOINT");
string key = GetEnvironmentVariable("OPENAI_KEY");

// Enter the deployment name you chose when you deployed the model.
//string engine = "text-davinci-002";
string engine = "my-model";

OpenAIClient client = new(new Uri(endpoint), new AzureKeyCredential(key));

string prompt = "What is the highest mountain in Colorado?";
Console.Write($"Input: {prompt}\n");

Response<Completions> completionsResponse = 
    await client.GetCompletionsAsync(engine, prompt);
string completion = completionsResponse.Value.Choices[0].Text;
Console.WriteLine($"Chatbot: {completion}");