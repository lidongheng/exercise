function bubbleSort (Arr, params) {
  if (Arr.length === 0) return []
  function swap (Arr, p, q) {
    let temp;
    temp = Arr[p]
    Arr[p] = Arr[q]
    Arr[q] = temp
  }
  for (var i = 0; i < Arr.length; i++) {
    for (var j = i; j < Arr.length; j++) {
      if (Arr[i][params] < Arr[j][params]) {
        swap(Arr, i, j)
      }
    }
  }
  return Arr
}

class Player {
  constructor (data) {
    this.name = data.name
    this.stats = data.stats
    this.position = data.position
    this.caps = data.caps
    this.lineups = data.lineups
    this.club = data?.club || undefined
    this.nation = data?.nation || undefined
    this.staff = data.staff
    this.age = data?.age
    this.number = data?.number
    this.status = 1 // 0: 伤停 1: 上场
    this.description = data?.description
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
    this.players = []
    for (let i = 0; i < data.players.length; i++) {
      const player = new Player(data.players[i])
      this.players.push(player)
    }
    // 教练
    this.coach = data.coach
    // 常用阵型
    this.formations = data.formations
    // 关键球员
    this.keyPlayers = data.keyPlayers ? {
      goal: data.keyPlayers.goal,
      assist: data.keyPlayers.assist,
      caps: data.keyPlayers.caps,
      pass: data.keyPlayers.pass,
      keyPass: data.keyPlayers.keyPass,
      intercept: data.keyPlayers.intercept,
      steals: data.keyPlayers.steals,
      clearance: data.keyPlayers.clearance
    } : undefined
  }
  addPlayer (data) {
    new Player(data)
  }
  getATeamPlayers () {
    this.players.push()
  }
}

class League {

}

class Match {
  constructor (data) {
    this.hostTeam = data.hostTeam
    this.awayTeam = data.awayTeam
    this.hostTeamInfo = new Club(data.hostTeamInfo)
    this.awayTeamInfo = new Club(data.awayTeamInfo)
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
    this.hostTeamFutureMatchs = data.hostTeamFutureMatchs
    this.awayTeamFutureMatchs = data.awayTeamFutureMatchs
    this.futureMatchs = {
      hostTeam: [],
      awayTeam: []
    }
    this.weather = data.weather
    this.matchTime = data.matchTime
    this.league = data.league
    this.round = data.round
  }

  getTeamPlayersInfo (status) {
    // 先把前锋、中场、后卫挑出来，再分别遍历，并且要按照出场数排
    let players = Array.from(new Array(4), () => new Array())
    // 分拣
    this[status+'TeamInfo'].players.forEach(player => {
      if (player.staff.toUpperCase() === 'FW') {
        players[0].push(player)
      } else if (player.staff.toUpperCase() === 'DF') {
        players[2].push(player)
      } else if (player.staff.toUpperCase() === 'GK') {
        players[3].push(player)
      } else {
        players[1].push(player)
      }
    })
    // 排序
    players = players.map(item => {
      return bubbleSort(item, 'caps')
    })
    // 遍历
    for (let i = 0; i < players.length; i++) {
      if (i === 0) console.log('前锋：')
      if (i === 1) console.log('中场：')
      if (i === 2) console.log('后卫：')
      if (i === 3) console.log('门将：')
      for (let j = 0; j < players[i].length; j++) {
        console.log(`${players[i][j].number || '?'}号 ${players[i][j].name}（${players[i][j].position[0]}, ${players[i][j].stats}, ${players[i][j].caps}场${players[i][j].lineups}首发）${players[i][j].age ?'年龄: '+players[i][j].age:''} ${players[i][j].description || ''}`)
      }
    }
  }

  getTeamFutureMatchInfo (status) {
    if (!this.matchTime) console.log('你还没有填写比赛时间，暂时无法计算未来比赛')
    this[status + 'TeamFutureMatchs'].forEach(match => {
      match.period = Math.floor((new Date(match.matchTime).getTime() - new Date(this.matchTime).getTime()) / 1000 / 3600)
      this.futureMatchs[status + 'Team'].push(match)
      console.log(`${match.league} ${match.matchTime} ${match.match} ${match.period}时`)
    })
  }
}

