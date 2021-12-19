<template>
    <div>
        <div v-if="!isEmpty">
            <md-table>
                <md-table-row>
                    <!-- <md-table-head md-numeric>ID</md-table-head> -->
                    <md-table-head>field</md-table-head>
                    <md-table-head>value</md-table-head>
                </md-table-row>

                <md-table-row v-for="( name, index ) in names" :key="index">
                    <!-- <md-table-cell md-numeric>{{index}}</md-table-cell> -->
                    <md-table-cell>{{name}}</md-table-cell>
                    <md-table-cell>{{properties[name]}}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>
<script>
import { isEmpty } from "lodash"

export default {
    name:"Info",
    computed:
        {
            properties(){
                return this.$store.state.widgetSidebar.current.payload.properties
            },
            isEmpty(){
                return isEmpty( this.properties )
            },
            names() {
                if( this.isEmpty  ) return []
                return Object.keys( this.properties )
            }
        }
    
}
</script>