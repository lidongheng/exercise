Number.prototype.add = function (value) {
  value = Number(value)
  value = isNaN(value) ? 0 : value
  return this + value
}

Number.prototype.minus = function (value) {
  value = Number(value)
  value = isNaN(value) ? 0 : value
  return this - value
}

