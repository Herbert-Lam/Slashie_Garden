<template>
  <div id="jobdeatilsemployer-container">

    <div id="jobdetailcard-container">
      <div class="card text-center" style="width: 65rem; margin: 0 auto;">
        <div class="card-header">
          <h2>Job Details for JobID #{{ job.id }}</h2>
        </div>

        <div class="card-body custom-cardbody">
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label text-start">Job Title</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" id="title" :value="`${job.jobTitle}`">
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
              <input type="text" readonly class="form-control-plaintext" id="jobDate" :value="`${job.jobDate}`">
            </div>
          </div>

          <div class="form-group row">
            <label for="startTime" class="col-sm-2 col-form-label text-start">Start Time</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" id="startTime" :value="`${job.startTime}`">
            </div>
          </div>

          <div class="form-group row">
            <label for="endTime" class="col-sm-2 col-form-label text-start">End Time</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" id="endTime" :value="`${job.endTime}`">
            </div>
          </div>

          <div class="form-group row">
            <label for="duration" class="col-sm-2 col-form-label text-start">Duration</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" id="duration" :value="`${job.duration}`">
            </div>
          </div>

          <div class="form-group row">
            <label for="location" class="col-sm-2 col-form-label text-start">Location</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" id="location" :value="`${job.location}`">
            </div>
          </div>

          <div class="form-group row">
            <label for="wage" class="col-sm-2 col-form-label text-start">Hourly Wage</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control-plaintext" id="wage" :value="`${job.hrWage}`">
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-if="userType == 1" id="jobdeatilsemployer-applications">
      <h3 id="jobdeatilsemployer-applications-title"><b>Applications</b></h3>

      <div v-if="hasApplications">
        <table class="table table-hover custom-table-applicationlist">
          <thead>
            <tr>
              <th v-if="isOpen" class="apptable-col1">Please Select</th>
              <th class="apptable-col2">First Name</th>
              <th class="apptable-col3">Last Name</th>
              <th class="apptable-col4">Skills</th>
              <th class="apptable-col5">Email</th>
              <th class="apptable-col6">Mobile</th>
              <th class="apptable-col7">Application Status</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="application in applications" :key="application.id">
              <button v-on:click="employSelectedApplication(application.id)" v-if="isOpen" class="btn btn-outline-primary"
                id="employ-btn">Employ</button>
              <td class="apptable-col2">{{ application.userType.appUser.firstName }}</td>
              <td class="apptable-col3">{{ application.userType.appUser.lastName }}</td>
              <td class="apptable-col4">{{ application.skills }}</td>
              <td class="apptable-col5">{{ application.userType.appUser.email }}</td>
              <td class="apptable-col6">{{ application.userType.appUser.mobileNum }}</td>
              <td class="apptable-col7">{{ application.application_status.statusDescription }}</td>
            </tr>
          </tbody>
        </table>
        <br />

      </div>

      <p v-else>There are no applications!</p>
    </div>
  </div>
</template>

<script>
import JobService from '../services/JobService'

export default {
  name: "jobDetailsEmployer",
  props: [],
  data() {
    return {
      job: {},
      applications: [],
      isOpen: null,
      userType: localStorage.getItem('typeId')
    };
  },
  computed: {
    hasApplications() {
      return this.applications.length > 0
    },

    // userType() {
    //   return this.$route.query.userType
    // }

  },

  methods: {
    async fetchJobData() {
      const jobId = this.$route.params.jobId;
      console.log("fetchjobData- jobId:" + jobId)
      const response = await JobService.getJobDetails(jobId);

      this.job = response.data;
      console.log(this.job)
      console.log("job_status.statusDescription from api: " + this.job.job_status.statusDescription)

      if (this.job.job_status.statusDescription === "Open") {
        return this.isOpen = true;
      } else return this.isOpen = false;

    },

    async fetchApplications() {
      const jobId = this.$route.params.jobId;
      console.log(jobId)
      const response = await JobService.JobApplications(jobId)
      // const data = await response.json()
      // this.applications = data
      this.applications = response.data
      console.log(this.applications);
      console.log("all application fetched");
    },

    async employSelectedApplication(id) { //id= application.id
      const jobId = this.$route.params.jobId;
      //event.preventDefault()
      console.log(id);
      // this.selectedApplication = this.applications.find(
      //   application => application.id === id
      // )
      // const selectedApplicationId = this.selectedApplication.id;
      // console.log(selectedApplicationId);

      try {
        const response2 = await JobService.JobStatus(jobId, 5);
        console.log(response2.data);
      } catch (error) {
        console.log(error.response.body)
      }
      // this.isOpen = false;

      try {
        for (const application of this.applications) {
          if (application.id !== id) {
            let response3 = await JobService.ApplicationStatus(application.id, 4);
            console.log(response3.data)
          }
          else {
            let response4 = await JobService.ApplicationStatus(application.id, 3);
            console.log(response4.data)
          }
        }
      } catch (error) {
        console.log(error.response.body)
      }
      this.fetchJobData();
      this.fetchApplications();
    },

  },
  created() {
    this.fetchJobData();
    this.fetchApplications();
  },

  mounted() {

  }
}
</script>

<style >
.custom-table-applicationlist {
  font-size: 20px;
}

#jobdetailcard-container {
  margin: 0 auto;
  width: 100%;
  padding: 50px 15% 50px 15%;
}

#jobdeatilsemployer-container {
  margin: 15px;
  width: 100%;
  padding: 0 15px;
}

#jobdeatilsemployer-job p {
  font-size: 20px;
}

#jobdeatilsemployer-applications {
  font-family: Verdana, sans-serif;
}

#jobdeatilsemployer-applications p {
  font-size: 24px;
}

#jobdeatilsemployer-applications-title {
  text-align: center;
}


.applicationlist-table {
  font-family: Verdana, sans-serif;
  width: 100%;
  text-align: left;
  font-size: 19px;
  border: 1px dashed grey;
  border-collapse: collapse;
}

#employ-btn {
  padding: 5px 10px;
  margin: 5px;
}

.apptable-col1 {
  width: 180px;
}

.apptable-col2 {
  width: 200px;
}

.apptable-col3 {
  width: 200px;
}

.apptable-col4 {
  width: 400px;
}

.apptable-col5 {
  width: 280px;
}

.apptable-col6 {
  width: 140px;
}

.apptable-col7 {
  width: 200px;
}
</style>