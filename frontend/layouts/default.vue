<template>
    <v-layout>
        <v-app-bar color="WHITE">
            <v-container>
                <v-img src="/LOGO.png" max-height="40" max-width="88"></v-img>
            </v-container>
            <v-spacer></v-spacer>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="item in items" :key="item.routeName" @click="goToDetail(item.routeName)">{{
                        item.title
                        }}</v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-main>
            <slot></slot>
        </v-main>
    </v-layout>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const items = ref([
    { title: 'Admin', routeName: 'admin' },
    { title: 'Activity', routeName: 'activity' },
    { title: 'ColorPicker', routeName: 'custompage' },
    { title: 'Profile', routeName: 'portfolio' },
]);

const goToDetail = (routeName) => {
    router.push({ name: routeName });
};
</script>