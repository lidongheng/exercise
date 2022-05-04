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

    self.status = 'pending'
    self.data = undefined
    self.callbacks= []

    function resolve (value) {
      if (self.status !== 'pending') return
      self.status = 'resolved'
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
      if (self.status !== 'pending') return
      self.status = 'rejected'
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
      Promise函数对象的resolve
     */
    Promise.resolve = function () {

    }

    Promise.reject = function () {

    }
    
    /*
     Promise的原型对象then
     指定成功和失败的回调函数
     返回一个新的Promise对象
    */
    Promise.prototype.then = function (onResolved, onRejected) {
        
    }
    /*
     Promise的原型对象catch
     指定失败的回调函数
     返回一个新的Promise对象
    */
    Promise.prototype.catch = function (onRejected) {
        
    }

    Promise.all = function () {
        
    }

    Promise.race = function () {
        
    }
  }

  window.Promise = Promise
})(window)