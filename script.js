// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu
      const navLinks = document.querySelector(".nav-links");
      const menuToggle = document.getElementById("menu-toggle");
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
      }
    }
  });
});

// Active link highlighting
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  this.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards for animation
document
  .querySelectorAll(".service-card, .product-card, .team-card, .contact-card")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

// Image gallery functionality
function initImageGallery() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const mainImage = card.querySelector(".product-main-image");
    const placeholderDiv = card.querySelector(".placeholder-image");
    const thumbnails = card.querySelectorAll(".thumbnail");

    // Set up thumbnail clicks
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        if (this.style.display !== "none") {
          // Remove active class from all thumbnails
          thumbnails.forEach((t) => t.classList.remove("active"));
          // Add active class to clicked thumbnail
          this.classList.add("active");

          // Update main image
          mainImage.src = this.src;
          mainImage.alt = this.alt;

          // Show main image and hide placeholder if needed
          mainImage.style.display = "block";
          if (placeholderDiv) {
            placeholderDiv.style.display = "none";
          }
        }
      });
    });

    // Handle main image load error
    if (mainImage) {
      mainImage.addEventListener("error", function () {
        this.style.display = "none";
        if (placeholderDiv) {
          placeholderDiv.style.display = "flex";
        }
      });
    }
  });
}

// Initialize image gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", initImageGallery);

