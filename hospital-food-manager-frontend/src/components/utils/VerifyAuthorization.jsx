export function VerifyAuthorization () {

    const getToken = localStorage.getItem('Hfmtoken')

    if (!getToken) {
        return false
    }

    return true

}