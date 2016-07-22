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
    function setDataHighLight(data, index, defaultColor, highColor) {
      var tempData = [];
      var tempColor = [];
      for (var i = 0; i < data[0].length; i++) {
        if (i == index) {
          tempData.push(5);
        } else {
          tempData.push(3);
        }
        tempColor.push(highColor);
      }
      var result = {data: tempData, color: tempColor};
      return result;
    }

    function initBrokenLine(chart) {
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
      // scales

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
      } else {
        legend.display = false;
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
      // scales

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
            var defaultColor = '#B0B0B0';// gray
            var highLightColor = '#FFA54F';// yellow
            if (chartOptions.drawDataOnLine.hasOwnProperty('labelDefaultColor')) {
              defaultColor = chartOptions.drawDataOnLine.labelDefaultColor;
            }
            if (chartOptions.drawDataOnLine.hasOwnProperty('labelHighColor')) {
              highLightColor = chartOptions.drawDataOnLine.labelHighColor;
            }
            dataOnLine.animation = {
              onComplete: function () {
                var chartInstance = this.chart;
                var ctx = chartInstance.ctx;
                ctx.textAlign = "center";
                Chart.helpers.each(data.forEach(function (d, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  Chart.helpers.each(meta.data.forEach(function (bar, index) {
                    // 高亮
                    if (highIndex == index) {
                      ctx.font = "15px Arial";
                      ctx.fillStyle = highLightColor;
                    } else {
                      ctx.font = "14px Arial";
                      ctx.fillStyle = defaultColor;
                    }
                    // 计算出合适的位置 放置数据label
                    if (index == 0) {// 第一个放右边
                      ctx.fillText(data[0][index], bar._model.x + 4, bar._model.y - 5);

                    } else if (index == data[0].length - 1) {// 最后一个放左边
                      ctx.fillText(data[0][index], bar._model.x - 5, bar._model.y - 8);
                    } else {
                      if (data[0][index] < data[0][index - 1] && data[0][index + 1] > data[0][index]) {// Bottom
                        ctx.fillText(data[0][index], bar._model.x, bar._model.y + 15);
                      } else {// Top
                        ctx.fillText(data[0][index], bar._model.x, bar._model.y - 8);
                      }
                    }
                  }), this)
                }), this);
              }
            };
          }
        }
        // scales
        var scales = {};
        var xAxes = [];
        var yAxes = [];
        if (chartOptions.hasOwnProperty('scales')) {
          // x
          if (chartOptions.scales.hasOwnProperty('xAxes')) {
            var tempX = {};
            if (chartOptions.scales.xAxes[0].hasOwnProperty('display')) {
              tempX['display'] = chartOptions.scales.xAxes[0].display;
            }else {
              tempX['display'] = true;
            }
            if (tempX.display) {
              if (chartOptions.scales.xAxes[0].hasOwnProperty('scaleLabel')) {
                if (chartOptions.scales.xAxes[0].scaleLabel.hasOwnProperty('display')) {
                  tempX['scaleLabel'] = {display:chartOptions.scales.xAxes[0].scaleLabel.display};
                }else {
                  tempX['scaleLabel'] = {display:true};
                }
              }
              if (chartOptions.scales.xAxes[0].hasOwnProperty('gridLines')) {
                if (chartOptions.scales.xAxes[0].gridLines.hasOwnProperty('display')) {
                  tempX['gridLines'] = {display:chartOptions.scales.xAxes[0].gridLines.display};
                }else {
                  tempX['gridLines'] = {display:true};
                }
              }
            }
            xAxes.push(tempX);
          }
          // y
          if (chartOptions.scales.hasOwnProperty('yAxes')) {
            var yAxesArr = chartOptions.scales.yAxes;
            for (var i in yAxesArr) {
              var item = yAxesArr[i];
              var tempItem = {};
              if (item.hasOwnProperty('display')) {
                tempItem['display'] = item.display;
              }else {
                tempItem['display'] = true;
              }
              if (tempItem.display) {
                if (item.hasOwnProperty('id')) {
                  tempItem['id'] = item.id;
                }

                if (item.hasOwnProperty('type')) {
                  tempItem['type'] = item.type;
                }
                if (item.hasOwnProperty('position')) {
                  tempItem['position'] = item.position;
                }
                if (item.hasOwnProperty('gridLines')) {
                  if (item.gridLines.hasOwnProperty('display')) {
                    tempItem['gridLines'] = {display:item.gridLines.display};
                  }
                }
              }
              yAxes.push(tempItem);
            }
          }
        }
        chartOptions = {
          scales: {
            xAxes: xAxes,
            yAxes: yAxes
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

    function cloneObject(o, d) {
      if (o === null || o === undefined || typeof ( o ) !== 'object') {
        return o;
      }
      var deep = !!d;
      var cloned;
      if (o.constructor === Array) {
        if (deep === false) {
          return o;
        }
        cloned = [];
        for (var i in o) {
          cloned.push(cloneObject(o[i], deep));
        }
        return cloned;
      }
      cloned = {};
      for (var i in o) {
        cloned[i] = deep ? cloneObject(o[i], true) : o[i];
      }
      return cloned;
    }

  });
