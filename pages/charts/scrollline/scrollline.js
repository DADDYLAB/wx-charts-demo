var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
var startPos = null;
Page({
  data: {},
  touchHandler: function(e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function(e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function(e) {
    lineChart.scrollEnd(e);
  },
  createSimulationData: function() {
    var categories = [];
    var data = [];
    var data2 = [];
    var data3 = [];
    for (var i = 0; i < 20; i++) {
      if (i == 0) {
        categories.push('宝宝出生')
      } else if (i == 30) {
        categories.push('第' + (i + 1) + '天' + '(1个月)');
      } else {
        categories.push('第' + (i + 1) + '天');
      }

      data.push(20 + i * (Math.random() * (2 - 1) + 1));
      data2.push(30 + i * (Math.random() * (2 - 1) + 1));

      if (i == 3) {
        data3.push(0);
      } else if (i == 4) {
        data3.push(25);
      } else if (i == 5) {
        data3.push(29);
      }
    }
    return {
      categories: categories,
      data: data,
      data2: data2,
      data3: data3
    }
  },
  onLoad: function(e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      series: [{
        name: 'P3',
        color: "#ffcacc",
        dataPointShape: false,
        data: simulationData.data,
        format: function(val, name) {
          return '';
        }
      }, {
        name: 'P15',
        dataPointShape: false,
        data: simulationData.data2,
        format: function(val, name) {
          return '';
        }
      }, {
        name: 'Baby',
        color: "#ee4f3c",
        dataPointShape: true,
        pointShape:'n_circle',
        data: simulationData.data3,
        format: function(val, name) {
          return '';
        }
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '厘米(cm)',
        gridColor:'#eeeeee',
        format: function(val) {
          return val.toFixed(2);
        },
        min: 10
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        legend: true,
        lineStyle: 'curve'
      }
    });
    lineChart.Offset(-300);
  }
});