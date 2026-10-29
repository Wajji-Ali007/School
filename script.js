// 1. Initialize AOS Animations with Mobile Support
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: false,
            mirror: true,
            offset: 50,
            disable: false
        });
    }
    // Calculate initial fee on load
    calculateTuition();
    // Start live countdown timer
    startEventCountdown();
});

// 2. Light / Dark Theme Switcher
const themeBtnDesktop = document.getElementById('themeToggleBtn');
const themeBtnMobile = document.getElementById('themeToggleMobile');
const themeIconDesktop = document.getElementById('themeIcon');
const themeIconMobile = document.getElementById('themeIconMobile');
const backBtn = document.getElementById('backToTop');
const htmlElement = document.documentElement;

function updateThemeUI(isDark) {
    if (isDark) {
        htmlElement.classList.add('dark');
        if (themeIconDesktop) themeIconDesktop.className = 'fa-solid fa-sun';
        if (themeIconMobile) themeIconMobile.className = 'fa-solid fa-sun';
        if (backBtn) {
            backBtn.style.backgroundColor = '#111722';
            backBtn.style.color = '#f87171';
        }
    } else {
        htmlElement.classList.remove('dark');
        if (themeIconDesktop) themeIconDesktop.className = 'fa-solid fa-moon';
        if (themeIconMobile) themeIconMobile.className = 'fa-solid fa-moon';
        if (backBtn) {
            backBtn.style.backgroundColor = '#ffffff';
            backBtn.style.color = '#dc2626';
        }
    }
}

const savedTheme = localStorage.getItem('hsja_theme') || 'light';
updateThemeUI(savedTheme === 'dark');

function toggleTheme() {
    const isDarkNow = !htmlElement.classList.contains('dark');
    updateThemeUI(isDarkNow);
    localStorage.setItem('hsja_theme', isDarkNow ? 'dark' : 'light');
}

if (themeBtnDesktop) themeBtnDesktop.addEventListener('click', toggleTheme);
if (themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

// 3. Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// 4. Academic Program Tabs Switcher
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = 'tab-btn px-5 py-2.5 rounded-xl font-bold text-xs bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-white/10 transition border border-slate-200 dark:border-white/10';
    });
    const activeTab = document.getElementById('tab-' + tabName);
    if (activeTab) {
        activeTab.className = 'tab-btn px-5 py-2.5 rounded-xl font-bold text-xs bg-red-600 text-white shadow-md transition';
    }

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    const activeContent = document.getElementById('content-' + tabName);
    if (activeContent) {
        activeContent.classList.remove('hidden');
    }
}

// 5. FAQ Accordion Toggle
function toggleFaq(id) {
    const ans = document.getElementById('faq-ans-' + id);
    const icon = document.getElementById('faq-icon-' + id);
    if (ans && icon) {
        ans.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    }
}

// 6. Mobile Menu Auto-Close & Toggle
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

function closeMobileDrawer() {
    if (mobileMenu && menuIcon) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
}

if (menuBtn && mobileMenu && menuIcon) {
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        if (isHidden) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }
    });
}

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
});

// 7. Interactive Student Portal & Roll Number Authentication
const studentDatabase = {
    "101": {
        name: "Muhammad Ali",
        grade: "Grade 8 - Section A",
        rollNo: "101",
        attendance: "96.4%",
        feeStatus: "Paid (October)",
        grades: [
            { subject: "English Literature", marks: "92/100", grade: "A+" },
            { subject: "Mathematics", marks: "88/100", grade: "A" },
            { subject: "General Science", marks: "95/100", grade: "A+" },
            { subject: "Computer Studies", marks: "98/100", grade: "A+" }
        ]
    },
    "102": {
        name: "Sarah Ahmed",
        grade: "Grade 10 - Science",
        rollNo: "102",
        attendance: "98.2%",
        feeStatus: "Paid (October)",
        grades: [
            { subject: "Physics", marks: "94/100", grade: "A+" },
            { subject: "Chemistry", marks: "91/100", grade: "A+" },
            { subject: "Biology", marks: "89/100", grade: "A" },
            { subject: "Mathematics", marks: "96/100", grade: "A+" }
        ]
    }
};

