const introSlides = [
    {
        title: '因果轮回 · 苍生共振',
        description: '天地万物皆在因果之网中振荡。每一次善念与恶行都会化作灵光回响，编织出下一段轮回轨迹。生命日记以佛教的轮回观、道家的天人合一观与传统命理学共同构建起这片世界的秩序。'
    },
    {
        title: '生灵岛 · 人间修行',
        description: '这里是人世的广袤舞台。你将体验生老病死的全过程，在选择与抉择中积累功德，证明「因果不空，善恶有报」。每一段经历，都是下一次轮回的因。'
    },
    {
        title: '幽灵岛 · 灵魂渡口',
        description: '当生命的蜡烛熄灭，灵魂会穿越忘川来到幽灵岛。这里是审判之地，九幽十八层地狱静待裁决。道法与佛理交织，提醒你：只有放下执念、偿还因果，才可重归光明。'
    },
    {
        title: '怪趣岛 · 万物新生',
        description: '当功德圆满，灵魂可踏上怪趣岛，投生为千奇百怪的生命。你或许化身萌宠、异兽、甚至尚未被命名的物种。新的旅程意味着新的因果，宇宙的轮盘再次转动。准备好迎接命运的安排了吗？'
    }
];

export default class IntroManager {
    constructor(game) {
        this.game = game;
        this.currentSlide = 0;
        this.themes = ['theme-karma','theme-living','theme-ghost','theme-creature'];
        this.elements = {
            screen: document.getElementById('introScreen'),
            title: document.getElementById('introTitle'),
            description: document.getElementById('introDescription'),
            progress: document.getElementById('introProgress'),
            nextBtn: document.getElementById('introNextBtn'),
            skipBtn: document.getElementById('introSkipBtn')
        };
        this.isActive = false;
        this.handleNext = this.handleNext.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.typeTimer = null;
    }

    start() {
        if (!this.elements.screen) return;
        this.isActive = true;
        this.elements.screen.classList.add('active');
        this.bindEvents();
        this.renderProgress();
        this.showSlide(0);
    }

    bindEvents() {
        const { nextBtn, skipBtn } = this.elements;
        if (nextBtn) {
            nextBtn.addEventListener('click', this.handleNext);
        }
        if (skipBtn) {
            skipBtn.addEventListener('click', this.handleSkip);
        }
    }

    unbindEvents() {
        const { nextBtn, skipBtn } = this.elements;
        if (nextBtn) {
            nextBtn.removeEventListener('click', this.handleNext);
        }
        if (skipBtn) {
            skipBtn.removeEventListener('click', this.handleSkip);
        }
    }

    handleNext() {
        if (this.currentSlide < introSlides.length - 1) {
            this.currentSlide += 1;
            this.showSlide(this.currentSlide);
        } else {
            this.finish();
        }
    }

    handleSkip() {
        this.finish();
    }

    renderProgress() {
        if (!this.elements.progress) return;
        this.elements.progress.innerHTML = introSlides
            .map((_, index) => `<span class="intro-dot" data-index="${index}"></span>`)
            .join('');
    }

    updateProgress() {
        if (!this.elements.progress) return;
        this.elements.progress.querySelectorAll('.intro-dot').forEach((dot) => {
            const index = Number(dot.dataset.index);
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    showSlide(index) {
        const slide = introSlides[index];
        if (!slide) return;

        const { screen, title, description, nextBtn } = this.elements;
        if (title) {
            title.textContent = slide.title;
            title.classList.remove('intro-title-animate');
            void title.offsetWidth;
            title.classList.add('intro-title-animate');
        }
        if (description) {
            // 打字机效果
            description.classList.remove('intro-description-animate');
            void description.offsetWidth;
            description.classList.add('intro-description-animate');
            this.typeText(description, slide.description, 14 + Math.floor(Math.random()*6));
        }

        if (nextBtn) {
            nextBtn.textContent = index === introSlides.length - 1 ? '开启投胎仪式' : '继续探索';
        }

        // 主题切换
        if (screen) {
            this.themes.forEach(t => screen.classList.remove(t));
            const theme = this.themes[index] || this.themes[0];
            screen.classList.add(theme);
        }

        this.updateProgress();

        // 切换场景动画
        const sceneRoot = document.getElementById('introScene');
        if (sceneRoot) {
            sceneRoot.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
            const targets = ['scene-karma','scene-living','scene-ghost','scene-creature'];
            const cls = targets[index] || targets[0];
            const active = sceneRoot.querySelector(`.${cls}`);
            if (active) {
                // 重启 CSS 动画（强制 reflow）
                active.classList.remove('active');
                void active.offsetWidth;
                active.classList.add('active');
            }
        }
    }

    typeText(node, fullText, speed = 16) {
        if (!node) return;
        if (this.typeTimer) clearInterval(this.typeTimer);
        node.textContent = '';
        let i = 0;
        this.typeTimer = setInterval(() => {
            node.textContent = fullText.slice(0, i);
            i += 1;
            if (i > fullText.length) {
                clearInterval(this.typeTimer);
                this.typeTimer = null;
            }
        }, Math.max(8, speed));
    }

    finish() {
        if (!this.isActive) return;
        this.isActive = false;
        this.unbindEvents();

        if (this.elements.screen) {
            this.elements.screen.classList.add('intro-exit');
            setTimeout(() => {
                this.elements.screen.style.display = 'none';
            }, 900);
        }

        if (this.game && typeof this.game.startReincarnationPrelude === 'function') {
            this.game.startReincarnationPrelude();
        }
    }
}
