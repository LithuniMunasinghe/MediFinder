import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import "../css/chatBot.css";

const APIKEY = "AIzaSyCIkYZjzIsYGYy4PDiBA0XuaKiJEonnD8Y";
const APIURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`;

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Parse AI response into medicine objects
  const parseMedicines = (text) => {
    const medicines = text.split("\n\n").filter(Boolean);
    return medicines.map((med) => {
      const [title, ...points] = med.split("\n").map(line => line.replace(/^•\s*/, '').trim());
      return { title, points };
    });
  };

  const fetchAPIResponse = async (chat) => {
    try {
      const loadingMsg = { sender: "Gemini", text: "Loading...", loading: true };
      setMessages((prev) => [...prev, loadingMsg]);
      scrollToBottom();

      const resp = await fetch(APIURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: chat }] }],
        }),
      });

      const response = await resp.json();
      const aiText =
        response?.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\*\*(.*?)\*\*/g, "$1") ||
        "⚠️ No response from API";

      setMessages((prev) =>
        prev.filter((msg) => !msg.loading).concat({
          sender: "Gemini",
          text: aiText,
          medicineResponse: true,
        })
      );
      scrollToBottom();
    } catch (err) {
      setMessages((prev) =>
        prev.filter((msg) => !msg.loading).concat({
          sender: "Gemini",
          text: "❌ Error: " + err.message,
        })
      );
      scrollToBottom();
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    scrollToBottom();
    fetchAPIResponse(input);
    setInput("");
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgData = e.target.result;

        // Show only the image in chat
        setMessages((prev) => [
          ...prev,
          { sender: "user", image: imgData },
        ]);
        scrollToBottom();

        // OCR + AI processing
        Tesseract.recognize(imgData, "eng", { logger: (m) => console.log(m) }).then(
          ({ data: { text } }) => {
            const aiInstruction = `
You are an AI assistant. The user uploaded a prescription (image). 
Extract only the medicines actually written in this prescription. 
For each medicine, provide:
- The medicine type/class (e.g., Antibiotic, NSAID, Antihistamine)
- 3 concise bullet points describing its main uses
Do NOT include any other medicines, patient info, or dosage instructions.
Format the response like this:

MedicineName: Type
• Usage 1
• Usage 2
• Usage 3
`;
            fetchAPIResponse(`${aiInstruction}\n\nPrescription content:\n${text}`);
          }
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <>
    <div className="chatBot">
      {messages.length === 0 && (
        <header className="header">
          <h1 className="title">
            Meet <span className="gemini">MEDIFINDER</span>, your personal AI assistant
          </h1>
        </header>
      )}

      <div className="chat-area">
        {messages.map((msg, index) => {
          // User uploaded image
          if (msg.image) {
            return (
              <div key={index} className="message user">
                <img
                  src={msg.image}
                  alt="uploaded"
                  style={{ maxWidth: "200px", borderRadius: "8px" }}
                />
              </div>
            );
          }

          // AI medicine response as cards
          if (msg.sender === "Gemini" && msg.medicineResponse) {
            const medicines = parseMedicines(msg.text);
            return (
              <div key={index}>
                {medicines.map((med, i) => (
                  <div key={i} className="medicine-card">
                    <h3>{med.title}</h3>
                    <ul>
                      {med.points.map((p, j) => (
                        <li key={j}>{p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          }

          // Default messages
          return (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </div>
      </div>
      
      <div className="typing-area">
        <form className="typing-form" onSubmit={handleSend}>
          <div className="input-wrapper">
            <div className="file-upload">
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFile}
              />
              <button type="button" onClick={() => document.getElementById("fileInput").click()}>
                📂 Upload File
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="submitBtn" type="submit">
              <span>➤</span>
            </button>
          </div>
        </form>
      </div>
      
    </>
  );
}

export default ChatBot;
