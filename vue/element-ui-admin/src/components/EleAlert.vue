<template>
<transition name="el-alert-fade">
    <div class="el-alert" :class="[typeClass,center?'is-center':'']" v-show="visible">
        <div class="el-alert__content">
            <span class="el-alert__title" v-if="title">{{title}}</span>
            <i class="el-alert__closebtn el-icon-close" @click="close()"></i>
        </div>
    </div> 
</transition>

</template>
<script>
export default {
    data() {
        return {
            visible: true
        }
    },
    props: {
        title: {
            type: String,
            default: '',
            required: true
        },
        type: {
            type: String,
            default: 'info'
        },
        center:  Boolean
    },
    computed: {
        typeClass() {
            return `el-alert--${this.type}`
        }
    },
    methods: {
        close() {
            this.visible = false;
            this.$emit('close');
        }
    }
}
</script>
<style>
.is-center {
    text-align: center;
}
</style>