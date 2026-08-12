/* ==========================================================================
   MOIN SHADAB — CYBER HACKER & BACKEND DEVELOPER PORTFOLIO ENGINE
   Features:
   - Dynamic JSON Renderer & LocalStorage Overrides
   - Zero-Code Visual Admin Studio (Add/Edit Projects, Exp, Skills & Export JSON)
   - Interactive Hacker Command Line (CLI Terminal Drawer)
   - Spatial 3D Tilt Physics & Liquid Glass Shimmer Tracking
   - Synthetic Web Audio API Tactile Sound Feedback
   ========================================================================== */

(function () {
  'use strict';

  // ─── 1. GLOBAL STATE & DEFAULT DATASET ──────────────────────────────────
  let portfolioData = null;
  let activeProjectFilter = 'All';
  let audioContext = null;
  let crtEnabled = false;

  // Fallback default dataset (ensures instant offline/file:// rendering)
  const defaultDataset = {
    profile: {
      name: "Moin Shadab",
      handle: "moin-shadab",
      role: "Backend Developer & Systems Builder",
      tagline: "Architecting mission-critical backend infrastructure, custom protocol handlers, and enterprise platforms.",
      location: "India",
      availability: "Available for high-impact backend & systems engineering roles",
      yearsExperience: "3+",
      projectsCompleted: "7+",
      bio: "Backend Developer at Advanced Microdevices Pvt. Ltd. with 3+ years of experience architecting enterprise software—from hospital management suites and accounting platforms to full-scale ERP systems built from scratch. Specializes in low-level protocol engineering, including a ground-up International Email Client using raw IMAP sockets, queue workers, and MIME parsers. Former PLC programmer with deep industrial systems discipline.",
      hobbies: ["🏃 Running", "⚽ Sports", "📚 Reading", "🍳 Cooking", "💡 Building Systems", "🔧 Hardware Tinkering"],
      github: "https://github.com/Moin-shadab",
      linkedin: "https://www.linkedin.com/in/moin-shadab-8a491b1b1/",
      email: "moinshadab.dev@gmail.com"
    },
    stats: [
      { label: "Years Experience", value: "3+", sub: "Enterprise Backend" },
      { label: "Shipped Projects", value: "7+", sub: "Live & Production" },
      { label: "Industrial PLC", value: "2 Yrs", sub: "Automation Logic" },
      { label: "Protocol Engineering", value: "IMAP", sub: "Raw Socket Client" }
    ],
    experiences: [
      {
        id: "exp-1",
        company: "Advanced Microdevices Pvt. Ltd.",
        role: "Backend Developer",
        period: "2023 — Present · 3 Years",
        location: "India",
        badge: "Full-Time",
        description: "Architect and lead backend developer for enterprise-grade applications. Engineered custom ERP modules, hospital management systems, accounting tracking platforms, and barcode inventory software optimized for high-concurrency legacy systems.",
        highlight: "Engineered an International Email Client from scratch—bypassing third-party SaaS wrappers to handle raw IMAP/SMTP protocol sockets, stream parsing, background queue workers, and cross-server mail delivery.",
        tags: ["PHP", "Laravel", "MySQL", "CouchDB", "IMAP Protocol", "PhonePe API", "REST APIs", "ERP Systems", "Barcode Tech"]
      },
      {
        id: "exp-2",
        company: "Freelance & Industrial Systems",
        role: "PLC Programmer",
        period: "2020 — 2022 · 2 Years",
        location: "India",
        badge: "Industrial",
        description: "Programmed Programmable Logic Controllers (PLCs) for manufacturing and industrial automation line logic. Built deterministic, high-reliability control routines operating under strict hardware constraints.",
        highlight: "Developed zero-tolerance safety interlocking logic and sensor data polling systems for factory automation lines.",
        tags: ["PLC Programming", "Industrial Control", "Ladder Logic", "Hardware Interfacing", "Automation Protocols"]
      }
    ],
    projects: [
      {
        id: "proj-1",
        title: "DSA Master Roadmap",
        icon: "🗺️",
        category: "Web",
        featured: true,
        description: "A comprehensive, structured roadmap for mastering Data Structures & Algorithms. Features interactive topic stages, visual complexity cheat-sheets, problem tracks, and interview preparation guides.",
        tags: ["Data Structures", "Algorithms", "JavaScript", "System Design"],
        link: "https://moin-shadab.github.io/dsa-roadmap/",
        github: "https://github.com/Moin-shadab/dsa-roadmap"
      },
      {
        id: "proj-2",
        title: "ATS Resume Builder",
        icon: "📄",
        category: "Tools",
        featured: true,
        description: "Browser-based resume generator tailored for Applicant Tracking Systems (ATS). Uses algorithmically optimized formatting, semantic structure, real-time preview, and pixel-perfect PDF export.",
        tags: ["JavaScript", "ATS Engine", "PDF Export", "LocalStorage UI"],
        link: "https://moin-shadab.github.io/resume-builder/",
        github: "https://github.com/Moin-shadab/resume-builder"
      },
      {
        id: "proj-3",
        title: "Custom IMAP Email Engine Flow",
        icon: "📧",
        category: "Backend",
        featured: true,
        description: "Interactive technical architectural flow explaining ground-up email client creation using raw IMAP sockets, asynchronous queues, stream decoders, and MIME message parsers.",
        tags: ["IMAP Protocol", "PHP Backend", "Socket API", "Queue Workers"],
        link: "https://moin-shadab.github.io/email-work-flow/",
        github: "https://github.com/Moin-shadab/email-work-flow"
      },
      {
        id: "proj-4",
        title: "IMAP & PhonePe Integration Guide",
        icon: "💳",
        category: "Backend",
        featured: false,
        description: "Production-proven reference guide for two backend challenges: handling raw IMAP connections securely and integrating Indian PhonePe payment gateway API with webhook verification.",
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
          { name: "CouchDB (NoSQL)", level: 80, color: "#34d399" },
          { name: "Redis Caching & PubSub", level: 82, color: "#ef4444" },
          { name: "Database Indexing & Query Tuning", level: 88, color: "#3b82f6" }
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
          { name: "ERP & Enterprise Software", level: 94, color: "#06b6d4" },
          { name: "Payment Integration (PhonePe)", level: 88, color: "#10b981" },
          { name: "PLC & Industrial Automation", level: 82, color: "#f59e0b" },
          { name: "AI Prompt Engineering", level: 86, color: "#ec4899" }
        ]
      }
    ],
    codeSnippets: [
      {
        title: "imap_socket_parser.php",
        language: "php",
        code: `<?php\nnamespace App\\Services\\Mail;\n\nclass ImapSocketClient {\n    private $stream;\n    private int $tagCount = 0;\n\n    public function connect(string $host, int $port = 993): bool {\n        $context = stream_context_create(['ssl' => ['verify_peer' => false]]);\n        $this->stream = @stream_socket_client(\n            "ssl://{$host}:{$port}", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context\n        );\n        if (!$this->stream) throw new \\RuntimeException("IMAP connection failed: {$errstr}");\n        return true;\n    }\n\n    public function command(string $cmd): array {\n        $tag = 'A' . sprintf('%04d', ++$this->tagCount);\n        fwrite($this->stream, "{$tag} {$cmd}\\r\\n");\n        $response = [];\n        while ($line = fgets($this->stream)) {\n            $response[] = rtrim($line);\n            if (str_starts_with($line, "{$tag} OK")) break;\n        }\n        return $response;\n    }\n}`
      },
      {
        title: "ErpInventoryController.php",
        language: "php",
        code: `<?php\nnamespace App\\Http\\Controllers\\Api;\n\nuse App\\Models\\Inventory;\nuse Illuminate\\Http\\Request;\nuse Illuminate\\Support\\Facades\\DB;\n\nclass ErpInventoryController extends Controller {\n    public function deductStock(Request $req) {\n        $validated = $req->validate([\n            'sku' => 'required|string',\n            'qty' => 'required|integer|min:1'\n        ]);\n\n        return DB::transaction(function() use ($validated) {\n            $item = Inventory::where('sku', $validated['sku'])->lockForUpdate()->firstOrFail();\n            if ($item->stock_qty < $validated['qty']) {\n                return response()->json(['error' => 'Insufficient Stock'], 422);\n            }\n            $item->decrement('stock_qty', $validated['qty']);\n            return response()->json(['status' => 'SUCCESS', 'remaining' => $item->stock_qty]);\n        });\n    }\n}`
      },
      {
        title: "plc_ladder_interlock.cpp",
        language: "cpp",
        code: `// Industrial PLC Motor Interlock Logic\n#include <iostream>\n\nstruct SafetySensors {\n    bool emergencyStop;\n    bool thermalOverload;\n    bool pressureOk;\n};\n\nbool evaluateMotorRunPermission(SafetySensors s, bool startCmd) {\n    bool safetyChain = (!s.emergencyStop) && (!s.thermalOverload) && s.pressureOk;\n    static bool motorLatched = false;\n    \n    if (!safetyChain) {\n        motorLatched = false; // Tripped\n    } else if (startCmd) {\n        motorLatched = true; // Latched ON\n    }\n    return motorLatched;\n}`
      }
    ],
    terminalCommands: {
      "help": "Available commands:\n  • projects  - List all shipped projects\n  • exp       - Show work experience history\n  • skills    - Display core technical stack\n  • bio       - Print developer manifesto\n  • contact   - Print contact handles & email\n  • stats     - Show live engineering telemetry\n  • sudo hire - Launch hiring protocol & contact action\n  • json      - View full raw portfolio dataset\n  • clear     - Clear terminal buffer",
      "bio": "Moin Shadab — Backend Developer & Systems Builder\n3+ years architecting enterprise software, ERP platforms, custom IMAP mail clients, and payment solutions. Grounded in low-level PLC automation discipline.",
      "contact": "Email: moinshadab.dev@gmail.com\nGitHub: https://github.com/Moin-shadab\nLinkedIn: https://www.linkedin.com/in/moin-shadab-8a491b1b1/\nStatus: Available for backend opportunities",
      "sudo hire": ">>> ACCESS GRANTED <<<\nExecuting hiring protocol...\nOpening direct communication path to moinshadab.dev@gmail.com!\nStatus: READY TO SHIP CODE"
    }
  };

  // ─── 2. DATA INITIALIZATION ─────────────────────────────────────────────
  async function initData() {
    // Check LocalStorage overrides first (user edited via Admin Studio)
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

    // On local file:// protocol, avoid browser CORS fetch errors completely
    if (window.location.protocol === 'file:' || !window.location.protocol.startsWith('http')) {
      portfolioData = defaultDataset;
      renderAll();
      return;
    }

    // On HTTP / HTTPS (GitHub Pages live environment), fetch portfolio-data.json
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
    renderStats();
    renderBentoProjects();
    renderTimeline();
    renderSkills();
    renderCodeSandbox();
  }

  function renderProfileInfo() {
    const p = portfolioData.profile;
    const nameEl = document.getElementById('profile-name');
    const taglineEl = document.getElementById('profile-tagline');
    const bioEl = document.getElementById('profile-bio');
    const availEl = document.getElementById('profile-availability');

    if (nameEl) nameEl.textContent = p.name;
    if (taglineEl) taglineEl.innerHTML = `Backend Developer &amp; <strong>${p.role.split('& ')[1] || 'Systems Builder'}</strong>`;
    if (bioEl) bioEl.textContent = p.bio;
    if (availEl) availEl.textContent = p.availability;
  }

  function renderStats() {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer || !portfolioData.stats) return;

    statsContainer.innerHTML = portfolioData.stats.map(s => `
      <div class="telemetry-cell">
        <div class="telemetry-val">${s.value}</div>
        <div class="telemetry-lbl">${s.label}</div>
      </div>
    `).join('');
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

    // Re-attach spatial tilt tracking
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
              <div class="skill-bar" style="width: ${item.level}%; background: ${item.color || 'var(--accent-cyan)'};"></div>
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
      btn.addEventListener('click', (e) => {
        playSound('click');
        tabsContainer.querySelectorAll('.sandbox-tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const idx = parseInt(btn.dataset.index);
        contentEl.textContent = snippets[idx] ? snippets[idx].code : '';
      });
    });
  }

  // ─── 4. INTERACTIVE CLI TERMINAL DRAWER ──────────────────────────────────
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

    closeBtn.addEventListener('click', () => {
      playSound('click');
      modal.classList.remove('active');
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
          appendCliLine(`Command not recognized: '${cmd}'. Type 'help' for available commands.`, 'err');
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

  // ─── 5. VISUAL ADMIN STUDIO ENGINE ──────────────────────────────────────
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

    // Global keyboard shortcut: Ctrl + Shift + E
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

    // Save New Project from Admin Form
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
        alert('🎉 New project added and rendered live! Click "Download JSON" to save to repository.');
      });
    }

    // Export Updated JSON File for GitHub
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

  // ─── 6. SPATIAL UI 3D TILT & MOUSE PHYSICS ──────────────────────────────
  function initSpatialTilt() {
    const cards = document.querySelectorAll('.spatial-card, .bento-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
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
      fx += (cx - fx) * 0.15;
      fy += (cy - fy) * 0.15;
      follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();

    // Event delegation for hover states on all interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, input, select, textarea, .bento-card, .timeline-content, .skeuo-btn-toggle, .sandbox-tab, .project-filter-btn')) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, input, select, textarea, .bento-card, .timeline-content, .skeuo-btn-toggle, .sandbox-tab, .project-filter-btn')) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  // ─── 7. SYNTHETIC SOUND ENGINE & CONTROLS ──────────────────────────────
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
      osc.frequency.setValueAtTime(600, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      osc.start();
      osc.stop(audioContext.currentTime + 0.05);
    } else if (type === 'key') {
      osc.frequency.setValueAtTime(800, audioContext.currentTime);
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

  // Project Category Filters
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
    initTerminal();
    initAdminStudio();
    initHardwareControls();
    initProjectFilters();
  });

})();
