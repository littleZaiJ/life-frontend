class LifeDiaryGame {
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
            memorialData: null
        };
        
        this.hellLevels = [
            '拔舌地狱', '剪刀地狱', '铁树地狱', '孽镜地狱', '蒸笼地狱', '铜柱地狱',
            '刀山地狱', '冰山地狱', '油锅地狱', '牛坑地狱', '石压地狱', '舂臼地狱',
            '血池地狱', '枉死地狱', '磔刑地狱', '火山地狱', '石磨地狱', '刀锯地狱'
        ];
        
        this.creatureForms = [
            { name: '小猫咪', emoji: '🐱', description: '慵懒而优雅的猫咪' },
            { name: '小狗狗', emoji: '🐶', description: '忠诚而活泼的狗狗' },
            { name: '小兔子', emoji: '🐰', description: '可爱而机敏的兔子' },
            { name: '小松鼠', emoji: '🐿️', description: '灵活而勤劳的松鼠' },
            { name: '小蝴蝶', emoji: '🦋', description: '美丽而自由的蝴蝶' },
            { name: '小蜜蜂', emoji: '🐝', description: '勤劳而甜蜜的蜜蜂' },
            { name: '小海豚', emoji: '🐬', description: '聪明而友善的海豚' },
            { name: '小企鹅', emoji: '🐧', description: '可爱而坚强的企鹅' }
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
                    alert('请先完成生命档案建立');
                }
                break;
            case 'ghost':
                if (this.gameState.ghostIndex > 0) {
                    this.enterGhostIsland();
                } else {
                    alert('幽灵岛尚未解锁');
                }
                break;
            case 'creature':
                if (this.gameState.currentHellLevel >= 18) {
                    this.enterCreatureIsland();
                } else {
                    alert('怪趣岛尚未解锁');
                }
                break;
        }
    }
    
    enterCreatureIsland() {
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
        if (this.gameState.playerData) {
            this.livingStatus.textContent = '已解锁';
            this.livingStatus.classList.add('unlocked');
        }
        
        if (this.gameState.ghostIndex > 0) {
            this.ghostStatus.textContent = '已解锁';
            this.ghostStatus.classList.add('unlocked');
        }
        
        if (this.gameState.currentHellLevel >= 18) {
            this.creatureStatus.textContent = '已解锁';
            this.creatureStatus.classList.add('unlocked');
        }
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
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new LifeDiaryGame();
});

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        // ESC键返回主菜单
        const game = window.lifeDiaryGame;
        if (game && game.gameState.currentIsland !== 'menu') {
            game.showMainMenu();
        }
    }
});