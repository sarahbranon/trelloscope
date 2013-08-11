var renderCardGraph = function(cardData) {
  $('#graphContainer').highcharts({
    chart: {
      alignTicks: false,
      plotBorderWidth: 2, // *inside* border for entire area
      plotBorderColor: '#C0D0E0'
    },
    series: [
      {
        name: 'Cards created',
        data: cardData,
        id: 'dataseries',
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 4
          }
        }
      }
    ],
    title: {
      text: "Cards Created"
    },
    tooltip: {
      style: {
        width: 250
      },
      formatter: function(){
        return ''+Highcharts.dateFormat('%b %e, %Y', this.x)+'<br/>'+"Cards created:<br/>"+this.point.cardName;
      }
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: [
      {
        title: null,
        labels: {
          enabled: false
        }
      }
    ],
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    }
  });
};