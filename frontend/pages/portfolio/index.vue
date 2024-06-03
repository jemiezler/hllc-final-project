<template>
  <v-app class="bg-black">
    <v-container>
      <v-row>
        <v-col cols="12" class="image-wrapper h-screen" fluid>
          <div class="spotlight">
            <v-img src="/main.jpg" alt="Description of image" width="100%"></v-img>
            <div class="text-overlay">
              <h1 class="text-h2 font-weight-bold">Hi I'm jem</h1>
              <p class=" font-weight-bold pt-2 text-h6">Nattawat Nattachanasit</p>
              <p class="text-grey-lighten-1 font-weight-normal text-body-2">Software Engineering Student</p>
              <p class="text-grey-lighten-1 font-weight-normal text-body-2">Mae Fah Luang University</p>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="h-screen">
          <h1>About Me</h1>
          <p class="text-grey-lighten-1 pt-6">
            I am a passionate and driven software engineering student with a strong interest in technology and
            innovation. My journey in the world of software began with a curiosity for how things work and a desire to
            create solutions that make a positive impact. <br /><br />
            During my studies, I have gained proficiency in a variety of programming languages such as Java, Python,
            and JavaScript, along with hands-on experience in software development methodologies like Agile and Scrum.
            I enjoy tackling complex problems and collaborating with teams to deliver high-quality software solutions.
            <br /><br />
            My academic projects have allowed me to explore diverse areas of software engineering, including web
            development, mobile app development, and database management. I am particularly interested in areas such
            as artificial intelligence, machine learning, and cloud computing, where I see tremendous potential for
            innovation and growth. <br /><br />
            Outside of academics, I actively engage in coding challenges, hackathons, and open-source contributions to
            continuously enhance my skills and stay updated with industry trends. I am also a strong advocate for
            continuous learning and believe in the power of mentorship and networking to foster personal and
            professional growth. <br /><br />
            In the future, I aspire to leverage my skills and knowledge to build impactful software solutions that
            solve real-world problems and contribute positively to society.
          </p>
        </v-col>

        <v-col cols="12" md="6" class="h-screen">
          <div class="">
            <div class="flex flex-row items-center justify-center">
              <h1 class="text-4xl font-semibold">Programming Languages</h1>
              <v-row class="pt-6">
                <v-col v-for="(icon, index) in icons" :key="index" class="">
                  <img :src="icon.src" :alt="icon.alt" style=" height: 50px;">
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>


      </v-row>
    </v-container>
  </v-app>

</template>

<script setup lang="ts">
definePageMeta({
  layout: 'none',
});

const icons = ref([
  { src: "/dart.svg", alt: "Dart" },
  { src: "/c.png", alt: "C#" },
  { src: "/spring.jpg", alt: "Spring" },
  { src: "/java.jpg", alt: "Java" },
  { src: "/js.png", alt: "JavaScript" },
  { src: "/css.png", alt: "CSS" },
  { src: "/html.png", alt: "HTML" },
]);

onMounted(() => {
  // Array of objects containing the src and alt attributes for each image

});
</script>
<style scoped>
.image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
}

.spotlight {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.spotlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 1) 50%);
  z-index: 1;
}

.text-overlay {
  position: absolute;
  width: 100%;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 2;
  text-align: center;
}

.text-overlay h2 {
  margin: 0;
  padding: 0;
}
</style>
