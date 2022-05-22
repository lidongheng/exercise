// 一种解法团灭股票算法题
// 买卖股票系列
// dp[i][k][0] 第i天 还可以交易K次，手中没有股票
// dp[i][k][1] 第i天 还可以交易k次，手中有股票
//                昨天没有持有，今天不操作
// 今天没有持有股票      dp[i - 1][k][0]
//  dp[i][k][0] = max
//                      dp[i - 1][k][1] + prices[i]
//                      昨天持有，今天卖出
// 上面式子的意思是：今天没有持有股票的值等于
// (昨天没有持有，今天不操作)与(昨天持有，今天卖出)的较大值

//                    昨天持有，今天不操作
// 今天持有股票         dp[i - 1][k][1]
//  dp[i][k][1] = max
//                     dp[i - 1][k - 1][0] - prices[i]
//                    昨天没有持有，今天买入
// 上面式子的意思是：今天持有股票的值等于
// (昨天持有，今天不操作)与(昨天没有持有，今天买入)的较大值

// 要用三维数组才能表示
// i表示第i天
// k表示交易次数，每次交易包含买入和卖出，这里我们只在买入
// 的时候需要将k - 1
// 0表示不持有股票，1表示持有股票

// 最终的最大收益是dp[n - 1][k][0]而不是dp[n - 1][k][1]
// 因为最后一天卖出肯定比持有收益更高

// ***********************
// 状态转移方程（递推方程）
// ***********************

// 今天没有持有股票，分为两种情况
// 1. dp[i - 1][k][0]，昨天没有持有，今天不操作
// 2. dp[i - 1][k][1]+prices[i]，昨天持有，今天卖出，今天手中没股票了
// dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])

// 今天持有股票，分为两种情况：
// 1.dp[i - 1][k][1] 昨天持有，今天不操作
// 2.dp[i - 1][k - 1][0] - prices[i] 昨天没持有，今天买入
// dp[i][k][1] = max(dp[i - 1][k][1], dp[i -1][k - 1][0] - prices[i])
// 最大利润就是这两种情况的最大值

// 从这里我们可以看出，最重要是求解出状态转移方程

// 再回到我们学习算法设计时的思路：
// 1.建模：对输入和输出给出形式化的描述
// 2.设计算法
// 3.正确性——是否对所有的实例都得到正确的解
// 4.分析算法效率

// 再快进到我们学习动态规划时的思路：
// 1.建模：优化的目标函数（状态转移方程是什么？约束条件是什么？）
// 2.如何划分子问题（边界）？

// 例子
// 要分析买卖股票的最佳时机
// 首先要建模
// 问题的解是向量<x1, x2,..., xn>，其中xi表示第i天
// 向量<k1, k2,..., kn>，其中ki表示交易第k次
// 向量<0, 1>，其中0表示不持有股票，1表示持有股票
// 意思就是买卖股票的最佳时期和什么有关？
// 和天有关，和次数有关，和持有不持有股票有关
// 所以要用个三维数组
// 接下来是目标函数
// 目标函数是求第i天进行了k次交易后手中无股票的最大值
// 目标函数max{[xi][ki][0]}的最大值
// 约束条件：
// 1.先买入才能卖出
// 2.不能同时参加多笔交易，再次买入时，需要先卖出
// 3.k>=0才能进行交易，否则没有交易次数
// 定义操作
// 买入、卖出、不操作
// 定义状态
// i 天数
// k 交易次数，每次交易包含买入和卖出，这里我们只在买入的
// 时候需要将k - 1
// 重中之重：优化函数的递推方程
// 递推方程分两种情况：第一种是今天不持有股票，第二种是今天持有股票
// 今天不持有股票,可能是昨天持有,今天卖出;昨天不持有,今天不操作 
// dp[i][k][0] = Math.max(dp[i - 1][k][1] + prices[i], dp[i - 1][k][0])
// 今天持有股票,可能是昨天不持有,今天买入;昨天持有,今天不操作
// dp[i][k][1] = Math.max(dp[i - 1][k - 1][0] - prices[i], dp[i - 1][k][1])
// 好了，总算推出来了。。。
// 下面我们来验证

// 第一题，限定交易次数 k = 1，意思就是给定一周的股票价格你
// 让你设计算法找到最低点和最高点买入和卖出
const maxProfit = (prices) => {
  let n = prices.length
  let dp = Array.from(new Array(n), () => new Array(2))
  dp[0][0] = 0 // 第0天不持有
  dp[0][1] = -prices[0] // 第0天持有
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][0])
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
  }
  // return dp[n - 1][0]
  for (let j = 0; j < dp.length; j++) {
    console.log(dp[j])
  }
}

