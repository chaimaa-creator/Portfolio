// ========================================
// main.js – Portfolio Omar Guennouni – VERSION FINALE
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  // 1. Dark Mode Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }

  // 2. Modal pour les projets
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalGithub = document.getElementById('modalGithub');
  const modalDemo = document.getElementById('modalDemo');
  const closeModal = document.querySelector('.close-modal');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      modalImg.src = card.dataset.img || 'img/placeholder.jpg';
      modalTitle.textContent = card.dataset.title || 'Projet';
      modalDesc.textContent = card.dataset.desc || 'Aucune description.';

      // GitHub
      if (card.dataset.github && card.dataset.github.trim() !== '') {
        modalGithub.href = card.dataset.github;
        modalGithub.style.display = 'inline-flex';
      } else {
        modalGithub.style.display = 'none';
      }

      // Démo
      if (card.dataset.demo && card.dataset.demo.trim() !== '') {
        modalDemo.href = card.dataset.demo;
        modalDemo.style.display = 'inline-flex';
      } else {
        modalDemo.style.display = 'none';
      }

      modal.style.display = 'flex';
    });
  });

  // Fermer le modal
  if (closeModal) closeModal.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

  // 3. Animation au scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  const skillBars = document.querySelectorAll('.progress');

  function animateOnScroll() {
    const trigger = window.innerHeight - 100;
    fadeElements.forEach(el => { if (el.getBoundingClientRect().top < trigger) el.classList.add('visible'); });
    skillBars.forEach(bar => {
      if (bar.getBoundingClientRect().top < trigger && !bar.classList.contains('animated')) {
        bar.style.width = bar.dataset.width;
        bar.classList.add('animated');
      }
    });
  }
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // 4. Toggle détails expérience
  document.querySelectorAll('.toggle-details').forEach(button => {
    button.addEventListener('click', () => {
      const details = button.closest('.experience-item').querySelector('.experience-details');
      const isOpen = details.style.display === 'block';
      details.style.display = isOpen ? 'none' : 'block';
      button.textContent = isOpen ? '+' : '−';
      button.classList.toggle('active', !isOpen);
    });
  });

  // 5. Menu burger (mobile)
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }

  // 6. TÉLÉCHARGEMENT CV – VERSION QUI MARCHE PARTOUT (même en file://)
  const cvButton = document.querySelector('a[href*="CV"], a[download*="CV"], .btn-primary');
  if (cvButton) {
    cvButton.addEventListener('click', function (e) {
      e.preventDefault();

      const pdfPath = "files/CV_Omar_Guennouni.pdf";  // Chemin exact
      const fileName = "CV_Omar_Guennouni.pdf";

      // Méthode ultra-fiable avec fetch + blob
      fetch(pdfPath)
        .then(resp => {
          if (!resp.ok) throw new Error("PDF non trouvé");
          return resp.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch(() => {
          // Secours : ouverture directe
          const a = document.createElement('a');
          a.href = pdfPath;
          a.download = fileName;
          a.target = "_blank";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
    });
  }

  // 7. EmailJS – Formulaire de contact
  emailjs.init("a8NxwS2i4RqYZc0rv");

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      emailjs.sendForm('service_ehu42pn', 'template_a843tzh', this)
        .then(() => {
          alert("Message envoyé ! Je te réponds très vite");
          contactForm.reset();
        })
        .catch(() => {
          alert("Erreur d'envoi. Écris-moi directement : omar.guennouni@outlook.fr");
        })
        .finally(() => {
          btn.textContent = original;
          btn.disabled = false;
        });
    });
  }

});