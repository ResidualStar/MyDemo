let page, max, categoryMax, commentMax;
$.ajax({
    url: '/api/category/findAll',
    type: 'get',
    dataType: 'json',
    success(res) {
        // console.log(res)
        let html = ''
        res.forEach(item => {
            html += `
            <li>${item.categoryName}</li>`
        });
        // console.log(html)
        $('#index').after(html)
    }
})

$.ajax({
    url: '/comment/findBycategoryLength',
    type: 'post',
    data: 'json',
    success(res) {
        console.log(res)
        commentMax = res
        $.ajax({
            url: '/content/find',
            type: 'post',
            dataType: 'json',
            data: {},
            success(res) {
                page = res.page
                console.log(res)
                let html = ''
                res.data.forEach(item => {
                    html += `
                        <li>
                        <h3>${item.title}</h3>
                        作者：<span>${item.user}</span>
                        -阅读：
                        <span>${item.views}</span>
                        -评论：
                        <span>${commentMax}</span>
                        </br>
                        </br>
                        -时间：
                       <span>${item.addTime}</span>
                        <p>${item.description}</p>
                        <a href="/content/findById?id=${item._id}">阅读全文</a>
                    </li>`
                });
                $('#content').html(html)
                $.ajax({
                    url: '/content/findLength',
                    type: 'get',
                    data: 'json',
                    success(res) {
                        max = res
                        $('#center').html(`${page}/${max/3}`)
                    }
                })
            }
        })
    }
})





$(function() {
    // $('#administrator').hide()
    $('#login a').on('click', () => {
        $('#login').hide()
        $('#enter').show()
    })
    $('#enter a').on('click', () => {
        $('#enter').hide()
        $('#login').show()
    })
    $('aside li').eq(0).find('input').eq(2).on('click', function() {
        let user = $(this).parent().find('input').eq(0).val()
        let pass = $(this).parent().find('input').eq(1).val()
        $.ajax({
            url: '/api/login',
            type: 'post',
            dataType: 'json',
            data: {
                user,
                pass
            },
            beforeSend() {
                if (!user.trim() || !pass.trim()) {
                    console.log('请填写完整')
                    return false
                }
            },
            success(res) {
                if (!res.code) return console.log(res.msg)
                console.log('登入成功')
                    // setTimeout(function() {
                    //     $('#administrator').show()
                    //     $('#login').hide()
                    //     $('#enter').hide()
                    // }, 1000)
                location.reload()
            }
        })
        return false
    })
    $('#enter1').on('click', function(e) {
            let user = $(this).parent().find('input').eq(0).val()
            let pass = $(this).parent().find('input').eq(1).val()
            let newpass = $(this).parent().find('input').eq(2).val()
            $.ajax({
                url: '/api/enter',
                type: 'post',
                dataType: 'json',
                data: {
                    user,
                    pass
                },
                beforeSend() {
                    if (!user.trim() || !pass.trim() || !newpass.trim()) {
                        console.log('请填写完整')
                        return false
                    }
                    if (pass !== newpass) {
                        console.log('两次密码输入不一致')
                        return false
                    }
                },
                success(res) {
                    if (!res.code) return console.log(res.msg)
                    console.log('登入成功 ')
                        // setTimeout(function() {
                        //     $('#administrator').show()
                        //     $('#login').hide()
                        //     $('#enter').hide()
                        // }, 1000)
                    location.reload()
                }
            })
            console.log(user, pass, newpass)
            e.preventDefault()
        })
        // 退出登入
    $('#administrator').children('a').on('click', function() {
        $.ajax({
            url: '/api/logout',
            type: 'get',
            dataType: 'json',
            success(res) {
                if (res.code == 1) {
                    location.reload()
                }
            }
        })
    })

    $('#top').on('click', function() {
        if (page == 1) return alert('已是第一頁')
        $.ajax({
            url: '/content/find',
            data: { page: --page },
            type: 'post',
            dataType: 'json',
            success(res) {
                console.log(res)
                let html = ''
                res.data.forEach(item => {
                    html += `
                        <li>
                        <h3>${item.title}</h3>
                        作者：<span>${item.user}</span>
                        -阅读：
                        <span>${item.views}</span>
                        -评论：
                        <span>${commentMax}</span>
                        </br>
                        </br>
                        -时间：
                       <span>${item.addTime}</span>
                        <p>${item.description}</p>
                        <a href="/content/findById?id=${item._id}">阅读全文</a>
                    </li>`
                });
                $('#content').html(html)
                $('#center').html(`${res.page}/${max/3}`)
            }
        })
    })
    $('#bottom').on('click', function() {
        if (page > Math.ceil(max / 3) - 1) return alert('已是最後一頁')
        $.ajax({
            url: '/content/find',
            data: {
                page: ++page
            },
            dataType: 'json',
            type: 'post',
            success(res) {
                console.log(res)
                let html = ''
                res.data.forEach(item => {
                    html += `
                        <li>
                        <h3>${item.title}</h3>
                        作者：<span>${item.user}</span>
                        -阅读：
                        <span>${item.views}</span>
                        -评论：
                        <span>${commentMax}</span>
                        </br>
                        </br>
                        -时间：
                       <span>${item.addTime}</span>
                        <p>${item.description}</p>
                        <a href="/content/findById?id=${item._id}">阅读全文</a>
                    </li>`
                });
                $('#content').html(html)
                $('#center').html(`${page}/${max/3}`)
            }
        })
    })

    // 分類點擊
    $('#nav').on('click', 'li', function() {
            console.log('click')
            page = 1
            $(this).addClass('active').siblings().removeClass('active')
            let category = $(this).html()
            if (category == '首页') {
                location.reload()
                return
            }
            $.ajax({
                url: '/content/findBycategoryLength',
                type: 'post',
                dataType: 'json',
                data: {
                    category
                },
                success(res) {
                    console.log(res)
                    categoryMax = res
                    $.ajax({
                        url: '/content/findBycategory',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            category
                        },
                        success(res) {
                            console.log(res);
                            let html = ''
                            res.data.forEach(item => {
                                html += `
                                        <li>
                                        <h3>${item.title}</h3>
                                        作者：<span>${item.user}</span>
                                        -阅读：
                                        <span>${item.views}</span>
                                        -评论：
                                        <span>${commentMax}</span>
                                        </br>
                                        </br>
                                        -时间：
                                       <span>${item.addTime}</span>
                                        <p>${item.description}</p>
                                        <a href="/content/findById?id=${item._id}">阅读全文</a>
                                    </li>`
                            });
                            $('#content').html(html)
                            if (categoryMax) {
                                $('#center').html(`${res.page}/${Math.ceil(categoryMax/3)}`)
                                $('#top').show()
                                $('#bottom').show()
                            } else {
                                $('#center').html(`沒有更多内容`)
                                $('#top').hide()
                                $('#bottom').hide()
                            }

                        }
                    })
                }
            })

        })
        // $('#content').on('click', '.ready', function() {
        //     let id = $(this).attr('data-id')
        //     $.ajax({
        //         url: '/content/findById',
        //         // type: 'post',
        //         dataType: 'json',
        //         data: {
        //             id
        //         },
        //         success(res) {
        //             console.log(res)
        //         }
        //     })
        // })
})