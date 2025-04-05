import React, { useState, useRef, useEffect } from "react";
import "../css/AstroThoth.css";

const AstroThoth = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([
        { content: "Welcome! How can I assist you today? Type 'help' for commands.", className: "incoming" },
    ]);

    const predefinedCommands = {
        help: "Here are the available commands: 'help', 'about', 'contact', 'exit', 'project', 'objectives', 'methodology', 'features', 'testing', 'results', 'conclusion', 'references'.",
        about: "I am AstroThoth, your friendly assistant. I can help you with various tasks. Just type one of the available commands.",
        contact: "You can contact us via email at support@example.com or call us at 123-456-7890.",
        exit: "Thanks for chatting with me! Have a great day!"
    };

    const createBotList = (message, className) => ({
        content: message,
        className: className,
    });

    const handleCommand = (command) => {
        const response = predefinedCommands[command.toLowerCase()];
        if (response) {
            const botMessage = createBotList(response, "incoming");
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
            const botMessage = createBotList("Sorry, I don't recognize that command. Type 'help' for a list of available commands.", "incoming error");
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    };

    const handleSend = () => {
        if (!userInput.trim()) return;
        const outgoingMessage = createBotList(userInput, "outgoing");
        setMessages((prevMessages) => [...prevMessages, outgoingMessage]);
        setUserInput("");

        setTimeout(() => {
            handleCommand(userInput);
        }, 600);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleSend();
        }
    };

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    const chatContainerRef = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="bot-container">
            {!isChatVisible && (
                <button className="open-chat-btn" onClick={toggleChatVisibility}>
                    <i className="fas fa-user-astronaut"></i>
                </button>
            )}

            {isChatVisible && (
                <div className="AstroThoth">
                    <header>
                        <h2>AstroThoth</h2>
                        <button className="close-chat-btn" onClick={toggleChatVisibility}>
                            &#10005;
                        </button>
                    </header>

                    <ul className="electrochat" ref={chatContainerRef}>
                        {messages.map((msg, index) => (
                            <li key={index} className={`message ${msg.className}`}>
                                {msg.className === "incoming" && <span className="far fa-comment-alt"></span>}
                                <p>{msg.content}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="bot-input">
                        <input
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message here..."
                            required
                        />
                        <span id="send-btn" className="fas fa-paper-plane" onClick={handleSend}></span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AstroThoth;