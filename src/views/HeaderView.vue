<template>
    <!-- Header for devices greater than 600px -->
    <header class="header px-10 border d-none d-sm-block ">
        <div class="">
            <div class="d-flex justify-space-between align-center">
                <div class="">
                    <router-link active-class="active" to="/">
                        <img id="logo" :src="logo" alt="" />
                    </router-link>
                </div>
                <div class="navbar-container">
                    <nav class="navbar">
                        <!-- Nav option when user is log out -->
                        <ul v-if="!isSessionToken">
                            <li class="d-inline ma-1 ma-sm-3 ma-md-4 text-body-xs-2 nav-link">
                                <router-link active-class="active" class="text-grey-darken-1" to="/">Home</router-link>
                            </li>
                            <li class="d-inline ma-1 ma-sm-3 ma-md-4 text-body-xs-2 nav-link">
                                <router-link to="/login" active-class="active" class="text-grey-darken-1">Log
                                    in</router-link>
                            </li>
                        </ul>
                        <!-- Nav option when user is login -->
                        <ul v-if="isSessionToken">
                            <li class="d-inline ma-1 ma-sm-3 ma-md-4 text-body-xs-2 nav-link">
                                <router-link active-class="active" class="text-grey-darken-1" to="/readFile">
                                    Load file
                                </router-link>
                            </li>
                            <li class="d-inline ma-1 ma-sm-3 ma-md-4 text-body-xs-2 nav-link">
                                <router-link to="/tableRegisters" active-class="active" class="text-grey-darken-1">
                                    Registers
                                </router-link>
                            </li>
                            <li class="d-inline ma-1 ma-sm-3 ma-md-4 text-body-xs-2 nav-link">
                                <a active-class="active" @click="handleLogOut" class="text-grey-darken-1">
                                    Log Out
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <!-- Header for mobile devices -->
    <v-top-navigation>
        <v-app-bar :elevation="1" class="d-block d-sm-none px-2" rounded>
            <div class="w-100 d-flex justify-space-between align-end">
                <div class="">
                    <router-link active-class="active" to="/">
                        <img id="logo" style="width: 156px; height: 46px;" :src="logo" alt="" />
                    </router-link>
                </div>
                <div class="navbar-container">
                    <div class="text-center">
                        <v-menu transition="slide-y-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn color="" v-bind="props">
                                    Menu
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <!-- Nav option when user is log out -->
                                    <ul v-if="!isSessionToken">
                                        <li class="text-grey-darken-1 text-hover-red ">
                                            <router-link active-class="active" class="text-grey-darken-1"
                                                to="/">Home</router-link>
                                        </li>
                                        <li class="text-grey-darken-1 text-hover-red ">
                                            <router-link to="/login" active-class="active" class="text-grey-darken-1">Log
                                                in</router-link>
                                        </li>
                                    </ul>
                                    <!-- Nav option when user is login -->
                                    <ul v-if="isSessionToken">
                                        <li class="text-grey-darken-1 text-hover-red ">
                                            <router-link active-class="active" class="text-grey-darken-1" to="/readFile">
                                                Load file
                                            </router-link>
                                        </li>
                                        <li class="text-grey-darken-1 text-hover-red ">
                                            <router-link to="/tableRegisters" active-class="active"
                                                class="text-grey-darken-1">
                                                Registers
                                            </router-link>
                                        </li>
                                        <li class="text-grey-darken-1 text-hover-red ">
                                            <a active-class="active" @click="handleLogOut" class="text-grey-darken-1">
                                                Log Out
                                            </a>
                                        </li>
                                    </ul>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </div>
        </v-app-bar>
    </v-top-navigation>
</template>


<script>
import keyence from '@/assets/logo/keyence.jpeg';
export default {
    mounted() {
        this.handleGetToken();
    },
    data() {
        return {
            logo: keyence,
            items: [
                { title: 'Home', path: '/' },
                { title: 'Login', path: '/login' },
                { title: 'SignUp', path: '/signup' },
            ],
            isSessionToken: false,
        };
    },
    methods: {
        handleGetToken() {
            const token = window.sessionStorage.token;
            //console.log(token);
            if (token) {
                this.isSessionToken = true;
            } else {
                this.isSessionToken = false;
            }
        },

        handleLogOut() {
            this.isSessionToken = false;
            window.sessionStorage.removeItem('token')
            this.$router.push('/');
        }
    }
};
</script>