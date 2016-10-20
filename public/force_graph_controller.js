 // Create an Angular module for this plugin
var module = require('ui/modules').get('force_graph');

module.controller('force_graph_controller', function($scope, Private) {

    $scope.$watch('esResponse', function(resp) {
        if (!resp) {
            return;
        }

        var width = 600,
            height = 400;
        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

        var svg = d3.select("#force_graph" + $scope.$id).append("svg")
            .attr("width", width)
            .attr("height", height);
        // here i am using the sample data
        var graph = {
            "nodes": [{
                "name": "Node A",
                "group": 1
            }, {
                "name": "Node B",
                "group": 2
            }, {
                "name": "Node C",
                "group": 1
            }, {
                "name": "Node D",
                "group": 3
            }, {
                "name": "Node E",
                "group": 2
            }, {
                "name": "Node F",
                "group": 1
            }],
            "links": [{
                "source": 1,
                "target": 0,
                "value": 1
            }, {
                "source": 2,
                "target": 4,
                "value": 8
            }, {
                "source": 3,
                "target": 0,
                "value": 10
            }, {
                "source": 4,
                "target": 3,
                "value": 6
            }, {
                "source": 5,
                "target": 1,
                "value": 1
            }, {
                "source": 5,
                "target": 2,
                "value": 1
            }]
        };

        /* 
         //if you want to use elasticsearch data you can get the data 
         // as below. you have to convert the data to required format
         var dataId = $scope.vis.aggs.bySchemaName['force_data'][0].id;
         var dataBuckets = resp.aggregations[sourceId].buckets;
         var metricsAgg = $scope.vis.aggs.bySchemaName['metric'][0];
         dataBuckets.map(function(bucket){
           var name=bucket.label; // name
           var value = metricsAgg.getValue(bucket); // count   
         
         });
        */

        force
            .nodes(graph.nodes)
            .links(graph.links)
            .start();

        var link = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) {
                return Math.sqrt(d.value);
            });

        var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function(d) {
                return color(d.group);
            })
            .call(force.drag);

        node.append("title")
            .text(function(d) {
                return d.name;
            });

        force.on("tick", function() {
            link.attr("x1", function(d) {
                    return d.source.x;
                })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                });

            node.attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                });
        });

    });
});
