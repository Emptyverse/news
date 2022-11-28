// 存储localStorage数据
export const setItem = (key, value) => {
  try {
    if (typeof value === 'object') { 
      value = JSON.stringify(value)
      window.localStorage.setItem(key, value)
    }
  } catch (e) { 
    console.log('存储出错')
  }
}