import { ref, computed, onMounted, watch } from 'vue'
import { adminTeamMgtApiFactory } from '@/apiFactory/modules/admin-team-mgt'

const adminTeams = ref([] as any[])
const querySearchTeams = ref([] as any[])
const loading = ref(false)
const searchQuery = ref('')

export const useAdminTeams = () => {
    const getAdminTeams = async () => {
        adminTeams.value = []
        loading.value = true

        const response = await adminTeamMgtApiFactory.$_get_admin_team() as any
        console.log(response?.data?.data?.teamMembers, 'here admin team')

        if (response.type !== 'ERROR') {
            adminTeams.value = response?.data?.data?.teamMembers
            querySearchTeams.value = adminTeams.value // Set initial filtered data
        }
        loading.value = false
    }

    // Watch for changes in searchQuery to filter the admin teams
    watch(searchQuery, (newQuery) => {
        console.log(newQuery, 'new query here')
        if (!newQuery) {
            // If search query is empty, reset to full list
            querySearchTeams.value = adminTeams.value
        } else {
            // Filter based on search query
            querySearchTeams.value = adminTeams.value.filter((admin: any) => {
                const firstNameMatches = admin.firstName
                    ?.toLowerCase()
                    .includes(newQuery.toLowerCase())
                const lastNameMatches = admin.lastName
                    ?.toLowerCase()
                    .includes(newQuery.toLowerCase())
                const emailMatches = admin.email
                    ?.toLowerCase()
                    .includes(newQuery.toLowerCase())
                return firstNameMatches || lastNameMatches || emailMatches
            })
        }
    })

    onMounted(() => {
        getAdminTeams()
    })

    return { getAdminTeams, loading, adminTeams, searchQuery, querySearchTeams }
}