// Parallax effect for floating elements
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-element");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.1
    }deg)`;
  });
});

// Chatbot Functionality
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotMessages = document.getElementById("chatbot-messages");

// Track conversation state
let conversationState = {
  waitingForComparison: false,
  selectedMachines: [],
  lastTopic: null,
};

// Product database
const products = [
  {
    name: "Toshiba e Studio 257",
    model: "257",
    brand: "Toshiba",
    speed: 25,
    speedText: "25 pages per minute",
    price: "LKR 240,000",
    priceValue: 240000,
    screen: "9-inch",
    features: [
      "Automatic duplex",
      "Fast color scanning",
      "Network printing",
      "9-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Small offices with moderate printing needs",
  },
  {
    name: "Toshiba e Studio 307",
    model: "307",
    brand: "Toshiba",
    speed: 30,
    speedText: "30 pages per minute",
    price: "LKR 240,000",
    priceValue: 240000,
    screen: "9-inch",
    features: [
      "Automatic duplex",
      "Fast color scanning",
      "Network printing",
      "9-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Small to medium offices",
  },
  {
    name: "Toshiba e Studio 2508",
    model: "2508",
    brand: "Toshiba",
    speed: 25,
    speedText: "25 pages per minute",
    price: "LKR 290,000",
    priceValue: 290000,
    screen: "9-inch",
    features: [
      "Automatic duplex",
      "High-speed color scanning",
      "Network printing",
      "9-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Offices needing enhanced scanning capabilities",
  },
  {
    name: "Toshiba e Studio 3008",
    model: "3008",
    brand: "Toshiba",
    speed: 30,
    speedText: "30 pages per minute",
    price: "LKR 290,000",
    priceValue: 290000,
    screen: "9-inch",
    features: [
      "Automatic duplex",
      "Fast color scanning",
      "Network printing",
      "9-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Medium offices with consistent workload",
  },
  {
    name: "Toshiba e Studio 3508",
    model: "3508",
    brand: "Toshiba",
    speed: 35,
    speedText: "35 pages per minute",
    price: "LKR 290,000",
    priceValue: 290000,
    screen: "9-inch",
    features: [
      "Automatic duplex",
      "Fast color scanning",
      "Network printing",
      "9-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Busy offices with high-volume printing",
  },
  {
    name: "Toshiba e Studio 4508",
    model: "4508",
    brand: "Toshiba",
    speed: 45,
    speedText: "45 pages per minute",
    price: "LKR 290,000",
    priceValue: 290000,
    screen: "9-inch",
    features: [
      "Automatic duplex",
      "Fast color scanning",
      "Network printing",
      "9-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Large offices with heavy printing demands",
  },
  {
    name: "Toshiba e Studio 2518",
    model: "2518",
    brand: "Toshiba",
    speed: 25,
    speedText: "25 pages per minute",
    price: "LKR 300,000",
    priceValue: 300000,
    screen: "10.1-inch",
    features: [
      "Automatic duplex",
      "Fast color scanning",
      "Network printing",
      "10.1-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Modern offices wanting latest interface",
  },
  {
    name: "Toshiba e Studio 3018",
    model: "3018",
    brand: "Toshiba",
    speed: 30,
    speedText: "30 pages per minute",
    price: "LKR 300,000",
    priceValue: 300000,
    screen: "10.1-inch",
    features: [
      "Automatic duplex",
      "Fast color scanning",
      "Network printing",
      "10.1-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Modern medium offices",
  },
  {
    name: "Toshiba e Studio 3518",
    model: "3518",
    brand: "Toshiba",
    speed: 35,
    speedText: "35 pages per minute",
    price: "LKR 300,000",
    priceValue: 300000,
    screen: "10.1-inch",
    features: [
      "Automatic duplex",
      "Fast color scanning",
      "Network printing",
      "10.1-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Modern busy offices with enhanced display needs",
  },
  {
    name: "Toshiba e Studio 4518",
    model: "4518",
    brand: "Toshiba",
    speed: 45,
    speedText: "45 pages per minute",
    price: "LKR 300,000",
    priceValue: 300000,
    screen: "10.1-inch",
    features: [
      "Automatic duplex",
      "High-speed color scanning",
      "Network printing",
      "10.1-inch touchscreen",
      "Encrypted SSD",
    ],
    bestFor: "Large modern offices requiring maximum performance",
  },
  {
    name: "Canon IR 4045",
    model: "4045",
    brand: "Canon",
    speed: 45,
    speedText: "45 pages per minute",
    price: "LKR 220,000",
    priceValue: 220000,
    screen: "7-inch",
    features: [
      "Automatic duplex",
      "High-speed color scanning",
      "Network printing",
      "7-inch touchscreen",
      "Encrypted hard drive",
    ],
    bestFor: "Budget-conscious large offices",
  },
  {
    name: "Xerox 7835",
    model: "7835",
    brand: "Xerox",
    speed: 35,
    speedText: "35 pages per minute",
    price: "LKR 300,000",
    priceValue: 300000,
    screen: "7-inch",
    features: [
      "Color and black printing",
      "Automatic duplex",
      "High-speed scanning",
      "7-inch touchscreen",
      "McAfee protection",
    ],
    bestFor: "Offices prioritizing color printing and security",
  },
];

// Toggle chatbot
chatbotToggle.addEventListener("click", () => {
  chatbotContainer.classList.add("active");
  chatbotToggle.style.display = "none";
  document.querySelector(".chatbot-badge").style.display = "none";
});

chatbotClose.addEventListener("click", () => {
  chatbotContainer.classList.remove("active");
  chatbotToggle.style.display = "flex";
  conversationState = {
    waitingForComparison: false,
    selectedMachines: [],
    lastTopic: null,
  };
});

// Send message
function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message === "") return;

  addUserMessage(message);
  chatbotInput.value = "";

  setTimeout(() => {
    const response = generateResponse(message.toLowerCase());
    addBotMessage(response);
  }, 800);
}

chatbotSend.addEventListener("click", sendMessage);
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Handle quick replies
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("quick-reply")) {
    const query = e.target.dataset.query;
    addUserMessage(e.target.textContent);

    setTimeout(() => {
      const response = generateResponse(query);
      addBotMessage(response);
    }, 800);
  }
});

// Add user message
function addUserMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "user-message";
  messageDiv.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  chatbotMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Add bot message
function addBotMessage(content) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "bot-message";
  messageDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      ${content}
    </div>
  `;
  chatbotMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Scroll to bottom
