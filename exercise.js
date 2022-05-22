const maxProfit = function (prices) {
  let n = prices.length
  let dp = Array.from(new Array(n), () => new Array(2))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
  }
  return dp[n - 1][0]
}

console.log(maxProfit([7, 1, 2, 6, 4, 5]))
