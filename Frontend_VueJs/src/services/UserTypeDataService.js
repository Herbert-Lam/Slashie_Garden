import http from "../http-common";

class UserTypeDataService {

    get(id) {
        return http.get(`/user_types/${id}`);
    }
}

export default new UserTypeDataService();