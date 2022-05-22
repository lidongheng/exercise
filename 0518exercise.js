// 冒泡排序
function bubbleSort (Arr) {
  function swap (Arr, p, q) {
    let temp;
    temp = Arr[p]
    Arr[p] = Arr[q]
    Arr[q] = temp
  }
  for (var i = 0; i < Arr.length; i++) {
    for (var j = i; j < Arr.length; j++) {
      if (Arr[i] > Arr[j]) {
        swap(Arr, i, j)
      }
    }
  }
  console.log(Arr)
}

// 选择排序
function selectionSort (Arr) {
  function swap (Arr, p, q) {
    let temp;
    temp = Arr[p]
    Arr[p] = Arr[q]
    Arr[q] = temp
  }
  for (var i = 0; i < Arr.length; i++) {
    let index = i;
    for (var j = i; j < Arr.length; j++) {
      if (Arr[j] < Arr[index]) {
        index = j
      }
    }
    if (index !== i) {
      swap(Arr, index, i)
    }
  }
  console.log(Arr)
}

// 插入排序(体育课排序)
function insertSort (Arr) {
  for (var i = 1; i < Arr.length; i++) {
    if (Arr[i] < Arr[i - 1]) {
      let temp = Arr[i]
      for (var j = i - 1; j >= 0 && temp < Arr[j]; j--) {
        Arr[i] = Arr[j]
      }
      Arr[j + 1] = temp
    }
  }
  console.log(Arr)
}

// 快速排序（选取第一个元素，排在他该排的位置，他的左边和右边进行递归）
function quickSort (Arr) {
  function swap (Arr, p, q) {
    let temp;
    temp = Arr[p]
    Arr[p] = Arr[q]
    Arr[q] = temp
  }
  let findCenter = (Arr, left, right) => {
    let flag = Arr[left]
    let idx = left + 1
    for (var i = idx; i <= right; i++) {
      if (flag > Arr[i]) {
        swap(Arr, i, idx)
        idx++
      }
    }
    swap(Arr, left, idx - 1)
    return idx
  }
  let sort = (Arr, left, right) => {
    if (left < right) {
      let center = findCenter(Arr, left, right)
      sort(Arr, left, center - 1)
      sort(Arr, center, right)
    }
  }
  sort(Arr, 0, Arr.length)
  console.log(Arr)
}

function shellSort (Arr) {
  var half = Arr.length / 2
  for (var gap = half; gap >= 1; gap = parseInt(gap / 2)) {
    // 插入排序
    for (var i = gap; i < Arr.length; i++) {
      if (Arr[i] < Arr[i - gap]) {
        let temp = Arr[i]
        for (var j = i - gap; j >= 0 && temp < Arr[j]; j = j - gap) {
            Arr[i] = Arr[j]
        }
        Arr[j + gap] = temp
      }
    }
  }
  console.log(Arr)
}

// shellSort([4,2,8,0,5,1])

var arr = [1, 2, 3, 4]
function sum (a, b, c, d) {
  console.log(a, b, c, d)
  for (let i = 0; i < d.length; i++) {
    d[i] = d[i] * 2
  }
  return a + b
}

var result = arr.reduce(sum, 50)
