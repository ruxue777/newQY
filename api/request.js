let request = (Url,Data) =>{
    return new Promise((resolve,reject)=>{
        uni.request({
            url:`https://api.xfgoo.com:60010/api/XFClientAPI_Json.asmx/${Url}`,
            data:Data,
            method:'GET',
            header:{'content-type':'application/x-www-form-urlencoded'}
        })
        .then((res)=>{
            resolve(res[1].data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

let wxRequest = (Url,Data) =>{
    return new Promise((resolve,reject)=>{
        uni.request({
            url:`https://api.xfgoo.com:60020/WxappService.asmx/${Url}`,
            data:Data,
            method:'GET',
            header:{'content-type':'application/x-www-form-urlencoded'}
        })
        .then((res)=>{
            resolve(res[1].data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

let payment = (Url,Data) =>{
    return new Promise((resolve,reject)=>{
        uni.request({
            url:`https://api.xfgoo.com:60020/AccountpayService.asmx/${Url}`,
            data:Data,
            method:'GET',
            header:{'content-type':'application/x-www-form-urlencoded'}
        })
        .then((res)=>{
            resolve(res[1].data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

export {request,wxRequest,payment};
