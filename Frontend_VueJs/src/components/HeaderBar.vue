<template>
    <div>
        <img src="../images/banner.png" alt="logo" class="d-inline-block align-top" id="banner" />
    </div>
    <div id="navBar">
        <nav class="navbar navbar-expand-lg ">
            <img src="../images/logo_rect.png" width="100" height="60" alt="logo" class="d-inline-block align-top"
                id="logo" />

            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <div class="nav-item nav-link active"><router-link to="/demo/employer" id="employer_tab"
                            @click="handleChange($event, 1)" class="router-link-text">Employer</router-link></div>
                    <div class="nav-item nav-link"><router-link to="/demo/applicant" id="applicant_tab"
                            @click="handleChange($event, 3)" class="router-link-text">Applicant</router-link></div>
                </div>
            </div>
            <span class="navbar-text">
                <p v-if="userType" id="p-welcom">Welcome {{ userType.appUser.firstName }} {{ userType.appUser.lastName }}
                </p>
            </span>
        </nav>
    </div>
</template>

<script>
import UserTypeDataService from '../services/UserTypeDataService';

export default {
    name: "headerBar",
    props: ['userTypeId', 'setUserTypeId'],
    data() {
        return {
            userType: null
        }
    },

    methods: {
        retrieveUserType(userTypeId) {
            const id = userTypeId;
            console.log("User Type ID: " + id);
            UserTypeDataService.get(id)
                .then(response => {
                    this.userType = response.data;
                    console.log(this.userType);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        handleChange(event, tabId) {
            event.preventDefault();
            if (tabId == 1) {
                this.retrieveUserType(1);
                this.setUserTypeId(1);
            } else {
                this.retrieveUserType(3);
                this.setUserTypeId(3);
            }
        }
    },

    mounted() {
        this.retrieveUserType(this.userTypeId);
    }
}
</script>

<style>
.router-link-text {
    font-size: 20px;
    font-family: Verdana, sans-serif;

}

html,
body {
    /* height: 100%; */
    background-color: #e2decb;

}

.header {
    background-color: #e2decb;
    width: auto;
    display: flex;
    align-items: center;
}

#navBar {
    background-color: #e2decb;
    border-color: #ffffff;
    border-width: 1px;
    border-style: none none dotted none;
}



.logo-image {
    float: left;
    width: 15%
}

.bannerBG {
    width: 85%;
    float: left;
    display: flex;
    align-items: center;
    background-image: url('../images/banner.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 200px;
}

#banner {
    width: 100%
}

#logo {
    width: 250px;
    height: auto;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 5px;

}

#p-welcom {
    font-weight: bold;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    color: #c76739;
    font-size: 20px;
}

.container P {
    margin: 0 5px;
    font-size: 20px;
    padding: 5px;
}

.link-emp,
.link-app {
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 18px;
    padding: 5px;
    margin-left: 10px;
    margin-right: 10px;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    color: #c37857;
}

.navbar-text {
    text-align: left;
    padding-right: 50px;
}
</style>