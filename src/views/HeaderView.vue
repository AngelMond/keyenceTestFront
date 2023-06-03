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
                        <ul>
                            <li class="d-inline ma-1 ma-sm-3 ma-md-4 text-body-xs-2 nav-link">
                                <router-link active-class="active" class="text-grey-darken-1" to="/">Home</router-link>
                            </li>
                            <li class="d-inline ma-1 ma-sm-3 ma-md-4 text-body-xs-2 nav-link">
                                <router-link to="/login" active-class="active"
                                    class="text-grey-darken-1">Login</router-link>
                            </li>
                            <li class="d-inline ma-1 ma-sm-3 ma-md-4 text-body-xs-2 nav-link">
                                <router-link to="/signup" active-class="active"
                                    class="text-grey-darken-1">SignUp</router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <!-- Header for mobile devices -->
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
                            <v-list-item v-for="(item, i) in items" :key="i">
                                    <router-link class="text-grey-darken-1" :to="item.path">{{ item.title }}</router-link>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
        </div>
    </v-app-bar>
</template>


<script>
import keyence from '@/assets/logo/keyence.jpeg';
export default {
    data() {
        return {
            logo: keyence,
            items: [
                { title: 'Home', path: '/' },
                { title: 'Login', path: '/login' },
                { title: 'SignUp', path: '/signup' },
            ],

        };
    }
};
</script>