<template>
    <v-layout>
        <v-app-bar color="white">
            <v-container>
                <v-img src="/logo.png" max-height="40" max-width="88"></v-img>
            </v-container>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <slot></slot>
        </v-main>
    </v-layout>
</template>