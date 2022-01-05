(function($) {
    "use strict";

	/*---ChartJS ---*/
	var ctx = document.getElementById("chart");
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["M", "T", "W", "TH", "F", "SA", "S"],
			type: 'line',
			datasets: [{
				label: "Sales",
				data: [10, 60, 30, 90, 120, 76, 35],
				backgroundColor: 'transparent',
				borderColor: '#6512ae',
				borderWidth: 3,
				pointStyle: 'circle',
				pointRadius: 5,
				pointBorderColor: 'transparent',
				pointBackgroundColor: '#6512ae',

			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: '#000',
				bodyFontColor: '#000',
				backgroundColor: '#fff',
				cornerRadius: 3,
				intersect: false,
			},
			legend: {
				display: false,
				labels: {
					usePointStyle: true,
					fontFamily: 'Montserrat',
				},
			},
			scales: {
				xAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.5)",
					 },
					display: true,
					gridLines: {
						display: true,
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'Month',
						fontColor: 'rgba(0,0,0,0.61)'
					}
				}],
				yAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.5)",
					 },
					display: true,
					gridLines: {
						display: true,
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'sales',
						fontColor: 'rgba(0,0,0,0.61)'
					}
				}]
			},
			title: {
				display: false,
				text: 'Normal Legend'
			}
		}
	});
	/*---ChartJS (#sales-chart) closed---*/

	/*---- morrisBar4----*/
	new Morris.Bar({
	  element: 'morrisBar4',
	  height:100,
	  data: [
		{x: 'M', y: 7},
		{x: 'T', y: 3},
		{x: 'W', y: 6},
		{x: 'TH', y: 8},
		{x: 'F', y: 4},
		{x: 'SA', y: 2},
		{x: 'S', y: 9},
	  ],
	  xkey: 'x',
	  ykeys: ['y'],
	  labels: ['Y'],
	  barColors: function (row, series, type) {
		if (type === 'bar') {
		  var red = Math.ceil(0 * row.y / this.ymax);
		  return '#f2574c';
		}
		else {
		  return '#000';
		}
	  }
	});


	//Team chart
    var ctx = document.getElementById( "team-chart" );
	 ctx.height = 185;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: [ "M", "T", "W", "TH", "F", "SA", "S" ],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [ {
                data: [ 0, 7, 3, 5, 2, 10, 7 ],
                label: "Task",
                backgroundColor: 'rgb(242,170,76,0.2)',
                borderColor: 'rgba(242,170,76,0.5)',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(242,170,76,0.5)',
                    }, ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },


            },
            scales: {
                xAxes: [ {
                    display: true,
                    gridLines: {
                        display: true,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                        } ],
                yAxes: [ {
                    display: true,
                    gridLines: {
                        display: true,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Value'
                    }
                        } ]
            },
            title: {
                display: false,
            }
        }
	 } );


	 //bar chart
    var ctx = document.getElementById( "barChart" );
    ctx.height = 180;
    var myChart = new Chart( ctx, {
        type: 'bar',
        data: {
            labels: [ "2012", "2013", "2014", "2015", "2016", "2017", "2018" ],
            datasets: [
                {
                    label: "New Customer",
                    data: [ 65, 59, 80, 81, 56, 55, 40 ],
                    borderColor: "rgb(87,76,242,0.9)",
                    borderWidth: "1",
                    backgroundColor: "rgba(87,76,242, 0.9)"
                            },
                {
                    label: "Returning Customer",
                    data: [ 28, 48, 40, 19, 86, 27, 90 ],
                    borderColor: "rgb(242,87,76,0.9)",
                    borderWidth: "1",
                    backgroundColor: "rgba(242,87,76,0.9)"
                            }
                        ]
        },
        options: {
            scales: {
                yAxes: [ {
                    ticks: {
                        beginAtZero: true
                    }
                                } ]
            }
        }
    } );

})(jQuery);

