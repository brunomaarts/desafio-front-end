
async function startSlideImages(){
  return $.getJSON('../public/json/slide.json').then((data) => {

    let images = data[0].imagens;
    let fileName = data[0].nome;

    for(const [id, image] of images.entries()){

      let imageTag = `
        <li> 
          <img 
            src="../public/slide/${image}" 
            data-index="${id}" 
            name="${fileName}"> 
        </li>
      `;

      var dot = `<span data-index="${id}"></span>`

      $(imageTag).appendTo("#slide .content ul");
      $(dot).appendTo("#slide .dots");
    }
  });
}

$(async function() {

  await startSlideImages()

  let dots = $('#slide .controls .dots span');
  let images = $('#slide .content ul li');
  let wrapperSlide = $('#slide .content ul');
  let lastElem = dots.length - 1;
  let imgWidth = images.width();
  let target;
  
  dots.first().addClass('active');
  wrapperSlide.css('width', imgWidth * ( lastElem + 1) + 'px');

  function sliderResponse(target) {
    wrapperSlide.stop(true, false).animate({
      'left':'-' + imgWidth * target + 'px'
    },300);
    dots.removeClass('active').eq(target).addClass('active');
  }

  dots.on('click', function() {
    if (!$(this).hasClass('active')) {
      target = $(this).index();
      sliderResponse(target);
      resetTiming();
    }
  });

  $('.arrow-right').on('click', function() {
    target = $('.dots span.active').index();
    target === lastElem ? target = 0 : target = target + 1;
    sliderResponse(target);
    resetTiming();
  });

  $('.arrow-left').on('click', function() {
    target = $('.dots span.active').index();
    lastElem = dots.length-1;
    target === 0 ? target = lastElem : target = target-1;
    sliderResponse(target);
    resetTiming();
  });

  function sliderTiming() {
    target = $('.dots span.active').index();
    target === lastElem ? target = 0 : target = target+1;
    sliderResponse(target);
  }

  var timingRun = setInterval(function() { 
    sliderTiming();
  },5000);

  function resetTiming() {
    clearInterval(timingRun);
    timingRun = setInterval(function() { 
      sliderTiming(); 
    },5000);
  }
  

});