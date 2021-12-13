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
                      {{disciplina.nome}}
                  </td>
              </tr>
          </tbody>
      </table>
      <diagrama-disciplina />
  </div>
</template>

<script>
import api from '../services/api'
import DiagramaDisciplinas from '../components/diagramaDisciplinas.vue'

export default {
    components:{
        "diagrama-disciplina": DiagramaDisciplinas
    },
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