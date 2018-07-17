<template>
    <div>
        <comment-form @addComment="addComment"></comment-form>
        <comment-list :list="list"></comment-list>
        <pagination :totalCount="totalCount" :currentPage="currentPage" 
        @turnPage="turnPage" :pagesize="pagesize"/>
    </div>
</template>
<script>
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import Pagination from './Pagination'
export default {
    data() {
        return {
            list: [],
            // Pagination 组件无法独立，与 list 紧密相关，因此要将一下数据添加在此父组件
            pagesize: 3,
            // 所有的数据 => 当前页面的评论 list
            totalData: [],
            totalCount: 0,
            currentPage: 1
        }
    },
    components: {
        CommentForm,
        CommentList,
        Pagination
    },
    methods: {
        turnPage(curr) {
            this.currentPage = curr;
            // const index = this.totalCount - (curr-1)  * this.pagesize;
            // const num = this.totalCount % 3;
            // if (num == 0) {
            //     this.list = this.totalData.slice(index-3,index);
            // } else {
            //     if (curr == (Math.floor(this.totalCount/3+1))){
            //         this.list =this.totalData.slice(0,num);
            //     }else {
            //         this.list = this.totalData.slice(index-3,index);
            //     }
            // } 

            // this.list = this.totalData.reverse().slice((curr-1)*this.pagesize,curr*this.pagesize);
            // this.totalData.reverse();

            this.list = this.totalData.slice((curr-1)*this.pagesize,curr*this.pagesize);
        },
        addComment(msg) {
            // this.list.reverse();       
            // this.totalData.push({text:msg});
            // this.totalCount = this.totalData.length;
            // if (this.totalCount < this.pagesize) {
            //     this.list = this.totalData;
            // } else {
            //     this.list = this.totalData.slice(this.totalCount-this.pagesize);
            //     this.currentPage = 1;
            // }
            // this.list.reverse();

            this.totalData.unshift({text:msg});
            this.totalCount = this.totalData.length;
            if (this.totalCount <= this.pagesize) {
                this.list = this.totalData;
            } else {
                this.list = this.totalData.slice(0,this.pagesize);
            }
            this.currentPage = 1;
            console.log(this.totalData);
            
        }
    }
}
</script>
<style>

</style>