function openPortalModal() {
    const modal = document.getElementById('portalModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closePortalModal() {
    const modal = document.getElementById('portalModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function handlePortalLogin(e) {
    e.preventDefault();
    const rollInput = document.getElementById('portalRollInput').value.trim();
    const errorBox = document.getElementById('portalError');
    const loginView = document.getElementById('portalLoginView');
    const dashboardView = document.getElementById('portalDashboardView');

    const student = studentDatabase[rollInput] || {
        name: "Demo Student (" + rollInput + ")",
        grade: "Grade 7 - General",
        rollNo: rollInput,
        attendance: "94.0%",
        feeStatus: "Verified & Cleared",
        grades: [
            { subject: "English", marks: "85/100", grade: "A" },
            { subject: "Mathematics", marks: "82/100", grade: "B+" },
            { subject: "Science", marks: "90/100", grade: "A+" }
        ]
    };

    if (errorBox) errorBox.classList.add('hidden');

    document.getElementById('dashStudentName').textContent = student.name;
    document.getElementById('dashStudentGrade').textContent = student.grade;
    document.getElementById('dashStudentRoll').textContent = "Roll No: " + student.rollNo;
    document.getElementById('dashAttendance').textContent = student.attendance;
    document.getElementById('dashFeeStatus').textContent = student.feeStatus;

    const gradesList = document.getElementById('dashGradesList');
    gradesList.innerHTML = '';
    student.grades.forEach(item => {
        const row = document.createElement('div');
        row.className = "flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 text-xs";
        row.innerHTML = `<span class="font-medium text-slate-700 dark:text-slate-300">${item.subject}</span><div class="flex items-center gap-2"><span class="text-slate-500">${item.marks}</span><span class="font-extrabold text-red-600 bg-red-100 dark:bg-red-950/60 px-1.5 py-0.5 rounded text-[10px]">${item.grade}</span></div>`;
        gradesList.appendChild(row);
    });

    loginView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
}

function logoutPortal() {
    const loginView = document.getElementById('portalLoginView');
    const dashboardView = document.getElementById('portalDashboardView');
    if (loginView && dashboardView) {
        dashboardView.classList.add('hidden');
        loginView.classList.remove('hidden');
        document.getElementById('portalLoginForm').reset();
    }
}

// 8. Video Campus Tour Modal
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    if (modal && iframe) {
        iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    if (modal && iframe) {
        iframe.src = "";
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// 9. Interactive Fee Calculator
function calculateTuition() {
    const gradeSelect = document.getElementById('calcGrade');
    const transportSelect = document.getElementById('calcTransport');
    const siblingCheck = document.getElementById('calcSibling');
    const displayTotal = document.getElementById('calcTotalDisplay');

    if (!gradeSelect || !transportSelect || !displayTotal) return;

    let baseTuition = parseInt(gradeSelect.value) || 3500;
    let transportFee = parseInt(transportSelect.value) || 0;
    let discount = siblingCheck && siblingCheck.checked ? (baseTuition * 0.10) : 0;

    let total = (baseTuition - discount) + transportFee;
    displayTotal.textContent = "Rs. " + total.toLocaleString() + " / month";
}

// 10. Live Event Countdown Timer (Sports Gala)
function startEventCountdown() {
    // 14 days dynamic target date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate.getTime() - now;

        if (difference <= 0) return;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const cdDays = document.getElementById('cdDays');
        const cdHours = document.getElementById('cdHours');
        const cdMins = document.getElementById('cdMins');
        const cdSecs = document.getElementById('cdSecs');

        if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
        if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
        if (cdMins) cdMins.textContent = String(minutes).padStart(2, '0');
        if (cdSecs) cdSecs.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// 11. Smart WhatsApp Chat Popup
function toggleWhatsAppCard() {
    const card = document.getElementById('whatsappChatCard');
    if (card) {
        card.classList.toggle('hidden');
    }
}

// 12. Filterable Gallery & Fullscreen Lightbox
function filterGallery(category) {
    const buttons = document.querySelectorAll('.gallery-filter-btn');
    buttons.forEach(btn => {
        btn.className = "gallery-filter-btn px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-white/10 transition border border-slate-200 dark:border-white/10";
    });

    const activeBtn = document.getElementById('gallery-filter-' + category);
    if (activeBtn) {
        activeBtn.className = "gallery-filter-btn px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white shadow-md transition";
    }

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

function openLightbox(imageUrl, imageTitle) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    const title = document.getElementById('lightboxCaption');
    if (modal && img && title) {
        img.src = imageUrl;
        title.textContent = imageTitle;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// 13. Admission Form Handler
function handleForm(e) {
    e.preventDefault();
    const successBox = document.getElementById('successBox');
    if (successBox) {
        successBox.classList.remove('hidden');
        e.target.reset();
        setTimeout(() => {
            successBox.classList.add('hidden');
        }, 5000);
    }
}
