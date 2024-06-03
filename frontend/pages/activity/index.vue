<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Activity List</h1>
            </v-col>
            <v-col cols="12">
                <!-- Filter Button -->
                <v-btn-toggle v-model="selectedFilter" class="mb-4" background-color="transparent"
                    active-class="primary">
                    <v-btn value="all" class="rounded-pill">All</v-btn>
                    <v-btn value="active" class="rounded-pill">Active</v-btn>
                    <v-btn value="done" class="rounded-pill">Done</v-btn>
                    <v-btn value="pending" class="rounded-pill">Pending</v-btn>
                </v-btn-toggle>
                <!-- Activity Cards -->
                <v-row>
                    <v-col v-for="activity in filteredActivities" :key="activity._id" cols="12" sm="6" md="4">
                        <nuxt-link :to="`/activity/${activity._id}`" class="text-decoration-none">
                            <v-card>
                                <v-img :src="activity.picture" :aspect-ratio="16 / 9" cover></v-img>
                                <v-card-title>{{ activity.name }}</v-card-title>
                                <v-card-subtitle>{{ activity.type }}</v-card-subtitle>
                                <v-card-text>
                                    <p class="pb-4 card-description">{{ activity.description }}</p>
                                    <v-chip :color="getStatusColor(activity.status)">{{ activity.status }}</v-chip>
                                </v-card-text>
                            </v-card>
                        </nuxt-link>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const activities = ref([]);
const selectedFilter = ref('all');

const filteredActivities = computed(() => {
    if (selectedFilter.value === 'all') {
        return activities.value.filter(activity => activity.status.toLowerCase() !== 'disable');
    } else {
        return activities.value.filter(activity => activity.status.toLowerCase() === selectedFilter.value);
    }
});

const getStatusColor = (status) => {
    switch (status) {
        case 'Active':
            return 'green';
        case 'Done':
            return 'red';
        case 'Pending':
            return 'orange';
        default:
            return 'grey';
    }
};

async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/activity/');
        const data = await response.json();
        activities.value = data;
    } catch (error) {
        console.error('Error fetching activities:', error);
    }
}
fetchData();
</script>

<style>
.card-description {
    overflow: hidden;
    /* Hide overflowing text */
    text-overflow: ellipsis;
    /* Display ellipsis (...) for overflowing text */
    white-space: nowrap;
    /* Prevent text wrapping */
}
</style>