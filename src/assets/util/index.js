function getRandomIndex(max){
    return Math.floor(Math.random()*max)
}

function swap(i,j,list){
    let t = list[i]
    list[i] = list[j]
    list[j] = t
}

export function getRandomList(list,length) {
    for(let i=0;i<length;i++) {
        let j = getRandomIndex(length) 
        swap(i,j,list)
    }
}
//参数需要是整数
export function formatToStr(num) {
    const m = parseInt(num/60)
    const s = num%60
    let mm = ''
    let ss = ''
    mm = m.toString().length == 1? `0${m}`:`${m}`
    ss = s.toString().length == 1? `0${s}`:`${s}`
    return `${mm}:${ss}`
}

//参数是字符串 00:12.12  02:33.99
export function formatToNumber(str){
    const m = str.split(":")[0]
    const s = str.split(":")[1].split(".")[0]
    const ms = '0.'+str.split(":")[1].split(".")[1].slice(0,2)
    return `${parseInt(m)*60+parseInt(s)+parseFloat(ms)}`
}

//百度借鉴的方法
export function formatLyricTime (time) { // 格式化歌词的时间 转换成 sss:ms
    const regMin = /.*:/
    const regSec = /:.*\./
    const regMs = /\./

    const min = parseInt(time.match(regMin)[0].slice(0, 2))
    let sec = parseInt(time.match(regSec)[0].slice(1, 3))
    const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
    if (min !== 0) {
      sec += min * 60
    }
    return Number(sec + '.' + ms)
  }

export function isNullObj(obj) {
    if(Object.keys(obj).length == 0) {
        return true
    }
    return false
}