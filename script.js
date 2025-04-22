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
        zipUrl: "delete window.$;
let wpRequire;
window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);
 
let ApplicationStreamingStore = Object.values(wpRequire.c).find(x => x?.exports?.Z?.__proto__?.getStreamerActiveStreamMetadata).exports.Z;
let RunningGameStore = Object.values(wpRequire.c).find(x => x?.exports?.ZP?.getRunningGames).exports.ZP;
let QuestsStore = Object.values(wpRequire.c).find(x => x?.exports?.Z?.__proto__?.getQuest).exports.Z;
let ChannelStore = Object.values(wpRequire.c).find(x => x?.exports?.Z?.__proto__?.getAllThreadsForParent).exports.Z;
let GuildChannelStore = Object.values(wpRequire.c).find(x => x?.exports?.ZP?.getSFWDefaultChannel).exports.ZP;
let FluxDispatcher = Object.values(wpRequire.c).find(x => x?.exports?.Z?.__proto__?.flushWaitQueue).exports.Z;
let api = Object.values(wpRequire.c).find(x => x?.exports?.tn?.get).exports.tn;
 
let quest = [...QuestsStore.quests.values()].find(x => x.id !== "1248385850622869556" && x.userStatus?.enrolledAt && !x.userStatus?.completedAt && new Date(x.config.expiresAt).getTime() > Date.now())
let isApp = typeof DiscordNative !== "undefined"
if(!quest) {
    console.log("You don't have any uncompleted quests!")
} else {
    const pid = Math.floor(Math.random() * 30000) + 1000
    
    const applicationId = quest.config.application.id
    const applicationName = quest.config.application.name
    const taskName = ["WATCH_VIDEO", "PLAY_ON_DESKTOP", "STREAM_ON_DESKTOP", "PLAY_ACTIVITY"].find(x => quest.config.taskConfig.tasks[x] != null)
    const secondsNeeded = quest.config.taskConfig.tasks[taskName].target
    const secondsDone = quest.userStatus?.progress?.[taskName]?.value ?? 0
 
    if(taskName === "WATCH_VIDEO") {
        const tolerance = 2, speed = 10
        const diff = Math.floor((Date.now() - new Date(quest.userStatus.enrolledAt).getTime())/1000)
        const startingPoint = Math.min(Math.max(Math.ceil(secondsDone), diff), secondsNeeded)
        let fn = async () => {
            for(let i=startingPoint;i<=secondsNeeded;i+=speed) {
                try {
                    await api.post({url: `/quests/${quest.id}/video-progress`, body: {timestamp: Math.min(secondsNeeded, i + Math.random())}})
                } catch(ex) {
                    console.log("Failed to send increment of", i, ex.message)
                }
                await new Promise(resolve => setTimeout(resolve, tolerance * 1000))
            }
            if((secondsNeeded-secondsDone)%speed !== 0) {
                await api.post({url: `/quests/${quest.id}/video-progress`, body: {timestamp: secondsNeeded}})
            }
            console.log("Quest completed!")
        }
        fn()
        console.log(`Spoofing video for ${applicationName}. Wait for ${Math.ceil((secondsNeeded - startingPoint)/speed*tolerance)} more seconds.`)
    } else if(taskName === "PLAY_ON_DESKTOP") {
        if(!isApp) {
            console.log("This no longer works in browser for non-video quests. Use the desktop app to complete the", applicationName, "quest!")
        }
        
        api.get({url: `/applications/public?application_ids=${applicationId}`}).then(res => {
            const appData = res.body[0]
            const exeName = appData.executables.find(x => x.os === "win32").name.replace(">","")
            
            const fakeGame = {
                cmdLine: `C:\\Program Files\\${appData.name}\\${exeName}`,
                exeName,
                exePath: `c:/program files/${appData.name.toLowerCase()}/${exeName}`,
                hidden: false,
                isLauncher: false,
                id: applicationId,
                name: appData.name,
                pid: pid,
                pidPath: [pid],
                processName: appData.name,
                start: Date.now(),
            }
            const realGames = RunningGameStore.getRunningGames()
            const fakeGames = [fakeGame]
            const realGetRunningGames = RunningGameStore.getRunningGames
            const realGetGameForPID = RunningGameStore.getGameForPID
            RunningGameStore.getRunningGames = () => fakeGames
            RunningGameStore.getGameForPID = (pid) => fakeGames.find(x => x.pid === pid)
            FluxDispatcher.dispatch({type: "RUNNING_GAMES_CHANGE", removed: realGames, added: [fakeGame], games: fakeGames})
            
            let fn = data => {
                let progress = quest.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP.value)
                console.log(`Quest progress: ${progress}/${secondsNeeded}`)
                
                if(progress >= secondsNeeded) {
                    console.log("Quest completed!")
                    
                    RunningGameStore.getRunningGames = realGetRunningGames
                    RunningGameStore.getGameForPID = realGetGameForPID
                    FluxDispatcher.dispatch({type: "RUNNING_GAMES_CHANGE", removed: [fakeGame], added: [], games: []})
                    FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn)
                }
            }
            FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn)
            
            console.log(`Spoofed your game to ${applicationName}. Wait for ${Math.ceil((secondsNeeded - secondsDone) / 60)} more minutes.`)
        })
    } else if(taskName === "STREAM_ON_DESKTOP") {
        if(!isApp) {
            console.log("This no longer works in browser for non-video quests. Use the desktop app to complete the", applicationName, "quest!")
        }
        
        let realFunc = ApplicationStreamingStore.getStreamerActiveStreamMetadata
        ApplicationStreamingStore.getStreamerActiveStreamMetadata = () => ({
            id: applicationId,
            pid,
            sourceName: null
        })
        
        let fn = data => {
            let progress = quest.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress.STREAM_ON_DESKTOP.value)
            console.log(`Quest progress: ${progress}/${secondsNeeded}`)
            
            if(progress >= secondsNeeded) {
                console.log("Quest completed!")
                
                ApplicationStreamingStore.getStreamerActiveStreamMetadata = realFunc
                FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn)
            }
        }
        FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", fn)
        
        console.log(`Spoofed your stream to ${applicationName}. Stream any window in vc for ${Math.ceil((secondsNeeded - secondsDone) / 60)} more minutes.`)
        console.log("Remember that you need at least 1 other person to be in the vc!")
    } else if(taskName === "PLAY_ACTIVITY") {
        const channelId = ChannelStore.getSortedPrivateChannels()[0]?.id ?? Object.values(GuildChannelStore.getAllGuilds()).find(x => x != null && x.VOCAL.length > 0).VOCAL[0].channel.id
        const streamKey = `call:${channelId}:1`
        
        let fn = async () => {
            console.log("Completing quest", applicationName, "-", quest.config.messages.questName)
            
            while(true) {
                const res = await api.post({url: `/quests/${quest.id}/heartbeat`, body: {stream_key: streamKey, terminal: false}})
                const progress = res.body.progress.PLAY_ACTIVITY.value
                console.log(`Quest progress: ${progress}/${secondsNeeded}`)
                
                await new Promise(resolve => setTimeout(resolve, 20 * 1000))
                
                if(progress >= secondsNeeded) {
                    await api.post({url: `/quests/${quest.id}/heartbeat`, body: {stream_key: streamKey, terminal: true}})
                    break
                }
            }
            
            console.log("Quest completed!")
        }
        fn()
    }
}",
        type: "code",
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
