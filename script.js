function locomotive() {
    gsap.registerPlugin(ScrollTrigger);
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true ,
    });
    locoScroll.on("scroll", ScrollTrigger.update);
  
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
  
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
  
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }
  locomotive();
  
  
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });
  
  function files(index) {
    var data = `
    ./0001.png ./0002.png ./0003.png ./0004.png ./0005.png ./0006.png ./0007.png ./0008.png ./0009.png ./0010.png
./0011.png ./0012.png ./0013.png ./0014.png ./0015.png ./0016.png ./0017.png ./0018.png ./0019.png ./0020.png
./0021.png ./0022.png ./0023.png ./0024.png ./0025.png ./0026.png ./0027.png ./0028.png ./0029.png ./0030.png
./0031.png ./0032.png ./0033.png ./0034.png ./0035.png ./0036.png ./0037.png ./0038.png ./0039.png ./0040.png
./0041.png ./0042.png ./0043.png ./0044.png ./0045.png ./0046.png ./0047.png ./0048.png ./0049.png ./0050.png
./0051.png ./0052.png ./0053.png ./0054.png ./0055.png ./0056.png ./0057.png ./0058.png ./0059.png ./0060.png
./0061.png ./0062.png ./0063.png ./0064.png ./0065.png ./0066.png ./0067.png ./0068.png ./0069.png ./0070.png
./0071.png ./0072.png ./0073.png ./0074.png ./0075.png ./0076.png ./0077.png ./0078.png ./0079.png ./0080.png
./0081.png ./0082.png ./0083.png ./0084.png ./0085.png ./0086.png ./0087.png ./0088.png ./0089.png ./0090.png
./0091.png ./0092.png ./0093.png ./0094.png ./0095.png ./0096.png ./0097.png ./0098.png ./0099.png ./0100.png
./0101.png ./0102.png ./0103.png ./0104.png ./0105.png ./0106.png ./0107.png ./0108.png ./0109.png ./0110.png
./0111.png ./0112.png ./0113.png ./0114.png ./0115.png ./0116.png ./0117.png ./0118.png ./0119.png ./0120.png
./0121.png ./0122.png ./0123.png ./0124.png ./0125.png ./0126.png ./0127.png ./0128.png ./0129.png ./0130.png
./0131.png ./0132.png ./0133.png ./0134.png ./0135.png ./0136.png ./0137.png ./0138.png ./0139.png ./0140.png
./0141.png ./0142.png ./0143.png ./0144.png ./0145.png ./0146.png ./0147.png ./0148.png ./0149.png ./0150.png
./0151.png ./0152.png ./0153.png ./0154.png ./0155.png ./0156.png ./0157.png ./0158.png ./0159.png ./0160.png
./0161.png ./0162.png ./0163.png ./0164.png ./0165.png ./0166.png ./0167.png ./0168.png ./0169.png ./0170.png
./0171.png ./0172.png ./0173.png ./0174.png ./0175.png ./0176.png ./0177.png ./0178.png ./0179.png ./0180.png
./0181.png ./0182.png ./0183.png ./0184.png ./0185.png ./0186.png ./0187.png ./0188.png ./0189.png ./0190.png
./0191.png ./0192.png ./0193.png ./0194.png ./0195.png ./0196.png ./0197.png ./0198.png ./0199.png ./0200.png
./0201.png ./0202.png ./0203.png ./0204.png ./0205.png ./0206.png ./0207.png ./0208.png ./0209.png ./0210.png
./0211.png ./0212.png ./0213.png ./0214.png ./0215.png ./0216.png ./0217.png ./0218.png ./0219.png ./0220.png
./0221.png ./0222.png ./0223.png ./0224.png ./0225.png ./0226.png ./0227.png ./0228.png ./0229.png ./0230.png
./0231.png ./0232.png ./0233.png ./0234.png ./0235.png ./0236.png ./0237.png ./0238.png ./0239.png ./0240.png
./0241.png ./0242.png ./0243.png ./0244.png ./0245.png ./0246.png ./0247.png ./0248.png ./0249.png ./0250.png
   `;
    return data.split("\n")[index];
  }
  
  const frameCount = 300;
  
  const images = [];
  const imageSeq = {
    frame: 1,
  };
  
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }
  
  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page>canvas`,
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });
  
  images[1].onload = render;
  
  function render() {
    scaleImage(images[imageSeq.frame], context);
  }
  
  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#page>canvas",
    pin: true,
    // markers:true,
    scroller: `#main`,
    start: `top top`,
    end: `600% top`,
  });
  
  
  
  gsap.to("#page1",{
    scrollTrigger:{
      trigger:`#page1`,
      start:`top top`,
      end:`bottom top`,
      pin:true,
      scroller:`#main`
    }
  })
  gsap.to("#page2",{
    scrollTrigger:{
      trigger:`#page2`,
      start:`top top`,
      end:`bottom top`,
      pin:true,
      scroller:`#main`
    }
  })
  gsap.to("#page3",{
    scrollTrigger:{
      trigger:`#page3`,
      start:`top top`,
      end:`bottom top`,
      pin:true,
      scroller:`#main`
    }
  })