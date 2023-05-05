import http from "../http-common"

class JobService{
    getAllJobs(){
        return http.get("/jobs")
    }

    getJobDetails(id) {
        return http.get(`/jobs/${id}`);
    }
    
    JobApplications(id) {
        return http.get(`/jobs/${id}/applications`);
    }
  
    ApplicationStatus(id, sid) {
        return http.put(`/applications/${id}`, { statusId: sid });
    }
  
    JobStatus(id, sid) {
        return http.put(`/jobs/${id}`, { statusId: sid });
    }
    
    postJob(jobFormData){
        return http.post("/jobs", jobFormData);
    }
}

export default new JobService();