<template>
    <main class="main-content-home">
        <div v-if="!isSessionToken">
            <Signup></Signup>
        </div>
        <div v-else class="mt-14">
            <h3 class="py-3 text-center text-grey-darken-1">
                Upload a file
                <router-link active-class="active" class="text-decoration-underline text-red-darken-2" to="/readFile">
                    here!
                </router-link>
            </h3>
        </div>
    </main>
</template>
<script>
import Signup from '../components/SignupForm.vue';
export default {
    components: {
        Signup
    },
    mounted() {
        this.handleGetToken();
    },
    data() {
        return {
            isSessionToken: false,
        }
    },
    methods: {
        handleGetToken() {
            const token = window.sessionStorage.token;
            //console.log(token);
            if (token) {
                this.isSessionToken = true;
                // this.$router.push('/readFile');
            } else {
                this.isSessionToken = false;
            }
        },
    }

}
</script>