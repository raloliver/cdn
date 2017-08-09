 // CALCULOS


      function get_values(){
        var values = {};
        
        try{
            values["valor"] = 1000;
            values["periodo"] = 12;
            values["cdiatual"] = 10.41;
            values["percdi"] = 75;
        }catch(err){
          values = false;
        }
        return values;
      }

      function do_rdc(rdc){

            if(rdc.valor < 10000){
            var taxacdi = 84;
            }
            else if(rdc.valor >= 10000 && rdc.valor < 20000){
            var taxacdi = 85;
            }
            else if(rdc.valor >= 20000 && rdc.valor < 50000){
            var taxacdi = 87;
            }
            else if(rdc.valor >= 50000 && rdc.valor < 80000){
            var taxacdi = 89;
            }
            else if(rdc.valor >= 80000 && rdc.valor < 100000){
            var taxacdi = 92;
            }
            else if(rdc.valor >= 100000 && rdc.valor < 250000){
            var taxacdi = 95;
            }
            else if(rdc.valor >= 250000 && rdc.valor < 500000){
            var taxacdi = 97;
            }
            else if(rdc.valor >= 500000 && rdc.valor < 1000000){
            var taxacdi = 99;
            }
            else if(rdc.valor >= 1000000){
            var taxacdi = 100;
            }

            taxacdi = taxacdi/100;

            var sobra = 10.00/100;
            var cdimedio = 14/100;

            if(rdc.periodo <= 6){
            var ir = 22.5;
            }
            else if(rdc.periodo >= 6 && rdc.periodo <= 12){
            var ir = 20;
            }
            else if(rdc.periodo > 12 && rdc.periodo < 24){
            var ir = 17.5;
            }
            else if(rdc.periodo >= 24){
            var ir = 15;
            }

            ir = ir/100;

            var cdiatual = 10.14 / 100;

            var percentualCdi1 = taxacdi * cdiatual;
            //percentualCdi1 = percentualCdi1 * 100;
            var percentualCdi2 = sobra * cdimedio;
            //percentualCdi2 = percentualCdi2 * 100;

            var mensal1 = Math.pow(1+percentualCdi1,(1/12))-1;
            //mensal1 = mensal1 * 100;
            var mensal2 = (percentualCdi2/12)*rdc.periodo;
            //mensal2 = mensal2 * 100;

            var totalSobra = rdc.valor * percentualCdi2;

            var totalBruto1 = rdc.valor*Math.pow(1+mensal1, rdc.periodo);
            var totalBruto2 = (totalSobra/12)*rdc.periodo;

            var irpago = (totalBruto1 - rdc.valor) * ir;

            var valorfinal = totalBruto1 - irpago;

            var totalGanhoPor = (valorfinal - rdc.valor)/rdc.valor;
            var totalSobraPor = mensal2;

            var totalGanho = valorfinal - rdc.valor;
            var totalSobra = totalBruto2;

            var total = totalGanho + totalSobra;

            percentualCdi1 = percentualCdi1 * 100;
            percentualCdi2 = percentualCdi2 * 100;
            mensal1 = mensal1 * 100;
            mensal2 = mensal2 * 100;
            totalGanhoPor = totalGanhoPor * 100;
            totalSobraPor = totalSobraPor * 100;

            var totalSobra = ((sobra*cdimedio)/12*rdc.periodo) * rdc.valor;
            var totalPor = totalGanhoPor + totalSobraPor;

            valorfinal += totalSobra;
            taxacdi = taxacdi*100;

            totalBruto1 -= rdc.valor;

            var res = {};
            res["taxacdi"] = taxacdi;
            res["percentualCdi1"] = percentualCdi1;
            res["totalBruto1"] = totalBruto1;
            res["irpago"] = irpago;
            res["totalSobra"] = totalSobra;
            res["total"] = total;

            return res;
      }


      function do_lci(lci){
       
          var taxacdi = 73/100;

          var ir = 0.0;

          var cdiatual = 10.14 / 100;

          var percdi = lci.percdi/100;

          var percentualCdi1 = percdi * cdiatual;

          var mensal1 = Math.pow(1+percentualCdi1,(1/12))-1;

          var totalBruto1 = lci.valor*Math.pow(1+mensal1, lci.periodo);

          var irpago = (totalBruto1 - lci.valor) * ir;

          var valorfinal = totalBruto1 - irpago;

          var total = (valorfinal - lci.valor)/lci.valor;

          var ganho = valorfinal - lci.valor;

          var sobras = 0.0;

          total = total * 100;
          percentualCdi1 = percentualCdi1 * 100;

          percdi = percdi *100;

          var res = {};
            res["percdi"] = percdi;
            res["total"] = total;
            res["ganho"] = ganho;
            res["irpago"] = irpago;
            res["sobras"] = sobras;
            res["valorfinal"] = valorfinal;

            return res;
      }

      function do_poupanca(poupanca){
       
          var taxacdi = 73/100;

          var ir = 0.0;

          var rende = 0.005;

          var percentualCdi1 = 1.2 / 100;

          var cdiatual = 10.14 / 100;

          var mensal1 = Math.pow(1+percentualCdi1,(1/12))-1;

          var valorfinal = (poupanca.valor*Math.pow(1+mensal1, poupanca.periodo)) + (poupanca.valor*Math.pow(1+rende, poupanca.periodo)) - poupanca.valor;

          var total = (valorfinal - poupanca.valor)/poupanca.valor;

          var ganho = valorfinal - poupanca.valor;

          var sobras = 0.0;

          total = total * 100;
          percentualCdi1 = percentualCdi1 * 100;
          rende = rende * 100;

          var percdi = total/((cdiatual/12)*poupanca.periodo);

          var res = {};
            res["percdi"] = percdi;
            res["total"] = total;
            res["ganho"] = ganho;
            res["ir"] = ir;
            res["sobras"] = sobras;
            res["valorfinal"] = valorfinal;

            return res;

      }


      var values = get_values();
      var resRdc = do_rdc(values);
      var resLci = do_lci(values);
      var resPoupanca = do_poupanca(values);

      // GRÁFICO

      Chart.defaults.global.animationEasing = 'easeInOutQuad';
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.scaleOverride = true;
      Chart.defaults.global.scaleShowLabels = false;
      Chart.defaults.global.ShowToolTipTitle = false;
      Chart.defaults.global.scaleSteps = 10;
      Chart.defaults.global.scaleStepWidth = 10;
      Chart.defaults.global.scaleStartValue = 0;
      Chart.defaults.global.tooltipFontFamily = 'Open Sans';
      Chart.defaults.global.tooltipFillColor = '#ccc';
      Chart.defaults.global.tooltipFontColor = '#034b50';
      Chart.defaults.global.tooltipCaretSize = 1;
      Chart.defaults.global.maintainAspectRatio = true;

      Chart.defaults.Line.scaleShowHorizontalLines = false;
      Chart.defaults.Line.scaleGridLineColor = '#1b1129';
      Chart.defaults.Line.scaleLineColor = '#1b1129';
      Chart.defaults.Line.bezierCurve = false;
      Chart.defaults.Line.scaleFontColor = "#034b50";

      Chart.defaults.Doughnut.segmentShowStroke = false;

      var randomScalingFactor = function() {
            return Math.round(Math.random() * 100)
      };

      
      var vetor = [];
      for (var i = 1; i <= values.periodo; i++) {
            vetor.push("MÊS "+i);
      }

      var lineChartData = {
            labels: vetor,
            datasets: [

                  {
                        label: "My Second dataset",
                        fillColor: "transparent",
                        strokeColor: "#00afa1",
                        pointColor: "#00afa1",
                        pointStrokeColor: "#00afa1",
                        pointHighlightFill: "#00afa1",
                        pointHighlightStroke: "#00afa1",
                        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
                  }, {
                        label: "My Second dataset",
                        fillColor: "transparent",
                        strokeColor: "#aaa",
                        pointColor: "#aaa",
                        pointStrokeColor: "#aaa",
                        pointHighlightFill: "#aaa",
                        pointHighlightStroke: "#aaa",
                        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
                  }, {
                        label: "My Second dataset",
                        fillColor: "transparent",
                        strokeColor: "#034b50",
                        pointColor: "#034b50",
                        pointStrokeColor: "#034b50",
                        pointHighlightFill: "#034b50",
                        pointHighlightStroke: "#034b50",
                        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
                  }
            ]

      }

      window.onload = function() {
            var ctx = document.getElementById("chart").getContext("2d");
            window.myLine = new Chart(ctx).Line(lineChartData);
      }

      var pieData = [{
            value: resCdi.percentualCdi1,
            color: "#00afa1",
      }, {
            value: 100-resCdi.percentualCdi1,
            color: "#ddd",
      }];

      var context = document.getElementById('doug1').getContext('2d');
      var skillsChart = new Chart(context).Doughnut(pieData);

      var pieData = [{
            value: resLci.total,
            color: "#aaa",
      }, {
            value: randomScalingFactor(),
            color: "#ddd",
      }];

      var context = document.getElementById('doug2').getContext('2d');
      var skillsChart = new Chart(context).Doughnut(pieData);

      var pieData = [{
            value: randomScalingFactor(),
            color: "#034b50",
      }, {
            value: randomScalingFactor(),
            color: "#ddd",
      }];

      var context = document.getElementById('doug3').getContext('2d');
      var skillsChart = new Chart(context).Doughnut(pieData);

      var pieData = [{
            value: randomScalingFactor(),
            color: "#00afa1",
      }, {
            value: randomScalingFactor(),
            color: "#034b50",
      }];

      //var context = document.getElementById('doug4').getContext('2d');
      //var skillsChart = new Chart(context).Doughnut(pieData);
