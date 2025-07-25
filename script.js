const OPENAI_API_KEY = "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";
const chatLog = document.getElementById("chat-log");

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
      model: "gpt-4o", // 무료 크레딧도 사용 가능
      messages: [
        { role: "system", content: "You are an intelligent, friendly English tutor. Keep the conversation easy and natural." },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't get that.";
  addMessage("??? Tutor", reply);

  // Optional: 음성으로 말하기
  speak(reply);
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatLog.appendChild(div);
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
