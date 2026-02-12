(function() {
    // ==================== DOM Cache ====================
    const DOM = {
      header: document.getElementById('header'),
      themeToggle: document.getElementById('theme-toggle'),
      menuToggle: document.getElementById('menu-toggle'),
      nav: document.getElementById('nav'),
      navLinks: document.querySelectorAll('.nav a'),
      projectsGrid: document.getElementById('projects-grid'),
      year: document.getElementById('year'),
      modal: document.getElementById('project-modal'),
      modalOverlay: document.querySelector('.modal-overlay'),
      modalClose: document.querySelector('.modal-close'),
      modalTitle: document.getElementById('modal-title'),
      modalDescription: document.getElementById('modal-description'),
      modalImage: document.getElementById('modal-image'),
      modalTechList: document.getElementById('modal-tech-list'),
      modalLive: document.getElementById('modal-live'),
      modalGithub: document.getElementById('modal-github'),
    };
  
    const STORAGE_KEY = 'portfolio-theme';
    const DARK = 'dark';
  
    // ==================== Theme Management ====================
    const getPreferredTheme = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : '';
    };
  
    const setTheme = (theme) => {
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem(STORAGE_KEY, theme);
      updateThemeIcon(theme);
    };
  
    const updateThemeIcon = (theme) => {
      if (DOM.themeToggle) {
        DOM.themeToggle.textContent = theme === DARK ? '☀️' : '🌙';
      }
    };
  
    DOM.themeToggle?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === DARK ? '' : DARK;
      setTheme(next);
    });
  
    // ==================== Menu Toggle ====================
    DOM.menuToggle?.addEventListener('click', () => {
      const isOpen = DOM.nav?.classList.toggle('open');
      DOM.menuToggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  
    // Close menu on nav link click
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        DOM.nav?.classList.remove('open');
        DOM.menuToggle?.setAttribute('aria-expanded', 'false');
      });
    });
  
    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!DOM.header?.contains(e.target)) {
        DOM.nav?.classList.remove('open');
        DOM.menuToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  
    // ==================== Projects ====================
    const projects = [
      {
        id: 1,
        title: "Dashboard de Vendas em Tempo Real",
        description: "Painel interativo que monitora vendas em tempo real com gráficos dinâmicos, filtros avançados e exportação de relatórios. Utiliza WebSocket para atualizações em tempo real.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
        tech: ["React", "Node.js", "WebSocket", "Chart.js", "MongoDB"],
        live: "https://exemplo.com/dashboard",
        github: "https://github.com/ThiG0-bot/sales-dashboard"
      },
      {
        id: 2,
        title: "App de Tarefas com Sincronização",
        description: "Aplicação de produtividade com sincronização em tempo real entre dispositivos, categorias, prioridades e lembretes. Suporta modo offline.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
        tech: ["React Native", "Firebase", "Redux", "Expo"],
        live: "https://exemplo.com/tasks",
        github: "https://github.com/ThiG0-bot/task-app"
      },
      {
        id: 3,
        title: "E-commerce de Roupas",
        description: "Loja online completa com carrinho de compras, pagamento integrado, gerenciamento de pedidos e painel administrativo para gestão de produtos.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=300&fit=crop",
        tech: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "Tailwind"],
        live: "https://exemplo.com/shop",
        github: "https://github.com/ThiG0-bot/ecommerce"
      },
      {
        id: 4,
        title: "Plataforma de Cursos Online",
        description: "Ambiente de aprendizado com videoaulas, quizzes interativos, certificados, sistema de progressão e comunidade de usuários.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
        tech: ["React", "Express", "MongoDB", "Stripe", "Socket.io"],
        live: "https://exemplo.com/courses",
        github: "https://github.com/ThiG0-bot/learning-platform"
      },
      {
        id: 5,
        title: "API REST Escalável",
        description: "Backend robusto com autenticação JWT, rate limiting, cache distribuído, testes automatizados e documentação OpenAPI completa.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
        tech: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
        live: "https://api.exemplo.com/docs",
        github: "https://github.com/ThiG0-bot/api-rest"
      },
      {
        id: 6,
        title: "Gerador de QR Code",
        description: "Ferramenta para gerar e personalizar QR codes com opções avançadas como logo, cores e formatos diferentes. Suporta batch generation.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
        tech: ["React", "QR-Code.js", "Canvas API"],
        live: "https://exemplo.com/qrcode",
        github: "https://github.com/ThiG0-bot/qrcode-generator"
      }
    ];
  
    const renderProjects = () => {
      DOM.projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card" data-project-id="${project.id}">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy" />
          </div>
          <div class="project-body">
            <h3>${project.title}</h3>
            <p>${project.description.substring(0, 100)}...</p>
            <div class="project-tech">
              ${project.tech.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
            </div>
            <button class="project-btn" data-project-id="${project.id}">Ver Detalhes</button>
          </div>
        </article>
      `).join('');
  
      // Add event listeners to project buttons
      document.querySelectorAll('.project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const projectId = parseInt(btn.dataset.projectId);
          const project = projects.find(p => p.id === projectId);
          if (project) openModal(project);
        });
      });
    };
  
    // ==================== Modal Management ====================
    const openModal = (project) => {
      DOM.modalTitle.textContent = project.title;
      DOM.modalDescription.textContent = project.description;
      DOM.modalImage.src = project.image;
      DOM.modalImage.alt = project.title;
      DOM.modalTechList.innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');
      DOM.modalLive.href = project.live;
      DOM.modalGithub.href = project.github;
  
      DOM.modal?.classList.add('open');
      DOM.modal?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
  
    const closeModal = () => {
      DOM.modal?.classList.remove('open');
      DOM.modal?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
  
    DOM.modalClose?.addEventListener('click', closeModal);
    DOM.modalOverlay?.addEventListener('click', closeModal);
  
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  
    // ==================== Init ====================
    if (DOM.year) DOM.year.textContent = new Date().getFullYear();
    setTheme(getPreferredTheme());
    renderProjects();
  
    // ==================== Scroll Effects ====================
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        DOM.header?.style.boxShadow = 'var(--shadow)';
      } else {
        DOM.header?.style.boxShadow = 'none';
      }
    });
  
    // ==================== Smooth Scroll Anchor ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  })();