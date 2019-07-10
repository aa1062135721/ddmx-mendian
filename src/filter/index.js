export const timeStampToYMD = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let o = {
    'y': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'h': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds()
  }
  return o.y + '-' + o.M + '-' + o.d
}

export const timeStampToYMDHIS = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let o = {
    'y': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'h': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds()
  }
  return o.y + '-' + o.M + '-' + o.d + ' ' + o.h + ':' + o.m + ':' + o.s
}
