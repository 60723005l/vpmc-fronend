<template>
    <!-- <div class="admin-district-container form"> -->
    <form class="md-layout">
        <md-card  class="md-layout-item">
            <md-card-content>
                <md-field >
                    <label for="county">縣市</label>
                    <md-select v-model="county" name="county" id="county">
                        <md-option value="fight-club">Fight Club</md-option>
                </md-select>
                </md-field>
                <md-field>
                    <label>鄉鎮</label>
                    <md-select v-model="town">
                        <md-option value="fight-club">Fight Club</md-option>
                </md-select>
                </md-field>
                <md-field >
                    <label>村里</label>
                    <md-select v-model="village">
                        <md-option value="fight-club">Fight Club</md-option>
                </md-select>
                </md-field>
            </md-card-content>
            
            <md-card-actions>
                <md-button>清除</md-button>
                <md-button>查詢</md-button>
            </md-card-actions>
        </md-card>
    </form>
</template>
<script>
export default {
    name:"AdminDistrict",
    data: () => ({
        county:'',
        town:'',
        village:''
    })
}
</script>