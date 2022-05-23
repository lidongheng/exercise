class Player {
  constructor (data) {
    this.name = data.name
    this.stats = data.stats
    this.position = data.position
    this.caps = data.caps
    this.lineups = data.lineups
    this.club = data?.club || undefined
    this.nation = data?.nation || undefined
  }
}

class Club {
  constructor (data) {
    // 俱乐部名：浦和红钻
    this.clubName = data.clubName
    // 联盟：日职联
    this.league = data.league
    // 档次：第一档次
    this.grade = data.grade
    // 球员组成
    this.players = undefined
    // 教练
    this.coach = data.coach
    // 常用阵型
    this.formations = data.formations
    // 关键球员
    this.keyPlayers = {
      goal: data.keyPlayers.goal,
      assist: data.keyPlayers.assist,
      caps: data.keyPlayers.caps,
      pass: data.keyPlayers.pass,
      keyPass: data.keyPlayers.keyPass,
      intercept: data.keyPlayers.intercept,
      steals: data.keyPlayers.steals,
      clearance: data.keyPlayers.clearance
    }
  }
}

class Match {
  constructor (data) {
    this.hostTeam = data.hostTeam
    this.awayTeam = data.awayTeam
    this.historyMatchs = data.historyMatchs
    this.recentSixMatchs = {
      hostTeam: data.recentSixMatchsOfHostTeam || undefined,
      awayTeam: data.recentSixMatchsOfAwayTeam || undefined
    }
    this.scoredBoard = {
      hostTeam: {
        total: undefined,
        host: undefined,
        away: undefined
      },
      awayTeam: {
        total: undefined,
        host: undefined,
        away: undefined
      }
    }
    this.futureMatchs = {
      hostTeam: {
        firstMatch: {
          match: undefined,
          period: undefined
        },
        secondMatch: {
          match: undefined,
          period: undefined
        },
        thirdMatch: {
          match: undefined,
          period: undefined
        }
      },
      awayTeam: {
        firstMatch: {
          match: undefined,
          period: undefined
        },
        secondMatch: {
          match: undefined,
          period: undefined
        },
        thirdMatch: {
          match: undefined,
          period: undefined
        }
      }
    }
    this.weather = data.weather
    this.matchTime = data.matchTime
    this.league = data.league
    this.round = data.round
  }
}