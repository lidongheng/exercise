/*
  自定义Promise函数模块
 */

(function (window) {
  // Promise构造函数
  function Promise (excutor) {
    const self = this
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    self.status = PENDING
    self.data = undefined
    self.callbacks= []

    function resolve (value) {
      if (self.status !== PENDING) return
      self.status = RESOLVED
      self.data = value
      // 如果有待执行的callbacks，立即异步执行回调函数
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callback => {
            callback.onResolved(value)
          })
        })
      }
    }

    function reject (reason) {
      if (self.status !== PENDING) return
      self.status = REJECTED
      self.data = reason
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callback => {
            callback.onRejected(reason)
          })
        })
      }
    }

    try {
      excutor (resolve, reject)
    } catch (error) {
      reject(error)
    }
  
    /*
      Promise的原型对象then
      指定成功和失败的回调函数
      返回一个新的Promise对象
    */
    Promise.prototype.then = function (onResolved, onRejected) {
      onResolved = typeof onResolved === 'function' ? onResolved : value => value
      onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
      const self = this
      return new Promise((resolve, reject) => {

        function handle (callback) {
          /*
          1. 如果抛出异常，return的promise就会失败，reason就是error
          2. 如果回调函数返回不是promise，return的promise就会成功，value是resolve函数的值
          3. 如果回调函数返回是promise,return的promise就是这个promise的结果
            */
          try {
            const result = callback(self.data)
            if (result instanceof Promise) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        }
        if (self.status === PENDING) {
          self.callbacks.push({
            onResolved () {
              handle(onResolved)
            },
            onRejected () {
              handle(onRejected)
            }
          })
        } else if (self.status === RESOLVED) {
          setTimeout(() => {
            handle(onResolved)
          })
        } else {
          setTimeout(() => {
            handle(onRejected)
          })
        }
      })
    }
    /*
      Promise的原型对象catch
      指定失败的回调函数
      返回一个新的Promise对象
    */
    Promise.prototype.catch = function (onRejected) {
      return this.then(undefined, onRejected)
    }
}

    /* 
    Promise函数对象的resolve
    */
    Promise.resolve = function (value) {
      return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      })
    }
  
    Promise.reject = function (reason) {
      return new Promise((resolve, reject) => {
        reject(reason)
      })
    }

  Promise.all = function (promises) {
    let promiseCounter = 0    
    return new Promise((resolve, reject) => {
      const promiseArr = new Array(promises.length)
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {
            promiseArr[index] = value
            promiseCounter++
            if (promiseCounter === promises.length) {
              resolve(promiseArr)
            }
          },
          reason => reject(reason))
      })
    })    
  }

  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p) => {
        Promise.resolve(p).then(
          value => resolve(value),
          reason => reject(reason)
        )
      })
    })
  }
  

  window.Promise = Promise
})(window)

