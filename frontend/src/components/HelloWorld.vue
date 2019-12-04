
<style>



</style>

<template>
  <div class="movies">
    <h1>Hi</h1>
    <p></p>
    <input v-model="message">
  <p>{{ message }} </p>
  <p>고구마.. 막걸리</p>

  <audio controls autoplay> 
   <source src="../assets/abab.mp3" type="audio/mp3"> 
     </audio>
  <p>
  <img src="../assets/1.jpg" width="400" height="550">
  <img src="../assets/2.jpg" width="400" height="550">
  <img src="../assets/3.jpg" width="400" height="550">
  <p> </p>
  <img src="../assets/4.jpg" width="400" height="450">
  <img src="../assets/5.jpg" width="400" height="450">

  <br>
  정말 맛나겠당..
      </div>
    
</template>

<script>

export default {  
  created () {
    this.$http.get('api/dbdb')
    .then((response) => {
      this.movies = response.data
    })
  },
  data () {
    return {
      movies: [],
      message : '고구마 크림 막걸리..'
    }
  }
}



</script>
