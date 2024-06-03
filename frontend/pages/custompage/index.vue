<template>
    <v-container>
        <h1 class="text-center my-5">Vuetify Nuxt Color UI Generator</h1>
        <v-row>
            <v-col cols="12" md="6" lg="4" v-for="(color, index) in colors" :key="index">
                <v-card outlined :color="color.value" class="text-center" @click="selectColor(color)">
                    <v-card-title>{{ color.name }}</v-card-title>
                    <v-card-text>{{ color.description }}</v-card-text>
                    <v-icon v-if="selectedColor === color" color="white">mdi-check</v-icon>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-5" v-if="selectedColor">
            <v-col cols="12" class="text-center">
                <v-row class="d-flex justify-space-between">
                    <v-col v-for="(shade, shadeName) in selectedColor.palette" :key="shadeName" cols="4" md="1">
                        <div class="color-box" :style="{ backgroundColor: shade }"></div>
                        <div>{{ shadeName }}</div>
                        <div>{{ shade }}</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="text-center">
                        <h3>Example</h3>
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-card class="" elevation="2" max-width="344">
                            <v-gradient type="linear" :gradient="['purple darken-3', 'purple']">
                                <v-card-item>
                                    <v-card-title>
                                        Card title
                                    </v-card-title>

                                    <v-card-subtitle>
                                        Card subtitle secondary text
                                    </v-card-subtitle>
                                </v-card-item>

                                <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                </v-card-text>
                            </v-gradient>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6" lg="4" cla>
                        <v-alert text="Error" type="error" variant="tonal" class="text-left mb-4"
                            :color="selectedColor.palette['500']"></v-alert>
                        <v-alert text="Error" type="error" class="text-left"
                            :color="selectedColor.palette['800']"></v-alert> <!--Nedd Edit-->
                    </v-col>
                    <v-col cols="12" md="6" lg="4">
                        <v-alert text="Error" type="error" variant="outlined" :color="selectedColor.palette['500']"
                            class="text-left mb-3"></v-alert>
                        <v-alert text="Error" type="error" variant="outlined" :color="selectedColor.palette['800']"
                            class="text-left"></v-alert>
                    </v-col>
                    <v-col>

                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup>


const colors = ref([
    {
        name: 'Red', value: 'red', description: 'Red color theme for your application.', palette: {
            '50': '#fff0f0',
            '100': '#ffdddd',
            '200': '#ffc1c1',
            '300': '#ff9595',
            '400': '#ff5959',
            '500': '#ff2626',
            '600': '#fc0606',
            '700': '#db0000',
            '800': '#af0505',
            '900': '#900c0c',
        }
    },
    {
        name: 'Blue', value: 'blue', description: 'Blue color theme for your application.', palette: {
            '50': '#ecfbff',
            '100': '#d4f5ff',
            '200': '#b2f0ff',
            '300': '#7de9ff',
            '400': '#40d8ff',
            '500': '#14bbff',
            '600': '#009cff',
            '700': '#0084ff',
            '800': '#0071db',
            '900': '#085aa0',
        }
    },
    {
        name: 'Green', value: 'green', description: 'Green color theme for your application.', palette: {
            '50': '#edfff1',
            '100': '#d5ffe1',
            '200': '#aeffc4',
            '300': '#70ff97',
            '400': '#2bfd62',
            '500': '#00db3a',
            '600': '#00c02e',
            '700': '#009628',
            '800': '#067525',
            '900': '#076021',
        }
    },
]);

const selectedColor = ref(null);

const selectColor = (color) => {
    selectedColor.value = color;
};

</script>

<style scoped>
.color-box {
    width: 100%;
    height: 50px;
    border-radius: 4px;
    margin-right: 10px;
}
</style>