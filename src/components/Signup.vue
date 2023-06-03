<template>
    <section class="mt-100">
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
                            <h1 class="text-center text-my-red">Welcome</h1>
                        </v-col>
                        <v-col cols="10">
                            <p class="text-center text-grey">Sign up if you dont have any account</p>

                        </v-col>
                    </v-row>
                    <v-container>
                        <v-card class="">
                            <v-card-text>
                                <form @submit="submitForm">
                                    <v-text-field v-model="username" label="Username" required></v-text-field>
                                    <!-- <v-text-field v-model="email" label="Email" required></v-text-field> -->
                                    <v-text-field v-model="password" label="Password" required
                                        type="password"></v-text-field>
                                    <p v-if="hasExistingUser" class="text-red">User already exists</p>
                                    <v-row class="justify-center pe-3 py-2">
                                        <v-btn class="btn" type="submit">Continue</v-btn>
                                    </v-row>
                                </form>
                            </v-card-text>
                        </v-card>
                    </v-container>
                    <p class="text-center text-primary">Already have an account?
                        <span>
                            <router-link to="/login" active-class="active" style="text-decoration: underline;"
                                class="text-grey-darken-1 text-hover-red">
                                Log in
                            </router-link>
                        </span>
                    </p>
                </v-card>
            </v-col>
        </v-row>

        <!-- Modal pops up when signup successfully -->
        <v-dialog v-model="dialogVisible" max-width="500px" persistent>
            <v-card>
                <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4"
                    height="250" rounded max-width="800" width="100%">
                    <div>
                        <h2 class="text-h4 font-weight-black text-orange">Congratulations!</h2>
                        <div class="text-h5 font-weight-medium mb-2">
                            You are officially a part of the Keyence Community!
                        </div>
                        <p class="text-body-2 mb-4">
                            Please head over to your inbox/spam or others folder to find our verificaiton email.
                        </p>
                        <p class="text-body-2 mb-4">
                            <quote class="quote" style="font-style: italic;">-This is just an example</quote>
                        </p>
                        <v-btn @click="closeDialog" variant="text" color="orange">Go to Login</v-btn>
                    </div>
                </v-sheet>
            </v-card>
        </v-dialog>

        <!-- Modal shows error server -->
        <ModalComponent v-if="isErrorServer || hasExistingUser" :modal-title="'System message'" :modal-body="modalBody"></ModalComponent>
    </section>
</template>
  
<script>
import { apiSignup } from "../api/signup/apiSignup";
import ModalComponent from "@/components/modal/ModalComponent.vue";
export default {
    components: {
        ModalComponent
    },
    data() {
        return {
            //form inputs
            username: '',
            password: '',
            //show loading 
            overlay: false,
            //if signup is ok show page to load file
            isSignupSuccessful: false,

            //Validates if user exists
            hasExistingUser: false,

            //Validates if theres an error in server
            isErrorServer: false,

            //modal
            dialogVisible: false,
            modalTitle: "Signup successful",
            modalBody: "Server not available"
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
                console.log(data);

                //loading
                this.overlay = true;
                const response = await apiSignup(data);
                //stop loading
                this.overlay = false;
                // console.log(response)

                //If server is not receiving requests
                if (response.isServerAvailable === false) {
                    // console.log('Server not available');
                    this.modalBody = response.serverMessage;
                    this.isErrorServer = true;
                    return;
                } 

                if (response.data.isSuccessful) {
                    // console.log("User registered")
                    this.isSignupSuccessful = true;
                    this.dialogVisible = true;
                    return;
                }

                //If user already exists
                if(response.data.data.isSuccessful === false){
                    // console.log("User exists")
                    this.modalBody = response.data.data.message;
                    this.hasExistingUser = true;
                    return;
                }

            } catch (error) {
                console.error(error);
            }
        },

        closeDialog() {
            this.dialogVisible = false;
            this.$router.push('/login')
        }
    }
}
</script>
  