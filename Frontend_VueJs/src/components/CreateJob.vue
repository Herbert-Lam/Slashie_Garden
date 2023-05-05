<template>
    <h2 id="createjob-title">Create a Job</h2>
    <p id="createjob-p">Please fill in the below details: </p>
    <div class="form-container">
        <form id="createJobForm" type="reset" class="form-control custom-form">
            <label for="jobTitle">Job Title:</label><br>
            <input type="text" id="jobTitle" v-model="jobFormData.jobTitle" form="createJobForm" />
            <br>

            <label for="jobDescription">Job Description:</label><br>
            <textarea id="jobDescription" form="createJobForm" v-model="jobFormData.description"></textarea>
            <br>

            <label for="jobDate">Job Date:</label><br>
            <!-- <input type="date" id="jobDate" pattern="\d{2}-\d{2}-\d{4}" v-model="jobFormData.jobDate" /> -->
            <input type="date" id="jobDate" pattern="\d{2}-\d{2}-\d{4}" v-model="inputDate" />
            <br>

            <label for="startTime">Start Time:</label><br>
            <input type="time" id="startTime" pattern="\d{2}:\d{2}:\d{2}" v-model="jobFormData.startTime" />
            <br>

            <label for="endTime">End Time:</label><br>
            <input type="time" id="endTime" pattern="\d{2}:\d{2}:\d{2}" v-model="jobFormData.endTime" />
            <br>

            <label for="location">Location:</label><br>
            <input type="text" id="location" v-model="jobFormData.location" />
            <br>

            <label for="hourlyWage">Hourly Wage:</label><br>
            <input type="text" id="hourlyWage" v-model="jobFormData.hourly_wage" />
            <br><br>
        </form>
    </div>

    <div class="creatbutton-container">
        <button type="submit" @click="createJob" class="btn btn-success">Create Job</button>
        <button id="resetBtn" type="reset" @click="resetForm" class="btn btn-danger">Reset</button>
    </div>
    <p class="createjob-message" :style="{ color: messageColor }">{{ message }}</p>
</template>

<script>
import JobService from '@/services/JobService'
import UserTypeDataService from '@/services/UserTypeDataService';
import moment from 'moment';

export default {
    name: "createJob",
    props: ['userTypeId'],
    data() {
        return {
            jobFormData: {
                jobTitle: "",
                description: "",
                jobDate: "",
                startTime: "",
                endTime: "",
                location: "",
                hourly_wage: "",
                appUserId: this.getAppUserId(this.userTypeId)
            },
            inputDate: "",
            dateFormat: 'MM-DD-YYYY',
            message: ""
        }
    },

    methods: {

        resetForm() {
            this.jobFormData.jobTitle = "";
            this.jobFormData.description = "";
            this.jobFormData.jobDate = "";
            this.jobFormData.startTime = "";
            this.jobFormData.endTime = "";
            this.jobFormData.location = "";
            this.jobFormData.hourly_wage = "";
            this.inputDate = ""
        },

        getAppUserId(userTypeId) {
            UserTypeDataService.get(userTypeId)
                .then(response => {
                    console.log(response.data);
                    this.jobFormData.appUserId = response.data.appUser.userId;
                    console.log("GET appUserId: " + this.jobFormData.appUserId);
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        },

        allFilled() {
            if (Boolean(this.jobFormData.jobTitle !== "") &&
                Boolean(this.jobFormData.description !== "") &&
                Boolean(this.jobFormData.jobDate !== "") &&
                // Boolean(this.inputDate == "") &&
                Boolean(this.jobFormData.startTime !== "") &&
                Boolean(this.jobFormData.endTime !== "") &&
                Boolean(this.jobFormData.location !== "") &&
                Boolean(this.jobFormData.hourly_wage !== "")) {
                return true
            }
            else {
                return false
            }
        },

        formattedDate(inputDate) {
            if (inputDate) {
                return moment(this.inputDate).format(this.dateFormat);
            }
            else {
                return "";
            }
        },

        createJob(event) {
            console.log("in createjob function");
            event.preventDefault();
            console.log("props - userTypeId: " + this.userTypeId);

            this.jobFormData.jobDate = this.formattedDate(this.inputDate);
            console.log("date changed: " + this.jobFormData.jobDate)
            console.log(this.jobFormData);
            console.log("all filled: " + this.allFilled());

            if (this.allFilled()) {

                JobService.postJob(this.jobFormData)
                    .then(response => {
                        console.log(response);
                        this.message = `Your requested job (JobID: #${response.data.id}) has been created!`;
                        this.resetForm();
                    })
                    .catch(error => {
                        console.log(error);
                        this.message = `Please fill in all input fields.`;
                    });
            }
            else {
                this.message = `Please fill in all input fields.`;
            }

        }
    },

    mounted() {
        this.message = "";
    },

    computed: {
        messageColor() {
            return this.message === 'Please fill in all input fields.' ? 'red' : 'green';
        }

    }

}

</script>

<style>
html,
body {
    background-color: #e2decb;
}

#createjob-title {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    font-family: Verdana, sans-serif;
    margin: 10px;
}

#createjob-p {
    margin-left: 50px;
    text-align: center;
    font-size: 24px;
    font-family: Verdana, sans-serif;
}

.form-container {
    margin: 0 auto;
    width: 100%;
    padding: 0 30%;
}

form {
    width: 100%;
    margin: 10px;
    padding: 10px;
}

input[type="text"],
label {
    width: 100%;
}

.custom-form {
    background-color: #e2decb;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    font-size: 20px;
}

label {
    font-weight: bold;
    font-family: Helvetica, sans-serif;

}

textarea {
    width: 100%;
    height: 100px;
}

input[type="date"],
input[type="time"],
#hourlyWage {
    width: 40%;
}

.creatbutton-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.creatbutton-container button {
    margin: 0 10px;
}

.createjob-message {
    margin-left: 50px;
    /* padding: 10px; */
    text-align: left;
    font-size: 22px;
    font-weight: bold;
    font-family: Verdana, sans-serif;
}
</style>
