// بيانات المشاريع
const projects = [
    {
        id: 1,
        title: "بوت التسويق التلقائي",
        description: "بوت متكامل لإدارة الحملات التسويقية على تيليجرام مع لوحة تحكم تفاعلية.",
        imageUrl: "images/bot1.jpg",
        zipUrl: "projects/marketing-bot.zip",
        type: "bot",
        date: "15 يونيو 2023",
        size: "4.2 MB"
    },
    {
        id: 2,
        title: "موقع متجر إلكتروني",
        description: "موقع متكامل للتجارة الإلكترونية مع نظام دفع وتتبع الطلبات.",
        imageUrl: "images/web1.jpg",
        zipUrl: "projects/ecommerce-website.zip",
        type: "web",
        date: "2 يوليو 2023",
        size: "8.7 MB"
    },
    {
        id: 3,
        title: "بوت الدعم الفني",
        description: "بوت ذكي للرد على استفسارات العملاء مع دعم متعدد اللغات.",
        imageUrl: "images/bot2.jpg",
        zipUrl: "projects/support-bot.zip",
        type: "bot",
        date: "28 مايو 2023",
        size: "3.5 MB"
    },
    {
        id: 4,
        title: "بوت الدعم الفني",
        description: "بوت ذكي للرد على استفسارات العملاء مع دعم متعدد اللغات.",
        imageUrl: "images/bot2.jpg",
        zipUrl: "projects/support-bot.zip",
        type: "bot",
        date: "28 مايو 2023",
        size: "3.5 MB"
    },
    {
        id: 5,
        title: "مستعرض البرويجكتات",
        description: "مستعرض بسيط للمشاريع مع امكانية تحميلها بشكل مباشر.",
        imageUrl: "images/profile.png",
        zipUrl: "projects/show project.zip",
        type: "web",
        date: "2 ابريل 2025",
        size: "7 KB"
    },
];

// عرض المشاريع
function displayProjects(filter = "all", searchTerm = "") {
    const container = document.getElementById('projects');
    container.innerHTML = '';

    let filteredProjects = filter === "all" 
        ? projects 
        : projects.filter(project => project.type === filter);

    // تطبيق البحث إذا كان هناك مصطلح بحث
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(project => 
            project.title.toLowerCase().includes(term) || 
            project.description.toLowerCase().includes(term)
        );
    }

    filteredProjects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <img src="${project.imageUrl}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-meta">
                    <span><i class="far fa-calendar-alt"></i> ${project.date}</span>
                    <span><i class="far fa-file-archive"></i> ${project.size}</span>
                </div>
                <a href="${project.zipUrl}" class="download-btn">
                    <i class="fas fa-download"></i> تحميل المشروع
                </a>
            </div>
        `;

        container.appendChild(projectCard);
    });

    // إذا لم توجد نتائج
    if (filteredProjects.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>لا توجد مشاريع مطابقة للبحث</p>
            </div>
        `;
    }
}

// تصفية المشاريع
document.querySelectorAll('.filter-options button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-options button.active').classList.remove('active');
        button.classList.add('active');
        const searchInput = document.getElementById('project-search');
        displayProjects(button.dataset.filter, searchInput.value);
    });
});

// البحث عن المشاريع
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('project-search').value;
    const activeFilter = document.querySelector('.filter-options button.active').dataset.filter;
    displayProjects(activeFilter, searchTerm);
});

// البحث عند الضغط على انتر
document.getElementById('project-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = document.getElementById('project-search').value;
        const activeFilter = document.querySelector('.filter-options button.active').dataset.filter;
        displayProjects(activeFilter, searchTerm);
    }
});

// تحميل المشاريع عند بدء الصفحة
window.addEventListener('DOMContentLoaded', () => {
    displayProjects();
});