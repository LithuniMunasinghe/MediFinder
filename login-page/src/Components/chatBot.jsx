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
        prev.filter((msg) => !msg.loading).concat({ sender: "Gemini", text: aiText })
      );
    } catch (err) {
      setMessages((prev) =>
        prev.filter((msg) => !msg.loading).concat({
          sender: "Gemini",
          text: "❌ Error: " + err.message,
        })
      );
    }
    scrollToBottom();
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

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: `📂 Selected file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)` },
    ]);

    const aiInstruction = `
You are an AI assistant. The user uploaded a prescription (text or image). 
Extract only the medicines actually written in this prescription. 
For each medicine, provide:
- The medicine type/class (e.g., Antibiotic, NSAID, Antihistamine)
- 3 concise bullet points describing its main uses
Do NOT include any other medicines, patient info, or dosage instructions. 
Format the response like this:

- MedicineName: Type
  • Usage 1
  • Usage 2
  • Usage 3
...
`;

    if (file.type.startsWith("text/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = e.target.result;
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: `File Content Preview:\n${fileContent.substring(0, 200)}...` },
        ]);
        scrollToBottom();
        fetchAPIResponse(`${aiInstruction}\n\nPrescription content:\n${fileContent}`);
      };
      reader.readAsText(file);
    } else if (file.type.startsWith("image/")) {
      // OCR processing
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgData = e.target.result;
        setMessages((prev) => [
          ...prev,
          {
            sender: "user",
            text: `📷 Uploaded image: <br><img src="${imgData}" style="max-width:200px; border-radius:8px;" />`,
          },
        ]);
        scrollToBottom();

        Tesseract.recognize(imgData, "eng", { logger: (m) => console.log(m) }).then(({ data: { text } }) => {
          setMessages((prev) => [
            ...prev,
            { sender: "user", text: `Extracted Prescription Text:\n${text.substring(0, 300)}...` },
          ]);
          scrollToBottom();
          fetchAPIResponse(`${aiInstruction}\n\nPrescription content:\n${text}`);
        });
      };
      reader.readAsDataURL(file);
    } else {
      setMessages((prev) => [...prev, { sender: "user", text: `⚠️ Unsupported file type (${file.type})` }]);
      scrollToBottom();
    }
  };

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <header className="header">
        <h1 className="title">
          Meet <span className="gemini">MEDIFINDER</span>, your personal AI assistant
        </h1>
      </header>

      <div className="chat-area">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          ></div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="typing-area">
        <form className="typing-form" onSubmit={handleSend}>
          <div className="input-wrapper">
            <div className="file-upload">
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFile} />
          <button onClick={() => document.getElementById("fileInput").click()}>📂 Upload File</button>
        </div>
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
              <span>➤</span>
            </button>
          </div>
        </form>

       
      </div>
    </>
  );
}

export default ChatBot;
