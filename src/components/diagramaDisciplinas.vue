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
            models_disciplinas: [],
            ligacoes_disciplinas: []
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
                $(go.Shape, "Circle", { height: 140, width: 140},
                new go.Binding("fill", "color")),
                new go.Binding("location", "loc", go.Point.parse),
                // $(go.Shape, {fill: "transparent", stroke: "blue", strokeWidth: 8},
                // new go.Binding("geometry", "value", makeArc)),
                // $(go.Shape, {fill: "transparent", stroke: "gray", strokeWidth: 8},
                // new go.Binding("geometry", "value", makeArcRest)),
                $(go.TextBlock, new go.Binding("text", "key"),
                {
                    textAlign: "center",
                    font: "10pt helvetica, arial, sans-serif",
                    stroke: "#333333",
                    overflow: go.TextBlock.OverflowClip,
                    width: 100
                }
            ));
            this.diagramaDisciplina.model = new go.GraphLinksModel(this.models_disciplinas, this.ligacoes_disciplinas);
        },
        async getDisciplinas(){
            // const { data: disciplinas } = await api.get('/disciplinas')
            // const { data: preRequisitos } = await api.get('/pre-requisitos')
            //this.disciplinas = data
            const { data } = await api.get('/disciplinas/diagrama')
            this.models_disciplinas = data.modelsDisciplinas
            this.ligacoes_disciplinas = data.ligacoesDisciplinas
        }
        // ,
        // function makeArc(sweep){
        //     return new go.Geometry()
        //         .add(new go.PathFigure(50, 0)
        //             .add(new go.PathSegment(go.PathSegment.Arc, -90, sweep, 50, 50, 50, 50)));
        // },
        // function makeArcRest(sweep){
        //     var p = new go.Point(50, 0).rotate(-90+sweep).offset(50, 50);
        //     return new go.Geometry()
        //         .add(new go.PathFigure(p.x, p.y)
        //             .add(new go.PathSegment(go.PathSegment.Arc, sweep-90, 360-sweep, 50, 50, 50, 50)));
        // }
    }
}
</script>

<style scoped>
.diagrama {
  width: 100%;
  height: 1000px;
}
</style>