const eventDateString = '2026-06-26T19:00:00'; // عدل التاريخ بسهولة
const eventLocationUrl = 'https://www.google.com/maps/place/%D8%B3%D9%84%D9%8A%D9%85%D8%A7%D9%86+%D8%A7%D9%84%D8%AD%D9%84%D8%A8%D9%8A%D8%8C+%D8%A7%D9%84%D9%82%D9%84%D8%AC%D8%8C+%D9%85%D8%B1%D9%83%D8%B2+%D8%A7%D9%84%D8%AE%D8%A7%D9%86%D9%83%D8%A9%D8%8C+%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%A7%D9%84%D9%82%D9%84%D9%8A%D9%88%D8%A8%D9%8A%D8%A9+6345684%E2%80%AD/@30.1934962,31.3702216,17z/data=!3m1!4b1!4m6!3m5!1s0x1458116e6931ff11:0xf17e2514c8980d5!8m2!3d30.1934962!4d31.3702216!16s%2Fg%2F11g633bh0l!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D'; // ضع هنا رابط Google Maps الخاص بك
const eventMusicUrl = 'https://assets.mixkit.co/music/preview/mixkit-romantic-piano-1325.mp3'; // ضع رابط الأغنية هنا (mp3)
const eventWhatsApp = '201116187634';
const eventTitle = 'زفاف Mustafa & Asmaa';

// الخطوبة - أضف هذه البيانات
const engagementDateString = '2026-06-26T20:00:00'; // موعد الخطوبة (الساعة 8 مساءً)
const engagementLocationUrl = 'https://www.google.com/maps/place/%D8%A7%D9%84%D8%AC%D8%A8%D9%84+%D8%A7%D9%84%D8%A3%D8%B5%D9%81%D8%B1'; // الجبل الأصفر

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

  // استخرج الإحداثيات من الـ URL
  const coordMatch = eventLocationUrl.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  const placeMatch = eventLocationUrl.match(/\/place\/([^\/]+)/);

  let embedSrc;

  if (coordMatch) {
    const lat = coordMatch[1];
    const lng = coordMatch[2];
    const placeName = placeMatch ? decodeURIComponent(placeMatch[1].replace(/\+/g, ' ')) : 'Location';

    // استخدم الإحداثيات والمكان للـ embed
    embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(placeName)}&z=17&output=embed&iwloc=near&t=&z=17&cbll=${lat},${lng}`;
  } else {
    // لو مفيش إحداثيات، استخرج اسم المكان من الـ URL
    const nameMatch = eventLocationUrl.match(/\/place\/([^\/@]+)/);
    const placeName = nameMatch ? decodeURIComponent(nameMatch[1].replace(/\+/g, ' ')) : 'Location';
    embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(placeName)}&output=embed`;
  }

  mapEmbed.src = embedSrc;
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

  // تحديث نص الزر حسب الحالة
  musicToggle.textContent = 'إيقاف الموسيقى';

  musicToggle.addEventListener('click', () => {
    if (!playing) {
      backgroundMusic.play().then(() => {
        musicToggle.textContent = 'إيقاف الموسيقى';
      }).catch(() => {});
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
    // تنسيق التاريخ لـ Google Calendar
    const startDate = eventDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

    // رابط Google Calendar
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent('دعوة زفاف Mustafa & Asmaa')}&location=${encodeURIComponent(eventLocationUrl)}&sf=true&output=xml`;

    window.open(googleCalUrl, '_blank');
  });
}

function initRSVP(rsvpButton) {
  if (!rsvpButton) return;
  rsvpButton.addEventListener('click', () => {
    const message = `السلام عليكم \n\nأؤكد حضوري لزفاف Mustafa & Asmaa\n\nالأسماء: \nعدد الحضور: `;
    const waUrl = `https://wa.me/${eventWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
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

  // تفعيل رابط خريطة الخطوبة
  const engagementMapLink = document.getElementById('engagementMapLink');
  if (engagementMapLink && engagementLocationUrl) {
    engagementMapLink.href = engagementLocationUrl;
  }

  initObservers();

  // متابعة تشغيل الموسيقى من الصفحة السابقة
  const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
  console.log('wasPlaying:', wasPlaying);

  if (wasPlaying && backgroundMusic) {
    console.log('Trying to play music...');

    // جرب تشغيل مباشرة
    const tryPlay = () => {
      backgroundMusic.load(); // إعادة تحميل الصوت
      const playPromise = backgroundMusic.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Music started!');
          if (musicToggle) musicToggle.textContent = 'إيقاف الموسيقى';
          sessionStorage.removeItem('musicPlaying');
        }).catch(err => {
          console.log('Play failed:', err);
          // جرب مرة أخرى بعد ثاني
          setTimeout(tryPlay, 1000);
        });
      }
    };

    // تشغيل بعد ثانيتين لضمان تحميل الصفحة
    setTimeout(tryPlay, 2000);
  }

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

  // حفظ حالة تشغيل الموسيقى
  sessionStorage.setItem('musicPlaying', 'true');

  introScreen.classList.add('opened');
  envelopeButton.classList.add('open');
  setTimeout(() => {
    window.location.href = 'invite.html';
  }, 1100);
}

initPage();
