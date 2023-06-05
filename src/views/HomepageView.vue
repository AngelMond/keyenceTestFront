<template>
    <main class="main-content">
        <Signup></Signup>
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
                this.$router.push('/readFile');
            } else {
                this.isSessionToken = false;
            }
        },
    }

}
</script>