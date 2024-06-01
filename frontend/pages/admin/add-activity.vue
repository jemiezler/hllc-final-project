<template>
    <v-container>
      <v-alert v-if="successMessage" type="success" dismissible>
        {{ successMessage }}
      </v-alert>
      <nuxt-link to="/admin" class="mt-40">
        <v-btn icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </nuxt-link>
      <v-form v-model="valid" ref="form" class="pt-10">
        <v-row>
          <v-col cols="12">
            <h1>Add New Activity</h1>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="activity.name" :rules="[rules.required]" label="Name" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="activity.description" :rules="[rules.required]" label="Description"
              required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="activity.status" :items="statusOptions" :rules="[rules.required]" label="Status"
              required></v-select>
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" @click="submitForm">Submit</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  const activity = ref({
    name: '',
    description: '',
    status: '',
    participantRate: 0,
    rating: 0,
  });
  const router = useRouter();
  
  const valid = ref(false); // Define the 'valid' property
  const statusOptions = ref(['active', 'done', 'pending']); // Define the 'statusOptions' property
  
  const rules = {
    required: (v) => !!v || 'This field is required',
    number: (v) => !isNaN(parseFloat(v)) && isFinite(v) || 'Input must be a number',
    min: (v) => v >= 0 || 'Value must be greater than or equal to 0',
    max: (v) => v <= 100 || 'Value must be less than or equal to 100',
  };
  
  async function submitForm() {
    try {
      const response = await fetch('http://localhost:3000/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity.value),
      });
      if (response.ok) {
        console.log('Activity added successfully!');
        // Reset form or show success message
        activity.value = {
          name: '',
          description: '',
          status: '',
          participantRate: 0,
          rating: 0,
        };
        valid.value = false;
        router.push( '/activity_admin' );
      } else {
        console.error('Failed to add activity:', response.statusText);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      // Handle error, e.g., show an error message
    }
  }
  </script>
  