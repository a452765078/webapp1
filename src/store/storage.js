const config = {
    storageName: 'musicApp'
}

function getAllStorage() {
    let storageData = sessionStorage.getItem(config.storageName) ? sessionStorage.getItem(config.storageName) : '{}'
    storageData = storageData == 'undefined' ? {} : JSON.parse(storageData)
    return storageData
}

function setAllStorage(data) {
    sessionStorage.setItem(config.storageName, JSON.stringify(data))
}

function setItem(name, val) {
    let storageData = getAllStorage()
    storageData[name] = val
    setAllStorage(storageData)
}
function getItem(name) {
    let storageData = getAllStorage()
    let result = storageData[name] === 'undefined' ? '' : storageData[name]
    return result
}



export  {
        setItem,
        getItem,
        setAllStorage,
        getAllStorage
    }