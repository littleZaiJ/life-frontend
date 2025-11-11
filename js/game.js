export default class LifeDiaryGame {
    constructor() {
        this.gameState = {
            currentIsland: 'menu',
            playerData: null,
            lifeCountdown: 0,
            deathDate: null,
            ghostIndex: 0,
            currentHellLevel: 1,
            reincarnationWish: '',
            diaryEntries: [],
            timeMachineExperiences: [],
            memorialData: null,
            lifeValue: 100,
            soulEnergy: 100,
            evolutionPoints: 0,
            gameScores: {
                lifeSimulator: 0,
                memoryPuzzle: 0,
                timeChallenge: 0,
                hellEscape: 0,
                soulCollection: 0,
                redemptionChallenge: 0,
                reincarnationSimulator: 0,
                evolutionGame: 0,
                survivalChallenge: 0
            }
        };
        
        this.isIntroReincarnation = false;
        
        this.hellLevels = [
            '拔舌地狱', '剪刀地狱', '铁树地狱', '孽镜地狱', '蒸笼地狱', '铜柱地狱',
            '刀山地狱', '冰山地狱', '油锅地狱', '牛坑地狱', '石压地狱', '舂臼地狱',
            '血池地狱', '枉死地狱', '磔刑地狱', '火山地狱', '石磨地狱', '刀锯地狱'
        ];
        
        // 人类投胎选项
        this.humanReincarnations = [
            {
                country: '中国',
                family: '富裕家庭',
                location: '北京',
                description: '出生在首都的富裕家庭，享受优质教育和生活条件',
                emoji: '🏮',
                advantages: ['优质教育', '丰富资源', '良好人脉'],
                challenges: ['高期望', '竞争激烈', '压力较大']
            },
            {
                country: '美国',
                family: '中产阶级',
                location: '纽约',
                description: '生活在大都市的中产阶级家庭，追求美国梦',
                emoji: '🗽',
                advantages: ['多元文化', '机会众多', '自由度高'],
                challenges: ['生活成本高', '文化差异', '竞争激烈']
            },
            {
                country: '日本',
                family: '工薪家庭',
                location: '东京',
                description: '在东京的普通工薪家庭长大，体验日本文化',
                emoji: '🏯',
                advantages: ['安全环境', '优质教育', '科技发达'],
                challenges: ['工作压力', '社会规范', '生活节奏快']
            },
            {
                country: '印度',
                family: '农村家庭',
                location: '孟买',
                description: '在印度大城市的农村移民家庭，体验文化融合',
                emoji: '🕌',
                advantages: ['文化丰富', '家庭温暖', '坚韧品格'],
                challenges: ['教育资源有限', '经济压力', '社会差距']
            },
            {
                country: '巴西',
                family: '艺术家庭',
                location: '里约热内卢',
                description: '在充满活力的艺术家庭中成长，感受南美热情',
                emoji: '🌴',
                advantages: ['艺术氛围', '热情文化', '自然美景'],
                challenges: ['社会不稳定', '教育资源', '经济波动']
            }
        ];

        // 动物投胎选项
        this.animalReincarnations = [
            {
                species: '狮子',
                habitat: '非洲草原',
                location: '肯尼亚马赛马拉',
                description: '成为草原之王，统领狮群，体验野性生活',
                emoji: '🦁',
                advantages: ['强大力量', '领导地位', '自由生活'],
                challenges: ['生存竞争', '领地争夺', '气候变化']
            },
            {
                species: '海豚',
                habitat: '海洋',
                location: '太平洋',
                description: '在广阔的海洋中自由游泳，体验海洋生活',
                emoji: '🐬',
                advantages: ['高智商', '群体生活', '海洋自由'],
                challenges: ['海洋污染', '气候变化', '人类威胁']
            },
            {
                species: '熊猫',
                habitat: '竹林',
                location: '中国四川',
                description: '在竹林中悠闲生活，成为国宝级动物',
                emoji: '🐼',
                advantages: ['备受保护', '生活悠闲', '特殊地位'],
                challenges: ['栖息地减少', '繁殖困难', '气候变化']
            },
            {
                species: '老鹰',
                habitat: '高山',
                location: '喜马拉雅山脉',
                description: '翱翔在天空之巅，俯瞰大地，体验自由飞翔',
                emoji: '🦅',
                advantages: ['视野广阔', '自由飞翔', '强大捕猎'],
                challenges: ['气候变化', '栖息地破坏', '人类干扰']
            },
            {
                species: '企鹅',
                habitat: '南极',
                location: '南极洲',
                description: '在南极的冰雪世界中生活，体验极地生活',
                emoji: '🐧',
                advantages: ['群体温暖', '独特环境', '适应性强'],
                challenges: ['气候变化', '栖息地减少', '食物短缺']
            }
        ];

        // 其他玩家数据（模拟）
        this.otherPlayers = [
            { name: '小明', reincarnation: '中国-富裕家庭', location: '北京', status: '在线', avatar: '👨‍💼' },
            { name: 'Sarah', reincarnation: '美国-中产阶级', location: '纽约', status: '在线', avatar: '👩‍💻' },
            { name: '田中', reincarnation: '日本-工薪家庭', location: '东京', status: '离线', avatar: '👨‍🎓' },
            { name: 'Priya', reincarnation: '印度-农村家庭', location: '孟买', status: '在线', avatar: '👩‍🎨' },
            { name: 'Carlos', reincarnation: '巴西-艺术家庭', location: '里约热内卢', status: '离线', avatar: '👨‍🎨' },
            { name: 'Leo', reincarnation: '狮子-非洲草原', location: '肯尼亚', status: '在线', avatar: '🦁' },
            { name: 'Dolphin', reincarnation: '海豚-海洋', location: '太平洋', status: '在线', avatar: '🐬' },
            { name: 'Panda', reincarnation: '熊猫-竹林', location: '四川', status: '离线', avatar: '🐼' }
        ];
        
        // 生命模拟器数据
        this.lifeScenarios = [
            {
                id: 1,
                title: '职业选择',
                description: '你刚毕业，面临三个工作机会：',
                choices: [
                    { text: '高薪但压力大的金融工作', consequence: '获得金钱但失去健康', lifeChange: -10, moneyChange: 50 },
                    { text: '低薪但有意义的教育工作', consequence: '帮助他人但经济拮据', lifeChange: 15, moneyChange: -20 },
                    { text: '创业，风险与机遇并存', consequence: '可能成功也可能失败', lifeChange: 5, moneyChange: 0 }
                ]
            },
            {
                id: 2,
                title: '人际关系',
                description: '朋友向你借钱，但你手头也不宽裕：',
                choices: [
                    { text: '借钱给朋友', consequence: '帮助了朋友但自己困难', lifeChange: 10, moneyChange: -30 },
                    { text: '委婉拒绝', consequence: '保护了自己但可能失去朋友', lifeChange: -5, moneyChange: 0 },
                    { text: '提供其他帮助', consequence: '既帮助了朋友又保护了自己', lifeChange: 5, moneyChange: -10 }
                ]
            },
            {
                id: 3,
                title: '健康选择',
                description: '医生建议你改变生活方式：',
                choices: [
                    { text: '立即开始健康生活', consequence: '身体变好但需要坚持', lifeChange: 20, moneyChange: -10 },
                    { text: '慢慢改变', consequence: '渐进式改善', lifeChange: 10, moneyChange: -5 },
                    { text: '继续现在的生活方式', consequence: '短期舒适但长期风险', lifeChange: -15, moneyChange: 0 }
                ]
            }
        ];
        
        // 记忆拼图数据
        this.memoryPuzzles = [
            {
                id: 1,
                title: '童年记忆',
                pieces: ['🏠', '👶', '🎈', '🍭', '🐱', '🌳', '☀️', '🎪', '👨‍👩‍👧‍👦', '🎂', '🎁', '🌟', '🌈', '🦄', '🎨', '📚'],
                timeLimit: 60
            },
            {
                id: 2,
                title: '青春岁月',
                pieces: ['🎓', '👫', '🎵', '🎮', '📱', '💕', '🌙', '⭐', '🎭', '📸', '🍕', '🎪', '🏃‍♂️', '💪', '🎯', '🚀'],
                timeLimit: 45
            },
            {
                id: 3,
                title: '人生感悟',
                pieces: ['💭', '🤔', '😊', '😢', '💪', '🌟', '❤️', '🎯', '🌈', '🦋', '🌅', '🌙', '💎', '🎨', '📖', '🔮'],
                timeLimit: 30
            }
        ];
        
        // 时间管理任务
        this.timeTasks = [
            { id: 1, title: '完成工作报告', priority: 'high', timeRequired: 120, reward: 20 },
            { id: 2, title: '锻炼身体', priority: 'medium', timeRequired: 60, reward: 15 },
            { id: 3, title: '阅读书籍', priority: 'low', timeRequired: 90, reward: 10 },
            { id: 4, title: '陪伴家人', priority: 'high', timeRequired: 180, reward: 25 },
            { id: 5, title: '学习新技能', priority: 'medium', timeRequired: 150, reward: 18 },
            { id: 6, title: '整理房间', priority: 'low', timeRequired: 45, reward: 8 }
        ];
        
        // 地狱逃脱迷宫
        this.hellMaze = [
            [1,1,1,1,1,1,1,1],
            [1,0,0,1,0,0,0,1],
            [1,0,1,1,0,1,0,1],
            [1,0,0,0,0,1,0,1],
            [1,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,2,1],
            [1,1,1,1,1,1,1,1]
        ]; // 0=路径, 1=墙, 2=出口
        
        // 生物进化树
        this.evolutionTree = [
            { stage: 1, name: '单细胞生物', emoji: '🦠', requirements: 0, unlocked: true },
            { stage: 2, name: '多细胞生物', emoji: '🪸', requirements: 50, unlocked: false },
            { stage: 3, name: '鱼类', emoji: '🐟', requirements: 100, unlocked: false },
            { stage: 4, name: '两栖动物', emoji: '🐸', requirements: 150, unlocked: false },
            { stage: 5, name: '爬行动物', emoji: '🦎', requirements: 200, unlocked: false },
            { stage: 6, name: '哺乳动物', emoji: '🐭', requirements: 250, unlocked: false },
            { stage: 7, name: '灵长类', emoji: '🐵', requirements: 300, unlocked: false },
            { stage: 8, name: '人类', emoji: '👤', requirements: 350, unlocked: false }
        ];
        
        this.initializeElements();
        this.bindEvents();
        this.loadGameData();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }
    
    initializeElements() {
        // 主菜单元素
        this.mainMenu = document.getElementById('mainMenu');
        this.startGameBtn = document.getElementById('startGameBtn');
        this.loadGameBtn = document.getElementById('loadGameBtn');
        
        // 问答界面元素
        this.questionnaire = document.getElementById('questionnaire');
        this.submitQuestionnaireBtn = document.getElementById('submitQuestionnaire');
        
        // 生灵岛元素
        this.livingIsland = document.getElementById('livingIsland');
        this.lifeCountdownDisplay = document.getElementById('lifeCountdown');
        this.currentTimeDisplay = document.getElementById('currentTime');
        this.backToMenuBtn = document.getElementById('backToMenu');
        
        // 幽灵岛元素
        this.ghostIsland = document.getElementById('ghostIsland');
        this.ghostIndexDisplay = document.getElementById('ghostIndex');
        this.currentLevelDisplay = document.getElementById('currentLevel');
        this.backToMenuGhostBtn = document.getElementById('backToMenuGhost');
        
        // 怪趣岛元素
        this.creatureIsland = document.getElementById('creatureIsland');
        this.currentFormDisplay = document.getElementById('currentForm');
        this.reincarnationVotesDisplay = document.getElementById('reincarnationVotes');
        this.creatureSprite = document.getElementById('creatureSprite');
        this.creatureName = document.getElementById('creatureName');
        this.creatureDescription = document.getElementById('creatureDescription');
        this.backToMenuCreatureBtn = document.getElementById('backToMenuCreature');
        
        // 岛屿状态显示
        this.livingStatus = document.getElementById('livingStatus');
        this.ghostStatus = document.getElementById('ghostStatus');
        this.creatureStatus = document.getElementById('creatureStatus');
    }
    
    bindEvents() {
        // 主菜单事件
        this.startGameBtn.addEventListener('click', () => this.startNewGame());
        this.loadGameBtn.addEventListener('click', () => this.loadGame());
        
        // 问答界面事件
        this.submitQuestionnaireBtn.addEventListener('click', () => this.submitQuestionnaire());
        
        // 返回按钮事件
        this.backToMenuBtn.addEventListener('click', () => this.showMainMenu());
        this.backToMenuGhostBtn.addEventListener('click', () => this.showMainMenu());
        this.backToMenuCreatureBtn.addEventListener('click', () => this.showMainMenu());
        
        // 岛屿卡片点击事件
        document.querySelectorAll('.island-card').forEach(card => {
            card.addEventListener('click', () => {
                const island = card.dataset.island;
                this.enterIsland(island);
            });
        });
        
        // 地点卡片点击事件
        document.querySelectorAll('.location-card').forEach(card => {
            card.addEventListener('click', () => {
                const location = card.dataset.location;
                this.enterLocation(location);
            });
        });
        
        // 地狱层级点击事件
        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', () => {
                const level = parseInt(card.dataset.level);
                this.enterHellLevel(level);
            });
        });
    }
    
    startNewGame() {
        this.showQuestionnaire();
    }
    
    showQuestionnaire() {
        this.mainMenu.style.display = 'none';
        this.questionnaire.style.display = 'block';
        this.gameState.currentIsland = 'questionnaire';
    }
    
    submitQuestionnaire() {
        // 收集问答数据
        const playerData = {
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            profession: document.getElementById('profession').value,
            lifeMeaning: document.getElementById('lifeMeaning').value,
            deathAttitude: document.getElementById('deathAttitude').value,
            deathCause: document.getElementById('deathCause').value,
            deathDays: parseInt(document.getElementById('deathDays').value),
            reincarnationWish: document.getElementById('reincarnationWish').value,
            startTime: new Date()
        };
        
        // 验证必填字段
        if (!playerData.age || !playerData.gender || !playerData.deathDays) {
            alert('请填写所有必填信息');
            return;
        }
        
        // 保存玩家数据
        this.gameState.playerData = playerData;
        this.gameState.lifeCountdown = playerData.deathDays;
        this.gameState.deathDate = new Date(Date.now() + playerData.deathDays * 24 * 60 * 60 * 1000);
        this.gameState.reincarnationWish = playerData.reincarnationWish;
        
        // 保存到本地存储
        this.saveGameData();
        
        // 进入生灵岛
        this.enterLivingIsland();
    }
    
    enterLivingIsland() {
        // 如果没有玩家数据，创建默认数据（开发模式）
        if (!this.gameState.playerData) {
            this.gameState.playerData = {
                age: 25,
                gender: 'male',
                profession: '开发者',
                lifeMeaning: '探索和创造',
                deathAttitude: 'peaceful',
                deathCause: 'natural',
                deathDays: 365,
                reincarnationWish: '继续探索世界',
                startTime: new Date()
            };
            this.gameState.lifeCountdown = 365;
            this.gameState.deathDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
            this.gameState.lifeValue = 100;
        }
        
        this.questionnaire.style.display = 'none';
        this.livingIsland.style.display = 'block';
        this.gameState.currentIsland = 'living';
        
        // 更新岛屿状态
        this.livingStatus.textContent = '进行中';
        this.livingStatus.classList.add('unlocked');
        
        // 开始生命倒计时
        this.startLifeCountdown();
        
        // 更新UI
        this.updateLivingIslandUI();
    }
    
    startLifeCountdown() {
        this.updateLifeCountdown();
        setInterval(() => this.updateLifeCountdown(), 1000);
    }
    
    updateLifeCountdown() {
        if (!this.gameState.deathDate) return;
        
        const now = new Date();
        const timeLeft = this.gameState.deathDate - now;
        
        if (timeLeft <= 0) {
            // 生命结束，进入幽灵岛
            this.die();
            return;
        }
        
        const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
        this.lifeCountdownDisplay.textContent = `${daysLeft}天`;
        
        // 根据剩余时间改变颜色
        if (daysLeft <= 7) {
            this.lifeCountdownDisplay.style.color = '#ff4757';
        } else if (daysLeft <= 30) {
            this.lifeCountdownDisplay.style.color = '#ffa502';
        } else {
            this.lifeCountdownDisplay.style.color = '#4ecdc4';
        }
    }
    
    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        if (this.currentTimeDisplay) {
            this.currentTimeDisplay.textContent = timeString;
        }
    }
    
    updateLivingIslandUI() {
        // 更新生命倒计时显示
        this.updateLifeCountdown();
        
        // 更新当前时间
        this.updateTime();
    }
    
    die() {
        // 计算幽灵指数
        this.calculateGhostIndex();
        
        // 进入幽灵岛
        this.enterGhostIsland();
    }
    
    calculateGhostIndex() {
        // 基于玩家行为和问答结果计算幽灵指数
        let ghostIndex = 50; // 基础指数
        
        // 根据死亡态度调整
        const deathAttitude = this.gameState.playerData.deathAttitude;
        switch (deathAttitude) {
            case 'fear':
                ghostIndex += 20;
                break;
            case 'accept':
                ghostIndex -= 10;
                break;
            case 'peaceful':
                ghostIndex -= 20;
                break;
        }
        
        // 根据日记完成度调整
        ghostIndex -= this.gameState.diaryEntries.length * 2;
        
        // 根据人生体验完成度调整
        ghostIndex -= this.gameState.timeMachineExperiences.length * 5;
        
        this.gameState.ghostIndex = Math.max(0, Math.min(100, ghostIndex));
    }
    
    enterGhostIsland() {
        // 开发模式：设置默认幽灵数据
        if (this.gameState.ghostIndex === 0) {
            this.gameState.ghostIndex = 50;
            this.gameState.currentHellLevel = 1;
            this.gameState.soulEnergy = 100;
        }
        
        this.livingIsland.style.display = 'none';
        this.ghostIsland.style.display = 'block';
        this.gameState.currentIsland = 'ghost';
        
        // 更新岛屿状态
        this.ghostStatus.textContent = '进行中';
        this.ghostStatus.classList.add('unlocked');
        
        // 更新UI
        this.updateGhostIslandUI();
    }
    
    updateGhostIslandUI() {
        this.ghostIndexDisplay.textContent = this.gameState.ghostIndex;
        this.currentLevelDisplay.textContent = `第${this.gameState.currentHellLevel}层`;
        
        // 根据幽灵指数确定起始层级
        const startLevel = Math.ceil((100 - this.gameState.ghostIndex) / 100 * 18);
        this.gameState.currentHellLevel = Math.max(1, startLevel);
    }
    
    enterHellLevel(level) {
        if (level > this.gameState.currentHellLevel) {
            alert('你还没有到达这一层');
            return;
        }
        
        this.gameState.currentHellLevel = level;
        this.currentLevelDisplay.textContent = `第${level}层`;
        
        // 显示层级信息
        const levelName = this.hellLevels[level - 1];
        alert(`你进入了${levelName}`);
    }
    
    enterIsland(island) {
        switch (island) {
            case 'living':
                if (this.gameState.playerData) {
                    this.enterLivingIsland();
                } else {
                    // 开发模式：直接进入生灵岛
                    this.enterLivingIsland();
                }
                break;
            case 'ghost':
                // 开发模式：直接进入幽灵岛
                    this.enterGhostIsland();
                break;
            case 'creature':
                // 开发模式：直接进入怪趣岛
                    this.enterCreatureIsland();
                break;
        }
    }
    
    enterCreatureIsland() {
        // 开发模式：设置默认怪趣岛数据
        if (this.gameState.evolutionPoints === 0) {
            this.gameState.evolutionPoints = 100;
        }
        
        this.ghostIsland.style.display = 'none';
        this.creatureIsland.style.display = 'block';
        this.gameState.currentIsland = 'creature';
        
        // 更新岛屿状态
        this.creatureStatus.textContent = '进行中';
        this.creatureStatus.classList.add('unlocked');
        
        // 随机选择投胎形态
        this.reincarnate();
    }
    
    reincarnate() {
        const randomCreature = this.creatureForms[Math.floor(Math.random() * this.creatureForms.length)];
        
        this.creatureSprite.textContent = randomCreature.emoji;
        this.creatureName.textContent = randomCreature.name;
        this.creatureDescription.textContent = randomCreature.description;
        this.currentFormDisplay.textContent = randomCreature.name;
        
        // 模拟投胎票数
        const votes = Math.floor(Math.random() * 100) + 1;
        this.reincarnationVotesDisplay.textContent = votes;
    }
    
    enterLocation(location) {
        switch (location) {
            case 'memorial':
                this.showMemorialCommunity();
                break;
            case 'timeMachine':
                this.showTimeMachine();
                break;
            case 'myHouse':
                this.showMyHouse();
                break;
            case 'beach':
                this.showBeach();
                break;
            case 'lifeSimulator':
                this.showLifeSimulator();
                break;
            case 'memoryPuzzle':
                this.showMemoryPuzzle();
                break;
            case 'timeChallenge':
                this.showTimeChallenge();
                break;
            case 'hellEscape':
                this.showHellEscape();
                break;
            case 'soulCollection':
                this.showSoulCollection();
                break;
            case 'redemptionChallenge':
                this.showRedemptionChallenge();
                break;
            case 'ghostMemory':
                this.showGhostMemory();
                break;
            case 'reincarnationSimulator':
                this.showReincarnationSimulator();
                break;
            case 'evolutionGame':
                this.showEvolutionGame();
                break;
            case 'survivalChallenge':
                this.showSurvivalChallenge();
                break;
            case 'creatureCollection':
                this.showCreatureCollection();
                break;
        }
    }
    
    showMemorialCommunity() {
        // 创建墓志铭社区界面
        this.createMemorialCommunityModal();
    }
    
    showTimeMachine() {
        if (this.gameState.timeMachineExperiences.length >= 3) {
            alert('你已经体验了3次人生穿越，无法再次使用。');
            return;
        }
        
        const experiences = [
            '体验成为一名医生，拯救生命',
            '体验成为一名教师，培育未来',
            '体验成为一名艺术家，创造美丽',
            '体验成为一名科学家，探索真理',
            '体验成为一名农民，耕耘大地'
        ];
        
        const randomExperience = experiences[Math.floor(Math.random() * experiences.length)];
        this.gameState.timeMachineExperiences.push(randomExperience);
        
        alert(`人生穿越体验：${randomExperience}\n\n完成度：${Math.floor(Math.random() * 40) + 60}%\n态度：${Math.random() > 0.5 ? '积极' : '消极'}`);
        
        this.saveGameData();
    }
    
    showMyHouse() {
        const diaryEntry = prompt('记录你的生命日记：\n（记录你的感受、想法和体验）');
        if (diaryEntry) {
            this.gameState.diaryEntries.push({
                content: diaryEntry,
                timestamp: new Date(),
                location: '我的小屋'
            });
            this.saveGameData();
            alert('日记已保存！');
        }
    }
    
    showBeach() {
        const bottles = [
            '一个来自未来的漂流瓶：科技将改变一切',
            '一个来自过去的漂流瓶：珍惜当下时光',
            '一个来自远方的漂流瓶：世界很大，值得探索',
            '一个神秘的漂流瓶：生命的意义在于给予',
            '一个温暖的漂流瓶：爱是世界上最强大的力量'
        ];
        
        const randomBottle = bottles[Math.floor(Math.random() * bottles.length)];
        alert(`你在海边发现了一个漂流瓶：\n\n${randomBottle}`);
    }
    
    showMainMenu() {
        // 隐藏所有岛屿界面
        this.questionnaire.style.display = 'none';
        this.livingIsland.style.display = 'none';
        this.ghostIsland.style.display = 'none';
        this.creatureIsland.style.display = 'none';
        
        // 显示主菜单
        this.mainMenu.style.display = 'block';
        this.gameState.currentIsland = 'menu';
        
        // 更新岛屿状态
        this.updateIslandStatus();
    }
    
    updateIslandStatus() {
        // 开发模式：所有岛都显示为已解锁
            this.livingStatus.textContent = '已解锁';
            this.livingStatus.classList.add('unlocked');
        
            this.ghostStatus.textContent = '已解锁';
            this.ghostStatus.classList.add('unlocked');
        
            this.creatureStatus.textContent = '已解锁';
            this.creatureStatus.classList.add('unlocked');
    }
    
    loadGame() {
        if (this.gameState.playerData) {
            this.showMainMenu();
        } else {
            alert('没有找到游戏存档');
        }
    }
    
    saveGameData() {
        localStorage.setItem('lifeDiaryGame', JSON.stringify(this.gameState));
    }
    
    loadGameData() {
        const savedData = localStorage.getItem('lifeDiaryGame');
        if (savedData) {
            this.gameState = { ...this.gameState, ...JSON.parse(savedData) };
            this.updateIslandStatus();
        }
    }
    
    // 墓志铭社区相关方法
    createMemorialCommunityModal() {
        const modal = document.createElement('div');
        modal.className = 'memorial-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>墓志铭社区</h3>
                    <button class="close-btn" onclick="this.closest('.memorial-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="memorial-tabs">
                        <button class="tab-btn active" data-tab="browse">浏览墓志铭</button>
                        <button class="tab-btn" data-tab="create">发布墓志铭</button>
                    </div>
                    
                    <div class="tab-content" id="browse-tab">
                        <div class="memorial-filters">
                            <input type="text" id="search-input" placeholder="搜索墓志铭...">
                            <select id="sort-select">
                                <option value="latest">最新</option>
                                <option value="popular">热门</option>
                            </select>
                        </div>
                        <div class="memorial-list" id="memorial-list">
                            <div class="loading">加载中...</div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="create-tab" style="display: none;">
                        <form id="memorial-form">
                            <div class="form-group">
                                <label>标题：</label>
                                <input type="text" id="memorial-title" placeholder="请输入墓志铭标题" required>
                            </div>
                            <div class="form-group">
                                <label>内容：</label>
                                <textarea id="memorial-content" placeholder="请写下你的墓志铭内容..." required></textarea>
                            </div>
                            <div class="form-group">
                                <label>摘要：</label>
                                <textarea id="memorial-summary" placeholder="简要描述（可选）"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">发布墓志铭</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.bindMemorialModalEvents(modal);
        this.loadMemorials();
    }
    
    bindMemorialModalEvents(modal) {
        // 标签切换
        modal.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchMemorialTab(tab);
            });
        });
        
        // 发布墓志铭表单
        const form = modal.querySelector('#memorial-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitMemorial();
        });
    }
    
    switchMemorialTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = content.id === `${tab}-tab` ? 'block' : 'none';
        });
        
        if (tab === 'browse') {
            this.loadMemorials();
        }
    }
    
    async loadMemorials() {
        try {
            const response = await fetch('http://localhost:8080/api/memorials/latest?page=0&size=10');
            const data = await response.json();
            
            const memorialList = document.getElementById('memorial-list');
            if (data.content && data.content.length > 0) {
                memorialList.innerHTML = data.content.map(memorial => this.createMemorialCard(memorial)).join('');
            } else {
                memorialList.innerHTML = '<div class="no-data">暂无墓志铭</div>';
            }
        } catch (error) {
            console.error('加载墓志铭失败:', error);
            document.getElementById('memorial-list').innerHTML = '<div class="error">加载失败，请稍后重试</div>';
        }
    }
    
    createMemorialCard(memorial) {
        return `
            <div class="memorial-card" data-id="${memorial.id}">
                <div class="memorial-header">
                    <h4>${memorial.title}</h4>
                    <div class="memorial-meta">
                        <span class="author">${memorial.author.nickname || memorial.author.username}</span>
                        <span class="date">${new Date(memorial.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="memorial-content">
                    <p>${memorial.summary || memorial.content.substring(0, 100) + '...'}</p>
                </div>
                <div class="memorial-footer">
                    <div class="memorial-stats">
                        <span class="views">👁️ ${memorial.viewCount || 0}</span>
                        <span class="likes">❤️ ${memorial.likeCount || 0}</span>
                        <span class="comments">💬 ${memorial.commentCount || 0}</span>
                    </div>
                    <div class="memorial-actions">
                        <button class="btn-like" onclick="game.toggleMemorialLike(${memorial.id})">点赞</button>
                        <button class="btn-comment" onclick="game.showMemorialDetail(${memorial.id})">查看详情</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    async submitMemorial() {
        const title = document.getElementById('memorial-title').value;
        const content = document.getElementById('memorial-content').value;
        const summary = document.getElementById('memorial-summary').value;
        
        if (!title || !content) {
            alert('请填写标题和内容');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:8080/api/memorials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    summary
                })
            });
            
            if (response.ok) {
                alert('墓志铭发布成功！');
                document.getElementById('memorial-form').reset();
                this.switchMemorialTab('browse');
                this.loadMemorials();
            } else {
                alert('发布失败，请稍后重试');
            }
        } catch (error) {
            console.error('发布墓志铭失败:', error);
            alert('发布失败，请检查网络连接');
        }
    }
    
    async toggleMemorialLike(memorialId) {
        try {
            const response = await fetch(`http://localhost:8080/api/memorials/${memorialId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.ok) {
                this.loadMemorials();
            }
        } catch (error) {
            console.error('点赞失败:', error);
        }
    }
    
    showMemorialDetail(memorialId) {
        alert('墓志铭详情功能开发中...');
    }
    
    // 生灵岛游戏方法
    showLifeSimulator() {
        this.createLifeSimulatorModal();
    }
    
    createLifeSimulatorModal() {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>生命模拟器</h3>
                    <button class="close-btn" onclick="this.closest('.game-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="game-instructions">
                        <h4>🎮 游戏说明</h4>
                        <p>体验不同的人生选择，每个选择都会影响你的生命值、金钱和幸福度。通过3个不同的人生场景，学会权衡利弊，做出明智的决定。</p>
                        <ul>
                            <li>📊 关注三个属性：生命值、金钱、幸福度</li>
                            <li>🤔 仔细考虑每个选择的后果</li>
                            <li>⚖️ 平衡短期利益与长期影响</li>
                            <li>🎯 目标是获得最高的综合得分</li>
                        </ul>
                    </div>
                    <div class="life-simulator">
                        <div class="life-stats">
                            <div class="stat-item">
                                <span class="stat-label">生命值</span>
                                <span class="stat-value" id="simLifeValue">${this.gameState.lifeValue}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">金钱</span>
                                <span class="stat-value" id="simMoney">1000</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">幸福度</span>
                                <span class="stat-value" id="simHappiness">80</span>
                            </div>
                        </div>
                        
                        <div class="life-scenario" id="currentScenario">
                            <h4 id="scenarioTitle">选择你的人生道路</h4>
                            <p id="scenarioDescription">点击开始按钮开始体验不同的人生选择</p>
                            <div class="life-choices" id="scenarioChoices">
                                <button class="choice-btn" onclick="game.startLifeSimulator()">开始人生体验</button>
                            </div>
                        </div>
                        
                        <div class="life-consequence" id="consequence" style="display: none;">
                            <h4>选择结果</h4>
                            <p id="consequenceText"></p>
                            <button class="btn btn-primary" onclick="game.nextLifeScenario()">继续下一个选择</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.currentScenarioIndex = 0;
        this.simStats = {
            life: this.gameState.lifeValue,
            money: 1000,
            happiness: 80
        };
    }
    
    startLifeSimulator() {
        if (this.currentScenarioIndex >= this.lifeScenarios.length) {
            this.endLifeSimulator();
            return;
        }
        
        const scenario = this.lifeScenarios[this.currentScenarioIndex];
        const scenarioDiv = document.getElementById('currentScenario');
        const choicesDiv = document.getElementById('scenarioChoices');
        
        document.getElementById('scenarioTitle').textContent = scenario.title;
        document.getElementById('scenarioDescription').textContent = scenario.description;
        
        choicesDiv.innerHTML = scenario.choices.map((choice, index) => 
            `<button class="choice-btn" onclick="game.makeLifeChoice(${index})">${choice.text}</button>`
        ).join('');
    }
    
    makeLifeChoice(choiceIndex) {
        const scenario = this.lifeScenarios[this.currentScenarioIndex];
        const choice = scenario.choices[choiceIndex];
        
        // 更新统计数据
        this.simStats.life = Math.max(0, Math.min(100, this.simStats.life + choice.lifeChange));
        this.simStats.money = Math.max(0, this.simStats.money + choice.moneyChange);
        this.simStats.happiness = Math.max(0, Math.min(100, this.simStats.happiness + (choice.lifeChange * 0.5)));
        
        // 更新显示
        document.getElementById('simLifeValue').textContent = this.simStats.life;
        document.getElementById('simMoney').textContent = this.simStats.money;
        document.getElementById('simHappiness').textContent = this.simStats.happiness;
        
        // 显示结果
        const consequenceDiv = document.getElementById('consequence');
        const consequenceText = document.getElementById('consequenceText');
        
        consequenceText.textContent = choice.consequence;
        consequenceDiv.style.display = 'block';
        document.getElementById('currentScenario').style.display = 'none';
        
        // 更新游戏分数
        this.gameState.gameScores.lifeSimulator += Math.abs(choice.lifeChange) + Math.abs(choice.moneyChange);
    }
    
    nextLifeScenario() {
        this.currentScenarioIndex++;
        document.getElementById('consequence').style.display = 'none';
        document.getElementById('currentScenario').style.display = 'block';
        this.startLifeSimulator();
    }
    
    endLifeSimulator() {
        const modal = document.querySelector('.game-modal');
        const scenarioDiv = document.getElementById('currentScenario');
        
        scenarioDiv.innerHTML = `
            <h4>人生体验结束</h4>
            <p>恭喜你完成了人生模拟体验！</p>
            <div class="final-stats">
                <p>最终生命值: ${this.simStats.life}</p>
                <p>最终金钱: ${this.simStats.money}</p>
                <p>最终幸福度: ${this.simStats.happiness}</p>
                <p>总得分: ${this.gameState.gameScores.lifeSimulator}</p>
            </div>
            <button class="btn btn-primary" onclick="this.closest('.game-modal').remove()">关闭</button>
        `;
        
        this.saveGameData();
    }
    
    showMemoryPuzzle() {
        this.createMemoryPuzzleModal();
    }
    
    createMemoryPuzzleModal() {
        const puzzle = this.memoryPuzzles[Math.floor(Math.random() * this.memoryPuzzles.length)];
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>记忆拼图 - ${puzzle.title}</h3>
                    <button class="close-btn" onclick="this.closest('.game-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="game-instructions">
                        <h4>🎮 游戏说明</h4>
                        <p>通过匹配相同的记忆片段来拼凑人生回忆。在规定时间内找到所有匹配的图案，训练你的记忆力和反应速度。</p>
                        <ul>
                            <li>🕐 时间限制：${puzzle.timeLimit}秒</li>
                            <li>🎯 目标：匹配所有${puzzle.pieces.length}个图案</li>
                            <li>🖱️ 操作：点击两个相同的图案进行匹配</li>
                            <li>💡 技巧：记住图案位置，快速匹配</li>
                            <li>🏆 得分：每个匹配获得10分</li>
                        </ul>
                    </div>
                    <div class="memory-puzzle">
                        <div class="puzzle-timer" id="puzzleTimer">剩余时间: ${puzzle.timeLimit}秒</div>
                        <div class="puzzle-grid" id="puzzleGrid"></div>
                        <div class="puzzle-score">
                            <p>已匹配: <span id="matchedCount">0</span> / ${puzzle.pieces.length}</p>
                            <p>得分: <span id="puzzleScore">0</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.initMemoryPuzzle(puzzle);
    }
    
    initMemoryPuzzle(puzzle) {
        const grid = document.getElementById('puzzleGrid');
        const shuffledPieces = [...puzzle.pieces].sort(() => Math.random() - 0.5);
        const matchedPairs = [];
        let matchedCount = 0;
        let score = 0;
        let timeLeft = puzzle.timeLimit;
        
        // 创建拼图网格
        shuffledPieces.forEach((piece, index) => {
            const pieceElement = document.createElement('div');
            pieceElement.className = 'puzzle-piece';
            pieceElement.textContent = piece;
            pieceElement.dataset.piece = piece;
            pieceElement.dataset.index = index;
            pieceElement.addEventListener('click', () => this.selectPuzzlePiece(pieceElement, matchedPairs, puzzle));
            grid.appendChild(pieceElement);
        });
        
        // 开始计时
        const timer = setInterval(() => {
            timeLeft--;
            document.getElementById('puzzleTimer').textContent = `剩余时间: ${timeLeft}秒`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                this.endMemoryPuzzle(matchedCount, puzzle.pieces.length, score);
            }
        }, 1000);
        
        this.puzzleTimer = timer;
        this.puzzleMatchedPairs = matchedPairs;
        this.puzzleMatchedCount = matchedCount;
        this.puzzleScore = score;
    }
    
    selectPuzzlePiece(pieceElement, matchedPairs, puzzle) {
        if (pieceElement.classList.contains('matched') || matchedPairs.length >= 2) return;
        
        pieceElement.classList.add('selected');
        matchedPairs.push(pieceElement);
        
        if (matchedPairs.length === 2) {
            const [piece1, piece2] = matchedPairs;
            
            if (piece1.dataset.piece === piece2.dataset.piece) {
                // 匹配成功
                piece1.classList.add('matched');
                piece2.classList.add('matched');
                this.puzzleMatchedCount++;
                this.puzzleScore += 10;
                
                document.getElementById('matchedCount').textContent = this.puzzleMatchedCount;
                document.getElementById('puzzleScore').textContent = this.puzzleScore;
                
                if (this.puzzleMatchedCount === puzzle.pieces.length) {
                    clearInterval(this.puzzleTimer);
                    this.endMemoryPuzzle(this.puzzleMatchedCount, puzzle.pieces.length, this.puzzleScore);
                }
            } else {
                // 匹配失败，延迟后重置
                setTimeout(() => {
                    piece1.classList.remove('selected');
                    piece2.classList.remove('selected');
                }, 1000);
            }
            
            matchedPairs.length = 0;
        }
    }
    
    endMemoryPuzzle(matched, total, score) {
        const modal = document.querySelector('.game-modal');
        const puzzleDiv = modal.querySelector('.memory-puzzle');
        
        puzzleDiv.innerHTML = `
            <h4>拼图完成！</h4>
            <p>匹配成功: ${matched}/${total}</p>
            <p>最终得分: ${score}</p>
            <p>完成度: ${Math.round((matched / total) * 100)}%</p>
            <button class="btn btn-primary" onclick="this.closest('.game-modal').remove()">关闭</button>
        `;
        
        this.gameState.gameScores.memoryPuzzle = Math.max(this.gameState.gameScores.memoryPuzzle, score);
        this.saveGameData();
    }
    
    showTimeChallenge() {
        this.createTimeChallengeModal();
    }
    
    createTimeChallengeModal() {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>时间管理挑战</h3>
                    <button class="close-btn" onclick="this.closest('.game-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="game-instructions">
                        <h4>🎮 游戏说明</h4>
                        <p>在5分钟内完成尽可能多的任务！学会合理安排时间，优先处理重要任务，提高工作效率。</p>
                        <ul>
                            <li>⏰ 时间限制：5分钟（300秒）</li>
                            <li>📋 任务类型：高、中、低优先级</li>
                            <li>🎯 目标：完成尽可能多的任务</li>
                            <li>💰 奖励：不同任务有不同分数</li>
                            <li>💡 策略：优先完成高分任务</li>
                        </ul>
                    </div>
                    <div class="time-challenge">
                        <div class="challenge-info">
                            <p>在有限的时间内完成尽可能多的任务！</p>
                            <p>剩余时间: <span id="challengeTime">300</span>秒</p>
                            <p>已完成任务: <span id="completedTasks">0</span></p>
                            <p>总得分: <span id="challengeScore">0</span></p>
                        </div>
                        <div class="challenge-tasks" id="challengeTasks"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.initTimeChallenge();
    }
    
    initTimeChallenge() {
        const tasksContainer = document.getElementById('challengeTasks');
        const shuffledTasks = [...this.timeTasks].sort(() => Math.random() - 0.5);
        let timeLeft = 300;
        let completedTasks = 0;
        let score = 0;
        
        // 创建任务卡片
        shuffledTasks.forEach((task, index) => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
                <div class="task-priority priority-${task.priority}">${task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}优先级</div>
                <h4>${task.title}</h4>
                <p>所需时间: ${task.timeRequired}秒</p>
                <p>奖励分数: ${task.reward}</p>
                <button class="action-btn" onclick="game.completeTask(${index}, ${task.timeRequired}, ${task.reward})" data-task-id="${index}">完成任务</button>
            `;
            taskCard.dataset.taskId = index;
            taskCard.dataset.timeRequired = task.timeRequired;
            taskCard.dataset.reward = task.reward;
            tasksContainer.appendChild(taskCard);
        });
        
        // 开始计时
        const timer = setInterval(() => {
            timeLeft--;
            document.getElementById('challengeTime').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                this.endTimeChallenge(completedTasks, score);
            }
        }, 1000);
        
        this.challengeTimer = timer;
        this.challengeCompletedTasks = completedTasks;
        this.challengeScore = score;
    }
    
    completeTask(taskIndex, timeRequired, reward) {
        const taskCard = document.querySelector(`[data-task-id="${taskIndex}"]`);
        if (taskCard.classList.contains('completed')) return;
        
        taskCard.classList.add('completed');
        taskCard.querySelector('.action-btn').disabled = true;
        taskCard.querySelector('.action-btn').textContent = '已完成';
        
        this.challengeCompletedTasks++;
        this.challengeScore += reward;
        
        document.getElementById('completedTasks').textContent = this.challengeCompletedTasks;
        document.getElementById('challengeScore').textContent = this.challengeScore;
    }
    
    endTimeChallenge(completed, score) {
        const modal = document.querySelector('.game-modal');
        const challengeDiv = modal.querySelector('.time-challenge');
        
        challengeDiv.innerHTML = `
            <h4>时间挑战结束！</h4>
            <p>完成任务: ${completed}</p>
            <p>最终得分: ${score}</p>
            <p>效率: ${Math.round((completed / this.timeTasks.length) * 100)}%</p>
            <button class="btn btn-primary" onclick="this.closest('.game-modal').remove()">关闭</button>
        `;
        
        this.gameState.gameScores.timeChallenge = Math.max(this.gameState.gameScores.timeChallenge, score);
        this.saveGameData();
    }
    
    // 幽灵岛游戏方法
    showHellEscape() {
        this.createHellEscapeModal();
    }
    
    createHellEscapeModal() {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>地狱逃脱</h3>
                    <button class="close-btn" onclick="this.closest('.game-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="game-instructions">
                        <h4>🎮 游戏说明</h4>
                        <p>在地狱迷宫中找到出口！点击相邻的空格移动，避开墙壁，用最少的步数到达金色的出口。</p>
                        <ul>
                            <li>🖱️ 操作：点击相邻的空格移动</li>
                            <li>🚫 障碍：红色格子是墙壁，不能通过</li>
                            <li>🏆 目标：到达金色出口</li>
                            <li>📊 计分：步数越少得分越高</li>
                            <li>🔄 重置：可以重新开始游戏</li>
                        </ul>
                    </div>
                    <div class="hell-escape">
                        <div class="escape-info">
                            <p>找到出口逃离地狱！点击相邻的空格移动</p>
                            <p>移动次数: <span id="moveCount">0</span></p>
                            <p>当前层级: <span id="currentHellLevel">${this.gameState.currentHellLevel}</span></p>
                        </div>
                        <div class="escape-maze" id="escapeMaze"></div>
                        <div class="escape-controls">
                            <button class="btn btn-secondary" onclick="game.resetHellEscape()">重新开始</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.initHellEscape();
    }
    
    initHellEscape() {
        const maze = document.getElementById('escapeMaze');
        const mazeData = this.hellMaze;
        let playerPos = { x: 1, y: 1 };
        let moveCount = 0;
        
        // 创建迷宫
        maze.innerHTML = '';
        for (let y = 0; y < mazeData.length; y++) {
            for (let x = 0; x < mazeData[y].length; x++) {
                const cell = document.createElement('div');
                cell.className = 'maze-cell';
                
                if (mazeData[y][x] === 1) {
                    cell.classList.add('wall');
                } else if (mazeData[y][x] === 2) {
                    cell.classList.add('exit');
                } else {
                    cell.classList.add('path');
                }
                
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.addEventListener('click', () => {
                    this.movePlayer(x, y, mazeData, this.hellEscapePlayerPos, this.hellEscapeMoveCount);
                });
                maze.appendChild(cell);
            }
        }
        
        // 设置玩家初始位置
        this.setPlayerPosition(playerPos.x, playerPos.y);
        this.hellEscapePlayerPos = playerPos;
        this.hellEscapeMoveCount = moveCount;
        this.hellEscapeMazeData = mazeData;
    }
    
    setPlayerPosition(x, y) {
        // 清除之前的玩家位置
        document.querySelectorAll('.maze-cell.player').forEach(cell => {
            cell.classList.remove('player');
        });
        
        // 设置新的玩家位置
        const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (cell && !cell.classList.contains('wall')) {
            cell.classList.add('player');
        }
    }
    
    movePlayer(targetX, targetY, mazeData, playerPos, moveCount) {
        const cell = document.querySelector(`[data-x="${targetX}"][data-y="${targetY}"]`);
        if (!cell || cell.classList.contains('wall')) return;
        
        // 检查是否相邻
        const dx = Math.abs(targetX - playerPos.x);
        const dy = Math.abs(targetY - playerPos.y);
        if (dx + dy !== 1) return;
        
        playerPos.x = targetX;
        playerPos.y = targetY;
        moveCount++;
        
        this.setPlayerPosition(targetX, targetY);
        document.getElementById('moveCount').textContent = moveCount;
        
        // 检查是否到达出口
        if (mazeData[targetY][targetX] === 2) {
            this.escapeHell(moveCount);
        }
        
        this.hellEscapePlayerPos = playerPos;
        this.hellEscapeMoveCount = moveCount;
    }
    
    escapeHell(moveCount) {
        const modal = document.querySelector('.game-modal');
        const escapeDiv = modal.querySelector('.hell-escape');
        
        escapeDiv.innerHTML = `
            <h4>恭喜逃脱！</h4>
            <p>你成功逃离了地狱！</p>
            <p>移动次数: ${moveCount}</p>
            <p>逃脱得分: ${Math.max(0, 100 - moveCount)}</p>
            <button class="btn btn-primary" onclick="this.closest('.game-modal').remove()">关闭</button>
        `;
        
        this.gameState.gameScores.hellEscape = Math.max(this.gameState.gameScores.hellEscape, Math.max(0, 100 - moveCount));
        this.saveGameData();
    }
    
    resetHellEscape() {
        this.initHellEscape();
    }
    
    showSoulCollection() {
        this.createSoulCollectionModal();
    }
    
    createSoulCollectionModal() {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>灵魂收集</h3>
                    <button class="close-btn" onclick="this.closest('.game-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="game-instructions">
                        <h4>🎮 游戏说明</h4>
                        <p>在60秒内收集尽可能多的灵魂！点击发光的灵魂进行收集，每个灵魂都有3秒的存在时间。</p>
                        <ul>
                            <li>⏰ 时间限制：60秒</li>
                            <li>🎯 目标：收集20个灵魂</li>
                            <li>🖱️ 操作：点击发光的灵魂收集</li>
                            <li>💫 灵魂：每3秒自动消失</li>
                            <li>🏆 得分：每个灵魂10分</li>
                        </ul>
                    </div>
                    <div class="soul-collection">
                        <div class="soul-score">
                            <p>已收集: <span id="soulsCollected">0</span> / 20</p>
                            <p>得分: <span id="soulScore">0</span></p>
                            <p>剩余时间: <span id="soulTime">60</span>秒</p>
                        </div>
                        <div class="soul-field" id="soulField"></div>
                        <div class="soul-controls">
                            <button class="btn btn-secondary" onclick="game.startSoulCollection()">开始收集</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.soulCollectionActive = false;
    }
    
    startSoulCollection() {
        const field = document.getElementById('soulField');
        const soulsCollected = document.getElementById('soulsCollected');
        const soulScore = document.getElementById('soulScore');
        const soulTime = document.getElementById('soulTime');
        
        let collected = 0;
        let score = 0;
        let timeLeft = 60;
        let souls = [];
        
        // 清空场地
        field.innerHTML = '';
        
        // 创建灵魂
        const createSoul = () => {
            if (souls.length >= 5) return;
            
            const soul = document.createElement('div');
            soul.className = 'soul';
            soul.style.left = Math.random() * (field.offsetWidth - 20) + 'px';
            soul.style.top = Math.random() * (field.offsetHeight - 20) + 'px';
            soul.style.animationDelay = Math.random() * 2 + 's';
            
            soul.addEventListener('click', () => {
                if (soul.classList.contains('collected')) return;
                
                soul.classList.add('collected');
                collected++;
                score += 10;
                
                soulsCollected.textContent = collected;
                soulScore.textContent = score;
                
                setTimeout(() => soul.remove(), 300);
                
                if (collected >= 20) {
                    this.endSoulCollection(collected, score);
                }
            });
            
            field.appendChild(soul);
            souls.push(soul);
            
            // 3秒后自动消失
            setTimeout(() => {
                if (!soul.classList.contains('collected')) {
                    soul.remove();
                    souls = souls.filter(s => s !== soul);
                }
            }, 3000);
        };
        
        // 开始游戏
        this.soulCollectionActive = true;
        const gameTimer = setInterval(() => {
            timeLeft--;
            soulTime.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                this.endSoulCollection(collected, score);
            }
        }, 1000);
        
        // 定期创建灵魂
        const soulTimer = setInterval(() => {
            if (this.soulCollectionActive) {
                createSoul();
            }
        }, 1000);
        
        this.soulCollectionTimer = gameTimer;
        this.soulCreationTimer = soulTimer;
    }
    
    endSoulCollection(collected, score) {
        this.soulCollectionActive = false;
        clearInterval(this.soulCollectionTimer);
        clearInterval(this.soulCreationTimer);
        
        const modal = document.querySelector('.game-modal');
        const collectionDiv = modal.querySelector('.soul-collection');
        
        collectionDiv.innerHTML = `
            <h4>灵魂收集结束！</h4>
            <p>收集灵魂: ${collected}/20</p>
            <p>最终得分: ${score}</p>
            <p>完成度: ${Math.round((collected / 20) * 100)}%</p>
            <button class="btn btn-primary" onclick="this.closest('.game-modal').remove()">关闭</button>
        `;
        
        this.gameState.gameScores.soulCollection = Math.max(this.gameState.gameScores.soulCollection, score);
        this.saveGameData();
    }
    
    showRedemptionChallenge() {
        this.createRedemptionChallengeModal();
    }
    
    createRedemptionChallengeModal() {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>超度挑战</h3>
                    <button class="close-btn" onclick="this.closest('.game-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="game-instructions">
                        <h4>🎮 游戏说明</h4>
                        <p>通过执行善行获得救赎！消耗灵魂能量执行不同的善行，获得善行积分，达到200分即可完成挑战。</p>
                        <ul>
                            <li>⚡ 资源：灵魂能量（初始100点）</li>
                            <li>🎯 目标：获得200善行积分</li>
                            <li>💝 善行：不同善行消耗不同能量，获得不同积分</li>
                            <li>📊 进度：实时显示救赎进度</li>
                            <li>🏆 完成：达到200分即可完成挑战</li>
                        </ul>
                    </div>
                    <div class="redemption-challenge">
                        <div class="redemption-info">
                            <p>通过善行获得救赎，提升灵魂能量！</p>
                            <p>灵魂能量: <span id="soulEnergy">${this.gameState.soulEnergy}</span></p>
                            <p>善行积分: <span id="meritPoints">0</span></p>
                        </div>
                        <div class="redemption-actions" id="redemptionActions"></div>
                        <div class="redemption-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                            </div>
                            <p>救赎进度: <span id="redemptionProgress">0</span>%</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.initRedemptionChallenge();
    }
    
    initRedemptionChallenge() {
        const actionsContainer = document.getElementById('redemptionActions');
        const actions = [
            { name: '帮助迷路的灵魂', cost: 10, reward: 20, description: '消耗10点能量，获得20点善行积分' },
            { name: '净化邪恶气息', cost: 15, reward: 30, description: '消耗15点能量，获得30点善行积分' },
            { name: '引导新亡者', cost: 20, reward: 40, description: '消耗20点能量，获得40点善行积分' },
            { name: '修复破损记忆', cost: 25, reward: 50, description: '消耗25点能量，获得50点善行积分' },
            { name: '拯救被困灵魂', cost: 30, reward: 60, description: '消耗30点能量，获得60点善行积分' }
        ];
        
        let meritPoints = 0;
        let soulEnergy = this.gameState.soulEnergy;
        
        actions.forEach((action, index) => {
            const actionCard = document.createElement('div');
            actionCard.className = 'action-card';
            actionCard.innerHTML = `
                <h4>${action.name}</h4>
                <p>${action.description}</p>
                <button class="action-btn" onclick="game.performRedemptionAction(${index}, ${action.cost}, ${action.reward})" 
                        ${soulEnergy < action.cost ? 'disabled' : ''}>执行善行</button>
            `;
            actionsContainer.appendChild(actionCard);
        });
        
        this.redemptionMeritPoints = meritPoints;
        this.redemptionSoulEnergy = soulEnergy;
        this.redemptionActions = actions;
    }
    
    performRedemptionAction(actionIndex, cost, reward) {
        if (this.redemptionSoulEnergy < cost) {
            alert('灵魂能量不足！');
            return;
        }
        
        this.redemptionSoulEnergy -= cost;
        this.redemptionMeritPoints += reward;
        
        // 更新显示
        document.getElementById('soulEnergy').textContent = this.redemptionSoulEnergy;
        document.getElementById('meritPoints').textContent = this.redemptionMeritPoints;
        
        // 更新进度
        const progress = Math.min(100, (this.redemptionMeritPoints / 200) * 100);
        document.getElementById('redemptionProgress').textContent = Math.round(progress);
        document.getElementById('progressFill').style.width = progress + '%';
        
        // 更新按钮状态
        this.redemptionActions.forEach((action, index) => {
            const button = document.querySelector(`[onclick="game.performRedemptionAction(${index}, ${action.cost}, ${action.reward})"]`);
            if (button) {
                button.disabled = this.redemptionSoulEnergy < action.cost;
            }
        });
        
        // 检查是否完成
        if (this.redemptionMeritPoints >= 200) {
            this.completeRedemptionChallenge();
        }
    }
    
    completeRedemptionChallenge() {
        const modal = document.querySelector('.game-modal');
        const challengeDiv = modal.querySelector('.redemption-challenge');
        
        challengeDiv.innerHTML = `
            <h4>超度挑战完成！</h4>
            <p>恭喜你完成了超度挑战！</p>
            <p>善行积分: ${this.redemptionMeritPoints}</p>
            <p>剩余灵魂能量: ${this.redemptionSoulEnergy}</p>
            <p>救赎得分: ${this.redemptionMeritPoints * 2}</p>
            <button class="btn btn-primary" onclick="this.closest('.game-modal').remove()">关闭</button>
        `;
        
        this.gameState.soulEnergy = this.redemptionSoulEnergy;
        this.gameState.gameScores.redemptionChallenge = Math.max(this.gameState.gameScores.redemptionChallenge, this.redemptionMeritPoints * 2);
        this.saveGameData();
    }
    
    showGhostMemory() {
        alert('幽灵记忆功能开发中...');
    }
    
    // 怪趣岛游戏方法
    showReincarnationSimulator() {
        this.createReincarnationSimulatorModal();
    }
    
    createReincarnationSimulatorModal() {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>投胎模拟器</h3>
                    <button class="close-btn" onclick="${closeAction}">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="reincarnation-simulator">
                        <div class="reincarnation-tabs">
                            <button class="tab-btn active" data-tab="wheel">投胎转盘</button>
                            <button class="tab-btn" data-tab="map">世界地图</button>
                            <button class="tab-btn" data-tab="social">社交互动</button>
                        </div>
                        
                        <div class="tab-content active" id="wheel-tab">
                            <div class="game-instructions">
                                <h4>🎮 游戏说明</h4>
                                <p>体验不同的投胎选择！选择人类或动物类型，转动转盘随机投胎，了解不同生命形态的生活体验。</p>
                                <ul>
                                    <li>🎯 选择类型：人类或动物</li>
                                    <li>🎰 转动转盘：随机获得投胎结果</li>
                                    <li>📋 详细信息：查看投胎后的生活描述</li>
                                    <li>⚖️ 优势挑战：了解每种生命的利弊</li>
                                    <li>🗺️ 地图探索：查看投胎地点和其他玩家</li>
                                </ul>
                            </div>
                            <div class="reincarnation-info">
                                <p>选择投胎类型，然后转动转盘！</p>
                                <div class="reincarnation-type-selector">
                                    <button class="type-btn active" data-type="human">人类</button>
                                    <button class="type-btn" data-type="animal">动物</button>
                                </div>
                                <p>投胎次数: <span id="reincarnationCount">0</span></p>
                                <p>当前形态: <span id="currentReincarnation">未知</span></p>
                            </div>
                            <div class="reincarnation-wheel" id="reincarnationWheel" onclick="game.spinReincarnationWheel()">
                                <div class="wheel-pointer">🎯</div>
                            </div>
                            <div class="reincarnation-result" id="reincarnationResult" style="display: none;">
                                <h4>投胎结果</h4>
                                <div class="reincarnation-details" id="reincarnationDetails"></div>
                                <div class="reincarnation-actions">
                                    <button class="btn btn-primary" onclick="game.spinReincarnationWheel()">再次投胎</button>
                                    <button class="btn btn-secondary" onclick="game.goToMap()">前往地图</button>
                                    <button class="btn btn-highlight" id="startLifeJourneyBtn" style="display: none;" onclick="game.completeReincarnationIntro()">开启生命旅程</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-content" id="map-tab">
                            <div class="world-map">
                                <h4>世界地图</h4>
                                <div class="map-container" id="mapContainer"></div>
                                <div class="map-legend">
                                    <div class="legend-item">
                                        <span class="legend-color human"></span>
                                        <span>人类玩家</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-color animal"></span>
                                        <span>动物玩家</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-content" id="social-tab">
                            <div class="social-panel">
                                <h4>社交互动</h4>
                                <div class="nearby-players" id="nearbyPlayers"></div>
                                <div class="chat-panel" id="chatPanel" style="display: none;">
                                    <div class="chat-messages" id="chatMessages"></div>
                                    <div class="chat-input">
                                        <input type="text" id="chatInput" placeholder="输入消息...">
                                        <button onclick="game.sendMessage()">发送</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.initReincarnationSimulator();
    }
    
    initReincarnationSimulator() {
        let reincarnationCount = 0;
        this.currentReincarnationType = 'human';
        this.currentReincarnation = null;
        
        // 绑定标签切换事件
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchReincarnationTab(tab);
            });
        });
        
        // 绑定类型选择事件
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                this.selectReincarnationType(type);
            });
        });
        
        this.reincarnationCount = reincarnationCount;
    }
    
    switchReincarnationTab(tab) {
        // 切换标签
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tab}-tab`);
        });
        
        // 根据标签加载相应内容
        if (tab === 'map') {
            this.loadWorldMap();
        } else if (tab === 'social') {
            this.loadSocialPanel();
        }
    }
    
    selectReincarnationType(type) {
        this.currentReincarnationType = type;
        
        // 更新按钮状态
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
        
        // 更新转盘颜色
        const wheel = document.getElementById('reincarnationWheel');
        if (type === 'human') {
            wheel.style.background = 'conic-gradient(#4ecdc4 0deg 72deg, #45b7d1 72deg 144deg, #96ceb4 144deg 216deg, #feca57 216deg 288deg, #ff9ff3 288deg 360deg)';
        } else {
            wheel.style.background = 'conic-gradient(#ff6b6b 0deg 72deg, #4ecdc4 72deg 144deg, #45b7d1 144deg 216deg, #96ceb4 216deg 288deg, #feca57 288deg 360deg)';
        }
    }
    
    spinReincarnationWheel() {
        const wheel = document.getElementById('reincarnationWheel');
        const result = document.getElementById('reincarnationResult');
        const details = document.getElementById('reincarnationDetails');
        const currentReincarnation = document.getElementById('reincarnationCount');
        
        // 禁用点击
        wheel.style.pointerEvents = 'none';
        
        // 根据类型随机选择
        let randomReincarnation;
        if (this.currentReincarnationType === 'human') {
            randomReincarnation = this.humanReincarnations[Math.floor(Math.random() * this.humanReincarnations.length)];
        } else {
            randomReincarnation = this.animalReincarnations[Math.floor(Math.random() * this.animalReincarnations.length)];
        }
        
        // 旋转动画
        const rotations = 5 + Math.random() * 5; // 5-10圈
        wheel.style.transform = `rotate(${rotations * 360}deg)`;
        
        // 更新计数
        this.reincarnationCount++;
        currentReincarnation.textContent = this.reincarnationCount;
        
        // 保存当前投胎结果
        this.currentReincarnation = randomReincarnation;
        
        // 显示结果
        setTimeout(() => {
            this.displayReincarnationResult(randomReincarnation);
            result.style.display = 'block';
            wheel.style.pointerEvents = 'auto';
        }, 3000);
        
        // 更新游戏分数
        this.gameState.gameScores.reincarnationSimulator += 10;
        this.saveGameData();
    }
    
    displayReincarnationResult(reincarnation) {
        const details = document.getElementById('reincarnationDetails');
        const currentReincarnation = document.getElementById('currentReincarnation');
        
        if (this.currentReincarnationType === 'human') {
            currentReincarnation.textContent = `${reincarnation.country} - ${reincarnation.family}`;
            
            details.innerHTML = `
                <div class="reincarnation-card human">
                    <div class="reincarnation-header">
                        <div class="reincarnation-emoji">${reincarnation.emoji}</div>
                        <div class="reincarnation-title">
                            <h3>${reincarnation.country} - ${reincarnation.family}</h3>
                            <p class="location">📍 ${reincarnation.location}</p>
                        </div>
                    </div>
                    <div class="reincarnation-description">
                        <p>${reincarnation.description}</p>
                    </div>
                    <div class="reincarnation-attributes">
                        <div class="advantages">
                            <h4>优势</h4>
                            <ul>
                                ${reincarnation.advantages.map(adv => `<li>✅ ${adv}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="challenges">
                            <h4>挑战</h4>
                            <ul>
                                ${reincarnation.challenges.map(chal => `<li>⚠️ ${chal}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        } else {
            currentReincarnation.textContent = `${reincarnation.species} - ${reincarnation.habitat}`;
            
            details.innerHTML = `
                <div class="reincarnation-card animal">
                    <div class="reincarnation-header">
                        <div class="reincarnation-emoji">${reincarnation.emoji}</div>
                        <div class="reincarnation-title">
                            <h3>${reincarnation.species} - ${reincarnation.habitat}</h3>
                            <p class="location">📍 ${reincarnation.location}</p>
                        </div>
                    </div>
                    <div class="reincarnation-description">
                        <p>${reincarnation.description}</p>
                    </div>
                    <div class="reincarnation-attributes">
                        <div class="advantages">
                            <h4>优势</h4>
                            <ul>
                                ${reincarnation.advantages.map(adv => `<li>✅ ${adv}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="challenges">
                            <h4>挑战</h4>
                            <ul>
                                ${reincarnation.challenges.map(chal => `<li>⚠️ ${chal}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }

        const startJourneyBtn = document.getElementById('startLifeJourneyBtn');
        if (startJourneyBtn) {
            startJourneyBtn.style.display = this.isIntroReincarnation ? 'inline-flex' : 'none';
        }
    }
    
    goToMap() {
        this.switchReincarnationTab('map');
    }
    
    loadWorldMap() {
        const mapContainer = document.getElementById('mapContainer');
        mapContainer.innerHTML = '';
        
        // 创建地图
        const map = document.createElement('div');
        map.className = 'world-map-svg';
        map.innerHTML = `
            <div class="map-regions">
                <div class="region" data-location="北京" style="left: 60%; top: 30%;">
                    <div class="region-marker human">🏮</div>
                    <div class="region-name">北京</div>
                </div>
                <div class="region" data-location="纽约" style="left: 20%; top: 35%;">
                    <div class="region-marker human">🗽</div>
                    <div class="region-name">纽约</div>
                </div>
                <div class="region" data-location="东京" style="left: 70%; top: 25%;">
                    <div class="region-marker human">🏯</div>
                    <div class="region-name">东京</div>
                </div>
                <div class="region" data-location="孟买" style="left: 55%; top: 50%;">
                    <div class="region-marker human">🕌</div>
                    <div class="region-name">孟买</div>
                </div>
                <div class="region" data-location="里约热内卢" style="left: 25%; top: 70%;">
                    <div class="region-marker human">🌴</div>
                    <div class="region-name">里约热内卢</div>
                </div>
                <div class="region" data-location="肯尼亚" style="left: 50%; top: 60%;">
                    <div class="region-marker animal">🦁</div>
                    <div class="region-name">肯尼亚</div>
                </div>
                <div class="region" data-location="太平洋" style="left: 80%; top: 40%;">
                    <div class="region-marker animal">🐬</div>
                    <div class="region-name">太平洋</div>
                </div>
                <div class="region" data-location="四川" style="left: 58%; top: 32%;">
                    <div class="region-marker animal">🐼</div>
                    <div class="region-name">四川</div>
                </div>
                <div class="region" data-location="喜马拉雅" style="left: 55%; top: 25%;">
                    <div class="region-marker animal">🦅</div>
                    <div class="region-name">喜马拉雅</div>
                </div>
                <div class="region" data-location="南极" style="left: 50%; top: 90%;">
                    <div class="region-marker animal">🐧</div>
                    <div class="region-name">南极</div>
                </div>
            </div>
        `;
        
        mapContainer.appendChild(map);
        
        // 添加点击事件
        map.querySelectorAll('.region').forEach(region => {
            region.addEventListener('click', () => {
                const location = region.dataset.location;
                this.showLocationDetails(location);
            });
        });
        
        // 高亮当前玩家位置
        if (this.currentReincarnation) {
            const currentLocation = this.currentReincarnation.location;
            const currentRegion = map.querySelector(`[data-location="${currentLocation}"]`);
            if (currentRegion) {
                currentRegion.classList.add('current-location');
            }
        }
    }
    
    showLocationDetails(location) {
        const players = this.otherPlayers.filter(player => 
            player.location.includes(location) || location.includes(player.location)
        );
        
        let message = `📍 ${location}\n\n`;
        if (players.length > 0) {
            message += `在这里的玩家：\n`;
            players.forEach(player => {
                message += `${player.avatar} ${player.name} (${player.reincarnation}) - ${player.status}\n`;
            });
        } else {
            message += `这里暂时没有其他玩家`;
        }
        
        alert(message);
    }
    
    loadSocialPanel() {
        const nearbyPlayers = document.getElementById('nearbyPlayers');
        const currentLocation = this.currentReincarnation ? this.currentReincarnation.location : '未知';
        
        // 找到附近的玩家
        const nearby = this.otherPlayers.filter(player => 
            player.status === '在线' && 
            (player.location.includes(currentLocation) || currentLocation.includes(player.location))
        );
        
        nearbyPlayers.innerHTML = '';
        
        if (nearby.length > 0) {
            nearby.forEach(player => {
                const playerCard = document.createElement('div');
                playerCard.className = 'player-card';
                playerCard.innerHTML = `
                    <div class="player-avatar">${player.avatar}</div>
                    <div class="player-info">
                        <h4>${player.name}</h4>
                        <p>${player.reincarnation}</p>
                        <p class="location">📍 ${player.location}</p>
                    </div>
                    <button class="chat-btn" onclick="game.startChat('${player.name}')">聊天</button>
                `;
                nearbyPlayers.appendChild(playerCard);
            });
        } else {
            nearbyPlayers.innerHTML = '<p>附近暂时没有其他玩家</p>';
        }
    }
    
    startChat(playerName) {
        const chatPanel = document.getElementById('chatPanel');
        const chatMessages = document.getElementById('chatMessages');
        
        chatPanel.style.display = 'block';
        chatMessages.innerHTML = `
            <div class="message system">
                <p>开始与 ${playerName} 聊天...</p>
            </div>
        `;
        
        this.currentChatPlayer = playerName;
    }
    
    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        const message = chatInput.value.trim();
        
        if (message && this.currentChatPlayer) {
            // 添加自己的消息
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message own';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                    <span class="message-time">${new Date().toLocaleTimeString()}</span>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            
            // 模拟对方回复
            setTimeout(() => {
                const replies = [
                    '哈哈，很有趣！',
                    '我也是这么想的',
                    '真的吗？太巧了！',
                    '哇，听起来很棒！',
                    '我也有类似的经历',
                    '这让我想起了...',
                    '太有意思了！',
                    '我完全理解你的感受'
                ];
                
                const replyDiv = document.createElement('div');
                replyDiv.className = 'message other';
                replyDiv.innerHTML = `
                    <div class="message-content">
                        <p>${replies[Math.floor(Math.random() * replies.length)]}</p>
                        <span class="message-time">${new Date().toLocaleTimeString()}</span>
                    </div>
                `;
                chatMessages.appendChild(replyDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000 + Math.random() * 2000);
            
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    showEvolutionGame() {
        this.createEvolutionGameModal();
    }
    
    createEvolutionGameModal() {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>生物进化</h3>
                    <button class="close-btn" onclick="this.closest('.game-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="game-instructions">
                        <h4>🎮 游戏说明</h4>
                        <p>通过完成生存挑战获得进化点数，解锁新的生物形态！从单细胞生物进化到人类，体验生命进化的奇妙过程。</p>
                        <ul>
                            <li>🧬 进化树：8个进化阶段，从单细胞到人类</li>
                            <li>🎯 挑战：4种不同难度的生存挑战</li>
                            <li>💎 点数：完成挑战获得进化点数</li>
                            <li>🔓 解锁：达到要求点数解锁新形态</li>
                            <li>🏆 目标：进化到最高阶段</li>
                        </ul>
                    </div>
                    <div class="evolution-game">
                        <div class="evolution-info">
                            <p>通过生存挑战获得进化点数，解锁新的生物形态！</p>
                            <p>当前进化点数: <span id="currentEvolutionPoints">${this.gameState.evolutionPoints}</span></p>
                            <p>当前阶段: <span id="currentEvolutionStage">1</span></p>
                        </div>
                        <div class="evolution-tree" id="evolutionTree"></div>
                        <div class="evolution-challenges" id="evolutionChallenges"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.initEvolutionGame();
    }
    
    initEvolutionGame() {
        const treeContainer = document.getElementById('evolutionTree');
        const challengesContainer = document.getElementById('evolutionChallenges');
        let currentStage = 1;
        
        // 创建进化树
        this.evolutionTree.forEach((stage, index) => {
            const stageDiv = document.createElement('div');
            stageDiv.className = 'evolution-stage';
            
            const creatureDiv = document.createElement('div');
            creatureDiv.className = 'evolution-creature';
            if (stage.unlocked) creatureDiv.classList.add('unlocked');
            if (index + 1 === currentStage) creatureDiv.classList.add('current');
            
            creatureDiv.innerHTML = `
                <div class="creature-emoji">${stage.emoji}</div>
                <h4>${stage.name}</h4>
                <p>需要: ${stage.requirements}点</p>
            `;
            
            stageDiv.appendChild(creatureDiv);
            
            if (index < this.evolutionTree.length - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'evolution-arrow';
                arrow.textContent = '↓';
                stageDiv.appendChild(arrow);
            }
            
            treeContainer.appendChild(stageDiv);
        });
        
        // 创建挑战
        const challenges = [
            { name: '觅食挑战', description: '找到足够的食物生存', points: 20, difficulty: 'easy' },
            { name: '躲避天敌', description: '成功躲避捕食者', points: 30, difficulty: 'medium' },
            { name: '寻找配偶', description: '找到合适的伴侣繁殖', points: 40, difficulty: 'hard' },
            { name: '适应环境', description: '适应新的生存环境', points: 50, difficulty: 'expert' }
        ];
        
        challenges.forEach((challenge, index) => {
            const challengeDiv = document.createElement('div');
            challengeDiv.className = 'challenge-card';
            challengeDiv.innerHTML = `
                <h4>${challenge.name}</h4>
                <p>${challenge.description}</p>
                <p>奖励: ${challenge.points}点</p>
                <p>难度: ${challenge.difficulty === 'easy' ? '简单' : challenge.difficulty === 'medium' ? '中等' : challenge.difficulty === 'hard' ? '困难' : '专家'}</p>
                <button class="action-btn" onclick="game.startEvolutionChallenge(${index}, ${challenge.points})">开始挑战</button>
            `;
            challengesContainer.appendChild(challengeDiv);
        });
        
        this.currentEvolutionStage = currentStage;
    }
    
    startEvolutionChallenge(challengeIndex, points) {
        const challenges = [
            { name: '觅食挑战', description: '找到足够的食物生存', points: 20, difficulty: 'easy' },
            { name: '躲避天敌', description: '成功躲避捕食者', points: 30, difficulty: 'medium' },
            { name: '寻找配偶', description: '找到合适的伴侣繁殖', points: 40, difficulty: 'hard' },
            { name: '适应环境', description: '适应新的生存环境', points: 50, difficulty: 'expert' }
        ];
        
        const challenge = challenges[challengeIndex];
        const successRate = challenge.difficulty === 'easy' ? 0.8 : 
                           challenge.difficulty === 'medium' ? 0.6 : 
                           challenge.difficulty === 'hard' ? 0.4 : 0.2;
        
        const success = Math.random() < successRate;
        
        if (success) {
            this.gameState.evolutionPoints += points;
            this.updateEvolutionDisplay();
            this.checkEvolution();
            alert(`挑战成功！获得 ${points} 进化点数！`);
        } else {
            alert('挑战失败！继续努力！');
        }
        
        this.saveGameData();
    }
    
    updateEvolutionDisplay() {
        document.getElementById('currentEvolutionPoints').textContent = this.gameState.evolutionPoints;
        
        // 更新进化树
        this.evolutionTree.forEach((stage, index) => {
            if (this.gameState.evolutionPoints >= stage.requirements) {
                stage.unlocked = true;
                const creatureDiv = document.querySelectorAll('.evolution-creature')[index];
                if (creatureDiv) {
                    creatureDiv.classList.add('unlocked');
                }
            }
        });
    }
    
    checkEvolution() {
        const nextStage = this.evolutionTree.find(stage => 
            !stage.unlocked && this.gameState.evolutionPoints >= stage.requirements
        );
        
        if (nextStage) {
            nextStage.unlocked = true;
            this.currentEvolutionStage = nextStage.stage;
            document.getElementById('currentEvolutionStage').textContent = nextStage.stage;
            alert(`恭喜！你进化成了 ${nextStage.name}！`);
        }
    }
    
    showSurvivalChallenge() {
        this.createSurvivalChallengeModal();
    }
    
    createSurvivalChallengeModal() {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>生存挑战</h3>
                    <button class="close-btn" onclick="this.closest('.game-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="game-instructions">
                        <h4>🎮 游戏说明</h4>
                        <p>在自然环境中生存30天！管理健康、饥饿、精力三个属性，通过不同的行动来维持生存，体验野外生存的挑战。</p>
                        <ul>
                            <li>📊 属性：健康、饥饿、精力（0-100）</li>
                            <li>⏰ 时间：每5秒代表1天，目标生存30天</li>
                            <li>🎯 行动：觅食、休息、探索、建造</li>
                            <li>⚠️ 危险：属性过低会导致健康下降</li>
                            <li>🏆 目标：生存30天获得最高分</li>
                        </ul>
                    </div>
                    <div class="survival-challenge">
                        <div class="survival-stats" id="survivalStats"></div>
                        <div class="survival-actions" id="survivalActions"></div>
                        <div class="survival-log" id="survivalLog"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.initSurvivalChallenge();
    }
    
    initSurvivalChallenge() {
        const statsContainer = document.getElementById('survivalStats');
        const actionsContainer = document.getElementById('survivalActions');
        const logContainer = document.getElementById('survivalLog');
        
        let health = 100;
        let hunger = 50;
        let energy = 80;
        let day = 1;
        let survivalScore = 0;
        
        // 创建状态显示
        const createStatBar = (name, value, max, color) => {
            const statDiv = document.createElement('div');
            statDiv.className = 'stat-bar';
            statDiv.innerHTML = `
                <h4>${name}</h4>
                <div class="stat-progress">
                    <div class="stat-fill" style="width: ${(value / max) * 100}%; background: ${color}"></div>
                </div>
                <p>${value}/${max}</p>
            `;
            return statDiv;
        };
        
        statsContainer.innerHTML = '';
        statsContainer.appendChild(createStatBar('健康', health, 100, '#4ecdc4'));
        statsContainer.appendChild(createStatBar('饥饿', hunger, 100, '#ffa502'));
        statsContainer.appendChild(createStatBar('精力', energy, 100, '#ff6b6b'));
        
        // 创建行动按钮
        const actions = [
            { name: '觅食', cost: 20, effect: { hunger: 30, energy: -10 }, description: '寻找食物，增加饱食度' },
            { name: '休息', cost: 0, effect: { health: 10, energy: 30 }, description: '休息恢复体力和精力' },
            { name: '探索', cost: 30, effect: { health: -5, hunger: -10, energy: -20 }, description: '探索新区域，可能发现资源' },
            { name: '建造', cost: 40, effect: { health: 5, energy: -15 }, description: '建造庇护所，提高生存能力' }
        ];
        
        actionsContainer.innerHTML = '';
        actions.forEach((action, index) => {
            const actionDiv = document.createElement('div');
            actionDiv.className = 'action-card';
            actionDiv.innerHTML = `
                <h4>${action.name}</h4>
                <p>${action.description}</p>
                <p>消耗精力: ${action.cost}</p>
                <button class="action-btn" onclick="game.performSurvivalAction(${index})" 
                        ${energy < action.cost ? 'disabled' : ''}>执行</button>
            `;
            actionsContainer.appendChild(actionDiv);
        });
        
        // 开始生存循环
        const survivalLoop = setInterval(() => {
            // 自然消耗
            hunger = Math.max(0, hunger - 2);
            energy = Math.max(0, energy - 1);
            
            if (hunger <= 0) {
                health = Math.max(0, health - 5);
            }
            if (energy <= 0) {
                health = Math.max(0, health - 3);
            }
            
            // 更新显示
            this.updateSurvivalDisplay(health, hunger, energy, day, survivalScore);
            
            // 检查生存状态
            if (health <= 0) {
                clearInterval(survivalLoop);
                this.endSurvivalChallenge(day, survivalScore);
            } else if (day >= 30) {
                clearInterval(survivalLoop);
                this.completeSurvivalChallenge(day, survivalScore);
            }
            
            day++;
        }, 5000); // 每5秒一个周期
        
        this.survivalLoop = survivalLoop;
        this.survivalStats = { health, hunger, energy, day, survivalScore };
        this.survivalActions = actions;
    }
    
    performSurvivalAction(actionIndex) {
        const action = this.survivalActions[actionIndex];
        const stats = this.survivalStats;
        
        if (stats.energy < action.cost) {
            this.addSurvivalLog('精力不足，无法执行此行动！');
            return;
        }
        
        // 执行行动
        stats.energy = Math.max(0, Math.min(100, stats.energy - action.cost));
        stats.health = Math.max(0, Math.min(100, stats.health + (action.effect.health || 0)));
        stats.hunger = Math.max(0, Math.min(100, stats.hunger + (action.effect.hunger || 0)));
        stats.energy = Math.max(0, Math.min(100, stats.energy + (action.effect.energy || 0)));
        stats.survivalScore += 10;
        
        this.addSurvivalLog(`执行了 ${action.name}：${action.description}`);
        this.updateSurvivalDisplay(stats.health, stats.hunger, stats.energy, stats.day, stats.survivalScore);
        this.updateActionButtons(stats.energy);
    }
    
    updateSurvivalDisplay(health, hunger, energy, day, score) {
        const statBars = document.querySelectorAll('.stat-bar');
        if (statBars[0]) statBars[0].querySelector('.stat-fill').style.width = `${health}%`;
        if (statBars[1]) statBars[1].querySelector('.stat-fill').style.width = `${hunger}%`;
        if (statBars[2]) statBars[2].querySelector('.stat-fill').style.width = `${energy}%`;
        
        // 更新数值显示
        const statTexts = document.querySelectorAll('.stat-bar p');
        if (statTexts[0]) statTexts[0].textContent = `${health}/100`;
        if (statTexts[1]) statTexts[1].textContent = `${hunger}/100`;
        if (statTexts[2]) statTexts[2].textContent = `${energy}/100`;
    }
    
    updateActionButtons(energy) {
        const buttons = document.querySelectorAll('.action-btn');
        buttons.forEach((button, index) => {
            const action = this.survivalActions[index];
            button.disabled = energy < action.cost;
        });
    }
    
    addSurvivalLog(message) {
        const logContainer = document.getElementById('survivalLog');
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `第${this.survivalStats.day}天: ${message}`;
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    }
    
    endSurvivalChallenge(day, score) {
        const modal = document.querySelector('.game-modal');
        const challengeDiv = modal.querySelector('.survival-challenge');
        
        challengeDiv.innerHTML = `
            <h4>生存挑战结束</h4>
            <p>很遗憾，你没有生存下来...</p>
            <p>生存天数: ${day}</p>
            <p>生存得分: ${score}</p>
            <button class="btn btn-primary" onclick="this.closest('.game-modal').remove()">关闭</button>
        `;
        
        this.gameState.gameScores.survivalChallenge = Math.max(this.gameState.gameScores.survivalChallenge, score);
        this.saveGameData();
    }
    
    completeSurvivalChallenge(day, score) {
        const modal = document.querySelector('.game-modal');
        const challengeDiv = modal.querySelector('.survival-challenge');
        
        challengeDiv.innerHTML = `
            <h4>生存挑战完成！</h4>
            <p>恭喜你成功生存了30天！</p>
            <p>最终得分: ${score + 100}</p>
            <p>你是一个真正的生存专家！</p>
            <button class="btn btn-primary" onclick="this.closest('.game-modal').remove()">关闭</button>
        `;
        
        this.gameState.gameScores.survivalChallenge = Math.max(this.gameState.gameScores.survivalChallenge, score + 100);
        this.saveGameData();
    }
    
    showCreatureCollection() {
        alert('生物图鉴功能开发中...');
    }

    startReincarnationPrelude() {
        if (this.isIntroReincarnation) return;
        this.isIntroReincarnation = true;
        this.showReincarnationSimulator();
    }

    completeReincarnationIntro() {
        this.isIntroReincarnation = false;
        const modal = document.querySelector('.game-modal');
        if (modal) {
            modal.remove();
        }
        this.enterLivingIsland();
    }
}

export function registerGlobalShortcuts(gameInstance) {
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && gameInstance && gameInstance.gameState.currentIsland !== 'menu') {
            gameInstance.showMainMenu();
        }
    });
}