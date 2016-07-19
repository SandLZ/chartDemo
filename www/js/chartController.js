/**
 * Created by liuzhu on 16/7/13.
 */
/**
 * chartType
 * 1 折线图 Broken
 * 2 曲线图 Curve
 * 3 柱状图 Bar
 * 4 雷达图 Radar
 * 5 极地区域图 Polar area
 * 6 饼图 Pie
 * 7 环形图 Doughnut
 */

angular.module('starter.controllers')
  //.config(['ChartJsProvider', function (ChartJsProvider) {
  //  // Configure all charts
  //  ChartJsProvider.setOptions({
  //    chartColors: ['#803690', '#46BFBD'],
  //    responsive: true
  //  });
  //}])
  .controller('ChartCtrl', function ($scope, $stateParams, ChartService) {
    $scope.title = "折线图";
    $scope.chartType = 1;
    $scope.options = {};
    // 接收参数
    if ($stateParams && $stateParams.chartId) {
      $scope.chartType = parseInt($stateParams.chartId);
    }
    checkChartType($scope.chartType);
    // 判断chart类型
    function checkChartType(type) {
      console.log(type);
      switch (type) {
        case 1:
          initBrokenLine();
          break;
        case 2:
          $scope.title = "曲线图";
          initCurveLine();
          break;
        case 3:
          $scope.title = "柱状图";
          initBarLine();
          break;
        case 4:
          $scope.title = "雷达图";
          initRadarChart();
          break;
        case 5:
          $scope.title = "极地区域图";
          initPolarAreaChart();
          break;
        case 6:
          $scope.title = "饼图";
          initPieChart();
          break;
        case 7:
          $scope.title = "环形图";
          initDoughnutChart();
          break;
      }
    }

    $scope.highLight = 6;

    function initChart() {
      $scope.chart = {
        xLabels: [],// x坐标显示的数据（必须）
        series: [], // 数据的种类（必须）
        data: [],   // 数据（必须）
        colors: [], // 数据展示的颜色（可选）
        dataSet: [],// 重写图标显示风格（例如y坐标轴2侧分别显示数据-直观观察数据大小）（可选）
        options: {} // 设置（包含标题、图例、提示框）（可选）
      };
      // 如需设置颜色 canvas标签中增加 chart-colors="colors"
      // 颜色(个数需 >= series )
      $scope.chart.colors = ["#2E8B57", "#D9D9D9", "#F5DEB3", "#EE3B3B"];
      // x坐标
      $scope.chart.xLabels = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
      // 系列与data对应
      $scope.chart.series = ['饮食'];
      // y 根据数据自动计算
      $scope.chart.data = [
        [50, 22, 2 , 90, 66, 77, 22, 33, 22, 55, 67, 65]
      ];
      // 左右显示数据
      /**
       * yAxisID y轴
       * label 图例和提示框中的label
       */
      // 设置默认高亮

      var tempData = ChartService.setDataHighLight($scope.chart.data,6,'#2E8B57','red');
      $scope.chart.dataSet = [{yAxisID: 'y-axis-1',fill:false,borderWidth:0,pointRadius:tempData.data,
        pointBackgroundColor:tempData.color},
        {yAxisID: 'y-axis-2'}];
      // 详细配置参考文档
      //https://github.com/chartjs/Chart.js/blob/master/docs/01-Chart-Configuration.md
      /* Options */
      $scope.chart.options = {
        // 刻度
        scales: {
          xAxes: [{
            display: false,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: false,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: false,
              position: 'right'
            }
          ]
        },
        curve: false, // 2点间是否绘制曲线（默认true）
        title: {  // 无title字段时不显示标题
          name: '2016年 消费情况折线图',
          titleColor: '#EE3B3B', // 标题颜色
          position: 'top' // 标题位置
        },
        legend: { // 图例
          display: false,
          position: 'bottom',
          // 图例字体颜色
          fontColor: 'rgb(20, 12, 33)'
        },
        // tooltips（提示框 可选）
        tooltips: {
          enabled: false,
          mode: 'single'
        },
        // 2点之间是否绘线(默认true,可选)
        showLines: true,
        // 点上绘制数据（可选）
        drawDataOnLine: {
          display: true
        },
        highLightIndex: $scope.highLight
      };
    }

    // 折线图
    function initBrokenLine() {
      initChart();
      // 调用ChartService进行配置
      $scope.chart = ChartService.initBrokenLine($scope.chart);
      $scope.onClick = function (points, evt) {
        //console.log(points, evt);
        //if (points.length > 0) {
        //  var index = points[0]._index;
        //  console.log(index);
        //  highLight = index;
        //  // 设置point高亮 半径变大
        //  points[0]._model.radius = 4;
        //  points[0]._model.backgroundColor = 'red';
        //  points[0]._model.borderWidth = 0;
        //  points[0]._model.borderColor= 'red';
        //  $scope.chart = ChartService.initBrokenLine($scope.chart);
        //}
      };
    }

    $scope.clickButton = function (index) {
      $scope.highLight = index -1;
      initChart();
      var tempData = ChartService.setDataHighLight($scope.chart.data,$scope.highLight,'#2E8B57','red');
      $scope.chart.dataSet = [{yAxisID: 'y-axis-1',fill:false,borderWidth:0,pointRadius:tempData.data,
        pointBackgroundColor:tempData.color},
        {yAxisID: 'y-axis-2'}];
      $scope.chart = ChartService.initBrokenLine($scope.chart);
    };

    // 曲线图
    function initCurveLine() {
      // 颜色(个数需 >= series )
      $scope.colors = ["#66CDAA", "#D9D9D9", "#F5DEB3", "#EE3B3B"];
      // x坐标
      $scope.labels = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
      // 系列与data对应
      $scope.series = ['饮食', '购物', '交通'];
      // y 根据数据自动计算
      $scope.data = [
        [11, 22, 33, 90, 66, 77, 22, 33, 22, 55, 67, 65],
        [99, 88, 66, 55, 44, 32, 11, 34, 22, 54, 21, 99],
        [22, 12, 32, 67, 54, 39, 55, 22, 44, 55, 32, 11]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      // 左右显示数据
      $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        },
        title: {
          display: true,
          text: '年消费曲线图'
        },
        // 图例
        legend: {
          display: true,
          position: 'top'
        }

      };
    }

    // 柱状图 && 横向柱状图
    function initBarLine() {
      // 颜色(个数需 >= series )
      $scope.colors = ["#66CDAA", "#D9D9D9", "#F5DEB3", "#EE3B3B"];
      // x坐标
      $scope.labels = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
      // 系列与data对应
      $scope.series = ['饮食', '购物', '交通'];
      // y 根据数据自动计算
      $scope.data = [
        [11, 22, 33, 90, 66, 77, 22, 33, 22, 55, 67, 65],
        [99, 88, 66, 55, 44, 32, 11, 34, 22, 54, 21, 99],
        [22, 12, 32, 67, 54, 39, 55, 22, 44, 55, 32, 11]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      // 左右显示数据
      $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        },
        title: {
          display: true,
          text: '半年消费柱状图'
        },
        // 图例
        legend: {
          display: true,
          position: 'top'
        }

      };

      $scope.options2 = {
        title: {
          display: false,
          position: 'bottom',
          text: '半消费柱状图'
        },
        //elements: {
        //  rectangle: {
        //    borderWidth: 20,
        //    borderHeight: 40,
        //    borderColor: 'rgb(0, 255, 0)',
        //    borderSkipped: 'left'
        //  }
        //},
        // 图例
        legend: {
          display: false,
          position: 'right'
        }
      };
    }


    // 雷达图
    function initRadarChart() {
      $scope.labels = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

      $scope.data = [
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 96, 27, 100]
      ];
    }

    // 极地区域图
    function initPolarAreaChart() {
      $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
      $scope.data = [300, 500, 100, 40, 120];
    }

    // 饼图
    function initPieChart() {
      $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      $scope.data = [300, 500, 100];
    }

    // 环形图
    function initDoughnutChart() {
      $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      $scope.data = [300, 500, 100];
    }
  });
