/* ==========================================================================
   MOIN SHADAB — MULTI-DESIGN PORTFOLIO ENGINE & UNIVERSAL DATA CONTROLLER
   Supports: 
   1. Neo-Brutalist Cyber (Current)
   2. Kinetic Pixel & Brutalism (Inspired by runrobrun.com)
   3. Editorial Memoir & Timeline Thread (Inspired by tej.as/story)
   ========================================================================== */

(function () {
  'use strict';

  // ─── 1. GLOBAL STATE ────────────────────────────────────────────────────
  let portfolioData = null;
  let activeDesign = 'cyber'; // 'cyber' | 'runrob' | 'story'
  let activeProjectFilter = 'All';
  let activeArchTab = 'email';
  let crtEnabled = false;
  let matrixActive = false;
  let currentZoom = 1.0;

  // Dino Game State
  let dinoGameRunning = false;
  let dinoScore = 0;
  let dinoHiScore = localStorage.getItem('ms_dino_hiscore') || 0;
  let dinoAnimationId = null;

  // Audio Synthesizer State
  let audioCtx = null;
  let isAudioPlaying = false;
  let audioInterval = null;
  let activeTrackIdx = 0;

  // Architecture Diagram Flows
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
  const fallbackData = {
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
    story: {
      headline: "The Blueprint",
      alternativeHeadline: "From Industrial Automation to Ground-Up Backend Protocol Engines",
      timeRange: "2020 — TODAY",
      lede: "I started where an unhandled condition didn't throw an HTTP 500 error — it caused a pneumatic cylinder in a physical factory line to jam. That discipline in zero-tolerance reliability, deterministic states, and hardware timing shaped my entire approach when stepping into cloud software: building open-source enterprise ERPs, dual-database storage pipelines, and raw IMAP stream socket engines.",
      chapters: [
        {
          id: "plc-2020",
          year: "2020",
          when: "Early 2020",
          title: "The Deterministic Floor",
          subtitle: "Learning safety interlocking & millisecond scan loops",
          content: "Before writing high-throughput REST APIs, my engineering sandbox was industrial control. In factory automation, you don't have the luxury of retrying an asynchronous promise if you miss a physical safety barrier. Every line of ladder logic runs in deterministic scan cycles of 5 to 20 milliseconds.",
          quote: "If a backend controller fails in production, an API returns 500. If an industrial PLC interlock fails, machinery stops or breaks. That standard never left me.",
          highlight: "Programmed Programmable Logic Controllers (PLCs) with zero-tolerance safety interlocking logic, sensor polling protocols, and discrete hardware registers.",
          tags: ["PLC Automation", "Deterministic Logic", "Hardware Interfacing", "Safety Loops"]
        },
        {
          id: "bridge-2022",
          year: "2022",
          when: "2022",
          title: "From Relays to Distributed Sockets",
          subtitle: "Bridging low-level execution with modern software architecture",
          content: "Transitioning from physical PLC logic to large-scale backend systems felt natural: memory allocation, lock contention, race conditions, and idempotent transactions are the software twins of electrical relays and interlocking switches. I dove deep into C++, Java, and PHP systems programming, obsessed with understanding what happens under the surface of frameworks.",
          quote: "Frameworks come and go, but protocols, buffer allocation, and atomic transactions remain constant.",
          highlight: "Mastered concurrency, database indexing internals, TCP/IP packet flows, and foundational Data Structures & Algorithms.",
          tags: ["C++", "Java", "Computer Science", "TCP/IP Sockets"]
        },
        {
          id: "amd-2023",
          year: "2023",
          when: "Early 2023",
          title: "Advanced Microdevices & The Enterprise Reality",
          subtitle: "Designing software where inventory mistakes cost millions",
          content: "Joining Advanced Microdevices Pvt. Ltd. as a backend developer, I took ownership of core enterprise software suites. In an industrial enterprise, inventory isn't a simple counter in a database: items move across multiple physical warehouses, get locked in transit, require GST-compliant invoicing, and integrate with barcode scanners on the factory floor.",
          quote: "A single race condition in warehouse checkout can corrupt physical stock counts across continents. Pessimistic database locks are non-negotiable.",
          highlight: "Engineered multi-warehouse inventory systems using row-level pessimistic locking, automated GST ledger calculation engines, and barcode verification pipelines.",
          tags: ["Advanced Microdevices", "Laravel", "MySQL Transactions", "Warehouse Engine"]
        },
        {
          id: "email-2023",
          year: "2023",
          when: "Late 2023",
          title: "The Dual-DB International Email Engine",
          subtitle: "Refusing SaaS wrappers: RFC-3501 IMAP sockets + Hybrid Storage",
          content: "Most web teams that need email capabilities pay for Mailgun, Sendgrid, or third-party wrappers. When tasked with building an internal international email client, I chose to construct it from first principles. I opened raw SSL stream sockets directly to remote IMAP/SMTP servers (`stream_socket_client`), hand-crafted the RFC-3501 state machine, wrote MIME multi-part chunk decoders, and designed a hybrid Dual-Database architecture.",
          quote: "MySQL manages indexed folder metadata and foreign keys; CouchDB stores unstructured JSON mail payloads and raw document attachments. Fast indexing with infinite document scalability.",
          highlight: "Built an International Email Client bypassing SaaS dependencies: raw socket streams + MySQL relational indexing + CouchDB NoSQL message documents + Redis background queue workers.",
          tags: ["IMAP RFC-3501", "Dual-DB", "MySQL + CouchDB", "Raw Sockets", "MIME Parser"]
        },
        {
          id: "mserp-2024",
          year: "2024",
          when: "2024",
          title: "MSERP: Open Source Enterprise ERP",
          subtitle: "Giving back a production-grade suite with working modules",
          content: "Commercial ERPs like SAP and Oracle charge exorbitant licensing fees, locking small manufacturing and healthcare businesses out. I architected and open-sourced MSERP — a fully functional, complete enterprise ERP platform featuring multi-warehouse inventory, double-entry GST billing, hospital management (EMR), sales pipelines, and payroll.",
          quote: "Enterprise software should not be an inaccessible fortress. MSERP proves that clean architecture, deterministic transactions, and modern backends can be completely open.",
          highlight: "Shipped MSERP on GitHub with complete working modules, test coverage, and documentation for community deployment.",
          tags: ["MSERP", "Open Source", "GST Billing", "Hospital EMR", "Laravel Enterprise"]
        },
        {
          id: "phonepe-2024",
          year: "2024",
          when: "Mid 2024",
          title: "Payment Sockets & Financial Integrity",
          subtitle: "Securing high-volume transactions with cryptographic checksums",
          content: "Integrated Indian PhonePe payment gateway API with strict SHA-256 webhook signature verification, replay attack prevention, and idempotent reconciliation routines. Published public integration reference guides to help fellow engineers handle webhook state machines without leaking transactions.",
          quote: "When money is moving across wire APIs, assume every network packet can be delayed, duplicated, or spoofed. Verify every checksum at the gate.",
          highlight: "Architected zero-drop payment processing pipelines with automatic reconciliation and published the open reference guide.",
          tags: ["PhonePe API", "Cryptographic Signatures", "Webhooks", "Payment Security"]
        },
        {
          id: "now-2026",
          year: "2026",
          when: "Present Day",
          title: "Architecting for Concurrency & Scale",
          subtitle: "Available for high-impact backend & systems engineering",
          content: "Today, I continue to push the boundaries of backend engineering — building high-concurrency systems, exploring distributed messaging, and contributing to open-source infrastructure. I bring the rare combination of low-level hardware discipline and high-level enterprise software craftsmanship to every team I join.",
          quote: "Software is only as good as its failure modes. I build systems designed to stay standing.",
          highlight: "Actively seeking ambitious backend, infrastructure, and systems engineering roles globally.",
          tags: ["High Concurrency", "Systems Architecture", "Available for Hire", "Distributed Systems"]
        }
      ],
      faqs: [
        {
          q: "Why use a Dual-Database architecture (MySQL + CouchDB) for the email engine?",
          a: "Relational databases (MySQL) excel at structured queries, foreign keys, unread counts, and folder trees. However, storing varied MIME multipart structures, arbitrary email attachments, and nested JSON payloads in relational tables causes table bloat and schema migration headaches. CouchDB provides document-level JSON storage and revision tracking, while MySQL handles lightning-fast relational queries."
        },
        {
          q: "How does your 2-year background in PLC automation benefit software engineering?",
          a: "PLC programming teaches zero-tolerance discipline: you cannot afford unhandled edge cases when physical machines are moving. It instills an instinct for deterministic states, race conditions, hardware timeouts, and sensor polling loops — all of which directly translate into building resilient, crash-proof backend systems."
        },
        {
          q: "What makes MSERP different from other open-source ERP projects?",
          a: "Many open-source ERP templates are shallow starter kits with mock data. MSERP is engineered with production-ready business logic: pessimistic database locks (`lockForUpdate`) for inventory deduction, automatic GST tax tier calculations, and full hospital EMR workflows."
        },
        {
          q: "Are you open to remote or international backend roles?",
          a: "Yes! I am available for full-time backend engineering, systems architecture, and infrastructure roles with high-impact teams across the globe."
        }
      ]
    },
    music: [
      { id: "track-1", title: "Neon Protocol", artist: "Moin Shadab", genre: "Synthwave / Cyber Arp", tempo: 120, rootNote: 220 },
      { id: "track-2", title: "Deep Socket Stream", artist: "Moin Shadab", genre: "Lo-Fi Buffer Mix", tempo: 95, rootNote: 174.61 },
      { id: "track-3", title: "Dual-DB Pulse", artist: "Moin Shadab", genre: "Ambient Systems Flow", tempo: 105, rootNote: 196 }
    ],
    toolCategories: [
      {
        name: "Backend & Core",
        tools: ["PHP 8.2+", "Laravel 10/11", "Node.js", "C++", "Java", "Python", "REST APIs", "Socket Streams"]
      },
      {
        name: "Databases & Storage",
        tools: ["MySQL", "MariaDB", "CouchDB (NoSQL)", "Redis", "Dual-DB Engine", "Pessimistic Locks"]
      },
      {
        name: "Protocols & Systems",
        tools: ["IMAP RFC-3501", "SMTP", "MIME Decoders", "TCP/IP Sockets", "PLC Ladder Logic", "PhonePe API"]
      },
      {
        name: "Infrastructure & Craft",
        tools: ["Git & GitHub", "Docker", "Linux / Bash", "Web Audio API", "HTML5 Canvas", "Performance Profiling"]
      }
    ],
    codeSnippets: [
      {
        title: "MoinShadabSystemArchitecture.php",
        language: "php",
        code: "<?php\nnamespace Developer\\MoinShadab;\n\n// Complete Systems Architecture & Profile Specification\nclass SystemsArchitect {\n    public string $name = \"Moin Shadab\";\n    public string $role = \"Backend Engineer & Systems Builder\";\n    public string $email = \"moinshadab.dev@gmail.com\";\n    public int $yearsExperience = 3;\n\n    public array $landmarkSystems = [\n        'MSERP' => [\n            'type' => 'Open Source Enterprise ERP',\n            'modules' => ['Inventory', 'GST Billing', 'EMR Hospital', 'CRM', 'Payroll'],\n            'repo' => 'https://github.com/Moin-shadab/MSERP'\n        ],\n        'DualDbEmailEngine' => [\n            'type' => 'International Mail Client',\n            'storage' => 'MySQL (Metadata) + CouchDB (NoSQL Message Documents)',\n            'protocol' => 'Raw Stream Sockets (RFC-3501 IMAP/SMTP)'\n        ]\n    ];\n\n    public function executeCoreStack(): array {\n        return [\n            'Languages' => ['PHP 8+', 'JavaScript (ES6+)', 'C++', 'Java', 'Python'],\n            'Frameworks' => ['Laravel', 'REST APIs', 'Node'],\n            'Databases' => ['MySQL', 'CouchDB', 'Redis'],\n            'Automation' => ['PLC Ladder Logic', 'Safety Interlocks']\n        ];\n    }\n\n    public function getSystemStatus(): string {\n        return \"SYSTEM_ONLINE_READY_TO_SHIP_CODE\";\n    }\n}"
      },
      {
        title: "imap_socket_parser.php",
        language: "php",
        code: "<?php\nnamespace App\\Services\\Mail;\n\nclass ImapSocketClient {\n    private $stream;\n    private int $tagCount = 0;\n\n    public function connect(string $host, int $port = 993): bool {\n        $context = stream_context_create(['ssl' => ['verify_peer' => false]]);\n        $this->stream = @stream_socket_client(\n            \"ssl://{$host}:{$port}\", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context\n        );\n        if (!$this->stream) throw new \\RuntimeException(\"IMAP socket failed: {$errstr}\");\n        return true;\n    }\n\n    public function fetchMessageToCouchDB(string $msgId, \\App\\Services\\CouchDbClient $couch) {\n        $rawPayload = $this->command(\"FETCH {$msgId} (BODY[])\");\n        $parsed = \\App\\Services\\MimeParser::decode($rawPayload);\n        return $couch->insertDocument([\n            'msg_id' => $msgId,\n            'headers' => $parsed['headers'],\n            'html_body' => $parsed['html'],\n            'plain_body' => $parsed['text'],\n            'attachments' => $parsed['attachments']\n        ]);\n    }\n}"
      }
    ],
    terminalCommands: {
      "help": "Available commands:\n  • cyber       - Switch to Neo-Brutalist Cyber layout\n  • runrob      - Switch to Kinetic Pixel (Rob Aperios style)\n  • story       - Switch to Editorial Memoir (Tejas style)\n  • dino / play - Launch Playable 2D Dino Runner Game\n  • matrix      - Toggle Live Digital Matrix Rain Effect\n  • cv / ats    - Print plain-text ATS resume\n  • mserp       - Details on MSERP Open Source ERP\n  • email       - Architecture of Dual DB Email Client\n  • projects    - List all shipped systems\n  • exp         - Show work experience history\n  • skills      - Display technical stack\n  • bio         - Print developer manifesto\n  • contact     - Print contact handles\n  • sudo hire   - Launch direct hiring protocol\n  • clear       - Clear terminal buffer",
      "dino": "🎮 LAUNCHING PLAYABLE DINO RUNNER GAME...",
      "matrix": "🟢 TOGGLING MATRIX DIGITAL RAIN EFFECT...",
      "cyber": "⚡ SWITCHING TO NEO-BRUTALIST CYBER LAYOUT...",
      "runrob": "⬛ SWITCHING TO KINETIC PIXEL LAYOUT...",
      "story": "📖 SWITCHING TO EDITORIAL STORY MEMOIR LAYOUT...",
      "cv": "MOIN SHADAB — BACKEND DEVELOPER & SYSTEMS BUILDER\nEmail: moinshadab.dev@gmail.com | India | GitHub: github.com/Moin-shadab | LinkedIn: linkedin.com/in/moin-shadab-8a491b1b1/\n\nPROFESSIONAL SUMMARY:\nBackend Developer with 3+ years experience building high-concurrency enterprise platforms and protocol engines. Creator of MSERP (open-source ERP) and a Dual-DB International Email Client (MySQL + CouchDB).\n\nEXPERIENCE:\n• Backend Developer @ Advanced Microdevices Pvt. Ltd. (2023 - Present)\n  - Engineered ERP modules, hospital suites, barcode inventory tools.\n  - Built Dual-DB Email Client with raw IMAP stream sockets and NoSQL CouchDB storage.\n• PLC Programmer @ Industrial Automation (2020 - 2022)\n  - Built zero-tolerance safety interlocking logic for manufacturing plants."
    }
  };

  // ─── 2. INITIALIZATION & DATA LOADING ──────────────────────────────────
  async function initApplication() {
    try {
      const res = await fetch('./data/portfolio-data.json');
      if (res.ok) {
        portfolioData = await res.json();
      } else {
        portfolioData = fallbackData;
      }
    } catch (e) {
      console.warn('Using local fallback dataset:', e);
      portfolioData = fallbackData;
    }

    // Determine initial design
    const urlParams = new URLSearchParams(window.location.search);
    const queryDesign = urlParams.get('design');
    const savedDesign = localStorage.getItem('ms_active_design');
    
    if (queryDesign && ['cyber', 'runrob', 'story'].includes(queryDesign)) {
      activeDesign = queryDesign;
    } else if (savedDesign && ['cyber', 'runrob', 'story'].includes(savedDesign)) {
      activeDesign = savedDesign;
    } else {
      activeDesign = 'cyber';
    }

    // Setup Components
    setupDesignSwitcher();
    setupSpatialCursor();
    setupMatrixRain();
    setupDinoGame();
    setupHackerCLI();
    setupAdminStudio();
    setupATSResumeStudio();

    // Render All 3 Views
    renderCyberView();
    renderRunRobView();
    renderStoryView();

    // Switch to active design
    switchDesign(activeDesign, false);
  }

  // ─── 3. DESIGN SWITCHER ENGINE ──────────────────────────────────────────
  function setupDesignSwitcher() {
    const switcherDock = document.getElementById('design-switcher-dock');
    if (!switcherDock) return;

    switcherDock.querySelectorAll('.switcher-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetDesign = btn.getAttribute('data-design');
        if (targetDesign && targetDesign !== activeDesign) {
          triggerPixelTransition(() => {
            switchDesign(targetDesign, true);
          });
        }
      });
    });

    const openCvBtn = document.getElementById('switcher-open-cv');
    if (openCvBtn) {
      openCvBtn.addEventListener('click', () => {
        // If on story or runrob, jump to resume section or open CV modal
        if (activeDesign !== 'cyber') {
          switchDesign('cyber', true);
          setTimeout(() => {
            const resumeEl = document.getElementById('resume');
            if (resumeEl) resumeEl.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        } else {
          const resumeEl = document.getElementById('resume');
          if (resumeEl) resumeEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  function triggerPixelTransition(callback) {
    const wipe = document.getElementById('rr-pixel-wipe');
    if (!wipe) {
      if (callback) callback();
      return;
    }

    // Populate wipe grid cells if empty
    if (wipe.children.length === 0) {
      for (let i = 0; i < 96; i++) {
        const cell = document.createElement('div');
        cell.className = 'rr-pixel-cell';
        cell.style.transitionDelay = `${(i % 12) * 0.02 + Math.floor(i / 12) * 0.025}s`;
        wipe.appendChild(cell);
      }
    }

    wipe.classList.add('active');
    setTimeout(() => {
      if (callback) callback();
      setTimeout(() => {
        wipe.classList.remove('active');
      }, 350);
    }, 280);
  }

  function switchDesign(designKey, updateUrl = true) {
    activeDesign = designKey;
    localStorage.setItem('ms_active_design', designKey);

    document.body.setAttribute('data-active-design', designKey);

    // Update views visibility
    document.querySelectorAll('.design-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`view-${designKey}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Update switcher buttons
    document.querySelectorAll('.switcher-btn').forEach(btn => {
      if (btn.getAttribute('data-design') === designKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update URL query param cleanly without reloading
    if (updateUrl && window.history.replaceState) {
      const url = new URL(window.location);
      url.searchParams.set('design', designKey);
      window.history.replaceState({}, '', url);
    }

    // Re-initialize specific view components if needed
    if (designKey === 'runrob') {
      initRunRobCanvas();
    } else if (designKey === 'story') {
      updateStoryScrollProgress();
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ─── 4. RENDER DESIGN 1: NEO-BRUTALIST CYBER ────────────────────────────
  function renderCyberView() {
    const p = portfolioData.profile;
    if (!p) return;

    // Profile elements
    const nameEl = document.getElementById('profile-name');
    if (nameEl) nameEl.textContent = p.name.toUpperCase();

    const taglineEl = document.getElementById('profile-tagline');
    if (taglineEl) taglineEl.innerHTML = `Backend Engineer &amp; <strong>${p.role}</strong>`;

    const bioEl = document.getElementById('profile-bio');
    if (bioEl) bioEl.textContent = p.bio;

    const availEl = document.getElementById('profile-availability');
    if (availEl) availEl.textContent = p.availability;

    // Hero Code Viewer
    renderHeroCodeCard();

    // Architecture Visualizer
    renderArchVisualizer(activeArchTab);
    document.querySelectorAll('.arch-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.arch-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeArchTab = btn.getAttribute('data-arch');
        renderArchVisualizer(activeArchTab);
      });
    });

    // Bento Grid Projects
    renderBentoGrid(activeProjectFilter);
    document.querySelectorAll('.project-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.project-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeProjectFilter = btn.getAttribute('data-filter');
        renderBentoGrid(activeProjectFilter);
      });
    });

    // Timeline Experience
    renderTimeline();

    // Skills Grid
    renderSkills();

    // Code Sandbox
    renderCodeSandbox();
  }

  function renderHeroCodeCard() {
    const snippet = portfolioData.codeSnippets && portfolioData.codeSnippets[0];
    if (!snippet) return;

    const lineNumsEl = document.getElementById('hero-line-numbers');
    const codeTextEl = document.getElementById('hero-code-text');
    if (!lineNumsEl || !codeTextEl) return;

    const lines = snippet.code.split('\n');
    lineNumsEl.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('');
    codeTextEl.textContent = snippet.code;

    const copyBtn = document.getElementById('copy-hero-code-btn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(snippet.code);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy Code', 2000);
      };
    }
  }

  function renderArchVisualizer(type) {
    const container = document.getElementById('arch-flow-content');
    if (!container) return;

    const items = archFlows[type] || archFlows.email;
    container.innerHTML = items.map((step, idx) => `
      <div class="arch-node">
        <div class="arch-node-num">0${idx + 1}</div>
        <div class="arch-node-title">${step.title}</div>
        <div class="arch-node-sub">${step.sub}</div>
      </div>
      ${idx < items.length - 1 ? '<div class="arch-arrow">➔</div>' : ''}
    `).join('');
  }

  function renderBentoGrid(filter) {
    const container = document.getElementById('bento-grid-container');
    if (!container || !portfolioData.projects) return;

    const filtered = filter === 'All' 
      ? portfolioData.projects 
      : portfolioData.projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    container.innerHTML = filtered.map(proj => `
      <div class="bento-card ${proj.featured ? 'featured' : ''}">
        <div class="bento-card-top">
          <div class="bento-icon">${proj.icon || '⚡'}</div>
          <span class="bento-badge">${proj.category}</span>
        </div>
        <h3 class="bento-title">${proj.title}</h3>
        <p class="bento-desc">${proj.description}</p>
        <div class="clay-tags" style="margin-bottom: 20px;">
          ${(proj.tags || []).map(t => `<span class="clay-tag">${t}</span>`).join('')}
        </div>
        <div style="display: flex; gap: 10px; margin-top: auto;">
          ${proj.link ? `<a href="${proj.link}" target="_blank" class="btn-brutal" style="flex:1; text-align:center; padding: 8px 12px; font-size: 0.8rem;">Explore Live ↗</a>` : ''}
          ${proj.github ? `<a href="${proj.github}" target="_blank" class="btn-secondary" style="padding: 8px 14px; font-size: 0.8rem;">🐙 Code</a>` : ''}
        </div>
      </div>
    `).join('');
  }

  function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || !portfolioData.experiences) return;

    container.innerHTML = portfolioData.experiences.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-role">${exp.role}</h3>
              <div class="timeline-company">${exp.company} • ${exp.location}</div>
            </div>
            <span class="timeline-badge">${exp.badge || 'Verified'}</span>
          </div>
          <div class="timeline-period">${exp.period}</div>
          <p class="timeline-desc">${exp.description}</p>
          ${exp.highlight ? `<div class="timeline-highlight"><strong>Key Landmark:</strong> ${exp.highlight}</div>` : ''}
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
      <div class="skill-category-card">
        <div class="skill-cat-header">
          <span class="skill-cat-icon">${cat.icon}</span>
          <h3 class="skill-cat-title">${cat.category}</h3>
        </div>
        <div class="skill-bars">
          ${cat.items.map(item => `
            <div class="skill-bar-group">
              <div class="skill-bar-info">
                <span>${item.name}</span>
                <span>${item.level}%</span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" style="width: ${item.level}%; background: ${item.color};"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderCodeSandbox() {
    const tabsContainer = document.getElementById('sandbox-tabs');
    const contentEl = document.getElementById('sandbox-code-content');
    if (!tabsContainer || !contentEl || !portfolioData.codeSnippets) return;

    tabsContainer.innerHTML = portfolioData.codeSnippets.map((s, idx) => `
      <button class="sandbox-tab-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        ${s.title}
      </button>
    `).join('');

    contentEl.textContent = portfolioData.codeSnippets[0].code;

    tabsContainer.querySelectorAll('.sandbox-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.sandbox-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        contentEl.textContent = portfolioData.codeSnippets[idx].code;
      });
    });
  }

  // ─── 5. RENDER DESIGN 2: KINETIC BRUTALISM & PIXEL FLOW ─────────────────
  function renderRunRobView() {
    // Flagship projects
    const flagshipGrid = document.getElementById('rr-flagship-grid');
    if (flagshipGrid && portfolioData.projects) {
      const featured = portfolioData.projects.filter(p => p.featured);
      flagshipGrid.innerHTML = featured.map(p => `
        <div class="rr-project-card">
          <div class="rr-project-header">
            <div class="rr-project-icon-box">${p.icon || '⚙️'}</div>
            <span class="rr-project-badge">FLAGSHIP ARCHITECTURE</span>
          </div>
          <div class="rr-project-body">
            <h3 class="rr-project-title">${p.title}</h3>
            <p class="rr-project-desc">${p.description}</p>
            <div class="rr-project-tags">
              ${(p.tags || []).map(t => `<span class="rr-tag-pill">${t}</span>`).join('')}
            </div>
            <div class="rr-project-footer">
              ${p.link ? `<a href="${p.link}" target="_blank" class="rr-btn-primary">Explore Architecture ↗</a>` : ''}
              ${p.github ? `<a href="${p.github}" target="_blank" class="rr-btn-ghost">GitHub Code</a>` : ''}
            </div>
          </div>
        </div>
      `).join('');
    }

    // Tools matrix
    const toolsGrid = document.getElementById('rr-tools-grid-container');
    if (toolsGrid && portfolioData.toolCategories) {
      toolsGrid.innerHTML = portfolioData.toolCategories.map(group => `
        <div class="rr-tool-group">
          <h3 class="rr-tool-group-title">
            <span class="rr-live-indicator" style="width:5px;height:5px;"></span>
            <span>${group.name}</span>
          </h3>
          <div class="rr-tool-list">
            ${group.tools.map(tool => `<span class="rr-tool-chip">${tool}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    // Selected Work Bento
    const projectsGrid = document.getElementById('rr-projects-grid-container');
    if (projectsGrid && portfolioData.projects) {
      projectsGrid.innerHTML = portfolioData.projects.map(p => `
        <div class="rr-project-card">
          <div class="rr-project-header">
            <div class="rr-project-icon-box">${p.icon || '🚀'}</div>
            <span class="rr-tag-pill">${p.category}</span>
          </div>
          <div class="rr-project-body">
            <h3 class="rr-project-title">${p.title}</h3>
            <p class="rr-project-desc">${p.description}</p>
            <div class="rr-project-tags">
              ${(p.tags || []).map(t => `<span class="rr-tag-pill">${t}</span>`).join('')}
            </div>
            <div class="rr-project-footer">
              ${p.link ? `<a href="${p.link}" target="_blank" class="rr-btn-primary">Launch Project ↗</a>` : ''}
              ${p.github ? `<a href="${p.github}" target="_blank" class="rr-btn-ghost">Source</a>` : ''}
            </div>
          </div>
        </div>
      `).join('');
    }

    // Experience List
    const expList = document.getElementById('rr-exp-list-container');
    if (expList && portfolioData.experiences) {
      expList.innerHTML = portfolioData.experiences.map(exp => `
        <div class="rr-exp-item">
          <div>
            <div class="rr-exp-period">${exp.period}</div>
            <div class="rr-exp-company">${exp.company}</div>
            <div class="rr-exp-role">${exp.role} • ${exp.location}</div>
          </div>
          <div>
            <p class="rr-exp-desc">${exp.description}</p>
            ${exp.highlight ? `<div class="rr-exp-highlight">${exp.highlight}</div>` : ''}
            <div class="rr-project-tags">
              ${(exp.tags || []).map(t => `<span class="rr-tag-pill">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }

    // Ambient Audio Synthesizer Setup
    setupAudioSynth();
  }

  // ─── 6. RENDER DESIGN 3: EDITORIAL MEMOIR & TIMELINE (TEJ.AS) ───────────
  function renderStoryView() {
    const s = portfolioData.story;
    if (!s) return;

    // Header
    const rangeEl = document.getElementById('story-header-range');
    if (rangeEl) rangeEl.textContent = s.timeRange || '2020 — TODAY';

    const titleEl = document.getElementById('story-header-title');
    if (titleEl) titleEl.textContent = s.headline || 'The Blueprint';

    const subEl = document.getElementById('story-header-subtitle');
    if (subEl) subEl.textContent = s.alternativeHeadline || '';

    const ledeEl = document.getElementById('story-header-lede');
    if (ledeEl) ledeEl.textContent = s.lede || '';

    // Timeline Rail navigation
    const railList = document.getElementById('story-rail-list');
    if (railList && s.chapters) {
      railList.innerHTML = s.chapters.map((chap, idx) => `
        <li class="story-rail-item ${idx === 0 ? 'active' : ''}" data-target="${chap.id}">
          <a href="#${chap.id}" class="story-rail-tick">
            <span class="story-rail-node"></span>
            <span class="story-rail-year">${chap.year}</span>
            <span class="story-rail-chapter-title">${chap.title}</span>
          </a>
        </li>
      `).join('');
    }

    // Chapter Narrative Content Stream
    const chaptersStream = document.getElementById('story-chapters-stream');
    if (chaptersStream && s.chapters) {
      chaptersStream.innerHTML = s.chapters.map((chap, idx) => `
        <article class="story-chapter" id="${chap.id}">
          <div class="story-chapter-meta">
            <span class="story-chapter-num">CHAPTER 0${idx + 1}</span>
            <span class="story-chapter-date">${chap.when || chap.year}</span>
          </div>
          <h2 class="story-chapter-title">${chap.title}</h2>
          <div class="story-chapter-subtitle">${chap.subtitle}</div>
          
          <div class="story-chapter-body story-dropcap">
            ${chap.content}
          </div>

          ${chap.quote ? `<blockquote class="story-quote-block">“${chap.quote}”</blockquote>` : ''}

          ${chap.highlight ? `<div class="story-highlight-pill"><strong>System Milestone:</strong> ${chap.highlight}</div>` : ''}

          <div class="story-tags-row">
            ${(chap.tags || []).map(t => `<span class="story-tag">${t}</span>`).join('')}
          </div>
        </article>
      `).join('');
    }

    // FAQs Accordion
    const faqList = document.getElementById('story-faq-list');
    if (faqList && s.faqs) {
      faqList.innerHTML = s.faqs.map(faq => `
        <div class="story-faq-item">
          <button type="button" class="story-faq-question">
            <span>${faq.q}</span>
            <span class="story-faq-chevron">▼</span>
          </button>
          <div class="story-faq-answer">
            <p>${faq.a}</p>
          </div>
        </div>
      `).join('');

      faqList.querySelectorAll('.story-faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
          const parent = btn.parentElement;
          parent.classList.toggle('open');
        });
      });
    }

    // Story Theme Toggle (Dark/Light)
    const storyThemeBtn = document.getElementById('story-theme-toggle');
    const viewStory = document.getElementById('view-story');
    if (storyThemeBtn && viewStory) {
      storyThemeBtn.addEventListener('click', () => {
        const currentTheme = viewStory.getAttribute('data-story-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        viewStory.setAttribute('data-story-theme', nextTheme);

        const iconEl = document.getElementById('story-theme-icon');
        const labelEl = document.getElementById('story-theme-label');
        if (iconEl && labelEl) {
          iconEl.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
          labelEl.textContent = nextTheme === 'dark' ? 'Light' : 'Dark';
        }
      });
    }

    // Story Scroll Progress & Timeline Rail Spy
    window.addEventListener('scroll', updateStoryScrollProgress, { passive: true });
  }

  function updateStoryScrollProgress() {
    if (activeDesign !== 'story') return;

    const progressBar = document.getElementById('story-progress-bar');
    const railProgress = document.getElementById('story-rail-progress-line');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      if (progressBar) progressBar.style.width = `${scrollPercent}%`;
      if (railProgress) railProgress.style.height = `${scrollPercent}%`;
    }

    // Active Chapter Spy
    const chapters = document.querySelectorAll('.story-chapter');
    let activeId = '';
    chapters.forEach(ch => {
      const rect = ch.getBoundingClientRect();
      if (rect.top <= 200 && rect.bottom >= 100) {
        activeId = ch.getAttribute('id');
      }
    });

    if (activeId) {
      document.querySelectorAll('.story-rail-item').forEach(item => {
        if (item.getAttribute('data-target') === activeId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  // ─── 7. AMBIENT WEB AUDIO SYNTHESIZER (ZERO COPYRIGHT AUDIO ENGINE) ──────
  function setupAudioSynth() {
    const playBtn = document.getElementById('rr-audio-play-btn');
    if (!playBtn) return;

    playBtn.onclick = () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (isAudioPlaying) {
        stopAudioSynth();
        playBtn.textContent = '▶';
        playBtn.title = 'Play Ambient Sound';
      } else {
        startAudioSynth();
        playBtn.textContent = '❚❚';
        playBtn.title = 'Pause Ambient Sound';
      }
    };
  }

  function startAudioSynth() {
    isAudioPlaying = true;
    const sticks = document.querySelectorAll('.rr-audio-bar-stick');
    sticks.forEach(s => s.classList.add('playing'));

    const chordFreqs = [
      [220, 261.63, 329.63, 392.00], // Am7
      [174.61, 220, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G
      [164.81, 196.00, 246.94, 293.66]  // Em7
    ];

    let chordIndex = 0;

    function playChord() {
      if (!isAudioPlaying || !audioCtx) return;

      const freqs = chordFreqs[chordIndex % chordFreqs.length];
      chordIndex++;

      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 1.5);
        filter.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 3.8);

        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 4.0);
      });
    }

    playChord();
    audioInterval = setInterval(playChord, 4000);
  }

  function stopAudioSynth() {
    isAudioPlaying = false;
    if (audioInterval) clearInterval(audioInterval);
    const sticks = document.querySelectorAll('.rr-audio-bar-stick');
    sticks.forEach(s => s.classList.remove('playing'));
  }

  // ─── 8. KINETIC CANVAS MORPH VISUALIZER (RUNROB) ─────────────────────────
  function initRunRobCanvas() {
    const canvas = document.getElementById('rr-morph-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth || window.innerWidth;
    let height = canvas.height = canvas.offsetHeight || 500;

    const cols = 24;
    const rows = 12;
    let time = 0;

    function render() {
      if (activeDesign !== 'runrob') return;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      const cellW = width / cols;
      const cellH = height / rows;

      for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        for (let y = 0; y <= rows; y++) {
          const wave = Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time) * 12;
          const px = x * cellW;
          const py = y * cellH + wave;

          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      time += 0.02;
      requestAnimationFrame(render);
    }

    render();
  }

  // ─── 9. SPATIAL CURSOR ──────────────────────────────────────────────────
  function setupSpatialCursor() {
    const cursor = document.getElementById('spatial-cursor');
    const follower = document.getElementById('spatial-cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
  }

  // ─── 10. MATRIX DIGITAL RAIN (SHARED) ───────────────────────────────────
  function setupMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const toggleBtn = document.getElementById('toggle-matrix');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01{}[]/*+=~_MSERP_IMAP_PHP_SQL';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
      if (!matrixActive) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(drawMatrix);
    }

    if (toggleBtn) {
      toggleBtn.onclick = () => {
        matrixActive = !matrixActive;
        canvas.style.display = matrixActive ? 'block' : 'none';
        if (matrixActive) drawMatrix();
      };
    }
  }

  // ─── 11. PLAYABLE DINO RUNNER GAME (SHARED) ─────────────────────────────
  function setupDinoGame() {
    const dinoBtn = document.getElementById('hero-dino-btn');
    const dinoModal = document.getElementById('dino-modal');
    const dinoClose = document.getElementById('dino-close');
    const restartBtn = document.getElementById('dino-restart-btn');
    const canvas = document.getElementById('dino-canvas');
    if (!dinoModal || !canvas) return;

    const ctx = canvas.getContext('2d');
    let dinoY = 140;
    let dinoVY = 0;
    let isJumping = false;
    let obstacles = [];
    let gameLoopId = null;

    function startGame() {
      dinoModal.classList.add('active');
      dinoGameRunning = true;
      dinoScore = 0;
      dinoY = 140;
      dinoVY = 0;
      obstacles = [{ x: 750, w: 20, h: 36 }];
      updateScoreUI();
      loop();
    }

    function jump() {
      if (!isJumping && dinoGameRunning) {
        dinoVY = -12;
        isJumping = true;
      }
    }

    function loop() {
      if (!dinoGameRunning) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Floor
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 170);
      ctx.lineTo(canvas.width, 170);
      ctx.stroke();

      // Physics
      dinoY += dinoVY;
      dinoVY += 0.65;
      if (dinoY >= 140) {
        dinoY = 140;
        dinoVY = 0;
        isJumping = false;
      }

      // Draw Dino (Cyber character)
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(50, dinoY, 26, 30);
      ctx.fillStyle = '#000';
      ctx.fillRect(66, dinoY + 6, 4, 4);

      // Obstacles
      ctx.fillStyle = '#ff0055';
      obstacles.forEach(obs => {
        obs.x -= 6;
        ctx.fillRect(obs.x, 170 - obs.h, obs.w, obs.h);

        // Collision Check
        if (obs.x < 76 && obs.x + obs.w > 50 && dinoY + 30 > 170 - obs.h) {
          dinoGameRunning = false;
          if (dinoScore > dinoHiScore) {
            dinoHiScore = dinoScore;
            localStorage.setItem('ms_dino_hiscore', dinoHiScore);
          }
          alert(`💥 Game Over! Your Score: ${dinoScore}`);
        }
      });

      if (obstacles.length && obstacles[0].x < -30) {
        obstacles.shift();
        dinoScore += 10;
        updateScoreUI();
      }

      if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 450) {
        if (Math.random() < 0.05) {
          obstacles.push({ x: 750, w: 20 + Math.random() * 15, h: 25 + Math.random() * 20 });
        }
      }

      dinoScore++;
      updateScoreUI();
      gameLoopId = requestAnimationFrame(loop);
    }

    function updateScoreUI() {
      const s = document.getElementById('dino-score');
      const hi = document.getElementById('dino-hiscore');
      if (s) s.textContent = Math.floor(dinoScore / 5);
      if (hi) hi.textContent = Math.floor(dinoHiScore / 5);
    }

    if (dinoBtn) dinoBtn.onclick = startGame;
    if (dinoClose) dinoClose.onclick = () => {
      dinoModal.classList.remove('active');
      dinoGameRunning = false;
      if (gameLoopId) cancelAnimationFrame(gameLoopId);
    };
    if (restartBtn) restartBtn.onclick = startGame;

    window.addEventListener('keydown', (e) => {
      if (dinoGameRunning && (e.code === 'Space' || e.code === 'ArrowUp')) {
        e.preventDefault();
        jump();
      }
    });

    canvas.addEventListener('touchstart', jump);
    canvas.addEventListener('mousedown', jump);
  }

  // ─── 12. HACKER CLI SHELL (SHARED) ──────────────────────────────────────
  function setupHackerCLI() {
    const cliModal = document.getElementById('cli-modal');
    const cliToggle = document.getElementById('cli-toggle-btn');
    const footerCliToggle = document.getElementById('cli-toggle');
    const cliClose = document.getElementById('cli-close');
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');
    if (!cliModal || !cliInput || !cliOutput) return;

    function openCLI() {
      cliModal.classList.add('active');
      cliInput.focus();
    }

    function closeCLI() {
      cliModal.classList.remove('active');
    }

    if (cliToggle) cliToggle.onclick = openCLI;
    if (footerCliToggle) footerCliToggle.onclick = openCLI;
    if (cliClose) cliClose.onclick = closeCLI;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cliModal.classList.contains('active')) {
        closeCLI();
      }
    });

    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = cliInput.value.trim().toLowerCase();
        cliInput.value = '';

        const cmdLine = document.createElement('div');
        cmdLine.className = 'cli-line';
        cmdLine.innerHTML = `<span style="color:#00ff66;">moin@system:~$</span> ${cmd}`;
        cliOutput.appendChild(cmdLine);

        handleCLICommand(cmd, cliOutput);
        cliOutput.scrollTop = cliOutput.scrollHeight;
      }
    });
  }

  function handleCLICommand(cmd, outputEl) {
    const resLine = document.createElement('div');
    resLine.className = 'cli-line';

    if (cmd === 'clear') {
      outputEl.innerHTML = '';
      return;
    }

    if (cmd === 'cyber') {
      switchDesign('cyber', true);
      resLine.textContent = '⚡ Switched to Neo-Brutalist Cyber layout.';
    } else if (cmd === 'runrob') {
      switchDesign('runrob', true);
      resLine.textContent = '⬛ Switched to Kinetic Pixel layout.';
    } else if (cmd === 'story') {
      switchDesign('story', true);
      resLine.textContent = '📖 Switched to Editorial Story Memoir layout.';
    } else if (cmd === 'dino' || cmd === 'play') {
      resLine.textContent = '🎮 Launching Dino Runner...';
      const dinoModal = document.getElementById('dino-modal');
      if (dinoModal) dinoModal.classList.add('active');
    } else if (cmd === 'matrix') {
      const toggleBtn = document.getElementById('toggle-matrix');
      if (toggleBtn) toggleBtn.click();
      resLine.textContent = '🟢 Toggled Matrix rain overlay.';
    } else if (portfolioData.terminalCommands && portfolioData.terminalCommands[cmd]) {
      resLine.textContent = portfolioData.terminalCommands[cmd];
    } else {
      resLine.textContent = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    outputEl.appendChild(resLine);
  }

  // ─── 13. VISUAL DATA STUDIO ADMIN (SHARED) ──────────────────────────────
  function setupAdminStudio() {
    const adminModal = document.getElementById('admin-modal');
    const adminTrigger = document.getElementById('admin-studio-trigger');
    const footerAdminBtn = document.getElementById('footer-admin-btn');
    const adminClose = document.getElementById('admin-close');
    const saveBtn = document.getElementById('admin-save-project');
    const exportBtn = document.getElementById('admin-export-json');
    if (!adminModal) return;

    function openAdmin() { adminModal.classList.add('active'); }
    function closeAdmin() { adminModal.classList.remove('active'); }

    if (adminTrigger) adminTrigger.onclick = openAdmin;
    if (footerAdminBtn) footerAdminBtn.onclick = openAdmin;
    if (adminClose) adminClose.onclick = closeAdmin;

    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        openAdmin();
      }
    });

    if (saveBtn) {
      saveBtn.onclick = () => {
        const title = document.getElementById('admin-proj-title').value.trim();
        const icon = document.getElementById('admin-proj-icon').value.trim() || '⚡';
        const category = document.getElementById('admin-proj-category').value;
        const desc = document.getElementById('admin-proj-desc').value.trim();
        const tags = document.getElementById('admin-proj-tags').value.split(',').map(t => t.trim()).filter(Boolean);
        const link = document.getElementById('admin-proj-link').value.trim();

        if (!title || !desc) {
          alert('Please provide at least a project title and description.');
          return;
        }

        const newProj = {
          id: `proj-${Date.now()}`,
          title,
          icon,
          category,
          featured: false,
          description: desc,
          tags: tags.length ? tags : ['Backend', 'Custom System'],
          link: link || '#'
        };

        if (!portfolioData.projects) portfolioData.projects = [];
        portfolioData.projects.unshift(newProj);

        // Re-render views live
        renderBentoGrid(activeProjectFilter);
        renderRunRobView();

        alert(`✅ Project "${title}" rendered live across all designs!`);
        closeAdmin();
      };
    }

    if (exportBtn) {
      exportBtn.onclick = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", "portfolio-data.json");
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
      };
    }
  }

  // ─── 14. ATS RESUME CONTROLS (SHARED) ───────────────────────────────────
  function setupATSResumeStudio() {
    const zoomIn = document.getElementById('cv-zoom-in');
    const zoomOut = document.getElementById('cv-zoom-out');
    const zoomReset = document.getElementById('cv-zoom-reset');
    const zoomLevel = document.getElementById('cv-zoom-level');
    const zoomTarget = document.getElementById('cv-zoom-target');
    const copyTextBtn = document.getElementById('cv-copy-text');
    const downloadPdfBtn = document.getElementById('cv-download-pdf');

    if (zoomIn && zoomOut && zoomTarget && zoomLevel) {
      zoomIn.onclick = () => {
        currentZoom = Math.min(1.5, currentZoom + 0.1);
        zoomTarget.style.transform = `scale(${currentZoom})`;
        zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
      };
      zoomOut.onclick = () => {
        currentZoom = Math.max(0.6, currentZoom - 0.1);
        zoomTarget.style.transform = `scale(${currentZoom})`;
        zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
      };
      zoomReset.onclick = () => {
        currentZoom = 1.0;
        zoomTarget.style.transform = 'scale(1)';
        zoomLevel.textContent = '100%';
      };
    }

    if (copyTextBtn) {
      copyTextBtn.onclick = () => {
        const doc = document.getElementById('ats-cv-document');
        if (doc) {
          navigator.clipboard.writeText(doc.innerText);
          copyTextBtn.textContent = '✅ Copied ATS Text!';
          setTimeout(() => copyTextBtn.textContent = '📋 Copy ATS Text', 2000);
        }
      };
    }

    if (downloadPdfBtn) {
      downloadPdfBtn.onclick = () => {
        window.print();
      };
    }
  }

  // ─── RUN ENGINE ON DOM LOAD ─────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApplication);
  } else {
    initApplication();
  }

})();
