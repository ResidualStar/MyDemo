<template>
    <div>
        <div class="container-fluid">
            <ol class="breadcrumb">
                <li>
                    <router-link to='/'>后台管理</router-link>
                </li>
                <li>
                    <router-link to='/updataContent'>添加内容-修改内容</router-link>
                </li>
            </ol>
            <form>
                <div class="form-group">
                    <label for="name3">分类</label>
                    <select class="form-control" id="name3" ref='input1'>
                        <!-- <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option> -->
                    </select>
                </div>
                <div class="form-group">
                    <label for="name">标题</label>
                    <input type="text" class="form-control" id="name" placeholder="请输入内容标题" ref="input2">
                </div>
                <div class="form-group">
                    <label for="name1">简介</label>
                    <textarea  id="name1" class="form-control" ref="input3" placeholder="请输入内容简介"></textarea>
                </div>
                <div class="form-group">
                    <label for="name2">内容</label>
                    <textarea  id="name2" class="form-control" ref="input4" placeholder="请输入内容"></textarea>
                </div>
                <button type="submit" class="btn btn-default" @click.prevent="updata">提交</button>
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
            let category = this.$refs.input1.value
            let title = this.$refs.input2.value
            let description = this.$refs.input3.value
            let content = this.$refs.input4.value
            let id = this.$route.params.id
            console.log(category,title,description,content)
            if(!category.trim()||!title.trim()||!description.trim()||!content.trim()){
                alert('请填写完整')
                return
            }
            this.$axios.post('http://127.0.0.1:8081/api/content/updata',{ id,category, title, description, content }).then(data=>{
                // console.log(data)
                alert('修改成功')
                this.$router.push('/content')
            })
        }
    },
    beforeCreate(){
         this.$axios.get(`http://127.0.0.1:8081/api/category/findAll`).then(data=>{
             let html = ''
             data.data.forEach(item => {
                 html += ` <option value="${item.categoryName}">${item.categoryName}</option>`
             });
             this.$refs.input1.innerHTML=html
            //  console.log(data)
            })
            let id = this.$route.params.id
            this.$axios.get(`http://127.0.0.1:8081/api/content/findAll?id=${id}`).then(data=>{
                this.$refs.input1.value=data.data[0].category
                this.$refs.input2.value=data.data[0].title
                this.$refs.input3.value=data.data[0].description
                this.$refs.input4.value=data.data[0].content
            })
    }
}
</script>


<style lang="less" scoped>
    #name1,
    #name2 {
        resize: none;
    }
</style>