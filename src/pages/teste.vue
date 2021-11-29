<template>
  <div id="diagrama_disciplinas" class="diagrama">
      
  </div>
</template>

<script>
import go from 'gojs'
import api from '../services/api'

const $ = go.GraphObject.make;

export default {
    data(){
        return {
            diagramaDisciplina: null,
            models_disciplinas: [
                // { key: "Alpha", color: "lightblue" },
                // { key: "Beta", color: "orange" },
                // { key: "Gamma", color: "lightgreen" },
                // { key: "Delta", color: "pink" }
            ],
            ligacoes_disciplinas: [
            //     { from: "Alpha", to: "Beta" },
            //     { from: "Alpha", to: "Gamma" },
            //     { from: "Beta", to: "Beta" },
            //     { from: "Gamma", to: "Delta" },
            //     { from: "Delta", to: "Alpha" }
            ]
        }
    },

    async mounted(){
        this.diagramaDisciplina = $(go.Diagram, "diagrama_disciplinas", {
            "undoManager.isEnabled": true
        })
        await this.getDisciplinas()
        this.updateDiagramaDisciplinas()
    },

    methods: {
        updateDiagramaDisciplinas() {
            this.diagramaDisciplina.nodeTemplate = $(go.Node, "Auto",
                $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "white" },
                new go.Binding("fill", "color")),
                $(go.TextBlock,
                { margin: 8 },
                new go.Binding("text", "key"))
            );
            this.diagramaDisciplina.model = new go.GraphLinksModel(this.models_disciplinas, this.ligacoes_disciplinas);
        },
        async getDisciplinas(){
            const { data: disciplinas } = await api.get('/disciplinas')
            const { data: preRequisitos } = await api.get('/pre-requisitos')
            //this.disciplinas = data
            this.ligacoes_disciplinas = []
            const modelsDisciplinas = disciplinas.map(disciplina => {
                return {
                    key: disciplina.nome, color: "lightblue"
                }
            })

            this.models_disciplinas = modelsDisciplinas

            disciplinas.forEach(disciplina => {
                this.ligacoes_disciplinas = [...this.ligacoes_disciplinas, ...preRequisitos.filter(preRequisito =>{
                    if(preRequisito.codigo_disciplina === disciplina.codigo_disciplina){
                        return true
                    }
                    return false
                }).map(preRequisito => {
                    return {
                        from: preRequisito.nome, to: disciplina.nome
                    }
                })]
            });
        }
    }
}
</script>

<style scoped>
.diagrama {
  width: 100%;
  height: 1000px;
}
</style>