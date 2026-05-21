const API_KEY = "YOUR_GROQ_API_KEY";

const url =
  "https://api.groq.com/openai/v1/chat/completions";


async function generateTrip() {

  const destination =
    document.getElementById("destination").value;

  const days =
    document.getElementById("days").value;

  const budget =
    document.getElementById("budget").value;

  const output =
    document.getElementById("output");

  output.innerHTML = "Generating travel itinerary...";

  if (!destination) {

    output.innerHTML =
      "Please enter a destination.";

    return;
  }

  if (!days || days <= 0) {

    output.innerHTML =
      "Number of days must be greater than 0.";

    return;
  }

  if (!budget) {

    output.innerHTML =
      "Please select a budget type.";

    return;
  }

  const prompt = `
Create a realistic ${days}-day travel itinerary.

Destination:
${destination}

Budget Type:
${budget}

Requirements:
- include places to visit
- suggest food and activities
- maintain realistic pacing
- keep the plan balanced
- use clean day-wise formatting
`;

  try {

    const response = await fetch(url, {

      method: "POST",

      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    console.log(data);

    if (!data.choices) {

      output.innerHTML =
        data.error?.message || "API Error";

      return;
    }

    output.innerHTML =
      data.choices[0].message.content;
  }

  catch (error) {

    console.log(error);

    output.innerHTML =
      "Something went wrong.";
  }
}
