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
              <tr v-for="disciplina of disciplinas" :key="disciplina['Código_disciplina']">
                  <td>
                      {{disciplina['Código_disciplina']}}
                  </td>
                  <td>
                      {{disciplina.Nome}}
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            disciplinas: null
        }
    },
    methods:{
        async getDisciplinas(){
            const { data } = await axios.get('http://localhost:3000/disciplinas', {
                headers: {
                    'x-access-token': localStorage.getItem('@token')
                }
            })
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