document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotBox = document.querySelector('.chatbot-box');
    const chatInput = document.querySelector('.chatbot-input input');
    const sendButton = document.querySelector('.chatbot-input button');
    const chatMessages = document.querySelector('.chatbot-messages');
    
    // Toggle chatbot box
    chatbotButton.addEventListener('click', function() {
        chatbotBox.classList.toggle('active');
        // Focus on input when chatbot is opened
        if (chatbotBox.classList.contains('active')) {
            setTimeout(() => {
                chatInput.focus();
            }, 300);
        }
    });
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response after a short delay
            setTimeout(() => {
                botResponse(message);
            }, 600);
        }
    }
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(type + '-message');
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Bot response logic
    function botResponse(userMessage) {
        let botMessage = '';
        
        userMessage = userMessage.toLowerCase();
        
        if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
            botMessage = "Hello! How can I assist you with my portfolio?";
        } else if (userMessage.includes('project') || userMessage.includes('work')) {
            botMessage = "I've worked on various projects including e-commerce platforms, task management apps, and data dashboards. Would you like to know more about a specific project?";
        } else if (userMessage.includes('skill') || userMessage.includes('technology')) {
            botMessage = "My skills include JavaScript, React, Node.js, Python, and UI/UX design. I'm always learning new technologies!";
        } else if (userMessage.includes('experience') || userMessage.includes('year')) {
            botMessage = "I have over 5 years of experience in web development and design. I've worked with startups and large companies alike.";
        } else if (userMessage.includes('contact') || userMessage.includes('email') || userMessage.includes('hire')) {
            botMessage = "You can reach me at alex.morgan@example.com. I'm available for freelance work and full-time opportunities!";
        } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
            botMessage = "You're welcome! Is there anything else you'd like to know?";
        } else {
            botMessage = "I'm not sure I understand. You can ask me about my projects, skills, experience, or how to contact me.";
        }
        
        addMessage(botMessage, 'bot');
    }
});
