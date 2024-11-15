<template>
<main>
  <section class="space-y-6">
    <CoreOverviewHeader />
    <section class="py-4">
      <!-- <CoreHeaderWithStats
        :statData="adminUserDistribution"
        @add="showNewGroupModal = true"
        title="Manage App Users"
        description="Create and manage admins, content admins and challenge admins"
        :stats="userStats"
        customAddText="Create new user group"
      /> -->
    </section>
    <CorePageHeader />
    
    <div class="lg:flex">
      <!-- Reports Section -->
    <ContentManagementReportsTable :showSideContent="showSideContent" />
    
      <!-- Featured Content Section -->
      <!-- <ContentManagementFeaturedContentsTable v-if="showSideContent" @toggleModal="showSideContent = !showSideContent" /> -->
      <ContentManagementFeaturedContentsTable @toggleModal="showFeatureContentModal = !showFeatureContentModal" />
    </div>
    </section>
    
    <!-- <CoreBaseModal :show="showFeatureContentModal" @update:show="showFeatureContentModal = false"> -->
      <div v-if="showFeatureContentModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <ContentManagementModal @close="showFeatureContentModal = false" />
      </div>
    <!-- </CoreBaseModal> -->

    <!-- <ContentManagementNewGroupModal @close="showNewGroupModal = false" v-if="showNewGroupModal"  /> -->
</main>
</template>

<script setup lang="ts">
// import { useAdminUserDistribution } from "@/composables/admin-mgt/fetchAdminUsersDistribution";
// const { loading: loadingTeamStats, adminUserDistribution } =
//   useAdminUserDistribution();
const showFeatureContentModal = ref(false);
import imageOne from "@/assets/img/admin-stat1.png";
import imageTwo from "@/assets/img/admin-stat2.png";
import imageThree from "@/assets/img/admin-stat3.png";
const showSideContent = ref(true)
definePageMeta({
  layout: "dashboard",
    // middleware: 'auth'
});

// const showNewGroupModal = ref(false)
const statusClass = (status: string) => {
  switch (status) {
    case "Approved":
      return "text-green-500";
    case "Removed":
      return "text-red-500";
    default:
      return "";
  }
};

// const userStats = ref([
//   {
//     image: imageOne,
//     key: "",
//     title: "USER ADMIN",
//     count: "0",
//   },
//   {
//     image: imageTwo,
//     key: "",
//     title: "USER ADMIN",
//     count: "0",
//   },
//   {
//     image: imageThree,
//     key: "",
//     title: "USER ADMIN",
//     count: "0",
//   },
//   {
//     image: imageOne,
//     key: "",
//     title: "USER ADMIN",
//     count: "0",
//   },
// ]);
</script>


<style scoped>
.icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>