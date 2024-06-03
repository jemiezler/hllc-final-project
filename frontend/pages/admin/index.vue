<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Activity List</h1>
            </v-col>
            <v-col cols="12">
                <v-col cols="12" d-flex justify-end>
                    <v-dialog v-model="addDialog" max-width="600">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn prepend-icon="mdi-plus" v-bind="activatorProps" class="rounded-pill" color="#36393f" >
                                New Activity
                            </v-btn>
                        </template>

                        <v-card title="New Activity">
                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12">
                                        <v-text-field v-model="newActivity.name" label="Activity Name"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="newActivity.description" label="Activity Description"
                                            required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-select :items="['How to Live', 'How to Learn']" label="Activity Type"
                                            v-model="newActivity.type" required></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-autocomplete
                                            :items="['Liberal Arts', 'Science', 'Management', 'Information Technology', 'Agro-Industry', 'Law', 'Cosmetic Science', 'Health Science', 'Nursing Science', 'Anti-Aging and Regenerative Medicine', 'Medicine', 'Dentistry', 'Social innovation', 'Sinology', 'Integrative-medicine']"
                                            label="School" v-model="newActivity.school" auto-select-first
                                            multiple></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-select :items="['Active', 'Pending', 'Done', 'Disable']"
                                            label="Activity Type" v-model="newActivity.status" required></v-select>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="6">
                                    <v-text-field v-model="newActivity.date" type="date" label="Date"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="newActivity.time" type="time" label="Time"
                                        required></v-text-field>
                                </v-col> -->
                                    <v-col cols="12">
                                        <v-text-field v-model="newActivity.place" label="Place" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="newActivity.picture" label="URL Picture"
                                            required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn text="Close" variant="plain" @click="addDialog = false"></v-btn>

                                <v-btn color="primary" text="Save" variant="tonal" @click=saveNewActivity></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
                <v-table theme="light" class="my-4">
                    <thead>
                        <tr>
                            <th class="text-left font-weight-bold">Activity Name</th>
                            <th class="text-left font-weight-bold">Status</th>
                            <th class="text-left font-weight-bold">Participate Rate</th>
                            <th class="text-left font-weight-bold">Rating</th>
                            <th class="text-left font-weight-bold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="activity in activities" :key="activity.id">
                            <td>
                                <div class="d-flex flex-column">
                                    <span>{{ activity.name }}</span>
                                    <span>{{ activity.description }}</span>
                                </div>
                            </td>
                            <td><v-chip :color="getStatusColor(activity.status)">{{ activity.status }}</v-chip></td>
                            <td>
                                <div class="text-center">
                                    <v-progress-circular :model-value="activity.participateRate" :rotate="360"
                                        :size="25" :width="5" color="teal">
                                    </v-progress-circular>
                                    {{ activity.participateRate }} %
                                </div>
                                <!-- {{ activity.participateRate }} -->
                            </td>
                            <td>
                                <div class="text-center">
                                    <v-rating :model-value=activity.rating color="yellow-darken-3" half-increments
                                        density="compact" readonly></v-rating>
                                    <p class="text-grey-darken-1">{{ activity.rating }} - {{ activity.reviews }} reviews
                                    </p>
                                </div>
                            </td>
                            <td>
                                <v-menu>
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text"></v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item @click="editActivityDialog(activity)"
                                            class="px-4">Edit</v-list-item>
                                        <v-list-item @click="deleteActivityDialog(activity)"
                                            class="px-4">Delete</v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-dialog v-model="deleteDialog" max-width="500px">
                                    <v-card class="py-4">
                                        <v-card-title class="text-h5">Confirmation: Delete {{ currentActivity.name
                                            }}</v-card-title>
                                        <v-card-text>
                                            <p>Are you sure you want to delete this item? This action cannot be undone.
                                                Please confirm if you wish to
                                                proceed with deleting the selected item.</p>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="red darken-1" text
                                                @click="deleteActivity(currentActivity._id)">Delete</v-btn>
                                            <v-btn color="blue darken-1" text
                                                @click="deleteDialog = false">Cancel</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="editDialog" max-width="500px">
                                    <v-card title="Edit Activity">
                                        <v-card-text>
                                            <v-row dense>
                                                <!-- <v-col cols="12">
                                                    <v-file-input v-model="editedActivity.picture" label="Upload Image"
                                                        accept="image/*"></v-file-input>
                                                </v-col> -->
                                                <v-col cols="12">
                                                    <v-text-field v-model="editedActivity.name
                                                        " hide-details="auto" label="Activity Name"
                                                        required></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field v-model="editedActivity.description"
                                                        label="Activity Description" required></v-text-field>
                                                </v-col>
                                                <!-- <v-col cols="12" sm="6">
                                                    <v-text-field v-model="editedActivity.time" type=time label="Time"
                                                        required></v-text-field>
                                                </v-col> -->

                                                <v-col cols="12" sm="6">
                                                    <v-select :items="['How to Live', 'How to Learn']"
                                                        label="Activity Type" v-model="editedActivity.type"
                                                        required></v-select>
                                                </v-col>

                                                <v-col cols="12" sm="6">
                                                    <v-autocomplete
                                                        :items="['Liberal Arts', 'Science', 'Management', 'Information Technology', 'Agro-Industry', 'Law', 'Cosmetic Science', 'Health Science', 'Nursing Science', 'Anti-Aging and Regenerative Medicine', 'Medicine', 'Dentistry', 'Social innovation', 'Sinology', 'Integrative-medicine']"
                                                        label="School" auto-select-first multiple
                                                        v-model="editedActivity.school"></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-select :items="['Active', 'Pending', 'Done', 'Disable']"
                                                        label="Activity Type" v-model="editedActivity.status"
                                                        required></v-select>
                                                </v-col>
                                                <!-- <v-col cols="12" sm="6">
                                                    <v-text-field v-model="editedActivity.date" type="date" label="Date"
                                                        required></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <v-text-field v-model="editedActivity.time" type="time" label="Time"
                                                        required></v-text-field>
                                                </v-col> -->
                                                <v-col cols="12">
                                                    <v-text-field v-model="editedActivity.place" label="Place"
                                                        required></v-text-field>
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-text-field v-model="editedActivity.picture" label="URL Picture"
                                                        required></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>

                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn text="Close" variant="plain" @click="editDialog = false"></v-btn>

                                            <v-btn color="primary" text="Save" variant="tonal"
                                                @click="saveEditedActivity(editedActivity._id)"></v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>

        </v-row>
    </v-container>
