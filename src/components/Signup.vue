<template>
    <section class="mt-100">
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
    </section>
</template>
  
<script>
import {apiSignup} from "../api/signup/apiSignup";
export default {
    data() {
        return {
            username: '',
            // email: '',
            password: '',
        }
    },
    methods: {
        async submitForm(e) {
            e.preventDefault();
            const data = {
                username: this.username,
                // email: this.email,
                password: this.password,
            }
            console.log(data);

            const response = await apiSignup(data);
            console.log(response);
        }
    }
}
</script>
  