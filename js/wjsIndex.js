$(function () {
  //定义变量用来判断是否是移动端
  var isMoblie = true;

  //注意使用bootstrap框架中的提示工具，要初始化，不然样式会出错
   $('[data-toggle="tooltip"]').tooltip()
  $.ajax({
    type: 'get',
    url: './data/imgData.json',
    dataType: 'json',
    success: function (result) {


      if ($(window).width() >= 768) {
        // 当前的屏幕大于768，说明是PC端，
        isMoblie = false;
      } else {
        isMoblie = true;
      }
      // 渲染轮播图，将是否为移动端标记传给渲染模板，然后判断进行渲染移动端还是PC端
      //这里使用对象的方式，给一个名字，和一个参数，在渲染模板的时候进行判断
      var pcImgHtml = template("imgTemp", {
        'list': result,
        isMoblie: isMoblie
      });
      // console.log(pcImgHtml);
      $('.listbox').html(pcImgHtml);
      //动态渲染点标记
      var indiHtml = template('indicatorTemp', {
        'list': result
      });
      $('.carIndicator').html(indiHtml);


    }
  })

  //实现触摸滑屏换页效果
  var startX, distanceX;
  //获取触摸对象,注意使用的是：使用jQuery方法获取对象，变成原生DOM对象，后面使用原生事件监听
  var carouselInner = $('.carousel-inner')[0];
  // console.log(carouselInner);
  //监听触摸事件
  carouselInner.addEventListener('touchstart', function (e) {
    startX = e.targetTouches[0].clientX;
    // console.log(startX);
  })
  carouselInner.addEventListener('touchend', function (e) {
    distanceX = e.changedTouches[0].clientX - startX;
    // console.log(distanceX);
    if (Math.abs(distanceX) > 50) {
      if (distanceX > 0) {
        //当差距大于0，说明从左往右滑动，调用carousel事件
        $('.carousel').carousel('prev');
      } else {
        $('.carousel').carousel('next')
      }
    }

  })




  $('.carousel').carousel({
    //轮播图配置
    interval: 2000
  })

  // 获取产品块中导航栏的宽度，并设置宽度
  var allLi = $('.wjs_product .nav-tabs').find('li');
  // console.log(allLi);
  //获取每一个li的宽度，并且累加到totalW，赋值为ul的宽度
  var totalW = 0;
  allLi.each(function (index, value) {
    //注意不能直接使用width获取宽度
    // width()只能获取内容的宽度，
    // innerWith()获取内容+padding宽度
    //outerWidth()获取内容+padding+border宽度
    //outerWidth(true)获取内容+padding+border+margin宽度
    //因为要将所有宽度赋值给ul，所以要使用outerWidth()计算宽度
    totalW += $(value).outerWidth();
    console.log($(value).outerWidth());
    console.log(totalW);
  })
  //设置父级元素ul的宽度，用子元素li来撑开实现移动端的滑动,因为滑动的是使用ul来滑动，但是其父元素是固定宽度
  $('.wjs_product .nav-tabs').width(totalW);
  
  //使用插件iscroll插件实现滑动
  var proNavScroll=new IScroll('.wjs_parent',{
    scrollX:true, //实现向左滑动，因为默认是垂直方向上的滑动
    scrollY:false //设置垂直方向不滑动
  })

})