<template>
    <div class="basic-tags-holder row">
        <div class="tags" 
            v-for="(tab, index) in tabs" :key="index" 
            :class="{'active': activeTab.name === tab.name}" 
            @click=" onTabClick( tab ) ">
            <span>{{tab.name}}</span>
        </div>
    </div>
</template>
<script>

/**
 * $props.tags
 * [
 *  {
 *      name: String,
 *      
 *  }
 * ]
 */
export default {
    name:'Tabs',
    data() 
        {
            return {
                activeTab: ""
            }
        },
    props: 
        {
            tabs:
            {
                type:Array,
                required:true
            }
        },
    mounted()
        {},
    methods:
        {
            onTabClick( tab )
            {
                this.ActiveTab( tab )
                this.$emit('Click', tab)
            },
            ActiveTab( tab )
            {
                this.activeTab = tab
            }
        }
}
</script>
<style scoped>
.basic-tags-holder{
    background: #35495e;
    flex-wrap: wrap;
}

.tags{
    padding: 3px 10px;
    border: 0px solid #5d5d5d;
    border-radius: 2px;
    cursor: pointer;
    flex-wrap: wrap;
    color: white;
}
.tags.active{
    background: #0086ff;
}
.tags:hover{
    background: #272727 ;
    /* border: 1px solid #8f8f8f ; */
}
</style>