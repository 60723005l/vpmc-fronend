import store from "../../store"
import { cookies } from "../../cookies"
import api from "../../api"

/**@return {boolean} */
const isLoggedin = () => {
    return store.state.user.isLogin
}

const getUserCookies = () => {
    let token = cookies.get('token'),
        username = cookies.get('username') || 'user'
    return { token, username }
}

const loginGuard = async (to, from, next) => {
    if (isLoggedin()) next()
    else {
        const { token, username } = getUserCookies()
        try {
            const responsePayload = await (await api.User.validate(token)).json()
            const payload = {
                _userId: responsePayload._userId,
                username: responsePayload.username,
                email: responsePayload.email,
                token: token,
                role: responsePayload.roles[0].id,
            };
            // let payload = {
            //     username: userInfo.UserName,
            //     token: token,
            //     role: userInfo.UserRole,
            //     id: userInfo.UserID
            // }
            await store.dispatch('user/login', payload)
            cookies.set('username', responsePayload.username)
            // cookies.set('vpmc-username', userInfo.UserName)
            next()
        }
        catch (err) {
            next({ name: "Login" })
            throw err
        }
    }
}
export default loginGuard