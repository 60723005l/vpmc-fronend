<template>
    <div>
        <md-button @click="handleShowDialog">法令查詢</md-button>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>法令查詢</md-dialog-title>
            <md-content class="content">
                <md-list :md-expand-single="false">
                    <md-list-item md-expand v-for="(title, index) in titles" :key="index">
                        <span class="md-list-item-text">{{title}}</span>
                        <md-list slot="md-expand">
                            <md-list-item class="md-inset" v-for="(subItem, index2) in decreeMap[title]" :key="index2">
                                <a :href="subItem.link" target="_blank">{{subItem.subtitle}}</a>
                            </md-list-item>
                        </md-list>
                    </md-list-item>
                </md-list>
            </md-content>
        </md-dialog>
    </div>
</template>
<script>
import api from "../../../api"
import { groupBy, keys } from 'lodash'

const DecreeList = [
    {title: "估價法令", subtitle: "估價師法", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=D0060076"},
    {title: "估價法令", subtitle: "不動產估價技術規則", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0060077"},
    {title: "都市計畫法令", subtitle: "國土計畫法", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070230"},
    {title: "都市計畫法令", subtitle: "土地法", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0060001"},
    {title: "都市計畫法令", subtitle: "都市計畫法", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070001"},
    {title: "都市計畫法令", subtitle: "都市計畫容積移轉實施辦法", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070028"},
    {title: "都市計畫法令", subtitle: "非都市土地使用管制規則", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0060013"},
    {title: "都市計畫法令", subtitle: "非都市土地開發審議作業規範", link: "https://glrs.moi.gov.tw/LawContent.aspx?id=FL003635#lawmenu"},
    {title: "都市計畫法令", subtitle: "都市計畫公共設施用地多目標使用辦法", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070013"},
    {title: "公有財產法令", subtitle: "國有財產法", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=G0370001"},
    {title: "公有財產法令", subtitle: "國有財產估價作業程序", link: "https://law-out.mof.gov.tw/LawContent.aspx?id=FL021985&KeyWord=%e4%bc%b0%e5%83%b9"},
    {title: "公有財產法令", subtitle: "財政部國有財產署各分署辦理國有非公用不動產委託估價參考原則", link: "https://esvc.fnp.gov.tw/decreeDetail/ruleMain?treId=840"},
    {title: "公有財產法令", subtitle: "台北市政府財政局委託辦理市有非公用不動產估價作業原則", link: "http://www.laws.taipei.gov.tw/lawsystem/wfLaw_ArticleContent.aspx?LawID=P03D1011-20140930&RealID=03-04-2034&PN=ALL"},
    {title: "都市更新法令", subtitle: "都市更新條例", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070008"},
    {title: "都市更新法令", subtitle: "都市更新條例施行細則", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070010"},
    {title: "都市更新法令", subtitle: "都市危險及老舊建築物加速重建條例", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070249"},
    {title: "都市更新法令", subtitle: "都市更新建築容積獎勵辦法", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070027"},
    {title: "都市更新法令", subtitle: "都市更新權利變換實施辦法", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0070025"},
    {title: "保險業資產評價估法令", subtitle: "保險業財務報告編製準則", link: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=G0390085"},
    {title: "保險業資產評價估法令", subtitle: "保險業辦理不動產投資自律規範", link: "https://law.lia-roc.org.tw/Law/Content?lsid=FL070128"},
    {title: "保險業資產評價估法令", subtitle: "訂定保險法第146條之2第1項關於保險業辦理不動產投資有關即時利用並有收益之認定標準及處理原則", link: "https://www.ib.gov.tw/ch/home.jsp?id=45&parentpath=0,3&mcustomize=onemessages_view.jsp&dataserno=201908230001&aplistdn=ou=data,ou=law,ou=chlaw,ou=ap_root,o=fsc,c=tw&dtable=Law"},
]
const DecreeMap = groupBy(DecreeList, 'title')
const titles = keys(DecreeMap)

export default {
    name:"DecreeModuel",
    data: () => ({
        showDialog: false,
        decreeMap: DecreeMap,
        titles: titles
    }),
    created()
        {
            this.extendFiles()
        },
    methods:
        {
            async extendFiles()
            {
                const fileTypes = [{zh_name: '通則', type: "GeneralLaw"}, {zh_name: '公報', type: "Bulletin"}]
                for( let fileType of fileTypes ) {
                    let files = await api.File.getLawFiles({item: fileType.type})
                    let fileList = files.map( file => ({
                        title: fileType.zh_name,
                        subtitle: file.renderName,
                        link: process.env.BASE_BACKEND_URL + file.serverRoute.slice(1)
                    }))
                    this.decreeMap[fileType.zh_name] = fileList
                    this.titles.push(fileType.zh_name)
                }
            },
            handleShowDialog()
            {
                this.showDialog = true
            }
        }
}
</script>
<style lang="scss" scoped>
.content{
    overflow: auto;
}
</style>