<template lang="">
    <div class="applylist-container">
        <h2>Apply List</h2>
        <h4 v-if="applications.length==0">You have not applied any jobs yet!</h4>
        
        <table class="table table-hover table-bordered custom-table-applylist" v-if="applications.length">
        <thead>
            <tr>
            <th class="apply-col1">Item</th>
            <th class="apply-col2">ID</th>
            <th class="apply-col3">Job Title</th>
            <th class="apply-col4">Job Description</th>
            <th class="apply-col5">Job Start Date</th>
            <th class="apply-col6">Job Start Time</th>
            <th class="apply-col7">Job Duration</th>
            <th class="apply-col8">Location</th>
            <th class="apply-col9">Hourly Wage</th>
            <th class="apply-col10">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(application, index) in applications" :key="index">
                <th scope="row">{{index+1}}</th>    
                <td><router-link :to="{path:`/applicant/jobs/${application.job.id}`, params:{id: application.job.id}}">{{application.job.id}}</router-link></td>
                <td>{{application.job.jobTitle}}</td>
                <td>{{application.job.description}}</td>
                <td>{{application.job.jobDate}}</td>
                <td>{{application.job.startTime}}</td>
                <td>{{application.job.duration}}</td>
                <td>{{application.job.location}}</td>
                <td>{{application.job.hrWage}}</td>
                <td>{{application.application_status.statusDescription}}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
import ApplicationService from '@/services/ApplicationService';

export default {
    name: "applyList",

    props: ['userTypeId'],
    data() {
        return {
            applications: []
        }
    },

    methods: {
        retrieveApplications() {
            console.log("retrieve app: userTypeId is" + this.userTypeId); //3
            ApplicationService.getAllApplications()
                .then(response => {
                    let data = response.data
                    this.applications = data.filter(dat => dat.userType.userTypeId == this.userTypeId);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },

    mounted() {
        this.retrieveApplications();
    }

}
</script>
<style >
.custom-table-applylist thead,
.custom-table-applylist tbody {
    font-size: 20px;
}

.applylist-container {
    font-family: Verdana, sans-serif;
}

.applylist-container h2 {
    text-align: center;
    font-weight: bold;
}

.applylist-table {
    font-size: 18px;
}

.applylist-table thead {
    font-size: 20px;
    font-weight: 600;
}

.applylist-table tbody th {
    font-size: 18px;
    font-weight: normal;
}

.apply-col1 {
    width: 80px;
}

.apply-col3 {
    width: 180px;
}

.apply-col4 {
    width: 300px;
}

.apply-col5{
    width: 250px;

}

.apply-col6 {
    width: 250px;
}

.apply-col7 {
    width: 250px;
}

.apply-col8 {
    width: 300px;
}

.apply-col9{
    width:220px
}

.apply-col10 {
    width: 100px;
}
</style>