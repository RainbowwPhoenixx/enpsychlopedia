import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Based on the example at https://d3-graph-gallery.com/graph/heatmap_style.html

const metadata = await (await fetch("./data/meta.json")).json()

const x_labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const y_labels = metadata.seasons.map(s => s.name);

// set the dimensions and margins of the graph
const margin = { top: 20, right: 20, bottom: 0, left: 50 },
    square_size = 30,
    width = square_size * x_labels.length - margin.left - margin.right,
    height = square_size * y_labels.length - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Build X scales and axis:
    const x = d3.scaleBand()
        .range([0, width])
        .domain(x_labels)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 15)
        .attr("transform", `translate(0, -15)`)
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    const y = d3.scaleBand()
        .range([0, height])
        .domain(y_labels)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

async function set_page_vis(gag_info) {

    var description = d3.select("#description").html(gag_info.description);

    // Convert raw data into :
    // data[season][episode] = list of instances of gag;
    var data = {};
    for (const [idx, season_name] of y_labels.entries()) {
        data[season_name] = Array.from({length: metadata.seasons[idx].episodes}, () => []);
    }

    await d3.csv(gag_info.file, (d) => {
        data[metadata.seasons[+d.season-1].name][+d.episode-1].push({
            timestamp: d.timestamp,
            quality: +d.quality,
            description: d.description
        })
    })
        
    var color_scale = d3.scaleLinear()
        .domain([0, 10])
        .range([gag_info.low_color, gag_info.high_color])
    
    svg.selectAll("rect").remove()
    
    for (const season in data) {
        for (const episode in data[season]) {
            const ep_data = data[season][episode];
            
            
            if (ep_data.length > 0) {
                const quality = gag_info.type === "highest" ? ep_data[0].quality : ep_data.length;
                
                svg.append("rect")
                    .attr("x", x(+episode+1))
                    .attr("y", y(season))
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("width", x.bandwidth())
                    .attr("height", y.bandwidth())
                    .classed("selectable", true)
                    .style("fill", color_scale(quality))
                    .style("opacity", 0.8)
                    .on("click", () => description.html(ep_data[0].description))
            } else {
                svg.append("rect")
                    .attr("x", x(+episode+1))
                    .attr("y", y(season))
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("width", x.bandwidth())
                    .attr("height", y.bandwidth())
                    .style("fill", "darkgrey")
                    .style("opacity", 0.8)
            }
        }
    }
}

document.querySelectorAll(".sidebar li").forEach(element => {
    element.addEventListener("click", () => {
        var gag_tag = element.getAttribute("data");
        if (gag_tag) {
            set_page_vis(metadata.gags[gag_tag]);
        }
    });
});

set_page_vis(metadata.gags.pineapples)
