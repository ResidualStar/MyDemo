<template>
  <div>
    <div class="container-fluid">
        <ol class="breadcrumb">
        <li><router-link to='/'>后台管理</router-link></li>
        <li><router-link to='/category'>分类管理-分类首页</router-link></li>
        <li><router-link to='/updataCategory'>编辑分类</router-link></li>
        </ol>
        <form>
  <div class="form-group">
    <label for="name">分类名称</label>
    <input type="text" class="form-control" id="name" placeholder="分类名称" ref="input">
  </div>
  <button type="submit" class="btn btn-default" @click.prevent="updata" ref="button">提交</button>
</form>
    </div>
  </div>

</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{
        updata(){
            let id = this.$route.params.id
            let categoryName =  this.$refs.input.value
            this.$axios.post(`http://127.0.0.1:8081/api/category/updata`,{id,categoryName}).then(data=>{
                // console.log(data)
                if(!data.data.code) alert(data.data.msg)
                else {
                    alert(data.data.msg)
                    this.$router.push('/category')
                }
            })
        }
    },
    beforeCreate(){
         let id = this.$route.params.id
            this.$axios.get(`http://127.0.0.1:8081/api/category/findAll?id=${id}`).then(data=>{
                this.$refs.input.value=data.data[0].categoryName
            })
    }

}
</script>


<style lang="less" scoped>

</style>