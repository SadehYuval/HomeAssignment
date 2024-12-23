<template>
  <v-container>
    <!-- Zero Trust Score (No v-card) -->
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="pa-3">
          <v-card-title>
            <h3>{{ companyName }}</h3>
          </v-card-title>
          <v-card-subtitle class="zero-trust-score">
            <strong>Zero Trust Score: {{ Math.ceil(ZeroTrustScore) }}%</strong>
          </v-card-subtitle>
        </div>
      </v-col>
    </v-row>

    <!-- Metrics -->
    <v-row v-for="(metric, key) in metrics" :key="key">
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title class="metric-title">{{ key }}</v-card-title>
          <v-card-subtitle class="metric-description">
            {{ metric.description }}
          </v-card-subtitle>

          <!-- Metric Progress Bar -->
          <v-progress-linear
            v-model="metric.score"
            :max="100"
            color="blue"
            height="15"
            class="mt-2"
          >
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-center">
        <div class="pa-3" :style="riskCategoryStyle">
          <v-card-title>
            <h3>{{ riskCategory }}</h3>
          </v-card-title>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        companyName: 'FinTechSecure Ltd.',
        ZeroTrustScore: 58.5,
        metrics: {
          'Shannon Entropy Score': {
            score: 78,
            description: 'Measures entropy in the system.',
          },
          'Firewall Detected': {
            score: 100,
            description: 'Checks if a firewall is in place.',
          },
          'Open Ports Detected': {
            score: 12,
            description: 'Shows open ports used.',
          },
          // Add more metrics as needed...
        },
        riskCategory: 'Moderate Risk',
      }
    },
    computed: {
      riskCategoryStyle() {
        if (this.riskCategory === 'Low Risk') {
          return { backgroundColor: 'green', color: 'white' }
        } else if (this.riskCategory === 'Moderate Risk') {
          return { backgroundColor: 'orange', color: 'white' }
        } else {
          return { backgroundColor: 'red', color: 'white' }
        }
      },
    },
  }
</script>

<style scoped>
  .zero-trust-score {
    color: #4caf50; /* Green color for Zero Trust Score */
  }

  .metric-title {
    font-weight: bold;
  }

  .v-card-title {
    font-size: 20px;
  }

  .v-card-subtitle {
    font-size: 18px;
  }
</style>
