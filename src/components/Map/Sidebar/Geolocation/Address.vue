<template>
    <form class="md-layout">
        <md-card  class="md-layout-item">
            <md-card-content>
                <md-field >
                    <label >輸入門牌</label>
                    <md-input v-model="addr"></md-input>
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
    name:"Address",
    data: () => ({
        addr:''
    })
}
</script>