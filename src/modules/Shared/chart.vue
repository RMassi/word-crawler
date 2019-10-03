<template>
  <div class="chart">
    <div class="chart-container" id="chart" v-resize="onResize">
      <cytoscape ref="cy" :config="config" :preConfig="preConfig" v-on:add="onAddNode">
        <cy-element
          v-for="def in items"
          :key="`${def.data.id}`"
          :definition="def"
        />
      </cytoscape>
    </div>
  </div>
</template>

<script>
import spread from 'cytoscape-spread'
import weaverjs from 'weaverjs'
import klay from 'cytoscape-klay'

export default {
  name: 'Chart',
  props: {
    items: [Array, Object],
  },
  data() {
    return {
      chart: null,
      config: {
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#666',
              'label': 'data(word)'
            }
          }, {
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          }
        ]
      }
    }
  },
  methods: {
    preConfig(cytoscape) {
      spread( cytoscape, weaverjs );
      cytoscape.use( klay )
    },
    onAddNode() {
      // this.$refs.cy.instance.layout({
      //     name: 'breadthfirst',
      //     directed: false,
      //     fit: true,
      //     spacingFactor: 1.75,
      //     avoidOverlap: true,
      //     animationDuration: 500
      //   }).run()

      // this.$refs.cy.instance.layout({
      //     name: 'spread',
      //     fit: true,
      //     minDist: 20,
      //     padding: 20
      //   }).run()

      this.$refs.cy.instance.layout({
          name: 'klay',
          fit: true,
          minDist: 20,
          padding: 20,
          klay: {
            edgeRouting: 'SPLINES'
          }
        }).run()
    },
    onResize() {
      if (this.items && this.chart) {
        // this.chart.resize()
      }
    },
    clear() {
      // this.chart.remove('node')
    },
    draw() {
      // debugger
      // this.clear()
      // this.chart.add(this.items)
    },

  },
  watch: {
    items(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        // this.draw()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.chart {
  .chart-container {
    height: 300px;
    width: 100%;
  }

}
</style>
