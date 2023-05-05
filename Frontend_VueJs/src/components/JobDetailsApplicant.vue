<template>
    <div id="container">
        <div class="card text-center">
            <div class="card-header">
                <h2>Job Details for JobID #{{ job.id }}</h2>
            </div>
            <div class="card-body custom-cardbody" v-if="job">
                <form>
                    <div class="form-group row">
                        <label for="title" class="col-sm-2 col-form-label text-start">Job Title</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="title"
                                :value="`${job.jobTitle}`">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="description" class="col-sm-2 col-form-label text-start">Descriptions</label>
                        <div class="col-sm-10">
                            <textarea readonly class="form-control" id="description" :value="`${job.description}`"
                                style="font-size: 20px;"></textarea>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="jobDate" class="col-sm-2 col-form-label text-start">Job Date</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="jobDate"
                                :value="`${job.jobDate}`">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="startTime" class="col-sm-2 col-form-label text-start">Start Time</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="startTime"
                                :value="`${job.startTime}`">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="endTime" class="col-sm-2 col-form-label text-start">End Time</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="endTime"
                                :value="`${job.endTime}`">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="duration" class="col-sm-2 col-form-label text-start">Duration</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="duration"
                                :value="`${job.duration}`">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="location" class="col-sm-2 col-form-label text-start">Location</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="location"
                                :value="`${job.location}`">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="wage" class="col-sm-2 col-form-label text-start">Hourly Wage</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="wage" :value="`${job.hrWage}`">
                        </div>
                    </div>

                    <div id="skillsData" style="display: none;">
                        <textarea id="skillsInput" class="form-control" v-model="applicationData.skills"
                            placeholder="Indicate your skills here..."></textarea>
                        <br>
                    </div>
                </form>



                <div id="applyBtn-container">
                    <button id="applyJobBtn" class="btn btn-success" type="submit" @click="applyJob">{{ btnLabel }}</button>
                    <p>{{ applicationMessage }}</p>
                </div>
            </div>

            <h3 v-else>Job details are not available!</h3>


            <div class="card-footer text-muted" v-if="job">
                Posted By {{ employer.firstName }} {{ employer.lastName }} @ {{ job.createdDateTime }}
            </div>
        </div>
    </div>
</template>

<script>
import JobService from "../services/JobService"
import ApplicationService from "../services/ApplicationService"
import UserTypeDataService from "@/services/UserTypeDataService"

export default {
    name: "jobDetailsApplicant",

    props: ['jobId', 'userTypeId'],

    data() {
        return {
            job: "",
            employer: "",
            applicationData: {
                jobId: this.jobId,
                statusId: 2,
                appUserId: "",
                skills: ""
            },
            applicationMessage: "",
            btnLabel: "Apply Job"
        }
    },

    methods: {
        retrieveJob() {
            const jobId = this.jobId;
            console.log("jobId: " + jobId);
            JobService.getJobDetails(jobId)
                .then(response => {
                    this.job = response.data;
                    this.employer = this.job.user_type_id.appUser;
                    console.log(this.job);
                    console.log(this.employer);
                })
                .catch(error => {
                    console.log(error);
                })

            UserTypeDataService.get(this.userTypeId)
                .then(response => {
                    this.applicationData.appUserId = response.data.appUser.userId;
                    console.log("GET appUserId: " + this.applicationData.appUserId);
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        },

        showSkillsBox() {
            let skillsBox = document.getElementById("skillsData");
            console.log("get skillsData: ", skillsBox);
            if (skillsBox.style.display === "none") {
                skillsBox.style.display = "block";
            } else {
                skillsBox.style.display = "none";
            }
        },

        collectApplicationData() {
            console.log("jobId: " + this.applicationData.jobId);
            console.log("statusId: " + this.applicationData.statusId)
            console.log("applicantId: " + this.applicationData.appUserId);
            console.log("skills: ", this.applicationData.skills);
            console.log("applicationdata Obj:", this.applicationData);

            ApplicationService.postJobApplication(this.applicationData)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    this.applicationMessage = error.response.data.message;
                    console.log(error.response.data);
                })
        },

        applyJob(event) {
            event.preventDefault();

            if (this.btnLabel === "Apply Job") {
                this.showSkillsBox(); //show box
                this.btnLabel = "Submit Application";
            }
            else {
                document.getElementById("applyJobBtn").disabled = true;
                this.showSkillsBox();
                this.applicationMessage = "You have successfully applied for this job!";
                this.collectApplicationData();
            }
        },

        hasApplied() {
            const jobId = this.$route.params.jobId;
            console.log("checkedApplied - jobId: " + jobId);
            JobService.JobApplications(jobId)
                .then(response => {
                    console.log("in then statement");
                    console.log(response.data);

                    let applications = response.data;
                    console.log(applications[0].userType.userTypeId);

                    for (let i = 0; i < applications.length; i++) {
                        console.log("for loop - i:" + i);
                        console.log("for loop -  userType in application: " + applications[i].userType.userTypeId);
                        console.log(applications[i].userType.userTypeId == this.userTypeId);
                        if (applications[i].userType.userTypeId == this.userTypeId) {
                            this.applicationMessage = "You have already applied for the job!";
                            document.getElementById("applyJobBtn").disabled = true;
                            console.log("hasApplied = true")
                            return true;
                        }
                    }
                    console.log("hasApplied = then false");
                    document.getElementById("applyJobBtn").disabled = false;
                    return false;
                })
                .catch(error => {
                    console.log("hasApplied = catch false");
                    console.log(error.response.data);
                    document.getElementById("applyJobBtn").disabled = false;
                    return false;
                })
        },
        calculatePostDate() {
            console.log(this.job)
        }

    },

    mounted() {
        this.retrieveJob();
        this.hasApplied();
        this.calculatePostDate();
    }
}

</script>

<style>
.custom-cardbody {
    font-size: 20px;
}

#jobDetailDisplay,
#skillsData,
#applyBtn-container {
    margin: 15px;
    width: 100%;
    padding: 0 15px;
}

#jobDetailDisplay h2 {
    text-align: center;
}

#jobDetailDisplay p {
    font-size: 24px;
}

#skillsData label {
    font-size: 24px;
}

#applyBtn-container p {
    font-size: 22px;
    color: #000;
    opacity: 0.8;
}

#container {
    margin: 0 auto;
    width: 100%;
    padding: 50px 15% 50px 15%;
}
</style>