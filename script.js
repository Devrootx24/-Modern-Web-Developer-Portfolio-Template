// Rahul Ali Portfolio - Standalone Script
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. THEME SWITCHER ---
  const themeToggleDesktop = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // --- 2. NAVBAR SCROLL & MOBILE MENU ---
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // --- 3. CUSTOM CURSOR ---
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (window.innerWidth > 768) {
    document.body.classList.add('cursor-none');
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorRing.style.left = `${e.clientX}px`;
      cursorRing.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button, input, select, textarea, .glass-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });
  }

  // --- 4. TYPED TEXT ANIMATION ---
  const typedTextEl = document.getElementById('typed-text');
  const phrases = [
    "building digital experiences...",
    "designing interfaces...",
    "editing stories...",
    "growing brands..."
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
      typedTextEl.textContent = "> " + currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedTextEl.textContent = "> " + currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(typeLoop, typeSpeed);
  }
  typeLoop();

  // --- 5. SKILLS TABS ---
  const skillsData = {
    dev: [
      { name: 'HTML5 / CSS3', level: 95, tools: 'Flexbox, Grid, Animations', desc: 'Semantic, accessible, and responsive layouts.' },
      { name: 'JavaScript', level: 90, tools: 'ES6+, React, DOM', desc: 'Interactive logic and modern web frameworks.' },
      { name: 'Databases', level: 80, tools: 'SQL, MySQL', desc: 'Data structure and backend querying.' },
      { name: 'Version Control', level: 85, tools: 'Git, GitHub', desc: 'Collaborative code management.' }
    ],
    design: [
      { name: 'UI / UX Design', level: 90, tools: 'Figma, Adobe XD', desc: 'Creating intuitive user interfaces.' },
      { name: 'Graphic Design', level: 85, tools: 'Photoshop, Illustrator', desc: 'Branding and visual identity.' },
      { name: 'Thumbnail Design', level: 95, tools: 'Photoshop', desc: 'High-conversion Youtube thumbnails.' }
    ],
    media: [
      { name: 'Video Editing', level: 85, tools: 'Premiere Pro, After Effects', desc: 'Cinematic edits and motion graphics.' },
      { name: 'Digital Marketing', level: 80, tools: 'SEO, Social Media', desc: 'Audience growth and brand strategy.' },
      { name: 'AI Integration', level: 90, tools: 'ChatGPT, Antigravity, GenAI', desc: 'AI-assisted development and workflows.' }
    ]
  };

  const skillsContainer = document.getElementById('skills-container');
  const skillTabs = document.querySelectorAll('.skill-tab');

  function renderSkills(category) {
    skillsContainer.innerHTML = skillsData[category].map(s => `
      <div class="skill-card glass-card">
        <div class="skill-header">
          <h3 class="skill-name">${s.name}</h3>
          <span class="skill-level">${s.level}%</span>
        </div>
        <div class="skill-progress-bar">
          <div class="skill-progress" style="width: ${s.level}%"></div>
        </div>
        <div class="skill-details">
          <p class="skill-desc">${s.desc}</p>
          <div class="skill-tools"><span class="mono-text">Tools:</span> ${s.tools}</div>
        </div>
      </div>
    `).join('');
  }

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSkills(tab.getAttribute('data-category'));
    });
  });
  renderSkills('dev');

  // --- 6. PROJECTS FILTERING ---
  const projectsData = [
    { id: 1, title: 'Nexus SaaS Dashboard', category: 'Web', desc: 'A futuristic analytics dashboard for SaaS companies featuring real-time data visualization.', tech: ['React', 'D3.js'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'SynthWave Identity', category: 'Design', desc: 'Complete branding package including logo and typography for a music agency.', tech: ['Illustrator', 'Photoshop'], image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'AI Code Assistant', category: 'AI', desc: 'An AI-powered development tool that helps write and debug code.', tech: ['OpenAI API', 'Python'], image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Tech Review Series', category: 'Video', desc: 'Cinematic YouTube video editing with dynamic motion graphics.', tech: ['Premiere Pro', 'After Effects'], image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'Growth Campaign', category: 'Marketing', desc: 'Digital marketing campaign increasing conversion rate by 150%.', tech: ['SEO', 'Analytics'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    { id: 6, title: 'Cyberpunk Portfolio', category: 'Web', desc: 'Immersive portfolio website featuring WebGL graphics.', tech: ['Three.js', 'HTML5'], image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80' }
  ];

  const projectsContainer = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProjects(filterCategory) {
    const filtered = filterCategory === 'All' ? projectsData : projectsData.filter(p => p.category === filterCategory);
    projectsContainer.innerHTML = filtered.map(p => `
      <div class="project-card glass-card">
        <div class="project-image">
          <img src="${p.image}" alt="${p.title}" />
        </div>
        <div class="project-content">
          <span class="project-category">${p.category}</span>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-tech">
            ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });
  renderProjects('All');

  // --- 7. CREATIVE SHOWCASE & LIGHTBOX ---
  const creativeItems = [
    { id: 1, title: 'Cyberpunk Poster Artwork', category: 'Graphic Design', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80', desc: 'Futuristic poster artwork with vibrant neon typography.' },
    { id: 2, title: 'High-CTR YouTube Thumbnails', category: 'Graphic Design', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', desc: 'Eye-catching thumbnail designs crafted for tech channels.' },
    { id: 3, title: 'Cinematic Reel Editing', category: 'Video Editing', url: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80', desc: 'Fast-paced short form video with custom sound design.' },
    { id: 4, title: 'Social Media Growth Visuals', category: 'Digital Marketing', url: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80', desc: 'Campaign visuals and analytics growth metric breakdown.' }
  ];

  const creativeContainer = document.getElementById('creative-container');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxMedia = document.getElementById('lightbox-media');
  const lightboxCat = document.getElementById('lightbox-cat');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');

  creativeContainer.innerHTML = creativeItems.map(item => `
    <div class="creative-card glass-card" data-id="${item.id}">
      <div class="creative-img-wrapper">
        <img src="${item.url}" alt="${item.title}" />
      </div>
    </div>
  `).join('');

  creativeContainer.querySelectorAll('.creative-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-id'));
      const item = creativeItems.find(i => i.id === id);
      if (item) {
        lightboxMedia.innerHTML = `<img src="${item.url}" alt="${item.title}" />`;
        lightboxCat.textContent = item.category;
        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.desc;
        lightboxOverlay.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightboxOverlay.classList.remove('active'));
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) lightboxOverlay.classList.remove('active');
    });
  }

  // --- 8. TESTIMONIALS SLIDER ---
  const testimonials = [
    { name: 'Sarah Jenkins', pos: 'CEO, TechPulse Agency', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', text: 'Rahul transformed our web application interface into a futuristic masterpiece. His attention to design detail and frontend performance is unmatched.' },
    { name: 'Alex Rivera', pos: 'Content Director, MediaVibe', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', text: 'Working with Rahul on video edits and graphic thumbnails gave our YouTube channel a 200% boost in click-through rate. A true multi-talented creative!' },
    { name: 'Elena Rostova', pos: 'Founder, Lumina Digital', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', text: 'Rahul handled our frontend development and digital marketing campaign seamlessly. Having one professional manage both saved us weeks of effort.' }
  ];

  let testIdx = 0;
  const testimonialCard = document.getElementById('testimonial-card');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dotsContainer = document.getElementById('testimonial-dots');

  function renderTestimonial() {
    const t = testimonials[testIdx];
    testimonialCard.innerHTML = `
      <div class="testimonial-stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <img src="${t.photo}" alt="${t.name}" class="author-photo" />
        <div>
          <h4 class="author-name">${t.name}</h4>
          <p class="author-position mono-text">${t.pos}</p>
        </div>
      </div>
    `;

    dotsContainer.innerHTML = testimonials.map((_, i) => `
      <span class="dot ${i === testIdx ? 'active' : ''}"></span>
    `).join('');
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { testIdx = testIdx === 0 ? testimonials.length - 1 : testIdx - 1; renderTestimonial(); });
    nextBtn.addEventListener('click', () => { testIdx = testIdx === testimonials.length - 1 ? 0 : testIdx + 1; renderTestimonial(); });
  }
  renderTestimonial();

  // --- 9. COMMAND PALETTE (CTRL + K) ---
  const cmdOverlay = document.getElementById('cmd-palette');
  const cmdInput = document.getElementById('cmd-input');
  const cmdClose = document.getElementById('cmd-close');
  const cmdList = document.getElementById('cmd-list');
  const cmdLogs = document.getElementById('cmd-logs');

  const commands = [
    { cmd: 'about', desc: 'Scroll to About section', target: '#about' },
    { cmd: 'skills', desc: 'Scroll to Skills', target: '#skills' },
    { cmd: 'services', desc: 'Scroll to Services', target: '#services' },
    { cmd: 'projects', desc: 'Scroll to Projects', target: '#projects' },
    { cmd: 'creative', desc: 'Scroll to Creative Showcase', target: '#creative' },
    { cmd: 'github', desc: 'Open GitHub Profile', url: 'https://github.com' },
    { cmd: 'contact', desc: 'Scroll to Contact', target: '#contact' },
    { cmd: 'resume', desc: 'Download Resume', action: () => alert('Downloading Rahul Ali Resume PDF...') }
  ];

  function renderCmdList(query = '') {
    const filtered = commands.filter(c => c.cmd.includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase()));
    cmdList.innerHTML = filtered.map(c => `
      <div class="cmd-item" data-cmd="${c.cmd}">
        <span class="cmd-name mono-text">&gt; ${c.cmd}</span>
        <span class="cmd-desc">${c.desc}</span>
      </div>
    `).join('');

    cmdList.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        const cmdName = item.getAttribute('data-cmd');
        const targetObj = commands.find(c => c.cmd === cmdName);
        if (targetObj) {
          cmdLogs.innerHTML += `<div class="log-line">rahul@portfolio:~$ open ${cmdName}</div>`;
          setTimeout(() => {
            if (targetObj.target) {
              document.querySelector(targetObj.target)?.scrollIntoView({ behavior: 'smooth' });
            } else if (targetObj.url) {
              window.open(targetObj.url, '_blank');
            } else if (targetObj.action) {
              targetObj.action();
            }
            cmdOverlay.classList.remove('active');
          }, 300);
        }
      });
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdOverlay.classList.toggle('active');
      if (cmdOverlay.classList.contains('active')) {
        cmdInput.focus();
        renderCmdList();
      }
    }
    if (e.key === 'Escape') {
      cmdOverlay.classList.remove('active');
    }
  });

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => renderCmdList(e.target.value));
  }
  if (cmdClose) {
    cmdClose.addEventListener('click', () => cmdOverlay.classList.remove('active'));
  }

  // --- 10. RESUME DOWNLOAD BUTTON ---
  const resumeBtn = document.getElementById('resume-download-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Downloading Rahul Ali Resume PDF...');
    });
  }

  // --- 11. CONTACT FORM HANDLER ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you, Rahul has received your message and will respond shortly!');
      contactForm.reset();
    });
  }

});
