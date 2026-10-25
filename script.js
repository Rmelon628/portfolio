// スクロールに合わせて、現在表示中のセクションに対応するナビリンクをハイライトする
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navlinks a');

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((section) => observer.observe(section));
}

// Skills: タップした項目の詳細をモーダルで表示する（コメントは編集不可の固定テキスト）
const modal = document.getElementById('skill-modal');
const modalTitle = modal.querySelector('.modal-title');
const modalPct = modal.querySelector('.modal-pct');
const modalBar = modal.querySelector('.modal-bar');
const modalComment = modal.querySelector('.modal-comment');

const buildBar = (container, level) => {
  container.innerHTML = '';
  const filledBlocks = Math.round(level / 10);
  for (let i = 0; i < 10; i += 1) {
    const block = document.createElement('span');
    if (i < filledBlocks) block.classList.add('filled');
    container.appendChild(block);
  }
};

const openModal = (skill) => {
  const level = Number(skill.dataset.level || 0);
  modalTitle.textContent = skill.dataset.skill;
  modalPct.textContent = `${level}%`;
  modalComment.textContent = skill.dataset.comment || '';
  buildBar(modalBar, level);
  modal.hidden = false;
};

const closeModal = () => { modal.hidden = true; };

document.querySelectorAll('.skill').forEach((skill) => {
  skill.addEventListener('click', () => openModal(skill));
});

document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCertModal();
    closeGallery(); 
  }
});
// Certifications: タップした項目の修了書画像をモーダルで表示する
const certModal = document.getElementById('cert-modal');
const certModalTitle = document.getElementById('cert-modal-title');
const certModalImage = document.getElementById('cert-modal-image');

const openCertModal = (item) => {
  const imageSrc = item.dataset.image;
  if (!imageSrc) return;
  const nameEl = item.querySelector('.cert-name');
  certModalTitle.textContent = nameEl ? nameEl.textContent : '';
  certModalImage.src = imageSrc;
  certModalImage.alt = nameEl ? nameEl.textContent : '証明書画像';
  certModal.hidden = false;
};

const closeCertModal = () => { certModal.hidden = true; };

document.querySelectorAll('.cert-item').forEach((item) => {
  item.addEventListener('click', () => openCertModal(item));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCertModal(item);
    }
  });
});

document.getElementById('cert-modal-close').addEventListener('click', closeCertModal);
certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCertModal(); });

// Projects: ゲーム風景などの画像をまとめてモーダルで表示する
const galleryModal = document.getElementById('gallery-modal');
const galleryTitle = document.getElementById('gallery-modal-title');
const galleryList = document.getElementById('gallery-list');

const openGallery = (trigger) => {
  const images = (trigger.dataset.images || '')
    .split(',')
    .map((src) => src.trim())
    .filter(Boolean);
  if (!images.length) return;

  const title = trigger.dataset.title || '';
  galleryTitle.textContent = title;
  galleryList.innerHTML = '';

  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${title} ${i + 1}`;
    galleryList.appendChild(img);
  });

  galleryModal.hidden = false;
};

const closeGallery = () => { galleryModal.hidden = true; };

document.querySelectorAll('.gallery-trigger').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openGallery(link);
  });
});

document.getElementById('gallery-modal-close').addEventListener('click', closeGallery);
galleryModal.addEventListener('click', (e) => { if (e.target === galleryModal) closeGallery(); });