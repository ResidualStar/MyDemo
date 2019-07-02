<template>
  <div>
    <div class="container-fluid">
        <ol class="breadcrumb">
        <li><router-link to='/'>后台管理</router-link></li>
        <li><router-link to='/categoryAdd'>分类管理-添加分类</router-link></li>
        </ol>
        <form>
  <div class="form-group">
    <label for="name">分类名称</label>
    <input type="text" class="form-control" id="name" placeholder="分类名称" ref="input">
  </div>
  <button type="submit" class="btn btn-default" @click.prevent="add" ref="button">提交</button>
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
        add(){
            let categoryName = this.$refs.input.value
            console.log(categoryName)
            this.$axios.post('http://127.0.0.1:8081/api/category/add',{categoryName}).then((data) => {
                    if(data.data.code==1) return this.$router.push('/category')
                    else alert(data.data.msg)
                })
        }
    }
}
</script>


<style lang="less" scoped>

</style>