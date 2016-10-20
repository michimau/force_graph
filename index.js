 module.exports = function(kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: ['plugins/force_graph/force_graph']
        }
    });
 }; 
