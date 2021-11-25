<template>
  <div id="app">
    <!--<table>
      <thead>
        <tr>
          <th>Código do Curso</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="curso in cursos" :key="curso.codigo_curso">
          <td>{{curso.codigo_curso}}</td>
          <td>{{curso.Nome}}</td>
        </tr>
      </tbody>
    </table>-->

    <!-- Formulário com número de matrícula e senha e botão de OK-->
    <!--<button @click="recarregarCursos">Recarregar</button>
    <b-form-group>
      <input>
        id="matricula"
        type="text"
      </input>
    </b-form-group>
    <label for="senha">Senha</label>
    <input type="password" name="senha" id="senha" required>
    <button @click="submit(document.getElementById('matricula').value, document.getElementById('senha').value)">Submeter</button>-->
    <!-- <input type="text" v-model="matricula" required>
    <input type="password" v-model="senha" required>
    <button @click="submit">Entrar</button>
    <button @click="register">Registrar</button> -->
<body>
  <div class="container">
    <div class="header">
      <h1>UFRN - Projeto level-up</h1>
      <h2>login</h2>
    </div>
    <div class="main">
        <span>
          <i class="fa fa-user"></i>
          <input type="text" v-model="matricula" required>
        </span><br>
        <span>
          <i class="fa fa-lock"></i>
          <input type="password" v-model="senha" required>
          </span><br>
          <button @click="submit">Entrar</button>
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

.main {
	text-align: center;
}

.main input{
  width: 300px;
}

.main input, button {
	height: 40px;
	border:none;
	outline: none;
	padding-left: 40px;
	box-sizing: border-box;
	font-size: 15px;
	color: #333;
	margin-bottom: 30px;
}

.main button {
  width: 200px;
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

.main span {
	position: relative;
}

.main i {
	position: absolute;
	left: 15px;
	color: #333;
	font-size: 16px;
	top: 2px;
}
</style>
