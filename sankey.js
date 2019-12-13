'use strict';

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['sankey']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Count');
    data.addColumn({type: 'string', role: 'tooltip', p: { html: true }});
    data.addRows([
        ['Applications (52)', 'No Further Response (25)', 23, ''],
        ['Applications (52)', 'Rejection (19)', 15, ''],
        ['Applications (52)', 'Initial Phone Screen (13)', 13, ''],
        ['Applications (52)', 'Initial Technical Screen (1)', 1, ''],
        ['Initial Technical Screen (1)', 'No Further Response (25)', 1, ''],
        ['Initial Phone Screen (13)', 'No Further Response (25)', 1, ''],
        ['Initial Phone Screen (13)', 'Rejection (19)', 4, ''],
        ['Initial Phone Screen (13)', 'I Withdrew (7)', 3, withdrawPhoneScreenTT()],
        ['Initial Phone Screen (13)', 'Take-Home Coding Challenge (4)', 4, ''],
        ['Initial Phone Screen (13)', 'Remote Technical Interview (4)', 1, ''],
        ['Take-Home Coding Challenge (4)', 'I Withdrew (7)', 1, withdrawCodingChallTT()],
        ['Take-Home Coding Challenge (4)', 'Remote Technical Interview (4)', 3, ''],
        ['Remote Technical Interview (4)', 'I Withdrew (7)', 3, withdrawTechnicalTT()],
        ['Remote Technical Interview (4)', 'Onsite Interview (1)', 1, ''],
        ['Onsite Interview (1)', 'Offer (1)', 1, ''],
    ]);

    // I Withdrew detailing:
    function withdrawPhoneScreenTT() {
        return `Situation for withdrawing after initial phone screen:
            <ul>
                <li>1 = I withdrew due to bad fit</li>
                <li>2 = I withdrew but they had offered next steps</li>
            </ul>
        `
    };
    function withdrawCodingChallTT() {
        return `Situation for withdrawing after take-home coding challenge:
            <ul>
                <li>1 = I withdrew before they responded with a decision</li>
            </ul>
        `
    };
    function withdrawTechnicalTT() {
        return `Situation for withdrawing after remote technical interview:
            <ul>
                <li>3 = I withdrew but they had offered next steps</li>
            </ul>
        `
    };

    // Sets chart options.
    var options = {
        width: 1000,
        height: 700,
        tooltip: {
            isHtml: true,
        },
        sankey: {
            iterations: 500,
            link: {
                colorMode: 'gradient',
            },
            node: {
                label: {
                    fontSize: 14,
                    bold: true,
                },
                interactivity: true,
                // color palette from: http://colorbrewer2.org/#type=qualitative&scheme=Set3&n=11
                colors: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5'],
                width: 20,
                nodePadding: 40,
            },
        },
    };

    // Instantiates and draws our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('chart_div'));
    chart.draw(data, options);
}