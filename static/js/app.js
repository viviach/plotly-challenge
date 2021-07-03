//Step 1: Plotly
d3.json("data/samples.json").then(function(data) {
    console.log(data);
});
  
// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change",chars);

//we will create a function to get an ID from a dropdown menu
function chars() {
    d3.json("data/samples.json").then(function(data) {
        var names =Object.values(data.names);
        //define the Menu
        var dropdownMenu = d3.select("#selDataset");
        //insert in an option for each name(id) to html selection, with the name of the id 
        names.forEach((i) => {
            dropdownMenu
                .append("option")
                .text(i)
                .property("value", i)
        });

        // Assign the dropdownmenu option selected to a variable
        var selectedOption = dropdownMenu.property("value");
        console.log(selectedOption);

        //We will retrieve the data from samples array
        var samples =Object.values(data.samples);
        samples.forEach((i)=>{
            var id=Object.values(i); // for each i
            //console.log (id);
            //retrieve id
            var id_value=id[0];
            //print the result
            //console.log(id_value);
            //retrieve otu_ids
            var otu_ids=Object.values(id[1]);
            // Slice the first 10 objects for plotting
            var slicedOtu_ids = otu_ids.slice(0, 10);
            //reversedSlicedOtu_ids = slicedOtu_ids.reverse()
            //print the result
            //console.log (slicedOtu_ids);
            //retrieve sample_values
            var sample_values=Object.values(id[2]);
            // Slice the first 10 objects for plotting
            var slicedSample_values = sample_values.slice(0, 10);
            reversedSample_values= slicedSample_values.reverse()
            //print the result
            //console.log (slicedSample_values);
            //retrieve otu_labels
            var otu_labels=Object.values(id[3]);
            // Slice the first 10 objects for plotting
            var slicedOtu_labels = otu_labels.slice(0, 10);
            
            //print the result
            //console.log (slicedOtu_labels);

        if (selectedOption===id_value){
            //console.log (id)
            var data_sample=[id_value, slicedOtu_ids, reversedSample_values, slicedOtu_labels]
            console.log(data_sample);
            var y= slicedOtu_ids.map(otu => "OTU " + otu).reverse();
            function init() {
                data_bar = [{
                   x: data_sample[2],
                   y: y, 
                   type:"bar",
                   text: data_sample[3],
                   orientation: "h"
                   
               }];

               var layout_bar = {
                title: "Top 10 Bacteria Cultures Found",
              };

                 var CHART_bar = d3.selectAll("#bar").node();
               
                 Plotly.newPlot(CHART_bar, data_bar,layout_bar);
               }
               var data_pop=[id_value, otu_ids, sample_values, otu_labels]
               data_bubble = [{
                x: data_pop[1],
                y: data_pop[2],
                text: data_pop[3],
                mode: "markers",
                marker:{
                    size:data_pop[2],
                    color:data_pop[1] 
                }
                
                }];

                var layout_bubble = {
                title: "Bacteria Cultures Per Sample",
                
                };

                var CHART_bubble = d3.selectAll("#bubble").node();
            
                Plotly.newPlot(CHART_bubble, data_bubble,layout_bubble);
                           
            init()    
            }
            else {
                console.log("false");
            }            
        });
    });
};

chars()




