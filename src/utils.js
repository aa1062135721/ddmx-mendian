/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/***
 * 处理传进来的时间戳 为 2017-12-11 格式
 * @param timstamp
 */
export const changeTime = (timstamp, flag) => {
  let time = new Date(timstamp)
  let y = time.getFullYear()
  let m = time.getMonth() - 0 + 1
  let d = time.getDate()
  m = (m + '').length === 1 ? '0' + m : m
  d = (d + '').length === 1 ? '0' + d : d
  if (flag) {
    return y + '年' + m + '月' + d + '日'
  } else {
    return y + '-' + m + '-' + d
  }
}

/**
 * 获得本周的开始日期和结束时间 为 2017-12-11 格式
 * @returns {*['2017-12-11','2017-12-18']}
 */
export const  getWeekStartDateAndEndDateRange = () =>{
  let oneDayLong = 24*60*60*1000 ;
  let now = new Date();
  let mondayTime = now.getTime() - (now.getDay()-1)*oneDayLong;
  let sundayTime = now.getTime() + (7-now.getDay())*oneDayLong;
  let monday = new Date(mondayTime);
  let sunday = new Date(sundayTime);
  let weekRange = [changeTime(monday.getTime()), changeTime(sunday.getTime())];
  console.log(weekRange);
  return weekRange;
}

/***
 * 深复制一个对象
 * @param p
 * @param c
 * @returns {*|{}}
 */
export const deepCopy = (obj, c) => {
  // 只拷贝对象
  if (typeof obj !== 'object') return
  // 根据obj的类型判断是新建一个数组还是一个对象
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    // 遍历obj,并且判断是obj的属性才拷贝
    if (obj.hasOwnProperty(key)) {
      // 判断属性值的类型，如果是对象递归调用深拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
