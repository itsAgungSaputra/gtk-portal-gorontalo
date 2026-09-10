const announcements = [
  { id: 1, title: 'Tiga Hari Seleksi Magang Nasional, KGTK Gorontalo Jaring Peserta Potensial', category: 'Informasi', date: 'Berita terbaru KGTK', excerpt: 'Sebanyak 293 peserta mengikuti seleksi MagangHub di Aula Huyula Ambu untuk menjaring peserta kompeten dan siap kerja.', detail: 'KGTK Gorontalo menyelenggarakan tiga hari seleksi Magang Nasional melalui MagangHub. Kegiatan berlangsung di Aula Huyula Ambu dan diikuti 293 peserta.\n\nBaca berita lengkap melalui situs resmi KGTK Gorontalo.' },
  { id: 2, title: 'KGTK Gorontalo Perkuat Kompetensi Guru melalui Pelatihan Inklusif', category: 'Pelatihan', date: 'Berita terbaru KGTK', excerpt: 'Pelatihan daring diikuti guru SD hingga SMA/SMK Gorontalo untuk memperkuat pendidikan inklusif.', detail: 'KGTK Gorontalo memperkuat kompetensi guru melalui pelatihan inklusif yang diikuti guru dari jenjang SD sampai SMA/SMK.\n\nBaca berita lengkap melalui situs resmi KGTK Gorontalo.' },
  { id: 3, title: 'KGTK Gorontalo Dorong STEM yang Mudah, Murah, dan Bermakna', category: 'Informasi', date: 'Siaran pers KGTK', excerpt: 'Siaran pers KGTK Gorontalo tentang penguatan pembelajaran STEM yang mudah diterapkan, terjangkau, dan bermakna.', detail: 'KGTK Gorontalo mendorong penerapan STEM yang mudah, murah, dan bermakna sebagai bagian dari penguatan kualitas pembelajaran.\n\nBaca siaran pers lengkap melalui situs resmi KGTK Gorontalo.' },
  { id: 4, title: 'Koding dan Kecerdasan Artifisial', category: 'Pelatihan', date: 'Program prioritas KGTK', excerpt: 'Program pelatihan Koding dan Kecerdasan Artifisial yang diselenggarakan KGTK Gorontalo.', detail: 'Koding dan Kecerdasan Artifisial merupakan salah satu program prioritas dan inovasi KGTK Gorontalo.\n\nInformasi program dan pelatihan tersedia melalui situs resmi KGTK Gorontalo.' },
  { id: 5, title: 'Pelatihan Pembelajaran Mendalam', category: 'Pelatihan', date: 'Program prioritas KGTK', excerpt: 'Program pembelajaran mendalam untuk menciptakan pembelajaran yang mindful, meaningful, dan joyful.', detail: 'Pembelajaran Mendalam merupakan program prioritas KGTK untuk menciptakan pembelajaran yang mindful, meaningful, dan joyful.\n\nInformasi program tersedia melalui situs resmi KGTK Gorontalo.' },
  { id: 6, title: 'Hasil Survei Kepuasan Masyarakat Semester II Tahun 2025', category: 'Informasi', date: 'Semester II 2025', excerpt: 'KGTK Gorontalo mencatat nilai IKM 91,25 dengan predikat pelayanan Sangat Baik dan mutu pelayanan A.', detail: 'Berdasarkan survei Semester II Tahun 2025, KGTK Gorontalo memperoleh:\n\n• Nilai IKM: 91,25\n• Total responden: 150 orang\n• Total skor: 4.925\n• Mutu pelayanan: A (Sangat Baik)\n\nLaporan survei tersedia melalui situs resmi KGTK Gorontalo.' }
];

const categories = ['Semua', 'Sertifikasi', 'Pelatihan', 'Informasi'];
const state = { category: 'Semua', query: '', selectedId: null };
const list = document.querySelector('#announcement-list');
const emptyState = document.querySelector('#empty-state');
const filters = document.querySelector('#category-filters');
const announcementSearch = document.querySelector('#announcement-search');
const modal = document.querySelector('#announcement-modal');
const modalTitle = document.querySelector('#modal-title');
const modalCategory = document.querySelector('#modal-category');
const modalDate = document.querySelector('#modal-date');
const modalContent = document.querySelector('#modal-content');
const heroSearch = document.querySelector('#hero-search');

function categoryClasses(category) {
  if (category === 'Pelatihan') return 'bg-emerald-50 text-emerald-700';
  if (category === 'Informasi') return 'bg-amber-50 text-amber-700';
  return 'bg-blue-50 text-navy-700';
}

function filteredAnnouncements() {
  const query = state.query.trim().toLowerCase();
  return announcements.filter((item) => {
    const matchesCategory = state.category === 'Semua' || item.category === state.category;
    const searchable = `${item.title} ${item.category} ${item.excerpt}`.toLowerCase();
    return matchesCategory && (!query || searchable.includes(query));
  });
}

