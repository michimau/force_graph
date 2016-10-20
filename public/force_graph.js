// Include the angular controller
require('plugins/force_graph/force_graph_controller');
require('plugins/force_graph/force_graph.css');
// The provider function, which must return our new visualization type

function ForceGraphProvider(Private) {
 var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));

    // Include the Schemas class, which will be used to define schemas
    var Schemas = Private(require('ui/Vis/Schemas'));

    // Describe our visualization

    return new TemplateVisType({
        name: 'force_graph', // The internal id of the vis (must be unique)
        title: 'Force Graph', // The title of the vis, shown to the user
        description: 'Force Graph chart', // The description of this vis
        icon: 'fa-network', // The font awesome icon of this visualization
        // The template, that will be rendered for this visualization
        template: require('plugins/force_graph/force_graph.html'),
        // Define the aggregation your visualization accepts
        schemas: new Schemas([{
            group: 'metrics',
            name: 'metric',
            title: 'Metric',
            min: 1,
            aggFilter: ['count'],
            defaults: [{
                type: 'count',
                schema: 'metric'
            }]
        }, {
            group: 'buckets',
            name: 'force_data',
            title: 'DateField',
            aggFilter: '!geohash_grid'
            //aggFilter: 'date_histogram'
        }])
    });
}

require('ui/registry/vis_types').register(ForceGraphProvider);
