 module.exports = function(kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: ['plugins/fource_graph/fource_graph']
        }
    });
 }; 
