/**
 * Created by liuzhu on 16/7/16.
 * Chart
 * 提供6种图表
 * 传入数据
 * {
 *       xLabels: [],// x坐标显示的数据（必须）
 *       series: [], // 数据的种类（必须）
 *       data: [],   // 数据（必须）
 *       colors: [], // 数据展示的颜色（可选）
 *       dataSet: [],// 重写图标显示风格（例如y坐标轴2侧分别显示数据-直观观察数据大小）（可选）
 *       options: {} // 设置（包含标题、图例、提示框）（可选）
 *     }
 */

angular.module('starter.services', ['chart.js'])
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts(可选)
    ChartJsProvider.setOptions({
      chartColors: ['#2E8B57', '#46BFBD'],
      responsive: true
    });
  }])
  .factory('ChartService', function () {
    return {
      // 折线图
      initBrokenLine: initBrokenLine,
      // 曲线图
      initCurveLine: initCurveLine,
      setDataHighLight: setDataHighLight
    };

    // 设置(半径)
    function setDataHighLight(data,index,defaultColor,highColor) {
      var tempData = [];
      var tempColor = [];
      for(var i = 0;i < data[0].length;i++) {
        if(i == index){
          tempData.push(4);
          tempColor.push(highColor);
        }else {
          tempData.push(3);
          tempColor.push(defaultColor);
        }
      }
      var result = {data:tempData,color:tempColor};
      return result;
    }

    function  initBrokenLine(chart) {
      // xLabels
      if (!chart.hasOwnProperty('xLabels')) {
        console.log('警告：（chartService）缺少xLabels！');
      }
      // series
      if (!chart.hasOwnProperty('series')) {
        console.log('警告：（chartService）缺少series！');
      }
      // data
      if (!chart.hasOwnProperty('data')) {
        console.log('警告：（chartService）缺少data！');
      }

      // colors
      if (chart.hasOwnProperty('colors')) {
        chart.colors = chart.colors;
      }
      // dataSet
      if (chart.hasOwnProperty('dataSet')) {

      }
      // options
      if (chart.hasOwnProperty('options')) {
        chart.options = paraseOptions(chart.options, chart.data);
      }
      return chart;

    }

    function initCurveLine() {

    }

    /****************** 解析方法 ******************/

    function paraseOptions(chartOptions, data) {
      // 曲线
      var isCurve = 0.4;
      if (chartOptions.hasOwnProperty('curve')) {
        if (!chartOptions.curve) {
          isCurve = 0;
        }
      }
      // 标题
      var title = {display: true, text: '', fontColor: 'rgb(10, 99, 132)', position: 'top'};
      if (chartOptions.hasOwnProperty('title')) {
        if (chartOptions.title.hasOwnProperty('name')) {
          if (chartOptions.title.name.length == 0) {
            title.display = false;
          } else {
            title.display = true;
            title.text = chartOptions.title.name;
          }
        } else {
          title.display = false;
        }
        if (chartOptions.title.hasOwnProperty('titleColor')) {
          title.fontColor = chartOptions.title.titleColor;
        }
        if (chartOptions.title.hasOwnProperty('position')) {
          title.position = chartOptions.title.position;
        } else {
          title.position = 'top';
        }
      }
      // 图例
      var legend = {display: true, position: 'top', labels: {fontColor: 'rgb(20, 12, 33)'}};
      if (chartOptions.hasOwnProperty('legend')) {
        legend.display = true;
        if (chartOptions.legend.hasOwnProperty('display')) {
          legend.display = chartOptions.legend.display;
        }
        if (chartOptions.legend.hasOwnProperty('position')) {
          legend.position = chartOptions.legend.position;
        } else {
          legend.position = 'bottom';
        }
        if (chartOptions.legend.hasOwnProperty('fontColor')) {
          legend.labels.fontColor = chartOptions.legend.fontColor;
        }
      }
      // tooltips
      var tooltips = {mode: ''};
      if (chartOptions.hasOwnProperty('tooltips')) {
        if (chartOptions.tooltips.hasOwnProperty('mode')) {
          tooltips.mode = chartOptions.tooltips.mode;
        } else {
          tooltips.mode = 'single';
        }
      }
      // showLines
      var showLines = true;
      if (chartOptions.hasOwnProperty('showLines')) {
        if (!chartOptions.showLines) {
          showLines = false;
        }
      }
      // HighLight
      var highIndex = 0;
      if (chartOptions.hasOwnProperty('highLightIndex')) {
        highIndex = chartOptions.highLightIndex;
      }
      // drawDataOnLine
      var dataOnLine = {animation: ''};
      if (chartOptions.hasOwnProperty('drawDataOnLine')) {
        if (chartOptions.drawDataOnLine.hasOwnProperty('display')) {
          if (chartOptions.drawDataOnLine.display) {
            dataOnLine.animation = {
              onComplete: function () {
                var chartInstance = this.chart;
                var ctx = chartInstance.ctx;
                ctx.textAlign = "center";
                Chart.helpers.each(data.forEach(function (d, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  Chart.helpers.each(meta.data.forEach(function (bar, index) {
                    //// 颜色
                    if (highIndex == index) {
                      ctx.fillStyle = 'red';
                    }else {
                      ctx.fillStyle = '#ABABAB';
                    }
                    // 计算出合适的位置 放置数据label
                    if (index == 0) {// 第一个放右边
                      ctx.fillText(d[index], bar._model.x + 13, bar._model.y);
                      //bar.fontColor = '#000';
                    }else if (index == data.length-1) {// 最后一个放左边
                      ctx.fillText(d[index], bar._model.x - 13, bar._model.y);
                    }else {
                      if (d[index] < d[index-1] && d[index+1] > d[index]) {// Bottom
                        ctx.fillText(d[index], bar._model.x, bar._model.y + 12);
                      }else {// Top
                        ctx.fillText(d[index], bar._model.x , bar._model.y - 5);
                      }
                    }
                  }), this)
                }), this);
              }
            };
          }
        }
        chartOptions = {
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: false
                //labelString: '月份'
              },
              gridLines: {
                display: false
              }
            }],
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                gridLines: {
                  display: false
                },
                display: true,
                position: 'left'
              }, {
                id: 'y-axis-2',
                type: 'linear',
                gridLines: {
                  display: false
                },
                display: true,
                position: 'right'
              }
            ]
          },
          // 是否是曲线
          elements: {line: {tension: isCurve}},
          // 标题
          title: title,
          // 图例
          legend: legend,
          // tooltips(点击点显示的提示框)
          tooltips: {
            mode: tooltips.mode,
            enabled: false, // 默认开启
            titleFontColor: '#fff', // tooltip title
            bodyFontColor: '#fff' // tooltip items
          },
          // 2点之间是否绘线
          showLines: showLines,
          // 点上绘制数据
          animation: dataOnLine.animation
        };
        return chartOptions;
      }
    }
  });
