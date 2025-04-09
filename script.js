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
        title: "بوت تذاكر",
        description: " بوت تذاكر اسطوري مطور جدا",
        imageUrl: "images/profile.jpg",
        zipUrl: "projects/ticket.zip",
        type: "bot",
        date: "2 أبريل 2025",
        size: "34.50 KB"
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
function displayProjects(filter = "all") {
    const container = document.getElementById('projects');
    container.innerHTML = '';

    const filteredProjects = filter === "all" 
        ? projects 
        : projects.filter(project => project.type === filter);

    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
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
}

// تصفية المشاريع
document.querySelectorAll('.filter-options button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-options button.active').classList.remove('active');
        button.classList.add('active');
        displayProjects(button.dataset.filter);
    });
});

// تحميل المشاريع عند بدء الصفحة
window.addEventListener('DOMContentLoaded', () => {
    displayProjects();
});
