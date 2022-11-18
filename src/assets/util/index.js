export function getRandomIndex(max){
    return Math.floor(Math.random()*max)
}

export function swap(i,j,list){
    let t = list[i]
    list[i] = list[j]
    list[j] = t
}