// 好理想的结果。。。。

// 第二题 k = +infinity 交易次数无限制，跟k有关的
const maxProfit2 = function (prices) {
  let n = prices.length
  let dp = Array.from(new Array(n), () => new Array(2))
  dp[0][0] = 0 // 第0天不持有
  dp[0][1] = -prices[0] // 第0天持有
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][0])
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  }
  // return dp[n - 1][0]
  for (let j = 0; j < dp.length; j++) {
    console.log(dp[j])
  }
}

// 第三题 k = 2
const maxProfit3 = function (prices) {
  // 先描述出状态转移方程
  // dp[i][k][0] = Math.max(dp[i - 1][k][1] + prices[i], dp[i - 1][k][0])
  // dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
  // 根据题解，k=2
  // k对结果有影响 不能舍去，只能对k进行循环
  // for (let i = 0; i < n; i++) {
  //   for (let k = maxK; k >= 1; k--) {
  //     dp[i][k][0] = Math.max(dp[i - 1][k][1] + prices[i], dp[i - 1][k][0])
  //     dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
  //   }
  // }

  // k=2 直接写出循环的结果
  // dp[i][2][0] = Math.max(dp[i - 1][2][0], dp[i - 1][2][1] + prices[i])
  // dp[i][2][1] = Math.max(dp[i - 1][2][1], dp[i - 1][1][0] - prices[i])
  // k = 1
  // dp[i][1][0] = Math.max(dp[i - 1][1][0], dp[i - 1][1][1] + prices[i])
  // dp[i][1][1] = Math.max(dp[i - 1][1][1], dp[i - 1][0][0] - prices[i])
  //             = Math.max(dp[i - 1][1][1], -prices[i])
  // k=0时 没有交易次数，dp[i - 1][0][0] = 0
  // 去掉i这一维度
  // dp[1][0] = Math.max(dp[1][0], dp[1][1] + prices[i])
  // dp[1][1] = Math.max(dp[1][1], dp[0][0] - prices[i])
  //           = Math.max(dp[1][1], -prices[i])
  // k=0时 没有交易次数，dp[i - 1][0][0] = 0

  let buy_1 = -prices[0], sell_1 = 0
  let buy_2 = -prices[0], sell_2 = 0
  let n = prices.length
  for (let i = 1; i < n; i++) {
      sell_2 = Math.max(sell_2, buy_2 + prices[i])
      buy_2 = Math.max(buy_2, sell_1 - prices[i])
      sell_1 = Math.max(sell_1, buy_1 + prices[i])
      buy_1 = Math.max(buy_1, -prices[i])
  }
  return sell_2
}

// 限定交易次数，最多为k
const maxProfit4 = function (k, prices) {
  let n = prices.length
  let profit = new Array(k)
  // 和123题一样，求出所有k的状态
  // 初始化k次交易买入卖出的利润
  for (let j = 0; j <= k; j++) {
    profit[j] = {
      buy: -prices[0],
      sell: 0
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      // 122题可以交易无数次，188题可以交易k次，所以直接加一层k循环就可以了
      // 122题最后递推方程：
      // sell = Math.max(sell, buy + prices[i])
      // buy = Math.max(buy, -prices[i])
      profit[j] = {
        sell: Math.max(profit[j].sell, profit[j].buy + prices[i]),
        buy: Math.max(profit[j].buy, profit[j - 1].sell - prices[i])
      }
    }
  }
  return profit[k].sell
}

// 含有交易冷冻期
const maxProfit5 = function (prices) {
  let n = prices.length;
    let buy = -prices[0];//手中有股票
    let sell = 0;//没有股票
    let profit_freeze = 0;
    for (let i = 1; i < n; i++) {
        let temp = sell;
        sell = Math.max(sell, buy + prices[i]);
        buy = Math.max(buy, profit_freeze - prices[i]);
        profit_freeze = temp;
    }
    return sell
}

maxProfit([7,1,5,3,6,4])
console.log('----------------')
maxProfit2([7,1,5,3,6,4])
console.log('----------------')
console.log(maxProfit3([7,1,5,3,6,4]))
console.log(maxProfit4(2, [7,1,5,3,6,4]))
console.log(maxProfit5([7,1,5,3,6,4]))