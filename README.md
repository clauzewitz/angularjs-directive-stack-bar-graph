# angularjs-directive-stack-bar-graph
D3 Stack Bar Graph Directive

# How to use
```npm
npm install d3
```

```javascript
angular.module('app', [
  'stackBarChart'
]);

var chartData = {
  data1: [
          {
            name: '실비',
            value: 0
          },
          {
            name: '암',
            value: 100
          },
          {
            name: '뇌',
            value: 60
          },
          {
            name: '심장',
            value: 0
          },...
        ],
  data2: [
          {
            name: '실비',
            value: 0
          },
          {
            name: '암',
            value: 25
          },
          {
            name: '뇌',
            value: 20
          },
          {
            name: '심장',
            value: 0
          },...
        ]
};

var colors = [
  '#F7C82D',
  '#FBE99D'
];

<stack-bar-chart data="chartData" width="600" height="300" colors="colors"></stack-bar-chart>
```

![demo.png](/demo.png "demo")

# License
MIT License
