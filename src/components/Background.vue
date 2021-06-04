<template>
<div class="background">
    <div class="content">
        <img src="../assets/css/img/circle1.png" style="width:150px; height:auto">
        <img src="../assets/css/img/circle3.png" style="width:160px; height:auto">
        <img src="../assets/css/img/circle2.png" style="width:60px; height:auto">
        <img src="../assets/css/img/circle4.png" style="width:180px; height:auto">
        <img src="../assets/css/img/circle3.png" style="width:50px; height:auto">
        <img src="../assets/css/img/circle1.png" style="width:200px; height:auto">
        <img src="../assets/css/img/circle1.png" style="width:50px; height:auto">
        <img src="../assets/css/img/circle2.png" style="width:80px; height:auto">
        <img src="../assets/css/img/circle4.png" style="width:70px; height:auto">
        <img src="../assets/css/img/circle1.png" style="width:150px; height:auto">
        <img src="../assets/css/img/circle2.png" style="width:200px; height:auto">
    </div>
</div>
</template>

<script>
export default {
  name: 'Background'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

@keyframes fall {
    0% { opacity: 0; }
    
    12.5% { transform: rotate(90deg); }
    25% { transform: rotate(180deg); }
    37.5% { transform: rotate(270deg); }
    50% { transform: rotate(360deg); }
    62.5% { transform: rotate(450deg); }
    75% { transform: rotate(540deg); }
    87.5% { transform: rotate(630deg); }
    
    100% {
        top: 100%;
        transform: rotate(720deg);
    }
}

.background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: -999;
    
    .content {
        position: sticky;
        top: 0;
        height: 100vh;
        overflow: hidden;
        
        img {
            position: absolute;
            animation: fall 7s linear infinite;
            animation-fill-mode: forwards;
            opacity: 0.4;
            top: -100px;
        }
        
        img:nth-child(1) { left: -5%; animation-delay: -6s; }
        img:nth-child(2) { left: 20%; animation-delay: -7s; }
        img:nth-child(3) { left: 6%; animation-delay: -2s; }
        img:nth-child(4) { left: 23%; animation-delay: -1s; }
        img:nth-child(5) { left: 43%; animation-delay: -2s; }
        img:nth-child(6) { left: 30%; animation-delay: -6s; }
        img:nth-child(7) { left: 57%; animation-delay: -1s; }
        img:nth-child(8) { left: 49%; animation-delay: -2s; }
        img:nth-child(9) { left: 59%; animation-delay: -5s; }
        img:nth-child(10) { left: 61%; animation-delay: -3s; }
        img:nth-child(11) { left: 75%; animation-delay: -4s; }

    }
}

</style>
