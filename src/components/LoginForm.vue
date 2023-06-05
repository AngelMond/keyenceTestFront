<template>
  <section class="mt-100 main-content">
    <!-- Show loading screen -->
    <v-overlay :model-value="overlay" class="align-center justify-center" persistent>
      <v-progress-circular color="red-darken-2" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- Form to signup -->
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6" lg="3" xl="3">
        <v-card class="rounded-lg pa-3">
          <v-row justify="center">
            <v-col cols="6" class="justify-center">
              <h1 class="text-center text-my-red">Log in</h1>
            </v-col>
          </v-row>
          <v-container>
            <div class="">
              <v-card-text>
                <form @submit="submitForm">
                  <v-text-field v-model="username" label="Username" required></v-text-field>
                  <!-- <v-text-field v-model="email" label="Email" required></v-text-field> -->
                  <v-text-field v-model="password" label="Password" required type="password"></v-text-field>
                  <p v-if="areCredentialsIncorrect" class="text-red">Username or password incorrect</p>
                  <v-row class="justify-center pe-3 py-2">
                    <v-btn class="btn mt-2" type="submit">Continue</v-btn>
                  </v-row>
                </form>
              </v-card-text>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    
    <!-- Modal shows error server -->
    <ModalComponent v-if="isErrorServer || hasExistingUser" :modal-title="'System message'" :modal-body="modalBody">
    </ModalComponent>
  </section>
</template>

<script>
import { apiLogin } from "../api/login/apiLogin";
import ModalComponent from "@/components/modal/ModalComponent.vue";
export default {
  components: {
    ModalComponent
  },
  mounted() {
        this.handleGetToken();
    },
  data() {
    return {
      //form inputs
      username: '',
      password: '',
      //show loading 
      overlay: false,
      //if signup is ok show page to load file
      isLoginSuccessful: false,

      //Validates if user exists
      hasExistingUser: false,

      //Validates if theres an error in server
      isErrorServer: false,

      //Check username and password
      areCredentialsIncorrect: false,

      isSessionToken: false,
    }
  },
  methods: {
    async submitForm(e) {
      try {
        e.preventDefault();
        const data = {
          username: this.username,
          password: this.password,
        }
        //console.log(data);

        //loading
        this.overlay = true;
        const response = await apiLogin(data);
        //stop loading
        this.overlay = false;
        //console.log(response)

        //If server is not receiving requests
        if (response.isServerAvailable === false) {
          // //console.log('Server not available');
          this.modalBody = response.serverMessage;
          this.isErrorServer = true;
          return;
        }

        if (!response.data.isSuccessful) {
          this.areCredentialsIncorrect = true;

        } else if (response.data.isSuccessful) {
          const { user, userId, token } = response.data;
          this.areCredentialsIncorrect = false;
          this.isSuccessful = true;
          window.sessionStorage.setItem("user", user);
          window.sessionStorage.setItem("userId", userId);
          window.sessionStorage.setItem("token", token);
          this.$router.push('/');
          // window.location.replace('/readFile')
        }

      } catch (error) {
        console.error(error);
      }
    },

    handleGetToken(){
      window.sessionStorage.token;
      //console.log()
    }
  }
}
</script>
