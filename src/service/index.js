import axios from 'axios'


export default function(url) {
    return axios.get(url).then((res)=>{
        const data = res.data
        if(data.code == 0) {
            return Promise.resolve(data.result)
        }else {
            return Promise.reject("错误的状态码",code)
        }

    }).catch(err=>{
        return Promise.reject(err)
    })
}