const match = new Match({
  hostTeam: '大阪樱花',
  awayTeam: '浦和红钻',
  hostTeamInfo: {
    clubName: '大阪樱花',
    league: '日职联',
    grade: 2,
    players: [
      { name: '乾贵士', club: '大阪樱花', nation: '日本', stats: 74, position: ['CAM'], staff: 'MF', caps: 5, lineups: 5 }
    ]
  },
  awayTeamInfo: {
    clubName: '浦和红钻',
    league: '日职联',
    grade: 1,
    players: [
      { name: '容克尔', club: '浦和红钻', nation: '丹麦', stats: 73, position: ['ST'], staff: 'FW', caps: 9, lineups: 6, age: 28, number: 7 },
      { name: '莫贝里-卡尔松', club: '浦和红钻', nation: '瑞典', stats: 72, position: ['RM', 'RW'], staff: 'FW', caps: 7, lineups: 5, age: 28, number: 10 },
      { name: '亚历山大-舒尔茨', club: '浦和红钻', nation: '丹麦', stats: 75, position: ['CB'], staff: 'DF', caps: 14, lineups: 13, age: 29, number: 28 },
      { name: '酒井宏树', club: '浦和红钻', nation: '日本', stats: 73, position: ['RB', 'LB'], staff: 'DF', caps: 11, lineups: 10, age: 32, number: 2, status: 0 },
      { name: '马渡和彰', club: '浦和红钻', nation: '日本', stats: 75, position: ['CB'], staff: 'DF', caps: 14, lineups: 13, age: 30 },
      { name: '犬饲智也', club: '浦和红钻', nation: '日本', stats: 69, position: ['CB'], staff: 'DF', caps: 7, lineups: 3, age: 29, status: 0 },
      { name: '江坂任', club: '浦和红钻', nation: '日本', stats: 71, position: ['CAM'], staff: 'MF', caps: 18, lineups: 17, age: 29, number: 33 },
      { name: '岩尾宪', club: '浦和红钻', nation: '日本', stats: 68, position: ['CDM'], staff: 'MF', caps: 15, lineups: 12, age: 34 },
      { name: '柴户海', club: '浦和红钻', nation: '日本', stats: 69, position: ['CDM'], staff: 'MF', caps: 18, lineups: 12, age: 26 },
      { name: '小泉佳穗', club: '浦和红钻', nation: '日本', stats: 70, position: ['LM'], staff: 'MF', caps: 15, lineups: 10, age: 25 },
      { name: '岩波拓也', club: '浦和红钻', nation: '日本', stats: 70, position: ['CB'], staff: 'DF', caps: 19, lineups: 17, age: 27, number: 4 },
      { name: '伊藤敦树', club: '浦和红钻', nation: '丹麦', stats: 64, position: ['CDM', 'RM'], staff: 'MF', caps: 16, lineups: 13, age: 23 },
      { name: '松尾佑介', club: '浦和红钻', nation: '日本', stats: 66, position: ['LW'], staff: 'FW', caps: 13, lineups: 4, age: 24, number: 11, description: '速度狗，年轻，替补' },
      { name: '沙尔克', club: '浦和红钻', nation: '荷兰', stats: 68, position: ['CF, LW'], staff: 'FW', caps: 8, lineups: 5, age: 29, number: 17, description: '进球不多，能力稍差' },
      { name: '关根贵大', club: '浦和红钻', nation: '日本', stats: 67, position: ['LM'], staff: 'MF', caps: 20, lineups: 15, age: 27 },
      { name: '明本考浩', club: '浦和红钻', nation: '日本', stats: 68, position: ['LM'], staff: 'MF', caps: 20, lineups: 16, age: 24 },
      { name: '松崎快', club: '浦和红钻', nation: '日本', stats: 0, position: ['RM'], staff: 'MF', caps: 11, lineups: 4, age: 24 },
      { name: '平野佑一', club: '浦和红钻', nation: '日本', stats: 65, position: ['CDM'], staff: 'MF', caps: 8, lineups: 5, age: 26 },
      { name: '宫本优太', club: '浦和红钻', nation: '日本', stats: 0, position: ['RB'], staff: 'DF', caps: 8, lineups: 4, age: 22 },
      { name: '大田步梦', club: '浦和红钻', nation: '日本', stats: 62, position: ['LB'], staff: 'DF', caps: 11, lineups: 9, age: 21, description: '大学新人' },
      { name: '知念哲矢', club: '浦和红钻', nation: '日本', stats: 0, position: ['CB'], staff: 'DF', caps: 4, lineups: 2, age: 24 },
      { name: '西川周作', club: '浦和红钻', nation: '日本', stats: 68, position: ['GK'], staff: 'GK', caps: 17, lineups: 17, age: 35 },
      { name: '铃木彩艳', club: '浦和红钻', nation: '日本', stats: 61, position: ['GK'], staff: 'GK', caps: 4, lineups: 4, age: 19 }
    ]
  },
  matchTime: '2022-05-25 18:00:00',
  awayTeamFutureMatchs: [
    {
      league: '日职联',
      matchTime: '2022-05-28 16:00:00',
      match: '福冈黄蜂vs浦和红钻'
    },
    {
      league: '日职联',
      matchTime: '2022-06-18 18:00:00',
      match: '浦和红钻vs名古屋鲸八'
    },
    {
      league: '日职联',
      matchTime: '2022-06-26 17:00:00',
      match: '神户胜利船vs浦和红钻'
    }
  ]
})

match.getTeamPlayersInfo('away')
match.getTeamFutureMatchInfo('away')