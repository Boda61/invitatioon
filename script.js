const eventDateString = '2026-06-26T19:00:00'; // عدل التاريخ بسهولة
const eventLocationUrl = 'https://www.google.com/maps/@30.0825946,31.2347607,16z?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D'; // ضع هنا رابط Google Maps الخاص بك
const eventTitle = 'زفاف Mustafa & Asmaa';

const pageType = document.body.dataset.page || 'intro';
const loadingScreen = document.getElementById('loadingScreen');
const introScreen = document.getElementById('introScreen');
const envelopeButton = document.getElementById('envelopeButton');
const backgroundMusic = document.getElementById('backgroundMusic');

const eventDate = new Date(eventDateString);

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d} / ${m} / ${y}`;
}

function updateDateText(target) {
  if (!target) return;
  target.textContent = formatDate(eventDate);
}

function updateCountdown(daysEl, hoursEl, minutesEl, secondsEl) {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function smoothShowBackToTop(button) {
  if (!button) return;
  if (window.scrollY > window.innerHeight / 2) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
}

function createParticles() {
  const container = document.querySelector('.floating-particles');
  if (!container) return;
  const count = 25;
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    const size = Math.random() * 8 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 14 + 8}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(particle);
  }
}

function initMapLinks(mapEmbed, mapLinkButton) {
  if (!mapEmbed || !mapLinkButton) return;
  const query = encodeURIComponent(eventLocationUrl);
  mapEmbed.src = `https://maps.google.com/maps?q=${query}&output=embed`;
  mapLinkButton.href = eventLocationUrl;
}

function initObservers() {
  const sections = document.querySelectorAll('.section-fade');
  if (!sections.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initAudio(musicToggle) {
  if (!musicToggle || !backgroundMusic) return;
  let playing = false;
  musicToggle.addEventListener('click', () => {
    if (!playing) {
      backgroundMusic.play().catch(() => {});
      musicToggle.textContent = 'إيقاف الموسيقى';
    } else {
      backgroundMusic.pause();
      musicToggle.textContent = 'تشغيل الموسيقى';
    }
    playing = !playing;
  });
}

function initShare(shareButton) {
  if (!shareButton) return;
  shareButton.addEventListener('click', async () => {
    const shareData = {
      title: eventTitle,
      text: 'دعوة زفاف Mustafa & Asmaa - انضموا إلينا في ليلة الحب والسعادة.',
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.warn('Share canceled', error);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('تم نسخ رابط الدعوة إلى الحافظة');
    }
  });
}

function initCalendar(calendarButton) {
  if (!calendarButton) return;
  calendarButton.addEventListener('click', () => {
    const start = eventDate.toISOString().replace(/[-:]/g, '').slice(0, 15);
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000);
    const end = endDate.toISOString().replace(/[-:]/g, '').slice(0, 15);
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//MustafaAsmaaInvite//EN\nBEGIN:VEVENT\nUID:${Date.now()}@mustafaasmaa.com\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z\nDTSTART:${start}Z\nDTEND:${end}Z\nSUMMARY:${eventTitle}\nDESCRIPTION:دعوة زفاف Mustafa & Asmaa\nLOCATION:${eventLocationUrl}\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Mustafa-Asmaa-wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function initRSVP(rsvpButton) {
  if (!rsvpButton) return;
  rsvpButton.addEventListener('click', () => {
    const subject = encodeURIComponent('تأكيد حضور زفاف Mustafa & Asmaa');
    const body = encodeURIComponent('السلام عليكم،\n\nيسرني أن أؤكد حضوري لزفاف Mustafa & Asmaa.\n\nمع خالص التحية.');
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
}

function initIntroPage() {
  if (!introScreen || !envelopeButton) return;

  envelopeButton.addEventListener('click', openEnvelope);
  envelopeButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openEnvelope();
    }
  });

  window.addEventListener('load', () => {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => loadingScreen.remove(), 600);
    }
  });
}

function initInvitePage() {
  const eventDateText = document.getElementById('eventDateText');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const mapEmbed = document.getElementById('mapEmbed');
  const mapLinkButton = document.getElementById('mapLinkButton');
  const showMapButton = document.getElementById('showMapButton');
  const backToTop = document.getElementById('backToTop');
  const shareButton = document.getElementById('shareButton');
  const calendarButton = document.getElementById('calendarButton');
  const rsvpButton = document.getElementById('rsvpButton');
  const musicToggle = document.getElementById('musicToggle');

  updateDateText(eventDateText);
  updateCountdown(daysEl, hoursEl, minutesEl, secondsEl);
  setInterval(() => updateCountdown(daysEl, hoursEl, minutesEl, secondsEl), 1000);
  initMapLinks(mapEmbed, mapLinkButton);
  initObservers();
  initAudio(musicToggle);
  initShare(shareButton);
  initCalendar(calendarButton);
  initRSVP(rsvpButton);
  createParticles();

  if (backToTop) {
    window.addEventListener('scroll', () => smoothShowBackToTop(backToTop));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  if (showMapButton) {
    showMapButton.addEventListener('click', () => {
      setTimeout(() => {
        const map = document.getElementById('mapEmbed');
        if (map) map.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    });
  }

  window.addEventListener('load', () => {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => loadingScreen.remove(), 600);
    }
  });
}

function initPage() {
  if (pageType === 'intro') {
    initIntroPage();
  } else {
    initInvitePage();
  }
}

function openEnvelope() {
  if (!introScreen || !envelopeButton || introScreen.classList.contains('opened')) return;
  introScreen.classList.add('opened');
  envelopeButton.classList.add('open');
  setTimeout(() => {
    window.location.href = 'invite.html';
  }, 1100);
}

initPage();
