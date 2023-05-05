<template>
    <div class="joblist-container">
        <h2 id="joblist-title">Job List</h2>
        <h4 v-if="jobs.length == 0" id="joblist-none">There is no job available yet!</h4>

        <!-- Display Non-Closed Job List Info -->

        <table class="table table-hover table-bordered custom-table-joblist" v-if="jobs.length">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Job Description</th>
                    <th scope="col">Job Start Date</th>
                    <th scope="col">Job Start Time</th>
                    <th scope="col">Location</th>
                    <th scope="col">Hourly Wage</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(job, index) in jobs" :key="index">
                    <!-- <th>{{index+1}}</th> -->
                    <th scope="row"><router-link
                            :to="isEmployer ?
                                { path: `/employer/jobs/${job.id}`, params: { jobId: job.id } } : { path: `/applicant/jobs/${job.id}`, params: { jobId: job.id, userTypeId: this.userTypeId } }">
                            {{ job.id }}
                        </router-link></th>
                    <!-- <th>{{ job.id }}</th> -->
                    <td>{{ job.jobTitle }}</td>
                    <td>{{ job.description }}</td>
                    <td>{{ job.jobDate }}</td>
                    <td>{{ job.startTime }}</td>
                    <!-- <td>{{job.duration}}</td> -->
                    <td>{{ job.location }}</td>
                    <td>{{ job.hrWage }}</td>
                    <td>{{ job.job_status.statusDescription }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import JobService from '@/services/JobService';
// import UserTypeDataService from '@/services/UserTypeDataService';

export default {
    name: "jobList",
    props: ['userTypeId'],
    data() {
        return {
            jobs: [],
        }

    },

    computed: {
        isEmployer() {
            console.log("isEmployer: " + (this.userTypeId == localStorage.getItem('typeId') == 1))
            return (this.userTypeId == localStorage.getItem('typeId') == 1);
        }
    },

    methods: {
        retrieveJobs(userTypeId) {
            const id = userTypeId;
            console.log("JobList userTypeId: " + id); //1
            const userType = localStorage.getItem('typeId');
            console.log(userType); //2

            if (id == 1) { //for Employer
                JobService.getAllJobs()
                    .then(response => {
                        this.jobs = response.data.filter(record =>
                            record.job_status.id !== 6 &&
                            record.job_status.id !== 7 &&
                            record.job_status.id !== 8 &&
                            record.user_type_id.userTypeId === id);
                        console.log(this.jobs);

                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else { //for Applicant

                JobService.getAllJobs()
                    .then(response => {
                        this.jobs = response.data.filter(record =>
                            record.job_status.id == 1
                        );
                        console.log(this.jobs);

                    })
                    .catch(error => {
                        console.log(error);
                    })

            }
        }

    },

    mounted() {
        this.retrieveJobs(this.userTypeId);
    }
}
</script>


<style>
html,
body,
.joblist-container {
    /* height: 100%; */
    background-color: #e2decb;
}

.joblist-container {
    margin: 0 auto;
    width: 100%;
    padding: 0 15px;
}

#joblist-title {
    text-align: center;
    font-weight: bold;
    font-family: Verdana, sans-serif;
}

#joblist-none {
    font-size: 24px;
    font-weight: bold;
    font-family: Verdana, sans-serif;
    text-align: left;
}

.custom-table-joblist {
    text-align: left;
    font-family: Verdana, sans-serif;
}

.custom-table-joblist thead,
.custom-table-joblist tbody {
    font-size: 20px;
}

.col1 {
    width: 100px;
}

.col2 {
    width: 300px;
}

.col3 {
    width: 400px;
}

.col4 {
    width: 180px;
}

.col5 {
    width: 180px;
}

.col6 {
    width: 350px;
}

.col7 {
    width: 100px;
}

.col8 {
    width: 100px;
}
</style>