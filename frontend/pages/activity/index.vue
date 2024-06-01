<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Activity List</h1>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col v-for="activity in filteredActivities" :key="activity._id" cols="12" sm="6" md="4">
                        <nuxt-link :to="`/activity/${activity.id}`">
                            <v-card>
                                <v-img :src="activity.picture || 'default-image.jpg'" aspect-ratio="16/9"></v-img>
                                <v-card-title>{{ activity.name }}</v-card-title>
                                <v-card-subtitle class="">{{ activity.type }}</v-card-subtitle>
                                <v-card-text>
                                    <p class="pb-4">{{ activity.description }}</p>
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
const activities = ref([]);

const filteredActivities = computed(() => {
    return activities.value.filter(activity => activity.status !== 'Disable');
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