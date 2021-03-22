<template>
  <div class="p-4">
    <div class="d-flex justify-content-between">
      <div class="h4 text-info mb-0 font-weight-bold">Career Finder</div>
      <el-button type="success" size="medium" @click="createNewJob">Add New Job</el-button>
    </div>
    <el-drawer custom-class="overflow-auto" :visible.sync="openJobForm" size="50%" :destroy-on-close="true" append-to-body>
      <div slot="title" class="h5 text-muted font-weight-bold mb-0">{{ isNewJob ? 'Create' : 'Edit' }} Job</div>
      <job-form :profile="profile" @close="openJobForm = false" @refresh="getJobs" />
    </el-drawer>

    <div v-if="jobsData">
      <div v-for="(item, index) in jobsData" :key="index">
        <div class="d-flex row mt-4 p-3 border shadow-sm">
          <div class="d-flex flex-column col">
            <div class="d-flex col justify-content-between row">
              <div class="font-weight-bold align-self-center col-md mr-2 h5 align-self-center">
                {{ item.title }}
              </div>
              <div>
                <div class="row ml-md-auto">
                  <el-button type="primary" size="small" plain @click="editJob(item)">Edit</el-button>
                  <el-button type="danger" size="small" plain @click="deleteJob(item.id)">Delete</el-button>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="d-flex col-md">
                <div class="col-md-8 text-muted">Location</div>
                <div class="col-md">{{ item.location }}</div>
              </div>
              <div class="d-flex col-md">
                <div class="col-md-8 text-muted">Date</div>
                <div class="col-md">{{ item.date }}</div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="d-flex col-md">
                <div class="col-md-8 text-muted">Status</div>
                <div class="col-md">{{ item.status ? 'Active' : 'Inactive' }}</div>
              </div>
              <div class="d-flex col-md">
                <div class="col-md-8 text-muted">Description</div>
                <div class="col-md">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>No Data Found</div>
  </div>
</template>

<script>
import firebase from "./firebaseConfig";
import JobForm from "@/components/jobForm";
const db = firebase.firestore();
export default {
  components: {
    JobForm,
  },
  data() {
    return {
      title: '',
      location: '',
      description: '',
      date: '',
      status: null,
      jobsData: [],
      search: '',
      openJobForm: false,
      isNewJob: false,
      profile: null,
    };
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    createNewJob() {
      this.isNewJob = true;
      this.profile = null;
      this.openJobForm = true;
    },
    editJob(item) {
      this.isNewJob = false;
      this.profile = item;
      this.openJobForm = true;
    },
    getJobs() {
      this.jobsData = [];
      db.collection("jobs")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.jobsData.push({
              id: doc.id,
              title: doc.data().title,
              location: doc.data().location,
              description: doc.data().description,
              date: doc.data().date,
              status: doc.data().status,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting data: ", error);
        });
    },
    async deleteJob(id) {
      const res = await this.$confirm('Are you sure to delete this job ?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
      .then(() => {
        db.collection("jobs")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Job successfully deleted!");
          this.getJobs();
        })
        .catch((error) => {
          console.error("Error removing job: ", error);
        });
      })
      .catch(action => {
        return action;
      });
      return res;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
