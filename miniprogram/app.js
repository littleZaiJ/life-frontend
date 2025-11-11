// app.js
App({
  onLaunch() {
    // 初始化游戏数据
    this.initGameData();
    
    // 检查是否是首次启动
    const isFirstLaunch = wx.getStorageSync('isFirstLaunch');
    if (isFirstLaunch === '') {
      wx.setStorageSync('isFirstLaunch', 'false');
      // 首次启动，跳转到开场页面
      wx.reLaunch({
        url: '/pages/intro/intro'
      });
    }
  },

  initGameData() {
    // 初始化游戏状态
    const gameState = wx.getStorageSync('lifeDiaryGame');
    if (!gameState) {
      const defaultState = {
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
      wx.setStorageSync('lifeDiaryGame', defaultState);
    }
  },

  globalData: {
    gameState: null
  }
});

