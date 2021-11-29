<template>
  <div id="app">
    <!-- <input type="text" v-model="matricula" required>
    <input type="password" v-model="senha" required>
    <button @click="submit">Entrar</button>
    <button @click="register">Registrar</button> -->
    <body>
      <div class="container">
        <div class="header">
          <h1>Projeto Level-Up</h1>
          <h2>Login</h2>
        </div>
        <div class="main">
            <h4>Número de matrícula:</h4>
            <input type="text" v-model="matricula" required placeholder="Número de matrícula">
            <h4>Senha:</h4>
            <input type="password" v-model="senha" required placeholder="Senha">
            <button @click="submit">Entrar</button>
            <br>
            <button @click="register">Registrar</button>
        </div>
      </div>
    </body>
</div>
</template>

<script>

import api from '../services/api'

export default {
  name: 'App',
  async mounted(){
    const token = localStorage.getItem('@token')
    if(token){
      this.$router.push('/')
    }
  },

  data: () => {
    return{
      matricula: null,
      senha: null
    }
  },

  methods:{
    async submit(){
      const { data:token } = await api.post('/login', {
          matricula: this.matricula, senha: this.senha
        })
      if(!token || token < 10){
        return
      }
      localStorage.setItem('@token', token)
      location.reload()
    },
    async register(){
      await api.post('/cadastro', {
        matricula: this.matricula, senha: this.senha
        })
    }
  }
}
</script>

<style scoped>
body {
	font-family: sans-serif;
	overflow: hidden;
}

.container {
	width: 380px;
	margin:7% auto;
	border-radius: 25px;
	background-color: rgba(0, 0, 0, 0.25);
	box-shadow: 0 0 17px #333;
}

.header {
	text-align: center;
	padding-top: 20px;
}

.header h1 {
	color: #333;
	font-size: 45px;
	margin-bottom: 20px;
}

.header h2 {
  margin-bottom: 30px;
}

.main {
	text-align: center;
}

.main h4 {
  text-align: left;
  padding-left: 40px;
  margin-bottom: 5px;
  margin-top: 0px;
}

.main input, button {
  width: 300px;
	height: 40px;
	border:none;
  border-radius: 5px;
	outline: none;
	padding-left: 40px;
	box-sizing: border-box;
	font-size: 15px;
	color: #333;
	margin-bottom: 20px;
}

.main button {
  width: 100px;
	padding-left: 0;
	background-color: #83acf1;
	letter-spacing: 1px;
	font-weight: bold;
	margin-bottom: 20px;
}

.main button:hover {
	box-shadow: 2px 2px 5px #555;
	background-color: #7799d4;
}
.main input:hover {
	box-shadow: 2px 2px 5px #555;
	background-color: #ddd;
}

</style>
