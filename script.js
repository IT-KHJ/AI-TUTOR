const OPENAI_API_KEY = "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";

const articleText = `
This year, a Norwegian robotics company called 1X Technologies introduced its latest humanoid robot, Neo Gamma. It is a machine designed to assist people at home.
Unlike most robots built for factories, Neo Gamma is made to work in regular houses and serve the family. The ¡°robot butler¡± can do various chores, such as vacuuming, watering plants, making coffee, and even folding laundry.
The 165-centimeter-tall robot has proportions similar to a human adult and moves with a realistic gait. It is made with lightweight alloys, so it only weighs around 35 kilograms.
Neo Gamma runs on a custom AI system and is equipped with cameras, microphones, and tactile sensors. It wears a nylon knit suit that looks similar to a sweater, giving it a human-like quality.
Beta versions of the Neo units were shown in previous years. In early 2024, 1X showed off its most advanced prototype and demonstrated its household skills.
The company is also building a robot factory and plans to deploy large numbers of robots to early adopters for real-world testing. By 2028, it hopes to sell them commercially.
Other companies like Tesla and Figure AI are also working on humanoid robots. Tesla¡¯s Optimus Gen 3 is designed to help with tasks like folding laundry and babysitting. Figure AI created a robot named Figure 02, now sold to businesses for future home use.
`;

const systemPrompt = `
You are a kind and smart English tutor.
Use the article below to help the user understand its content and practice English.

Article:
${articleText}
`;

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  input.value = "";
  addMessage("? You", message);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o", // ¶Ç´Â gpt-3.5-turbo
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, I didn¡¯t get that.";
  addMessage("??? Tutor", reply);
  speak(reply);
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  document.getElementById("chat-log").appendChild(div);
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
