<template>
  <div>
      <table>
          <thead>
              <tr>
                  <th>
                      Código
                  </th>
                  <th>
                      Disciplina
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="disciplina of disciplinas" :key="disciplina.codigo_disciplina">
                  <td>
                      {{disciplina.codigo_disciplina}}
                  </td>
                  <td>
                      {{disciplina.Nome}}
                  </td>
              </tr>
          </tbody>
      </table>
      <router-link to="/teste">Teste de diagrama</router-link>
  </div>
</template>

<script>
import api from '../services/api'

export default {
    data(){
        return {
            disciplinas: null
        }
    },
    methods:{
        async getDisciplinas(){
            const { data } = await api.get('/disciplinas')
            this.disciplinas = data
        }
    },
    mounted(){
        this.getDisciplinas()
    }
}
</script>

<style>

</style>