function renderFilters() {
  filters.innerHTML = categories.map((category) => {
    const active = state.category === category;
    return `<button type="button" data-category="${category}" class="rounded-lg px-4 py-2.5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-navy-700 focus:ring-offset-2 ${active ? 'bg-navy-700 text-white shadow-sm' : 'bg-mist text-slate-500 hover:bg-blue-50 hover:text-navy-700'}">${category}</button>`;
  }).join('');
}

function renderAnnouncements() {
  const items = filteredAnnouncements();
  list.innerHTML = items.map((item) => `<article class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft"><div class="flex items-center justify-between gap-4"><span class="inline-flex rounded-full px-3 py-1 text-xs font-bold ${categoryClasses(item.category)}">${item.category}</span><time class="text-xs font-semibold text-slate-400">${item.date}</time></div><h3 class="mt-5 font-display text-lg font-extrabold leading-snug text-navy-800">${item.title}</h3><p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">${item.excerpt}</p><button type="button" data-announcement-id="${item.id}" class="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold text-navy-700 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">Baca detail <span class="transition group-hover:translate-x-1" aria-hidden="true">→</span></button></article>`).join('');
  emptyState.classList.toggle('hidden', items.length > 0);
}

function render() { renderFilters(); renderAnnouncements(); }

function openModal(id) {
  const item = announcements.find((announcement) => announcement.id === id);
  if (!item) return;
  state.selectedId = id;
  modalCategory.textContent = item.category;
  modalCategory.className = `inline-flex rounded-full px-3 py-1 text-xs font-bold ${categoryClasses(item.category)}`;
  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalContent.textContent = item.detail;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('modal-open');
  document.querySelector('#modal-close').focus();
}

function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('modal-open');
  state.selectedId = null;
}

filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  render();
});

announcementSearch.addEventListener('input', (event) => {
  state.query = event.target.value;
  renderAnnouncements();
});

list.addEventListener('click', (event) => {
  const button = event.target.closest('[data-announcement-id]');
  if (button) openModal(Number(button.dataset.announcementId));
});

document.querySelector('#modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && state.selectedId !== null) closeModal(); });

document.querySelector('#hero-search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  state.query = heroSearch.value;
  announcementSearch.value = state.query;
  renderAnnouncements();
  document.querySelector('#pengumuman').scrollIntoView({ behavior: 'smooth', block: 'start' });
  announcementSearch.focus({ preventScroll: true });
});

const menuToggle = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.classList.toggle('hidden', expanded);
});
mobileMenu.addEventListener('click', (event) => {
  if (event.target.closest('a')) { menuToggle.setAttribute('aria-expanded', 'false'); mobileMenu.classList.add('hidden'); }
});

function syncFooterContent() {
  const footer = document.querySelector('footer');
  const footerBrand = footer.querySelector('strong')?.parentElement;
  if (footerBrand && !footer.querySelector('[data-official-assets]')) {
    footerBrand.insertAdjacentHTML('afterend', '<div data-official-assets class="mt-6"><img src="assets/slogan-kemendikdasmen.avif" alt="Pendidikan Bermutu Untuk Semua - Budaya Kerja RAMAH Kemendikdasmen" class="h-10 w-auto object-contain object-left" /><img src="assets/wbs-kgtk.webp" alt="Ilustrasi Whistleblowing System KGTK Gorontalo" class="mt-5 h-24 w-auto object-contain object-left" /></div>');
  }
  const replacements = new Map([
    ['GTK Gorontalo', 'KGTK Gorontalo'],
    ['Portal informasi dan layanan untuk Guru dan Tenaga Kependidikan Provinsi Gorontalo.', 'Kantor Guru dan Tenaga Kependidikan Provinsi Gorontalo di bawah Kementerian Pendidikan Dasar dan Menengah.'],
    ['Jl. Tinaloga No. 10, Kota Gorontalo, Provinsi Gorontalo', 'Provinsi Gorontalo, Indonesia'],
    ['helpdesk@gtkgorontalo.id', 'Situs resmi KGTK Gorontalo'],
    ['(0435) 821234', 'Whistleblowing System'],
    ['Portal SIMPKB', 'Situs Resmi KGTK'],
    ['Dinas Pendidikan & Kebudayaan Provinsi Gorontalo', 'Tim Publikasi KGTK Gorontalo']
  ]);
  const walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    const replacement = replacements.get(node.nodeValue.trim());
    if (replacement) node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), replacement);
  });
  footer.querySelectorAll('a').forEach((link) => {
    if (link.textContent.trim() === 'Situs resmi KGTK Gorontalo') link.href = 'https://kgtkgorontalo.kemendikdasmen.go.id/';
    if (link.textContent.trim() === 'Whistleblowing System') link.href = 'https://wbs.kemendikdasmen.go.id/?ref=kgtkgorontalo';
    if (link.textContent.trim() === 'Situs Resmi KGTK') link.href = 'https://kgtkgorontalo.kemendikdasmen.go.id/';
  });
}

syncFooterContent();
render();