</template>

<script setup>
const deleteDialog = ref(false);
const currentActivity = ref(null);

const addDialog = ref(false);
const editedActivity = ref({
    id: 0,
    name: '',
    description: '',
    date: new Date().toISOString(),  // Updated for date editing
    time: '', // Updated for time editing
    place: '',
    type: '',
    picture: '',
    school: [],
    status: ''
});
console.log('Edited Activity:', editedActivity);
const newActivity = ref({
    picture: '',
    name: '',
    description: '',
    type: '',
    date: new Date().toISOString(), // Format date as ISO string
    time: new Date().toISOString(), // Example time format
    place: '',
    school: [],
    status: '',
    participateRate: '0',
    rating: 0,
    reviews: 0
});



const deleteActivityDialog = (activity) => {
    currentActivity.value = activity;
    deleteDialog.value = true;
};

const editDialog = ref(false);
const editActivityDialog = (activity) => {
    editedActivity.value = { ...activity };
    editDialog.value = true;
};
const saveEditedActivity = async (editedActivityId) => {
    try {
        const response = await fetch(`http://localhost:3000/activity/${editedActivityId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedActivity.value)
        });
        if (!response.ok) {
            throw new Error('Failed to save edited activity');
        }
        const index = activities.value.findIndex(activity => activity.id === editedActivity.value.id);
        if (index !== -1) {
            activities.value[index] = { ...editedActivity.value };
        }
        editDialog.value = false;
    } catch (error) {
        console.error('Error saving edited activity:', error);
    }
};

const saveNewActivity = async () => {
    try {
        const response = await fetch('http://localhost:3000/activity/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newActivity.value)
        });
        if (!response.ok) {
            throw new Error('Failed to save new activity');
        }
        const data = await response.json();
        activities.value.push(data);
        newActivity.value = {
            picture: '',
            name: '',
            description: '',
            type: '',
            school: [],
            status: '',
            date: '',
            time: '',
            participateRate: '0',
            rating: 0,
            reviews: 0
        };
        addDialog.value = false;
    } catch (error) {
        console.error('Error saving new activity:', error);
    }
};


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

const deleteActivity = async (Id) => {
    try {
        const response = await fetch(`http://localhost:3000/activity/${Id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete activity');
        }
        const index = activities.value.findIndex((a) => a.id === currentActivity.value.id);
        if (index !== -1) {
            activities.value.splice(index, 1);
        }
        deleteDialog.value = false;
    } catch (error) {
        console.error('Error deleting activity:', error);
    }
};

const activities = ref([]);

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