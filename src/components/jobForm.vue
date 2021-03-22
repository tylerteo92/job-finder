<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" class="px-4">
      <div class="d-flex flex-column">
        <el-form-item prop="title" label="Title" class="col-md mb-4">
          <el-input v-model="form.title" placeholder="Please input job title" />
        </el-form-item>
        <el-form-item prop="location" label="Location" class="col-md mb-4">
          <el-input v-model="form.location" placeholder="Please input location" />
        </el-form-item>
        <el-form-item prop="description" label="Description" class="col-md mb-4">
          <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 5, maxRows: 5 }" placeholder="Please input job description" resize="none" />
        </el-form-item>
        <div class="row mb-4">
          <el-form-item prop="date" label="Date" class="d-flex flex-column col-md-12 pr-md-3 align-items-start">
            <el-date-picker v-model="form.date" type="date" placeholder="Please select date" format="dd/MM/yyyy" value-format="yyyy-MM-dd" :picker-options="pickerOptions" />
          </el-form-item>
          <el-form-item prop="status" label="Status" class="d-flex flex-column col-md-12 align-items-start">
            <el-select v-model="form.status" placeholder="Select job status">
              <el-option v-for="(value, index) in ['Inactive', 'Active']" :key="index" :label="value" :value="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="text-right my-3">
        <el-button @click="$emit('close')" type="secondary" plain>Cancel</el-button>
        <el-button @click="form.id ? save() : submit()" type="primary">{{ form.id ? 'Save' : 'Submit' }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import firebase from "../firebaseConfig";
const db = firebase.firestore();
export default {
  props: {
    profile: { required: true },
  },
  data() {
    return {
      form: { ...FORM },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      rules: {
        title: [{ required: true, message: 'Title is required' }],
        location: [{ required: true, message: 'Location is required' }],
        description: [{ required: true, message: 'Description is required' }],
        date: [{ required: true, message: 'Date is required' }],
        status: [{ required: true, message: 'Status is required' }],
      },
    }
  },
  watch: {
    profile: {
      handler: function (val) {
        if (val) Object.assign(this.form, val);
      },
      immediate: true,
    }
  },
  // created() {
  //   this.form = { ...this.profile };
  // },
  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          this.$notify.error({ title: 'Invalid Form input', message: 'Please fix all the form error.' });
          return;
        }

        db.collection("jobs")
          .add(this.form)
          .then(() => {
            console.log("Job successfully created!");
            this.$refs.form.resetFields();
            this.$emit('refresh');
            this.$emit('close');
          })
          .catch((error) => {
            console.error("Error create job: ", error);
          });
      });
    },
    save() {
      db.collection("jobs")
        .doc(this.form.id)
        .update(this.form)
        .then(() => {
          console.log("Job successfully updated!");
          this.$emit('refresh');
          this.$emit('close');
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating job: ", error);
        });
    },
  },
}

const FORM = {
  title: '',
  location: '',
  description: '',
  date: '',
  status: 1,
}
</script>

<style scoped>
::v-deep .el-form-item__label {
  color: #666666;
  font-size: 0.85rem;
  line-height: 1.5 !important;
  margin-bottom: .25rem;
}
</style>
