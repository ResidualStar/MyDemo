<template>
  <div>
    <div class="container-fluid">
        <ol class="breadcrumb">
        <li><router-link to='/'>后台管理</router-link></li>
        <li><router-link to='/category'>分类管理-分类首页</router-link></li>
        </ol>
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>分类名称</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody ref='tbody'>

          </tbody>
        </table>
    </div>
    <div class="container-fluid">
        <nav aria-label="...">
            <ul class="pager">
              <li class="previous"><a href="javascript:;" @click="top" ><span aria-hidden="true">&larr;</span> 上一页</a></li>
              <li class="next"><a href="javascript:;" @click="bottom">下一页 <span aria-hidden="true">&rarr;</span></a></li>
            </ul>
          </nav>
    </div>
  </div>
</template>


<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            async top() {
                let page;
                await this.$axios.get('http://127.0.0.1:8081/api/category/find').then((data) => {
                    page = data.data[0]
                })
                console.log(page)
                page -= 2
                if (page <= -1) page = 1
                await this.$axios.get(`http://127.0.0.1:8081/api/category/find?page=${page}`).then((data) => {
                    let html = ''
                    data.data[1].forEach((item, index) => {
                        html += `<tr><td>${index}</td>
                                    <td>${item.categoryName}</td>
                                    <td>${item.ctime}</td>
                                    <td><a href='#/updataCategory/${item._id}'>编辑</a><span class='del'  data-id=${item._id} class='del' style="cursor: pointer;">删除</sapn><td>`
                    });
                    this.$refs.tbody.innerHTML = html
                })
            },
            async bottom() {
                let page, max;
                await this.$axios.get('http://127.0.0.1:8081/api/category/find').then((data) => {
                    // console.log(data)
                    page = data.data[0]
                })
                console.log(page)
                    // page++;
                await this.$axios.get('http://127.0.0.1:8081/api//category/findAllLength').then((data) => {
                    max = data.data
                })
                if (page > Math.ceil(max / 2)) page = Math.ceil(max / 2)
                    // console.log(page)
                await this.$axios.get(`http://127.0.0.1:8081/api/category/find?page=${page}`).then((data) => {
                    let html = ''
                    data.data[1].forEach((item, index) => {
                        html += `<tr><td>${index}</td>
                                    <td>${item.categoryName}</td>
                                    <td>${item.ctime}</td>
                                    <td><a href='#/updataCategory/${item._id}'>编辑</a><span class='del' data-id=${item._id} class='del' style="cursor: pointer;">删除</sapn><td>`
                    });
                    this.$refs.tbody.innerHTML = html
                })
            }
        },
       async beforeCreate(){
           let that = this
               await this.$axios.get('http://127.0.0.1:8081/api/category/find?page=1').then((data) => {
                    let html = ''
                    data.data[1].forEach((item, index) => {
                        html += `<tr><td>${index}</td>
                                    <td>${item.categoryName}</td>
                                    <td>${item.ctime}</td>
                                    <td><a href='#/updataCategory/${item._id}'>编辑</a><span data-id=${item._id} class='del' style="cursor: pointer;">删除</sapn><td>`
                    });
                    this.$refs.tbody.innerHTML = html
                })
                this.$refs.tbody.onclick=function(e){
                    if(!confirm('確認刪除嘛')) return
                    if(e.target.className != 'del')return 
                        // console.log(e.target.getAttribute('data-id'))
                        let _id = e.target.getAttribute('data-id') 
                        that.$axios.get(`http://127.0.0.1:8081/api/category/del?_id=${_id}`).then(data=>{
                            // console.log(data)
                            if(data.data.code) {
                                alert('刪除成功')
                                location.reload()
                            }

                        })
                }
        }
    };

</script>


<style lang="less" scoped>
</style>