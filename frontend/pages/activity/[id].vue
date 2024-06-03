<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-btn icon="mdi-arrow-left" @click="$router.back()"></v-btn>
            </v-col>
            <v-col cols="12">
                <v-card v-if="activity">
                    <v-img :src="activity.picture || 'default-image.jpg'" aspect-ratio="16/9"></v-img>
                    <v-card-title>{{ activity.name }}</v-card-title>
                    <v-card-subtitle>{{ activity.type }}</v-card-subtitle>
                    <v-card-text>
                        <p>{{ activity.description }}</p>
                        <div class="d-flex flex-row align-items-center">
                            <div class="my-2 mr-4 text-center"><v-chip :color="getStatusColor(activity.status)"
                                    class="">{{
                                        activity.status
                                    }}</v-chip></div>
                            <div class="my-2 mr-4 text-center"><v-progress-circular
                                    :model-value="activity.participateRate" :rotate="360" :width="8"
                                    color="teal"></v-progress-circular>
                                <p>{{ activity.participateRate }} %</p>
                            </div>
                            <div class="my-2 text-center"><v-rating :model-value="activity.rating"
                                    color="yellow-darken-3" half-increments density="compact" readonly></v-rating>

                                <p class="text-grey-darken-1">{{ activity.rating }} - {{ activity.reviews }} reviews</p>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div>
                            <v-icon v-if="activity.place && activity.place.trim() !== ''">mdi-map-marker</v-icon>
                            {{ activity.place || 'Not Found' }}
                        </div>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activity = ref(null);

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

const fetchActivity = async () => {
    try {
        const response = await fetch(`http://localhost:3000/activity/${route.params.id}`);
        const data = await response.json();
        activity.value = data;
    } catch (error) {
        console.error('Error fetching activity:', error);
    }
};

onMounted(fetchActivity);
</script>