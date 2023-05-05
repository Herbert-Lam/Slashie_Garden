<template>
    <div class="applicant-main">

        <apply-list :userTypeId="userTypeId"></apply-list>
        <div>
            <br>
        </div>
        <job-list :userTypeId="userTypeId" :userType=2></job-list>
    </div>
</template>

<script>
import ApplyList from './ApplyList.vue';
import JobList from './JobList.vue'

export default {
    name:"ApplicantMain",
    props: [
        'userTypeId',
        'userType'
    ],
    components: {
        ApplyList,
        JobList
    },
    
    data() {
        return {
            
        }
    },

    methods:{

    }
}
</script>

<style >

</style>