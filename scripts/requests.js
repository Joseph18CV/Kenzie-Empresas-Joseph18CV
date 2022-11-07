const baseUrl = "http://localhost:6278/"
import { getLocalStorage } from "./localStorage.js"
import { toastLoginSucess, toastLoginFail, toastRegisterSucess, toastRegisterFail } from "./toast.js"

async function listCompanies () {
    try {
        const request = await fetch(baseUrl + "companies", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

async function listSectorCompanies (sector) {
    try {
        const request = await fetch(baseUrl + `companies/${sector}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

async function listSectors () {

    const localStorage = getLocalStorage()
    try {
        const request = await fetch(baseUrl + "sectors", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

async function login (body) {
    try {
        const request = await fetch(baseUrl + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(request.ok) {
            const response = await request.json()
            toastLoginSucess()
            localStorage.setItem("user", JSON.stringify(response))
            const userLS = await getUser(response)
            localStorage.setItem("userInfo", JSON.stringify(userLS))
            const user = await verifyAdm()
            if(user.is_admin == true){
                setTimeout(() => {
                    window.location.replace("../adminPage/admin.html")
                }, 4000)
            }else{
                setTimeout(() => {
                    window.location.replace("../userPage/user.html")
                }, 4000)
            } 
        }else {
            toastLoginFail()
        }
    } catch (error) {
        console.log(error)
    }
}

async function verifyAdm () {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(baseUrl + "auth/validate_user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

async function register (body) {
    try {
    const request = await fetch(baseUrl + "auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if(request.ok){
        const response = await request.json()
        toastRegisterSucess()

        setTimeout(() => {
            window.location.replace("../login/login.html")
        }, 4000)

        return response
    }else {
        toastRegisterFail()
    }

    } catch (error) {
        console.log(error)
    }
}

async function getUser () {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(baseUrl + "users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

async function listUsersDepartment () {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(baseUrl + "users/departments/coworkers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

async function listDepartmentCompanyUser () {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(baseUrl + "users/departments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

async function editPost(username, password, email) {

    const localStorage = getLocalStorage()

    try{
        const data = {
            username: `${username}`,
            password: `${password}`,
            email: `${email}`
        }

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body:JSON.stringify(data)
        }

        const responseJSON = await fetch(baseUrl + "users", options)
        const response = await responseJSON.json()
    
        return response

    }catch (error){
        console.log(error)
    }
}

async function allUsers () {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(baseUrl + "users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

async function listDepartments () {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(baseUrl + "departments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()

        return response
        
    } catch (error) {
        console.log(error)
    }

}

async function editUser (kind_of_work, professional_level, id) {

    const localStorage = getLocalStorage()

    try {
        const data = {
            kind_of_work: `${kind_of_work}`,
            professional_level: `${professional_level}`
        }

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body:JSON.stringify(data)
        }
        const responseJSON = await fetch(baseUrl + `admin/update_user/${id}`, options)
        const response = await responseJSON.json()

        return response 

    } catch (error) {
        console.log(error)
    }
}

async function deleteUser(id){

    const localStorage = getLocalStorage()
    try{
        const request = await fetch(baseUrl + `admin/delete_user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.token}`,
            },
        })

    } catch(error){
        console.log(error)
    }
}

async function createDepartment (name, description, company_uuid) {

    const localStorage = getLocalStorage()

    try {
        const data = {
            name: `${name}`,
            description: `${description}`,
            company_uuid: `${company_uuid}`

        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(data)
        }

        const responseJSON = await fetch(baseUrl + "departments", options)
        const response = await responseJSON.json()

        return response
        
    } catch (error) {
        console.log(error)
    }

}

async function deleteDepartment(id){

    const localStorage = getLocalStorage()
    try{
        const request = await fetch(baseUrl + `departments/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.token}`,
            },
        })

    } catch(error){
        console.log(error)
    }
}

async function editDepartment(description, id) {

    const localStorage = getLocalStorage()

    try{
        const data = {
            description: `${description}`,
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
            body:JSON.stringify(data)
        }

        const responseJSON = await fetch(baseUrl + `departments/${id}`, options)
        const response = await responseJSON.json()
    
        return response

    }catch (error){
        console.log(error)
    }
}

async function hireUser(user_uuid, department_uuid) {

    const localStorage = getLocalStorage()

    try{
        const data = {
            user_uuid: `${user_uuid}`,
            department_uuid: `${department_uuid}`
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
            body:JSON.stringify(data)
        }

        const responseJSON = await fetch(baseUrl + "departments/hire", options)
        const response = await responseJSON.json()
    
        return response

    }catch (error){
        console.log(error)
    }
}

async function dismissUser(id) {

    const localStorage = getLocalStorage()

    try{
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
        }

        const responseJSON = await fetch(baseUrl + `departments/dismiss/${id}`, options)
        const response = await responseJSON.json()
    
        return response

    }catch (error){
        console.log(error)
    }
}

async function listUsersNotDepartment () {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(baseUrl + "admin/out_of_work", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }
}

export {
    listCompanies,
    listSectorCompanies,
    login,
    register,
    getUser,
    listUsersDepartment,
    listDepartmentCompanyUser,
    editPost,
    listSectors,
    allUsers,
    listDepartments,
    editUser,
    deleteUser, 
    verifyAdm,
    createDepartment,
    deleteDepartment,
    editDepartment,
    hireUser,
    dismissUser,
    listUsersNotDepartment
}