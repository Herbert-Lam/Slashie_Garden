import http from "../http-common"

class ApplicationService{
    getAllApplications(){
        return http.get("/applications")
    }
    
    postJobApplication(applicationData){
        return http.post("/applications", applicationData)
    }


}

export default new ApplicationService();