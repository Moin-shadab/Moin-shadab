/* ==========================================================================
   MOIN SHADAB — HIGH-IMPACT NEO-BRUTALIST PORTFOLIO ENGINE (SMOOTH & STABLE)
   ========================================================================== */

(function () {
  'use strict';

  // ─── 1. GLOBAL STATE ────────────────────────────────────────────────────
  let portfolioData = null;
  let activeProjectFilter = 'All';
  let activeArchTab = 'email';
  let audioContext = null;
  let crtEnabled = false;
  let matrixActive = false;
  let currentZoom = 1.0;

  // Dino Game State
  let dinoGameRunning = false;
  let dinoScore = 0;
  let dinoHiScore = localStorage.getItem('ms_dino_hiscore') || 0;
  let dinoAnimationId = null;

  // Architecture Diagram Definitions
  const archFlows = {
    email: [
      { title: "IMAP/SMTP Stream", sub: "RFC-3501 Raw Sockets" },
      { title: "MIME Parser", sub: "Multipart Decoders" },
      { title: "MySQL Metadata", sub: "Indexed Folders & Tags" },
      { title: "CouchDB NoSQL", sub: "Raw Mail Body Docs" },
      { title: "Redis Queues", sub: "Background Workers" }
    ],
    mserp: [
      { title: "Web API / UI", sub: "Laravel REST Endpoints" },
      { title: "Pessimistic Lock", sub: "DB Transaction Shield" },
      { title: "Inventory Engine", sub: "Multi-Warehouse Sync" },
      { title: "GST Billing Core", sub: "Automated Ledger" },
      { title: "EMR & Payroll", sub: "Hospital Module" }
    ]
  };

  // Fallback default dataset
  const defaultDataset = {
    profile: {
      name: "Moin Shadab",
      handle: "moin-shadab",
      role: "Backend Engineer & Systems Architect",
      tagline: "Building high-concurrency backend software, open-source enterprise ERPs, and ground-up protocol engines.",
      location: "India",
      availability: "Available for high-impact backend & systems engineering roles",
      yearsExperience: "3+",
      projectsCompleted: "8+",
      bio: "I don't build superficial wrappers. I build raw backend platforms: an open-source enterprise ERP (MSERP) handling multi-warehouse stock, GST billing, and payroll, plus an international email engine built from scratch with raw IMAP stream sockets and a hybrid MySQL + CouchDB architecture. My code runs where failure isn't an option — backed by 2 years of industrial PLC automation discipline.",
      hobbies: ["🏃 Running", "⚽ Sports", "📚 Reading", "🍳 Cooking", "💡 Building Systems", "🔧 Hardware Tinkering"],
      github: "https://github.com/Moin-shadab",
      linkedin: "https://www.linkedin.com/in/moin-shadab-8a491b1b1/",
      email: "moinshadab.dev@gmail.com"
    },
    stats: [
      { label: "Years Experience", value: "3+", sub: "Enterprise Backend" },
      { label: "Dual DB Architecture", value: "MySQL+CouchDB", sub: "Custom Email Engine" },
      { label: "Open Source ERP", value: "MSERP", sub: "All Modules Working" },
      { label: "Protocol Engineering", value: "IMAP Sockets", sub: "Ground-Up RFC-3501" }
    ],
    experiences: [
      {
        id: "exp-1",
        company: "Advanced Microdevices Pvt. Ltd.",
        role: "Backend Developer",
        period: "2023 — Present · 3 Years",
        location: "India",
        badge: "Full-Time",
        description: "Lead backend developer for core enterprise suites. Built multi-warehouse stock controllers, hospital management systems, accounting tracking modules, and barcode inventory tools.",
        highlight: "Built an International Email Client completely from scratch with Dual-Database architecture (MySQL for relational indexing + CouchDB for NoSQL mail documents), bypassing third-party SaaS wrappers to handle raw IMAP/SMTP sockets, background queue workers, and cross-server mail delivery.",
        tags: ["PHP", "Laravel", "MySQL", "CouchDB", "IMAP Protocol", "PhonePe API", "REST APIs", "MSERP", "Barcode Tech"]
      },
      {
        id: "exp-2",
        company: "Freelance & Industrial Systems",
        role: "PLC Programmer",
        period: "2020 — 2022 · 2 Years",
        location: "India",
        badge: "Industrial",
        description: "Programmed Programmable Logic Controllers (PLCs) for manufacturing automation lines. Designed deterministic control logic under tight hardware execution limits.",
        highlight: "Engineered zero-tolerance safety interlocking logic and sensor data polling systems for factory automation lines.",
        tags: ["PLC Programming", "Industrial Control", "Ladder Logic", "Hardware Interfacing", "Automation Protocols"]
      }
    ],
    projects: [
      {
        id: "proj-mserp",
        title: "MSERP — Open Source Enterprise ERP",
        icon: "🏭",
        category: "Backend",
        featured: true,
        description: "A completely free, open-source enterprise ERP platform featuring fully functional working modules: Multi-Warehouse Inventory with pessimistic database locks, GST Billing, EMR Hospital Management, B2B CRM Pipeline, and Payroll.",
        tags: ["MSERP", "Open Source ERP", "Laravel", "MySQL", "CouchDB", "GST Billing", "Hospital Module"],
        link: "https://github.com/Moin-shadab/MSERP",
        github: "https://github.com/Moin-shadab/MSERP"
      },
      {
        id: "proj-email-client",
        title: "Dual-DB International Email Client",
        icon: "📧",
        category: "Backend",
        featured: true,
        description: "Ground-up email client built with dual database architecture: MySQL for relational metadata, indexing, and folder accounts, combined with CouchDB for NoSQL message documents and attachments. Connects directly to raw IMAP/SMTP stream sockets with MIME multi-part decoders and Redis background queues.",
        tags: ["Dual DB (MySQL+CouchDB)", "IMAP Protocol", "PHP Sockets", "MIME Parser", "Redis Queues", "NoSQL"],
        link: "https://moin-shadab.github.io/email-work-flow/",
        github: "https://github.com/Moin-shadab/email-work-flow"
      },
      {
        id: "proj-1",
        title: "DSA Master Roadmap",
        icon: "🗺️",
        category: "Web",
        featured: true,
        description: "A structured roadmap for mastering Data Structures & Algorithms. Features interactive topic stages, visual complexity cheat-sheets, problem tracks, and system design guides.",
        tags: ["Data Structures", "Algorithms", "JavaScript", "System Design"],
        link: "https://moin-shadab.github.io/dsa-roadmap/",
        github: "https://github.com/Moin-shadab/dsa-roadmap"
      },
      {
        id: "proj-2",
        title: "ATS Resume Builder",
        icon: "📄",
        category: "Tools",
        featured: false,
        description: "Browser-based resume generator tailored for Applicant Tracking Systems (ATS). Uses algorithmically optimized formatting, semantic structure, real-time preview, and pixel-perfect PDF export.",
        tags: ["JavaScript", "ATS Engine", "PDF Export", "LocalStorage UI"],
        link: "https://moin-shadab.github.io/resume-builder/",
        github: "https://github.com/Moin-shadab/resume-builder"
      },
      {
        id: "proj-4",
        title: "IMAP & PhonePe Integration Guide",
        icon: "💳",
        category: "Backend",
        featured: false,
        description: "Production-proven reference guide for two backend challenges: handling raw IMAP stream sockets securely and integrating Indian PhonePe payment gateway API with webhook verification.",
        tags: ["PhonePe API", "IMAP Protocol", "Payment Gateways", "REST Security"],
        link: "https://moin-shadab.github.io/imap-protocol-and-payment-integration-guide/",
        github: "https://github.com/Moin-shadab/imap-protocol-and-payment-integration-guide"
      },
      {
        id: "proj-5",
        title: "Synthesizer Web Piano",
        icon: "🎹",
        category: "Creative",
        featured: false,
        description: "Polyphonic browser piano powered by the Web Audio API. Supports real-time touch keyboard, pitch synthesis, keyboard mappings, and zero latency audio buffers.",
        tags: ["Web Audio API", "Polyphony", "JavaScript", "Spatial UI"],
        link: "https://moin-shadab.github.io/web-piano/",
        github: "https://github.com/Moin-shadab/web-piano"
      },
      {
        id: "proj-6",
        title: "Text to Handwriting Generator",
        icon: "✍️",
        category: "Tools",
        featured: false,
        description: "Python utility that transforms digital text into customized realistic handwritten notebook pages with line noise, natural ink variance, and custom font mapping.",
        tags: ["Python", "OpenCV", "Image Processing", "Automation"],
        link: "https://github.com/Moin-shadab/Text_To_Hand-Writing",
        github: "https://github.com/Moin-shadab/Text_To_Hand-Writing"
      },
      {
        id: "proj-7",
        title: "Interactive Birthday Wish UI",
        icon: "🎂",
        category: "Creative",
        featured: false,
        description: "Vibrant interactive celebration experience featuring canvas particle physics, confetti triggers, audio playback, and custom dynamic greeting elements.",
        tags: ["HTML5 Canvas", "Particles", "Audio FX", "CSS Animations"],
        link: "https://moin-shadab.github.io/girlfriend-friend-birthday-wish/",
        github: "https://github.com/Moin-shadab/girlfriend-friend-birthday-wish"
      }
    ],
    skills: [
      {
        category: "Backend Engineering",
        icon: "⚙️",
        items: [
          { name: "PHP 8+", level: 94, color: "#7c8cf8" },
          { name: "Laravel Framework", level: 90, color: "#f43f5e" },
          { name: "RESTful API Architecture", level: 92, color: "#06b6d4" },
          { name: "Raw IMAP / SMTP Sockets", level: 88, color: "#a855f7" },
          { name: "Queue & Background Workers", level: 86, color: "#10b981" }
        ]
      },
      {
        category: "Databases & Storage",
        icon: "🗄️",
        items: [
          { name: "MySQL / MariaDB", level: 92, color: "#f59e0b" },
          { name: "CouchDB (NoSQL)", level: 85, color: "#34d399" },
          { name: "Dual-DB Architecture", level: 90, color: "#00f0ff" },
          { name: "Redis Caching & PubSub", level: 82, color: "#ef4444" }
        ]
      },
      {
        category: "Programming Languages",
        icon: "💻",
        items: [
          { name: "JavaScript (ES6+)", level: 88, color: "#eab308" },
          { name: "Core Java", level: 80, color: "#ea580c" },
          { name: "C++ Systems", level: 75, color: "#8b5cf6" },
          { name: "Python Scripting", level: 74, color: "#10b981" }
        ]
      },
      {
        category: "Specialized Domains",
        icon: "🛡️",
        items: [
          { name: "MSERP Architecture", level: 95, color: "#00f0ff" },
          { name: "Custom Email Client Engine", level: 92, color: "#a855f7" },
          { name: "Payment Integration (PhonePe)", level: 88, color: "#10b981" },
          { name: "PLC & Industrial Automation", level: 82, color: "#f59e0b" }
        ]
      }
    ],
    codeSnippets: [
      {
        title: "MoinShadabSystemArchitecture.php",
        language: "php",
        code: `<?php\nnamespace Developer\\MoinShadab;\n\n// Complete Systems Architecture & Profile Specification\nclass SystemsArchitect {\n    public string $name = "Moin Shadab";\n    public string $role = "Backend Engineer & Systems Builder";\n    public string $email = "moinshadab.dev@gmail.com";\n    public int $yearsExperience = 3;\n\n    public array $landmarkSystems = [\n        'MSERP' => [\n            'type' => 'Open Source Enterprise ERP',\n            'modules' => ['Inventory', 'GST Billing', 'EMR Hospital', 'CRM', 'Payroll'],\n            'repo' => 'https://github.com/Moin-shadab/MSERP'\n        ],\n        'DualDbEmailEngine' => [\n            'type' => 'International Mail Client',\n            'storage' => 'MySQL (Metadata) + CouchDB (NoSQL Message Documents)',\n            'protocol' => 'Raw Stream Sockets (RFC-3501 IMAP/SMTP)'\n        ]\n    ];\n\n    public function executeCoreStack(): array {\n        return [\n            'Languages' => ['PHP 8+', 'JavaScript (ES6+)', 'C++', 'Java', 'Python'],\n            'Frameworks' => ['Laravel', 'REST APIs', 'Node'],\n            'Databases' => ['MySQL', 'CouchDB', 'Redis'],\n            'Automation' => ['PLC Ladder Logic', 'Safety Interlocks']\n        ];\n    }\n\n    public function getSystemStatus(): string {\n        return "SYSTEM_ONLINE_READY_TO_SHIP_CODE";\n    }\n}`
      },
      {
        title: "imap_socket_parser.php",
        language: "php",
        code: `<?php\nnamespace App\\Services\\Mail;\n\nclass ImapSocketClient {\n    private $stream;\n    private int $tagCount = 0;\n\n    public function connect(string $host, int $port = 993): bool {\n        $context = stream_context_create(['ssl' => ['verify_peer' => false]]);\n        $this->stream = @stream_socket_client(\n            "ssl://{$host}:{$port}", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context\n        );\n        if (!$this->stream) throw new \\RuntimeException("IMAP socket failed: {$errstr}");\n        return true;\n    }\n\n    public function fetchMessageToCouchDB(string $msgId, \\App\\Services\\CouchDbClient $couch) {\n        $rawPayload = $this->command("FETCH {$msgId} (BODY[])");\n        $parsed = \\App\\Services\\MimeParser::decode($rawPayload);\n        return $couch->insertDocument([\n            'msg_id' => $msgId,\n            'headers' => $parsed['headers'],\n            'html_body' => $parsed['html'],\n            'plain_body' => $parsed['text'],\n            'attachments' => $parsed['attachments']\n        ]);\n    }\n}`
      },
      {
        title: "MsErpCoreController.php",
        language: "php",
        code: `<?php\nnamespace App\\Http\\Controllers\\Api;\n\nuse App\\Models\\Inventory;\nuse Illuminate\\Http\\Request;\nuse Illuminate\\Support\\Facades\\DB;\n\nclass MsErpCoreController extends Controller {\n    public function deductStock(Request $req) {\n        $validated = $req->validate([\n            'sku' => 'required|string',\n            'qty' => 'required|integer|min:1'\n        ]);\n\n        return DB::transaction(function() use ($validated) {\n            $item = Inventory::where('sku', $validated['sku'])->lockForUpdate()->firstOrFail();\n            if ($item->stock_qty < $validated['qty']) {\n                return response()->json(['error' => 'Insufficient Stock'], 422);\n            }\n            $item->decrement('stock_qty', $validated['qty']);\n            return response()->json(['status' => 'MSERP_SUCCESS', 'remaining' => $item->stock_qty]);\n        });\n    }\n}`
      }
    ],
    terminalCommands: {
      "help": "Available commands:\n  • dino / play - Launch Playable Neo-Brutalist 2D Dino Runner Game!\n  • matrix      - Toggle Live Digital Matrix Rain Effect\n  • cv / ats    - Print plain-text ATS resume for job portals\n  • mserp       - Details on MSERP Open Source ERP\n  • email       - Architecture of Dual DB International Email Client\n  • projects    - List all shipped projects\n  • exp         - Show work experience history\n  • skills      - Display core technical stack\n  • bio         - Print developer manifesto\n  • contact     - Print contact handles & email\n  • stats       - Show live engineering telemetry\n  • sudo hire   - Launch hiring protocol & contact action\n  • clear       - Clear terminal buffer",
      "dino": "🎮 LAUNCHING PLAYABLE DINO RUNNER GAME...",
      "matrix": "🟢 TOGGLING MATRIX DIGITAL RAIN EFFECT...",
      "cv": "MOIN SHADAB — BACKEND DEVELOPER & SYSTEMS BUILDER\nEmail: moinshadab.dev@gmail.com | Phone/India | GitHub: github.com/Moin-shadab | LinkedIn: linkedin.com/in/moin-shadab-8a491b1b1/\n\nPROFESSIONAL SUMMARY:\nBackend Developer with 3+ years of experience building high-concurrency enterprise platforms and protocol engines. Creator of MSERP (open-source ERP) and a Dual-DB International Email Client (MySQL + CouchDB).\n\nEXPERIENCE:\n• Backend Developer @ Advanced Microdevices Pvt. Ltd. (2023 - Present)\n  - Engineered ERP modules, hospital suites, barcode inventory tools.\n  - Built Dual-DB Email Client with raw IMAP stream sockets and NoSQL CouchDB storage.\n• PLC Programmer @ Industrial Automation (2020 - 2022)\n  - Built zero-tolerance safety interlocking logic for manufacturing plants.",
      "ats": "MOIN SHADAB ATS RESUME SUMMARY:\nCore Stack: PHP 8+, Laravel, MySQL, CouchDB, Redis, JavaScript, C++, IMAP RFC-3501, REST APIs, PhonePe API.\nKey Landmark Systems: MSERP (Open Source ERP), Dual-DB International Email Engine.\nStatus: Ready to ship high-impact backend code.",
      "mserp": "MSERP — Open Source Enterprise ERP\nGitHub: https://github.com/Moin-shadab/MSERP\nModules: Inventory, GST Billing & Accounting, Hospital Suite, CRM, Payroll",
      "email": "Dual DB International Email Client\nArchitecture: MySQL (relational indexing, folders) + CouchDB (NoSQL mail documents, MIME)\nSockets: Direct IMAP/SMTP raw stream sockets (RFC-3501 compliance)",
      "bio": "Moin Shadab — Backend Developer & Systems Builder\n3+ years architecting enterprise software, creator of MSERP and ground-up Dual-DB International Email Client. Low-level PLC industrial discipline.",
      "contact": "Email: moinshadab.dev@gmail.com\nGitHub: https://github.com/Moin-shadab\nLinkedIn: https://www.linkedin.com/in/moin-shadab-8a491b1b1/\nStatus: Available for backend opportunities",
      "sudo hire": ">>> ACCESS GRANTED <<<\nExecuting hiring protocol...\nOpening direct communication path to moinshadab.dev@gmail.com!\nStatus: READY TO SHIP CODE"
    }
  };

  // ─── 2. DATA INITIALIZATION ─────────────────────────────────────────────
  async function initData() {
    const local = localStorage.getItem('ms_portfolio_data');
    if (local) {
      try {
        portfolioData = JSON.parse(local);
        renderAll();
        return;
      } catch (e) {
        // Fallback silently
      }
    }

    if (window.location.protocol === 'file:' || !window.location.protocol.startsWith('http')) {
      portfolioData = defaultDataset;
      renderAll();
      return;
    }

    try {
      const res = await fetch('./data/portfolio-data.json');
      if (res.ok) {
        portfolioData = await res.json();
      } else {
        portfolioData = defaultDataset;
      }
    } catch (err) {
      portfolioData = defaultDataset;
    }

    renderAll();
  }

  // ─── 3. DOM RENDERERS ───────────────────────────────────────────────────
  function renderAll() {
    if (!portfolioData) return;
    renderProfileInfo();
    renderHeroCodeViewer();
    renderBentoProjects();
    renderTimeline();
    renderSkills();
    renderCodeSandbox();
    renderArchVisualizer();
  }

  function renderProfileInfo() {
    const p = portfolioData.profile;
    const nameEl = document.getElementById('profile-name');
    const taglineEl = document.getElementById('profile-tagline');
    const bioEl = document.getElementById('profile-bio');
    const availEl = document.getElementById('profile-availability');

    if (nameEl) nameEl.textContent = p.name.toUpperCase();
    if (taglineEl) taglineEl.innerHTML = `Backend Developer &amp; <strong>${(p.role || '').split('& ')[1] || 'Systems Builder'}</strong>`;
    if (bioEl) bioEl.textContent = p.bio;
    if (availEl) availEl.textContent = p.availability;
  }

  function renderHeroCodeViewer() {
    const lineNumsEl = document.getElementById('hero-line-numbers');
    const textEl = document.getElementById('hero-code-text');
    const copyBtn = document.getElementById('copy-hero-code-btn');

    if (!textEl || !portfolioData.codeSnippets) return;

    const mainSnippet = portfolioData.codeSnippets[0] ? portfolioData.codeSnippets[0].code : '';
    const lines = mainSnippet.split('\n');

    if (lineNumsEl) {
      lineNumsEl.innerHTML = lines.map((_, i) => i + 1).join('<br />');
    }

    let highlighted = mainSnippet
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/(\/\/.+)/g, '<span class="php-comment">$1</span>')
      .replace(/\b(class|namespace|public|string|int|array|function|return|new)\b/g, '<span class="php-kw">$1</span>')
      .replace(/(\$[a-zA-Z0-9_]+)/g, '<span class="php-var">$1</span>')
      .replace(/("[^"]*")/g, '<span class="php-str">$1</span>')
      .replace(/('[^']*')/g, '<span class="php-str">$1</span>');

    textEl.innerHTML = highlighted;

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        playSound('click');
        navigator.clipboard.writeText(mainSnippet).then(() => {
          alert('📋 MoinShadabSystemArchitecture.php copied to clipboard!');
        });
      });
    }
  }

  function renderBentoProjects() {
    const grid = document.getElementById('bento-grid-container');
    if (!grid || !portfolioData.projects) return;

    const filtered = portfolioData.projects.filter(p => {
      if (activeProjectFilter === 'All') return true;
      return p.category === activeProjectFilter;
    });

    grid.innerHTML = filtered.map(p => {
      const colClass = p.featured ? 'col-span-8' : 'col-span-4';
      return `
        <div class="bento-card ${colClass} spatial-card" data-category="${p.category}">
          <div class="bento-icon">${p.icon || '🚀'}</div>
          <h3 class="bento-title">${p.title}</h3>
          <p class="bento-desc">${p.description}</p>
          <div class="clay-tags">
            ${(p.tags || []).map(t => `<span class="clay-tag">${t}</span>`).join('')}
          </div>
          <a href="${p.link}" target="_blank" class="bento-link">
            Explore Project ↗
          </a>
        </div>
      `;
    }).join('');

    initSpatialTilt();
  }

  function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || !portfolioData.experiences) return;

    container.innerHTML = portfolioData.experiences.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content spatial-card">
          <div class="timeline-header">
            <div>
              <div class="timeline-role">${exp.role}</div>
              <div class="timeline-co">${exp.company}</div>
            </div>
            <span class="timeline-period">${exp.period}</span>
          </div>
          <p class="timeline-desc">${exp.description}</p>
          ${exp.highlight ? `
            <div class="timeline-highlight">
              <strong>🏆 Key Engineering Achievement</strong>
              ${exp.highlight}
            </div>
          ` : ''}
          <div class="clay-tags">
            ${(exp.tags || []).map(t => `<span class="clay-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container || !portfolioData.skills) return;

    container.innerHTML = portfolioData.skills.map(cat => `
      <div class="skill-category-card spatial-card">
        <div class="sc-header">
          <span class="sc-icon">${cat.icon || '⚙️'}</span>
          <h3 class="sc-title">${cat.category}</h3>
        </div>
        ${cat.items.map(item => `
          <div class="skill-row">
            <div class="skill-info">
              <span>${item.name}</span>
              <span>${item.level}%</span>
            </div>
            <div class="skill-track">
              <div class="skill-bar" style="width: ${item.level}%; background: ${item.color || 'var(--neon-cyan)'};"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  function renderCodeSandbox() {
    const tabsContainer = document.getElementById('sandbox-tabs');
    const contentEl = document.getElementById('sandbox-code-content');
    if (!tabsContainer || !contentEl || !portfolioData.codeSnippets) return;

    const snippets = portfolioData.codeSnippets;
    tabsContainer.innerHTML = snippets.map((s, idx) => `
      <button class="sandbox-tab ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        ${s.title}
      </button>
    `).join('');

    contentEl.textContent = snippets[0] ? snippets[0].code : '';

    tabsContainer.querySelectorAll('.sandbox-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        playSound('click');
        tabsContainer.querySelectorAll('.sandbox-tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const idx = parseInt(btn.dataset.index);
        contentEl.textContent = snippets[idx] ? snippets[idx].code : '';
      });
    });
  }

  function renderArchVisualizer() {
    const container = document.getElementById('arch-flow-content');
    if (!container) return;

    const flow = archFlows[activeArchTab] || archFlows.email;
    container.innerHTML = flow.map((node, i) => `
      <div class="arch-node">
        <div class="arch-node-title">${node.title}</div>
        <div class="arch-node-sub">${node.sub}</div>
      </div>
      ${i < flow.length - 1 ? `<div class="arch-arrow">➔</div>` : ''}
    `).join('');
  }

  function initArchVisualizer() {
    const tabBtns = document.querySelectorAll('.arch-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        playSound('click');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeArchTab = btn.dataset.arch || 'email';
        renderArchVisualizer();
      });
    });
  }

  // ─── 4. INTERACTIVE DINO RUNNER 2D GAME ENGINE ─────────────────────────
  function initDinoGame() {
    const modal = document.getElementById('dino-modal');
    const closeBtn = document.getElementById('dino-close');
    const restartBtn = document.getElementById('dino-restart-btn');
    const canvas = document.getElementById('dino-canvas');
    const scoreEl = document.getElementById('dino-score');
    const hiScoreEl = document.getElementById('dino-hiscore');
    const heroDinoBtn = document.getElementById('hero-dino-btn');

    if (!canvas || !modal) return;
    const ctx = canvas.getContext('2d');

    if (hiScoreEl) hiScoreEl.textContent = dinoHiScore;

    const dino = {
      x: 50,
      y: 150,
      width: 24,
      height: 32,
      vy: 0,
      gravity: 0.7,
      jumpPower: -12,
      isGrounded: true
    };

    let obstacles = [];
    let frame = 0;
    let gameSpeed = 5;

    function openDinoModal() {
      playSound('click');
      modal.classList.add('active');
      resetGame();
    }

    if (heroDinoBtn) heroDinoBtn.addEventListener('click', openDinoModal);
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        playSound('click');
        modal.classList.remove('active');
        dinoGameRunning = false;
        if (dinoAnimationId) cancelAnimationFrame(dinoAnimationId);
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        playSound('click');
        resetGame();
      });
    }

    function jump() {
      if (dino.isGrounded && dinoGameRunning) {
        dino.vy = dino.jumpPower;
        dino.isGrounded = false;
        playSound('key');
      }
    }

    window.addEventListener('keydown', (e) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && modal.classList.contains('active')) {
        e.preventDefault();
        jump();
      }
    });

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      jump();
    });

    function resetGame() {
      dino.y = 150;
      dino.vy = 0;
      dino.isGrounded = true;
      obstacles = [];
      dinoScore = 0;
      frame = 0;
      gameSpeed = 5;
      dinoGameRunning = true;
      if (scoreEl) scoreEl.textContent = '0';
      if (dinoAnimationId) cancelAnimationFrame(dinoAnimationId);
      gameLoop();
    }

    function gameLoop() {
      if (!dinoGameRunning) return;
      frame++;

      ctx.fillStyle = '#11141f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground Line
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 182);
      ctx.lineTo(canvas.width, 182);
      ctx.stroke();

      // Update Dino Physics
      dino.vy += dino.gravity;
      dino.y += dino.vy;
      if (dino.y >= 150) {
        dino.y = 150;
        dino.vy = 0;
        dino.isGrounded = true;
      }

      // Draw Dino
      ctx.fillStyle = '#FFDE59';
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(dino.x, dino.y, dino.width, dino.height);

      // Dino Eye
      ctx.fillStyle = '#000000';
      ctx.fillRect(dino.x + 14, dino.y + 6, 4, 4);

      // Spawn Obstacles
      if (frame % 80 === 0) {
        const height = Math.floor(Math.random() * 20) + 20;
        obstacles.push({ x: canvas.width, width: 18, height });
      }

      for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        obs.x -= gameSpeed;

        ctx.fillStyle = '#FF2A85';
        ctx.fillRect(obs.x, 182 - obs.height, obs.width, obs.height);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(obs.x, 182 - obs.height, obs.width, obs.height);

        // Collision Detection
        if (
          dino.x < obs.x + obs.width &&
          dino.x + dino.width > obs.x &&
          dino.y < 182 &&
          dino.y + dino.height > 182 - obs.height
        ) {
          dinoGameRunning = false;
          playSound('click');
          if (dinoScore > dinoHiScore) {
            dinoHiScore = dinoScore;
            localStorage.setItem('ms_dino_hiscore', dinoHiScore);
            if (hiScoreEl) hiScoreEl.textContent = dinoHiScore;
          }
          ctx.fillStyle = '#FF2A85';
          ctx.font = '24px "Fira Code", monospace';
          ctx.fillText('GAME OVER!', canvas.width / 2 - 70, canvas.height / 2);
          return;
        }
      }

      if (obstacles.length > 0 && obstacles[0].x < -20) {
        obstacles.shift();
        dinoScore += 10;
        if (scoreEl) scoreEl.textContent = dinoScore;
      }

      dinoAnimationId = requestAnimationFrame(gameLoop);
    }
  }

  // ─── 5. MATRIX DIGITAL RAIN ENGINE ─────────────────────────────────────
  function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const toggleBtn = document.getElementById('toggle-matrix');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZMSERPIMAP';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    function drawMatrix() {
      if (!matrixActive) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00FF66';
      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(drawMatrix);
    }

    function toggleMatrix() {
      matrixActive = !matrixActive;
      document.body.classList.toggle('matrix-active', matrixActive);
      if (toggleBtn) toggleBtn.classList.toggle('active', matrixActive);
      playSound('click');
      if (matrixActive) drawMatrix();
    }

    if (toggleBtn) toggleBtn.addEventListener('click', toggleMatrix);
    window.toggleMatrixRain = toggleMatrix;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // ─── 6. INTERACTIVE ATS CV RESUME VIEWER ENGINE ─────────────────────────
  function initAtsCvViewer() {
    const zoomTarget = document.getElementById('cv-zoom-target');
    const zoomLevelEl = document.getElementById('cv-zoom-level');
    const zoomInBtn = document.getElementById('cv-zoom-in');
    const zoomOutBtn = document.getElementById('cv-zoom-out');
    const zoomResetBtn = document.getElementById('cv-zoom-reset');
    const copyTextBtn = document.getElementById('cv-copy-text');
    const downloadPdfBtn = document.getElementById('cv-download-pdf');
    const fullscreenBtn = document.getElementById('cv-fullscreen');
    const cvDoc = document.getElementById('ats-cv-document');

    if (!zoomTarget || !zoomLevelEl) return;

    function applyZoom(newZoom) {
      currentZoom = Math.min(Math.max(newZoom, 0.6), 1.5);
      zoomTarget.style.transform = `scale(${currentZoom})`;
      zoomLevelEl.textContent = `${Math.round(currentZoom * 100)}%`;
      playSound('key');
    }

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => applyZoom(currentZoom + 0.1));
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => applyZoom(currentZoom - 0.1));
    }
    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', () => applyZoom(1.0));
    }

    if (downloadPdfBtn) {
      downloadPdfBtn.addEventListener('click', () => {
        playSound('click');
        window.print();
      });
    }

    if (copyTextBtn) {
      copyTextBtn.addEventListener('click', () => {
        playSound('click');
        let textToCopy = '';
        if (cvDoc) {
          textToCopy = cvDoc.innerText;
        } else if (portfolioData.terminalCommands && portfolioData.terminalCommands.cv) {
          textToCopy = portfolioData.terminalCommands.cv;
        }

        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            alert('📋 ATS Resume Plain Text copied to clipboard!\n\nReady to paste directly into Microsoft, Amazon, or company job portals.');
          }).catch(() => {
            alert('CV Text: \n\n' + textToCopy);
          });
        }
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        playSound('click');
        const viewport = document.getElementById('cv-viewport-container');
        if (viewport) {
          if (!document.fullscreenElement) {
            viewport.requestFullscreen().catch(err => {
              alert(`Error attempting to enable fullscreen mode: ${err.message}`);
            });
          } else {
            document.exitFullscreen();
          }
        }
      });
    }
  }

  // ─── 7. INTERACTIVE CLI TERMINAL DRAWER ──────────────────────────────────
  function initTerminal() {
    const toggleBtn = document.getElementById('cli-toggle');
    const modal = document.getElementById('cli-modal');
    const closeBtn = document.getElementById('cli-close');
    const input = document.getElementById('cli-input');
    const output = document.getElementById('cli-output');

    if (!toggleBtn || !modal || !input || !output) return;

    toggleBtn.addEventListener('click', () => {
      playSound('click');
      modal.classList.add('active');
      input.focus();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        playSound('click');
        modal.classList.remove('active');
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        input.value = '';
        if (!cmd) return;

        appendCliLine(`moin@system:~$ ${cmd}`, 'user');
        playSound('key');

        if (cmd === 'clear') {
          output.innerHTML = '';
          return;
        }

        if (cmd === 'dino' || cmd === 'play') {
          modal.classList.remove('active');
          document.getElementById('dino-modal').classList.add('active');
          return;
        }

        if (cmd === 'matrix') {
          if (window.toggleMatrixRain) window.toggleMatrixRain();
          appendCliLine('🟢 Matrix rain mode toggled!', 'sys');
          return;
        }

        if (cmd === 'projects') {
          const list = portfolioData.projects.map(p => `  • ${p.title} (${p.category}) -> ${p.link}`).join('\n');
          appendCliLine(list, 'sys');
        } else if (cmd === 'exp') {
          const list = portfolioData.experiences.map(e => `  • ${e.role} @ ${e.company} (${e.period})`).join('\n');
          appendCliLine(list, 'sys');
        } else if (cmd === 'skills') {
          const list = portfolioData.skills.map(s => `[${s.category}]\n  ` + s.items.map(i => i.name).join(', ')).join('\n\n');
          appendCliLine(list, 'sys');
        } else if (cmd === 'json') {
          appendCliLine(JSON.stringify(portfolioData, null, 2), 'sys');
        } else if (portfolioData.terminalCommands && portfolioData.terminalCommands[cmd]) {
          appendCliLine(portfolioData.terminalCommands[cmd], 'sys');
        } else {
          appendCliLine(`Command not recognized: '${cmd}'. Type 'help', 'dino', 'matrix', or 'cv'.`, 'err');
        }

        output.scrollTop = output.scrollHeight;
      }
    });
  }

  function appendCliLine(text, type) {
    const output = document.getElementById('cli-output');
    if (!output) return;
    const line = document.createElement('div');
    line.className = `cli-line cli-${type}`;
    line.textContent = text;
    output.appendChild(line);
  }

  // ─── 8. VISUAL ADMIN STUDIO ENGINE ──────────────────────────────────────
  function initAdminStudio() {
    const trigger = document.getElementById('admin-studio-trigger');
    const modal = document.getElementById('admin-modal');
    const closeBtn = document.getElementById('admin-close');
    const exportBtn = document.getElementById('admin-export-json');
    const addProjectBtn = document.getElementById('admin-save-project');

    if (!modal) return;

    const openAdmin = () => {
      playSound('click');
      modal.classList.add('active');
    };

    if (trigger) trigger.addEventListener('click', openAdmin);

    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        openAdmin();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        playSound('click');
        modal.classList.remove('active');
      });
    }

    if (addProjectBtn) {
      addProjectBtn.addEventListener('click', () => {
        const title = document.getElementById('admin-proj-title').value;
        const icon = document.getElementById('admin-proj-icon').value || '🚀';
        const category = document.getElementById('admin-proj-category').value;
        const desc = document.getElementById('admin-proj-desc').value;
        const tags = document.getElementById('admin-proj-tags').value.split(',').map(t => t.trim()).filter(Boolean);
        const link = document.getElementById('admin-proj-link').value;

        if (!title || !desc || !link) {
          alert('Please fill in Title, Description, and Link!');
          return;
        }

        const newProj = {
          id: 'proj-' + Date.now(),
          title,
          icon,
          category,
          featured: true,
          description: desc,
          tags,
          link,
          github: link
        };

        portfolioData.projects.unshift(newProj);
        localStorage.setItem('ms_portfolio_data', JSON.stringify(portfolioData));
        renderBentoProjects();
        playSound('click');
        alert('🎉 New project added live! Click "Download JSON" to update repository.');
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "portfolio-data.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        playSound('click');
      });
    }
  }

  // ─── 9. SMOOTH SPATIAL UI 3D TILT ───────────────────────────────────────
  function initSpatialTilt() {
    const cards = document.querySelectorAll('.spatial-card, .bento-card, .landmark-card');
    cards.forEach(card => {
      let ticking = false;

      card.addEventListener('mousemove', (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            ticking = false;
          });
          ticking = true;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
      });
    });
  }

  function initSpatialCursor() {
    const cursor = document.getElementById('spatial-cursor');
    const follower = document.getElementById('spatial-cursor-follower');
    if (!cursor || !follower) return;

    let cx = -100, cy = -100;
    let fx = -100, fy = -100;

    window.addEventListener('mousemove', (e) => {
      cx = e.clientX;
      cy = e.clientY;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    });

    (function loop() {
      fx += (cx - fx) * 0.18;
      fy += (cy - fy) * 0.18;
      follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, input, select, textarea, .bento-card, .landmark-card, .timeline-content, .skeuo-btn-toggle, .sandbox-tab, .project-filter-btn, .cv-btn, .arch-tab-btn')) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, input, select, textarea, .bento-card, .landmark-card, .timeline-content, .skeuo-btn-toggle, .sandbox-tab, .project-filter-btn, .cv-btn, .arch-tab-btn')) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  // ─── 10. SYNTHETIC SOUND ENGINE & HARDWARE CONTROLS ────────────────────
  function playSound(type) {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'click') {
      osc.frequency.setValueAtTime(650, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      osc.start();
      osc.stop(audioContext.currentTime + 0.05);
    } else if (type === 'key') {
      osc.frequency.setValueAtTime(850, audioContext.currentTime);
      gain.gain.setValueAtTime(0.05, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);
      osc.start();
      osc.stop(audioContext.currentTime + 0.03);
    }
  }

  function initHardwareControls() {
    const crtBtn = document.getElementById('toggle-crt');
    const themeBtn = document.getElementById('toggle-theme');

    if (crtBtn) {
      crtBtn.addEventListener('click', () => {
        crtEnabled = !crtEnabled;
        document.body.classList.toggle('crt-enabled', crtEnabled);
        crtBtn.classList.toggle('active', crtEnabled);
        playSound('click');
      });
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeBtn.classList.toggle('active');
        playSound('click');
      });
    }
  }

  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        playSound('click');
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeProjectFilter = btn.dataset.filter || 'All';
        renderBentoProjects();
      });
    });
  }

  // Initial Load
  document.addEventListener('DOMContentLoaded', () => {
    initData();
    initSpatialCursor();
    initAtsCvViewer();
    initArchVisualizer();
    initDinoGame();
    initMatrixRain();
    initTerminal();
    initAdminStudio();
    initHardwareControls();
    initProjectFilters();
  });

})();
