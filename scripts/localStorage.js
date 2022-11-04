const getLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user")) || ""
    
    return user
}

const getUserLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("userInfo")) || ""
    
    return user
}

export {
    getLocalStorage,
    getUserLocalStorage
}