function scrollToBottom() {
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Find product by various identifiers
function findProduct(query) {
  query = query.toLowerCase().replace(/\s+/g, "");
  return products.find(
    (p) =>
      query.includes(p.model.toLowerCase()) ||
      query.includes(p.name.toLowerCase().replace(/\s+/g, "")) ||
      query.includes(p.name.toLowerCase())
  );
}

// Extract model numbers from text
function extractModels(text) {
  const models = [];
  const patterns = [
    /(?:e\s*studio\s*|estudio\s*)(\d{3,4})/gi,
    /(?:ir\s*)(\d{4})/gi,
    /(\d{4})/g,
    /(\d{3})/g,
  ];

  patterns.forEach((pattern) => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const modelNum = match[1];
      const product = products.find((p) => p.model === modelNum);
      if (product && !models.some((m) => m.model === product.model)) {
        models.push(product);
      }
    }
  });

  return models;
}

// Compare two or more machines - NEW CARD-BASED VERSION
function compareMachines(machines) {
  if (machines.length < 2) {
    return `
      <p>I need at least 2 machines to compare. Please specify the models you'd like to compare.</p>
      <p>For example: "Compare 307 and 3518" or "Compare Canon 4045 with Toshiba 4508"</p>
      ${getQuickReplies()}
    `;
  }

  let response = `<p>📊 Here's a detailed comparison:</p>`;

  // Individual machine cards
  response += '<div class="comparison-cards">';

  machines.forEach((machine, index) => {
    const maxSpeed = Math.max(...machines.map((m) => m.speed));
    const minPrice = Math.min(...machines.map((m) => m.priceValue));
    const isFastest = machine.speed === maxSpeed;
    const isCheapest = machine.priceValue === minPrice;

    response += `
      <div class="compare-card">
        <div class="compare-card-header">
          <h4>${machine.name}</h4>
          ${
            isFastest ? '<span class="badge badge-speed">🏆 Fastest</span>' : ""
          }
          ${
            isCheapest
              ? '<span class="badge badge-price">💰 Best Price</span>'
              : ""
          }
        </div>
        
        <div class="compare-details">
          <div class="compare-item">
            <span class="compare-icon">🏢</span>
            <div class="compare-info">
              <span class="compare-label">Brand</span>
              <span class="compare-value">${machine.brand}</span>
            </div>
          </div>
          
          <div class="compare-item">
            <span class="compare-icon">⚡</span>
            <div class="compare-info">
              <span class="compare-label">Speed</span>
              <span class="compare-value">${machine.speedText}</span>
            </div>
          </div>
          
          <div class="compare-item">
            <span class="compare-icon">💵</span>
            <div class="compare-info">
              <span class="compare-label">Price</span>
              <span class="compare-value">${machine.price}</span>
            </div>
          </div>
          
          <div class="compare-item">
            <span class="compare-icon">📱</span>
            <div class="compare-info">
              <span class="compare-label">Display</span>
              <span class="compare-value">${machine.screen} touchscreen</span>
            </div>
          </div>
          
          <div class="compare-item-full">
            <span class="compare-icon">✨</span>
            <div class="compare-info">
              <span class="compare-label">Key Features</span>
              <div class="feature-list">
                ${machine.features
                  .slice(0, 3)
                  .map((f) => `<span class="feature-tag">${f}</span>`)
                  .join("")}
              </div>
            </div>
          </div>
          
          <div class="compare-item-full">
            <span class="compare-icon">🎯</span>
            <div class="compare-info">
              <span class="compare-label">Best For</span>
              <span class="compare-value">${machine.bestFor}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  response += "</div>";

  // Comparison Analysis
  response += '<div class="comparison-analysis">';
  response += "<h4>💡 Quick Comparison:</h4>";

  const speedDiff =
    Math.max(...machines.map((m) => m.speed)) -
    Math.min(...machines.map((m) => m.speed));
  const priceDiff =
    Math.max(...machines.map((m) => m.priceValue)) -
    Math.min(...machines.map((m) => m.priceValue));
  const maxSpeed = Math.max(...machines.map((m) => m.speed));
  const minPrice = Math.min(...machines.map((m) => m.priceValue));

  response += '<div class="analysis-grid">';

  // Speed comparison
  response += '<div class="analysis-item">';
  if (speedDiff === 0) {
    response += `<p>⚡ <strong>Speed:</strong> Both models print at the same speed (${machines[0].speedText})</p>`;
  } else {
    const fastest = machines.find((m) => m.speed === maxSpeed);
    const slowest = machines.find(
      (m) => m.speed === Math.min(...machines.map((m) => m.speed))
    );
    response += `<p>⚡ <strong>Speed Winner:</strong> ${fastest.name} is ${speedDiff} ppm faster than ${slowest.name}</p>`;
  }
  response += "</div>";

  // Price comparison
  response += '<div class="analysis-item">';
  if (priceDiff === 0) {
    response += `<p>💰 <strong>Price:</strong> Both models cost the same (${machines[0].price})</p>`;
  } else {
    const cheapest = machines.find((m) => m.priceValue === minPrice);
    const expensive = machines.find(
      (m) => m.priceValue === Math.max(...machines.map((m) => m.priceValue))
    );
    response += `<p>💰 <strong>Price Winner:</strong> ${
      cheapest.name
    } saves you LKR ${(
      expensive.priceValue - cheapest.priceValue
    ).toLocaleString()}</p>`;
  }
  response += "</div>";

  // Display comparison
  response += '<div class="analysis-item">';
  const displays = [...new Set(machines.map((m) => m.screen))];
  if (displays.length === 1) {
    response += `<p>📱 <strong>Display:</strong> Both have ${displays[0]} touchscreens</p>`;
  } else {
    const largestScreen = machines.reduce((max, m) =>
      parseFloat(m.screen) > parseFloat(max.screen) ? m : max
    );
    response += `<p>📱 <strong>Display Winner:</strong> ${largestScreen.name} has a larger ${largestScreen.screen} screen</p>`;
  }
  response += "</div>";

  response += "</div>";

  // Overall recommendation
  response += '<div class="recommendation-box">';
  response += "<h4>🎯 Our Recommendation:</h4>";

  if (speedDiff === 0 && priceDiff > 0) {
    const cheapest = machines.find((m) => m.priceValue === minPrice);
    response += `<p>Since both models have the same speed, the <strong>${cheapest.name}</strong> offers better value for money at ${cheapest.price}.</p>`;
  } else if (priceDiff === 0 && speedDiff > 0) {
    const fastest = machines.find((m) => m.speed === maxSpeed);
    response += `<p>Both cost the same, so go with the <strong>${fastest.name}</strong> for faster printing at ${fastest.speedText}!</p>`;
  } else {
    const bestValue = machines.reduce((best, current) => {
      const bestRatio = best.speed / best.priceValue;
      const currentRatio = current.speed / current.priceValue;
      return currentRatio > bestRatio ? current : best;
    });
    response += `<p>For the best speed-to-price ratio, the <strong>${bestValue.name}</strong> is your winner! It offers ${bestValue.speedText} at ${bestValue.price}.</p>`;
  }

  response += "</div>";
  response += "</div>";

  response += getQuickReplies();
  return response;
}

// Generate response with enhanced intelligence
function generateResponse(query) {
  // Handle comparison state
  if (conversationState.waitingForComparison) {
    const machines = extractModels(query);
    if (machines.length >= 2) {
      conversationState.waitingForComparison = false;
      return compareMachines(machines);
    } else if (machines.length === 1) {
      conversationState.selectedMachines.push(machines[0]);
      if (conversationState.selectedMachines.length >= 2) {
        const result = compareMachines(conversationState.selectedMachines);
        conversationState.waitingForComparison = false;
        conversationState.selectedMachines = [];
        return result;
      } else {
        return `
          <p>Got it! ${machines[0].name} added. Please tell me one more model to compare with.</p>
          <p>You can say something like "3518" or "Canon 4045"</p>
        `;
      }
    } else {
      return `
        <p>I couldn't find those models. Please try again with model numbers like:</p>
        <div class="quick-replies">
          <button class="quick-reply" data-query="compare 307 3518">307 vs 3518</button>
          <button class="quick-reply" data-query="compare 257 2518">257 vs 2518</button>
          <button class="quick-reply" data-query="compare 4045 4508">4045 vs 4508</button>
        </div>
      `;
    }
  }

  // Detect comparison intent
  if (
    query.includes("compare") ||
    query.includes("vs") ||
    query.includes("versus") ||
    query.includes("difference between")
  ) {
    const machines = extractModels(query);

    if (machines.length >= 2) {
      return compareMachines(machines);
    } else if (machines.length === 1) {
      conversationState.waitingForComparison = true;
      conversationState.selectedMachines = [machines[0]];
      return `
        <p>Great! You want to compare the ${machines[0].name}. Which other model would you like to compare it with?</p>
        <p>Just tell me the model number (e.g., "3518", "4045", "2508")</p>
        <div class="quick-replies">
          <button class="quick-reply" data-query="3518">3518</button>
          <button class="quick-reply" data-query="4508">4508</button>
          <button class="quick-reply" data-query="4045">Canon 4045</button>
        </div>
      `;
    } else {
      conversationState.waitingForComparison = true;
      return `
        <p>I'd be happy to compare machines for you! Please tell me which models you'd like to compare.</p>
        <p>You can say something like:</p>
        <ul>
          <li>"Compare 307 and 3518"</li>
          <li>"Compare Canon 4045 with Toshiba 4508"</li>
          <li>"Difference between 257 and 2518"</li>
        </ul>
        <div class="quick-replies">
          <button class="quick-reply" data-query="compare 307 3518">307 vs 3518</button>
          <button class="quick-reply" data-query="compare 257 2518">257 vs 2518</button>
          <button class="quick-reply" data-query="compare 4045 4508">4045 vs 4508</button>
        </div>
      `;
    }
  }

  // Budget-based recommendations
  if (
    query.includes("budget") ||
    query.includes("cheap") ||
    query.includes("affordable") ||
    query.includes("under")
  ) {
    const budget = query.match(/\d{6}/);
    if (budget) {
      const budgetValue = parseInt(budget[0]);
      const affordable = products
        .filter((p) => p.priceValue <= budgetValue)
        .sort((a, b) => b.speed - a.speed);

      if (affordable.length > 0) {
        let response = `<p>Based on your budget of LKR ${budgetValue.toLocaleString()}, here are your best options:</p>`;
        affordable.slice(0, 3).forEach((p) => {
          response += `
            <div class="product-card-chat">
              <h4>${p.name}</h4>
              <p><strong>Speed:</strong> ${p.speedText}</p>
              <p><strong>Price:</strong> ${p.price}</p>
              <p>${p.bestFor}</p>
            </div>
          `;
        });
        return response + getQuickReplies();
      }
    }

    const cheapest = products
      .sort((a, b) => a.priceValue - b.priceValue)
      .slice(0, 3);
    let response = `<p>Our most affordable options are:</p>`;
    cheapest.forEach((p) => {
      response += `
        <div class="product-card-chat">
          <h4>${p.name}</h4>
          <p><strong>Speed:</strong> ${p.speedText}</p>
          <p><strong>Price:</strong> ${p.price}</p>
        </div>
      `;
    });
    return response + getQuickReplies();
  }

  // Office size recommendations
  if (query.includes("small office") || query.includes("small business")) {
    return `
      <p>For small offices, I recommend these models:</p>
      <div class="product-card-chat">
        <h4>Budget Option:</h4>
        <p><strong>Toshiba e-Studio 257</strong> - LKR 240,000 (25 ppm)</p>
      </div>
      <div class="product-card-chat">
        <h4>Better Performance:</h4>
        <p><strong>Toshiba e-Studio 307</strong> - LKR 240,000 (30 ppm)</p>
      </div>
      <p>Both are perfect for 5-10 employees with moderate printing needs.</p>
      ${getQuickReplies()}
    `;
  }

  if (query.includes("medium office") || query.includes("medium business")) {
    return `
      <p>For medium offices, these models offer great performance:</p>
      <div class="product-card-chat">
        <h4>Recommended:</h4>
        <p><strong>Toshiba e-Studio 3008</strong> - LKR 290,000 (30 ppm)</p>
        <p><strong>Toshiba e-Studio 3508</strong> - LKR 290,000 (35 ppm)</p>
      </div>
      <div class="product-card-chat">
        <h4>Premium Option:</h4>
        <p><strong>Xerox 7835</strong> - LKR 300,000 (35 ppm, excellent color)</p>
      </div>
      <p>Ideal for 10-25 employees with regular printing demands.</p>
      ${getQuickReplies()}
    `;
  }

  if (
    query.includes("large office") ||
    query.includes("busy office") ||
    query.includes("high volume")
  ) {
    return `
      <p>For large offices with high-volume needs:</p>
      <div class="product-card-chat">
        <h4>Best Value:</h4>
        <p><strong>Canon IR 4045</strong> - LKR 220,000 (45 ppm) 💰</p>
      </div>
      <div class="product-card-chat">
        <h4>Toshiba Premium:</h4>
        <p><strong>e-Studio 4508</strong> - LKR 290,000 (45 ppm)</p>
        <p><strong>e-Studio 4518</strong> - LKR 300,000 (45 ppm, latest tech)</p>
      </div>
      <p>Perfect for 25+ employees with heavy daily printing.</p>
      ${getQuickReplies()}
    `;
  }

  // Speed-based recommendations
  if (
    query.includes("fast") ||
    query.includes("speed") ||
    query.includes("ppm") ||
    query.includes("quick")
  ) {
    return `
      <p>Our fastest models (45 pages per minute) are:</p>
      <div class="product-card-chat">
        <h4>🏆 Fastest Options:</h4>
        <ul>
          <li><strong>Canon IR 4045</strong> - LKR 220,000 (Best price!)</li>
          <li><strong>Toshiba e-Studio 4508</strong> - LKR 290,000</li>
          <li><strong>Toshiba e-Studio 4518</strong> - LKR 300,000 (Latest)</li>
        </ul>
      </div>
      <p>All three print at 45 ppm. The Canon offers amazing value!</p>
      <div class="quick-replies">
        <button class="quick-reply" data-query="compare 4045 4508 4518">Compare these 3</button>
        <button class="quick-reply" data-query="contact">Contact for quote</button>
      </div>
    `;
  }

  // Show all products
  if (
    query.includes("products") ||
    query.includes("all") ||
    query.includes("show") ||
    query.includes("list")
  ) {
    let response = "<p>Here are all our available photocopier models:</p>";

    // Group by price
    const grouped = {
      220000: [],
      240000: [],
      290000: [],
      300000: [],
    };

    products.forEach((p) => {
      grouped[p.priceValue].push(p);
    });

    Object.keys(grouped)
      .sort()
      .forEach((price) => {
        if (grouped[price].length > 0) {
          response += `<div class="product-card-chat"><h4>LKR ${parseInt(
            price
          ).toLocaleString()}:</h4><ul>`;
          grouped[price].forEach((p) => {
            response += `<li><strong>${p.name}</strong> - ${p.speedText}</li>`;
          });
          response += "</ul></div>";
        }
      });

    response += getQuickReplies();
    return response;
  }

  // Specific model search
  const modelMatch = findProduct(query);
  if (modelMatch) {
    return `
      <p>Here are the details for ${modelMatch.name}:</p>
      <div class="product-card-chat">
        <h4>${modelMatch.name}</h4>
        <p><strong>Brand:</strong> ${modelMatch.brand}</p>
        <p><strong>Speed:</strong> ${modelMatch.speedText}</p>
        <p><strong>Display:</strong> ${modelMatch.screen} color touchscreen</p>
        <p><strong>Key Features:</strong></p>
        <ul>
          ${modelMatch.features.map((f) => `<li>${f}</li>`).join("")}
        </ul>
        <p><strong>Best For:</strong> ${modelMatch.bestFor}</p>
        <span class="price">${modelMatch.price}</span>
      </div>
      <div class="quick-replies">
        <button class="quick-reply" data-query="compare ${
          modelMatch.model
        }">Compare with other models</button>
        <button class="quick-reply" data-query="contact">Get a quote</button>
      </div>
    `;
  }

  // Features
  if (
    query.includes("feature") ||
    query.includes("capability") ||
    query.includes("what can")
  ) {
    return `
      <p>All our photocopiers come with these standard features:</p>
      <div class="product-card-chat">
        <h4>✅ Standard Features:</h4>
        <ul>
          <li><strong>Automatic Duplex</strong> - Two-sided printing saves paper</li>
          <li><strong>Color Scanning</strong> - Fast, high-quality scanning</li>
          <li><strong>Network Ready</strong> - Print from any device</li>
          <li><strong>Touchscreen</strong> - Easy-to-use interface</li>
          <li><strong>Security</strong> - Encrypted storage for data protection</li>
          <li><strong>Warranty</strong> - All machines include warranty</li>
        </ul>
      </div>
      ${getQuickReplies()}
    `;
  }

  // Brand-specific queries
  if (query.includes("toshiba")) {
    return `
      <p>We have a comprehensive range of Toshiba e-Studio models:</p>
      <div class="product-card-chat">
        <h4>Toshiba Lineup:</h4>
        <p><strong>Entry Level (9" screen):</strong></p>
        <ul>
          <li>e-Studio 257, 307 - LKR 240,000</li>
          <li>e-Studio 2508, 3008, 3508, 4508 - LKR 290,000</li>
        </ul>
        <p><strong>Premium (10.1" screen):</strong></p>
        <ul>
          <li>e-Studio 2518, 3018, 3518, 4518 - LKR 300,000</li>
        </ul>
        <p>The 18-series features upgraded displays and latest technology!</p>
      </div>
      ${getQuickReplies()}
    `;
  }

  if (query.includes("canon")) {
    const canon = products.find((p) => p.name.includes("Canon"));
    return `
      <p>Canon IR 4045 - Our best value high-speed copier!</p>
      <div class="product-card-chat">
        <h4>${canon.name}</h4>
        <p><strong>Speed:</strong> ${canon.speedText} 🏆</p>
        <p><strong>Price:</strong> ${canon.price} 💰</p>
        <p><strong>Why choose Canon IR 4045:</strong></p>
        <ul>
          <li>Lowest price among 45 ppm models</li>
          <li>Reliable Canon quality</li>
          <li>Perfect for high-volume printing</li>
          <li>${canon.bestFor}</li>
        </ul>
      </div>
      <div class="quick-replies">
        <button class="quick-reply" data-query="compare 4045 4508">Compare with Toshiba</button>
        <button class="quick-reply" data-query="contact">Get quote</button>
      </div>
    `;
  }

  if (query.includes("xerox")) {
    const xerox = products.find((p) => p.name.includes("Xerox"));
    return `
      <p>Xerox 7835 - Premium color printing solution!</p>
      <div class="product-card-chat">
        <h4>${xerox.name}</h4>
        <p><strong>Speed:</strong> ${xerox.speedText}</p>
        <p><strong>Price:</strong> ${xerox.price}</p>
        <p><strong>Why choose Xerox 7835:</strong></p>
        <ul>
          <li>Excellent color printing quality</li>
          <li>McAfee security protection</li>
          <li>35 ppm for both color and black</li>
          <li>${xerox.bestFor}</li>
        </ul>
      </div>
      <div class="quick-replies">
        <button class="quick-reply" data-query="compare 7835 3518">Compare with Toshiba</button>
        <button class="quick-reply" data-query="contact">Get quote</button>
      </div>
    `;
  }

  // Recommendation based on needs
  if (
    query.includes("recommend") ||
    query.includes("suggest") ||
    query.includes("best") ||
    query.includes("which should")
  ) {
    return `
      <p>I'd love to recommend the perfect copier! Tell me about your needs:</p>
      <div class="quick-replies">
        <button class="quick-reply" data-query="small office">Small Office (5-10 people)</button>
        <button class="quick-reply" data-query="medium office">Medium Office (10-25 people)</button>
        <button class="quick-reply" data-query="large office">Large Office (25+ people)</button>
        <button class="quick-reply" data-query="budget 250000">Budget under 250k</button>
        <button class="quick-reply" data-query="fastest">Need fastest speed</button>
</div>
`;
  }
  // Price range
  if (query.includes("price") || query.includes("cost")) {
    return `
    <p>Our photocopiers are available in different price ranges:</p>
    <div class="product-card-chat">
      <h4>💰 Pricing Overview:</h4>
      <ul>
        <li><strong>LKR 220,000:</strong> Canon IR 4045 (45 ppm - Best value!)</li>
        <li><strong>LKR 240,000:</strong> e-Studio 257, 307 (Entry level)</li>
        <li><strong>LKR 290,000:</strong> e-Studio 2508-4508 series</li>
        <li><strong>LKR 300,000:</strong> e-Studio 2518-4518, Xerox 7835 (Premium)</li>
      </ul>
      <p>All prices include warranty!</p>
    </div>
    ${getQuickReplies()}
  `;
  }
  // Contact/support
  if (
    query.includes("contact") ||
    query.includes("call") ||
    query.includes("phone") ||
    query.includes("reach") ||
    query.includes("quote")
  ) {
    return `
    <p>📞 Ready to help you! Here's how to reach us:</p>
    <div class="product-card-chat">
      <h4>Contact Information:</h4>
      <p><strong>📞 Phone:</strong></p>
      <ul>
        <li>+94 77 837 2186</li>
        <li>+94 70 227 7266</li>
      </ul>
      <p><strong>📧 Email:</strong> jwejasooriya@gmail.com</p>
      <p><strong>📍 Location:</strong> Polgahawela, Sri Lanka</p>
      <p><strong>🕒 Hours:</strong> Monday-Saturday, 8:00 AM - 9:00 PM</p>
      <p><strong>💬 WhatsApp:</strong> Click the green button below for instant chat!</p>
    </div>
    <p>We also offer free quotes and can arrange product demonstrations!</p>
  `;
  }
  // Greetings
  if (
    query.includes("hello") ||
    query.includes("hi") ||
    query.includes("hey") ||
    query.includes("good morning") ||
    query.includes("good afternoon")
  ) {
    return `
    <p>Hello! 👋 Welcome to Sathsara Copier Tech. I'm here to help you find the perfect photocopier for your needs!</p>
    <p>What would you like to know?</p>
    ${getQuickReplies()}
  `;
  }
  // Thank you
  if (query.includes("thank") || query.includes("thanks")) {
    return `
    <p>You're welcome! 😊 Is there anything else you'd like to know about our photocopiers?</p>
    ${getQuickReplies()}
  `;
  }
  // Default response
  return `
  <p>I can help you with information about our photocopiers! Here's what I can do:</p>
  <div class="quick-replies">
    <button class="quick-reply" data-query="products">View All Products</button>
    <button class="quick-reply" data-query="compare">Compare Models</button>
    <button class="quick-reply" data-query="recommend">Get Recommendation</button>
    <button class="quick-reply" data-query="prices">Price Information</button>
    <button class="quick-reply" data-query="features">Product Features</button>
    <button class="quick-reply" data-query="contact">Contact Us</button>
  </div>
`;
}
// Quick replies helper
function getQuickReplies() {
  return `
    <div class="quick-replies">
      <button class="quick-reply" data-query="compare">Compare Models</button>
      <button class="quick-reply" data-query="recommend">Get Recommendation</button>
      <button class="quick-reply" data-query="contact">Contact Us</button>
    </div>
  `;
}
