<template>
    <div id="employer-main">
        <job-list :userTypeId="userTypeId"></job-list>
        <router-link :to="{ path: `/demo/createJob`, params: { userTypeId: this.userTypeId } }">
            <button class="btn btn-success" id="createjob-btn">Create Job</button>
        </router-link>
    </div>
</template>

<script>
import JobList from './JobList';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

export default {
    name: "employerMain",
    props: ['userTypeId'],
    components: {
        JobList
    }
}
</script>

<style>
#employer-main {
    text-align: right;
}

#createjob-btn {
    padding: 10px;
    margin: 15px;
}
</style>
