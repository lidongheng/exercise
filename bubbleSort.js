function bubbleSort (Arr) {
  for (var i = 0; i < Arr.length; i++) {
    for (var j = i + 1; j < Arr.length; j++) {
      if (Arr[i] < Arr[j]) {
        let temp = Arr[i]
        Arr[i] = Arr[j]
        Arr[j] = temp
      }
    }
  }
  console.log(Arr)
}

function selectionSort (Arr) {
  let index, temp
  for (var i = 0; i < Arr.length; i++) {
    index = i
    for (var j = i + 1; j < Arr.length; j++) {
      if (Arr[j] < Arr[index]) {
        index = j
      }
    }
    if (index !== i) {
      temp = Arr[i]
      Arr[i] = Arr[index]
      Arr[index]= temp 
    }
  }
  console.log(Arr)
}

// 快速排序：选中一个元素，小的放左边,大的放右边
function quickSort (Arr) {
  let len = Arr.length
  if (len < 2) {
    return Arr
  } else {
    let flag = Arr[0]
    let left = []
    let right = []
    for (let i = 1; i < len; i++) {
      if (Arr[i] > flag) {
        right.push(Arr[i])
      } else {
        left.push(Arr[i])
      }
    }
    return quickSort(left).concat(flag, quickSort(right))
  }
}



function quickSort2 (Arr) {
   let swap = (Arr, p, q) => {
    let temp = Arr[p]
    Arr[p] = Arr[q]
    Arr[q] = temp
  }

  let findCenter = (Arr, left, right) => {
    let flag = Arr[left]
    let idx = left + 1
    for (var i = idx; i <= right; i++) {
      if (Arr[i] < flag) {
        swap(Arr, idx, i)
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

quickSort2([2,8,9,3,0,4,5])