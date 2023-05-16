import axios from "axios";

const UserService ={}

UserService.login = function (data) {

    return axios.post('http://localhost:2001/auth/signIn',data)
}

export default UserService