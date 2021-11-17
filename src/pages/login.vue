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
    <input type="text" v-model="matricula" required>
    <input type="password" v-model="senha" required>
    <button @click="submit">Entrar</button>
    <button @click="register">Registrar</button>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'App',
  async mounted(){
    this.recarregarCursos()
  },

  data: () => {
    return{
      cursos: null,
      matricula: null,
      senha: null
    }
  },

  methods:{
    async recarregarCursos(){
      const { data } = await axios.get("http://localhost:3000/cursos")
      this.cursos = data
    },
    async submit(){
      const { data:token } = await axios.post("http://localhost:3000/login", {
          matricula: this.matricula, senha: this.senha
        })
      if(!token || token < 10){
        return
      }
      localStorage.setItem('@token', token)
      this.$router.push('/')
    },
    async register(){
      await axios.post("http://localhost:3000/cadastro", {
        matricula: this.matricula, senha: this.senha
        })
    }
  }
}
</script>

<style scoped>

</style>
