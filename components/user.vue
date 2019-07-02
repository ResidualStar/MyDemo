<template>
  <div>
    <div class="container-fluid">
        <ol class="breadcrumb">
        <li><router-link to='/'>后台管理</router-link></li>
        <li><router-link to='/user'>用户管理</router-link></li>
        </ol>
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>密码</th>
              <th>是否为管理员</th>
            </tr>
          </thead>
          <tbody ref='tbody'>

          </tbody>
        </table>
    </div>
    <div class="container-fluid">
        <nav aria-label="...">
            <ul class="pager">
              <li class="previous"><a href="javascript:;" @click="top"><span aria-hidden="true">&larr;</span> 上一页</a></li>
              <li class="next"><a href="javascript:;" @click="bottom">下一页 <span aria-hidden="true">&rarr;</span></a></li>
            </ul>
          </nav>
    </div>
  </div>
</template>


<script>
    export default {
        data() {
            return {}
        },
        methods: {
            async top() {
                let page;
                await this.$axios.get('http://127.0.0.1:8081/api/find').then((data) => {
                    page = data.data[0]
                })
                page -= 2
                if (page <= -1) page = 1
                await this.$axios.get(`http://127.0.0.1:8081/api/find?page=${page}`).then((data) => {
                    let html = ''
                    data.data[1].forEach((item, index) => {
                        let isAdmin = item.isAdmin ? '是' : '否'
                        html += `<tr><td>${index}</td>
                                <td>${item.user}</td>
                                <td>${item.pass}</td>
                                <td>${isAdmin}</td></tr>`
                    });
                    this.$refs.tbody.innerHTML = html
                })
            },
            async bottom() {
                let page, max;
                await this.$axios.get('http://127.0.0.1:8081/api/find').then((data) => {
                    page = data.data[0]
                })
                // page++
                await this.$axios.get('http://127.0.0.1:8081/api/findAll').then((data) => {
                        max = data.data
                    })
                if (page > Math.ceil(max / 2)) page = Math.ceil(max / 2)
                await this.$axios.get(`http://127.0.0.1:8081/api/find?page=${page}`).then((data) => {
                    let html = ''
                    data.data[1].forEach((item, index) => {
                        let isAdmin = item.isAdmin ? '是' : '否'
                        html += `<tr><td>${index}</td>
                                <td>${item.user}</td>
                                <td>${item.pass}</td>
                                <td>${isAdmin}</td></tr>`
                    });
                    this.$refs.tbody.innerHTML = html
                })
            }
        },
        beforeCreate(){
                this.$axios.get('http://127.0.0.1:8081/api/find?page=1').then((data) => {
                    let html = ''
                    console.log(data)
                    data.data[1].forEach((item, index) => {
                        let isAdmin = item.isAdmin ? '是' : '否'
                        html += `<tr><td>${index}</td>
                                <td>${item.user}</td>
                                <td>${item.pass}</td>
                                <td>${isAdmin}</td></tr>`
                    });
                    this.$refs.tbody.innerHTML = html
                })
        }
    }
</script>

<style lang="less" scoped>

</style>