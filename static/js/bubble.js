//Step 1: Plotly
d3.json("data/samples.json").then(function(data) {
    console.log(data);
});
  
// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change",bubblechar, barchar);

//we will create a function to get an ID from a dropdown menu
function bubblechar() {
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
            //retrieve sample_values
            var sample_values=Object.values(id[2]);
            //retrieve otu_labels
            var otu_labels=Object.values(id[3]);

        if (selectedOption===id_value){
            //console.log (id)
            var id_data=[id_value, otu_ids, sample_values, otu_labels]
            console.log(id_data) 
            function init() {
                data = [{
                   x: id_data[1],
                   y: id_data[2],
                   text: id_data[3],
                   mode: "markers",
                   marker:{
                       size:id_data[2],
                       color:id_data[1] 
                   }
                   
               }];

               var layout = {
                title: "Bacteria Cultures Per Sample",
              };

                 var CHART = d3.selectAll("#bubble").node();
               
                 Plotly.newPlot(CHART, data,layout);
               }
               
               init()           
            }
            else {
                console.log("false");
            }            
        });
    });
};

bubblechar()






// /**
//  * samples (object of 4 arrays)
//  * index 0 - id
//  * index 1 - otu_ids
//  * index 2 - sample_values
//  * index 3 - otu_labels
//  */

 
// d3.json("data/samples.json").then(function(data) {
//    // retrieve the data for each id
//     var samples =Object.values(data.samples);
//     // console.log(samples)
//     samples.forEach((i)=>{
//         var id=Object.values(i); // for each i
//         console.log (id);
//         //retrieve id
//         var id_value=id[0];
//         //print the result
//         console.log(id_value);
//         //retrieve otu_ids
//         var otu_ids=Object.values(id[1]);
//         // Slice the first 10 objects for plotting
//         var slicedOtu_ids = otu_ids.slice(0, 10);
//         //print the result
//         console.log (slicedOtu_ids);
//         //retrieve sample_values
//         var sample_values=Object.values(id[2]);
//         // Slice the first 10 objects for plotting
//         var slicedSample_values = sample_values.slice(0, 10);
//         //print the result
//         console.log (slicedSample_values);
//         //retrieve otu_labels
//         var otu_labels=Object.values(id[3]);
//         // Slice the first 10 objects for plotting
//         var slicedOtu_labels = otu_labels.slice(0, 10);
//         //print the result
//         console.log (slicedOtu_labels);
//      });  
// });

// // // We will set a funtion to get the data when an option is selected
// function getData() {
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var id = dropdownMenu.property("value");
//     // Initialize an empty array for the country's data
//     var id_data = [];
  
//     if (id == id_value) {
//         id_data = 1;
//     }
//     else  {
//         id_data = 0;
//     }
    
//   }





//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.