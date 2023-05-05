import EmployerMain from "../components/EmployerMain";
import ApplicantMain from "../components/ApplicantMain";
import CreateJob from "../components/CreateJob";
import {createWebHistory, createRouter} from "vue-router";
import JobDetailsEmployer from "../components/JobDetailsEmployer";
import JobDetailsApplicant from "../components/JobDetailsApplicant";
// import App from "../App"
// import ApplicantMain from "../components/ApplicantMain";

const routes = [
    // {
    //      path: "/",
    //      alias: "/slashiegardenmain",
    //      name: "App",
    //      component: App
    // },
    {
        path: "/demo/employer",
        alias: "/",
        name: "employerMain",
        component: EmployerMain,
        props: true
    },
    {
        path:`/employer/jobs/:jobId`,
        name: "jobDetailsEmployer",
        component: JobDetailsEmployer,
        props: true
    },
    {
        path: "/demo/createJob",
        name: "employer/createJob",
        component: CreateJob,
        props: true
    },
    {
        path: "/demo/applicant",
        name: "applicantMain",
        component: ApplicantMain,
        props: true
    },
    {
        path:`/applicant/jobs/:jobId`,
        name: "jobDetailsApplicant",
        component: JobDetailsApplicant,
        props: true
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
