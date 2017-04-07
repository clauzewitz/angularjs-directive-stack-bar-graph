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



var colors = [
  '#F7C82D',
  '#FBE99D'
];

<stack-bar-chart data="chartData" width="600" height="300" colors="colors"></stack-bar-chart>
```

![demo.png](/demo.png "demo")

# License
MIT License
