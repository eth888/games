<?php

  $address="";
  if(isset($_REQUEST['address']))
    $address = $_REQUEST['address'];

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>ETH888 --- Ethereum Casino</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/cover.css" rel="stylesheet">

  </head>

  <body>
  
    <div class="modal fade" id="hashModal" tabindex="-1" role="dialog" aria-labelledby="hashModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Provably fair information</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            
            <div class="container-fluid">
                
                <div class="row" style="padding-bottom: 10px;">
                  <div class="col-md-12">Server seed hash (H)</div>
                </div>
                <div class="row">
                  <div class="col-md-12"><input type="text" value="" class="form-control" id="seedHash" readonly="true"></div>
                </div>
                <div class="row" style="padding-bottom: 30px;">
                  <div class="col-md-12"><button type="button" class="btn btn-default btn-block" data-clipboard-target="#seedHash">Copy</button></div>
                </div>

                <div class="row" style="padding-bottom: 10px;">
                  <div class="col-md-12">Server seed (S)</div>
                </div>
                <div class="row">
                  <div class="col-md-12"><input type="text" value="" class="form-control" id="serverSeed" readonly="true"></div>
                </div>
                <div class="row" style="padding-bottom: 30px;">
                  <div class="col-md-12"><button type="button" class="btn btn-default btn-block" data-clipboard-target="#serverSeed">Copy</button></div>
                </div>

                <div class="row" style="padding-bottom: 10px;">
                  <div class="col-md-12">Player seed (U)</div>
                </div>
                <div class="row">
                  <div class="col-md-12"><input type="text" class="form-control" id="playerSeed" readonly="true"></div>
                </div>
                <div class="row" style="padding-bottom: 30px;">
                  <div class="col-md-12"><button type="button" class="btn btn-default btn-block" data-clipboard-target="#playerSeed">Copy</button></div>
                </div>

                <div class="row" style="padding-bottom: 10px;">
                  <div class="col-md-6">Stake</div>
                  <div class="col-md-6"># of lines</div>
                </div>
                <div class="row">
                  <div class="col-md-6"><input type="text" class="form-control" id="stake" readonly="true"></div>
                  <div class="col-md-6"><input type="text" class="form-control" id="lines" readonly="true"></div>
                </div>
                <div class="row" style="padding-bottom: 30px;">
                  <div class="col-md-6"><button type="button" class="btn btn-default btn-block" data-clipboard-target="#stake">Copy</button></div>
                  <div class="col-md-6"><button type="button" class="btn btn-default btn-block" data-clipboard-target="#lines">Copy</button></div>
                </div>

                <div class="row" style="padding-top: 10px;">
                  <div class="col-md-12"><a href="https://jsbin.com/lanowam/edit?html,js,output" target="_blank" type="button" class="btn btn-info btn-block">Verify</a></div>
                </div>

                <div class="row" style="padding-top: 10px;">
                  <div class="col-md-12"><a id="etherScanLink1" href="#" target="_blank" type="button" class="btn btn-default btn-block">Etherscan (betting)</a></div>
                </div>
                <div class="row" style="padding-top: 10px;">
                  <div class="col-md-12"><a id="etherScanLink2" href="#" target="_blank" type="button" class="btn btn-default btn-block">Etherscan (payout)</a></div>
                </div>                

            </div>

          </div>

          <div class="modal-footer" style="text-align: center;">            
            <button id="closeButton" type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


    <div class="site-wrapper">

      <div class="site-wrapper-inner">

        <div class="cover-container">

          <div class="cover-headning">
            <h3>Game Transaction Records</h3>
            <h6 style="margin-left: auto;margin-right: auto;"><?php echo $address; ?></h6>
          </div>

          

          <table class="table table-striped">
            <thead>
              <tr>
                <th style="text-align: center;">#</th>                            
                <th style="text-align: center;">Stake</th>
                <th style="text-align: center;"># of lines</th>
                <th style="text-align: center;">Payout</th>
                <th style="text-align: center;">Date</th>
                <th style="text-align: center;">Time</th>
                <th style="text-align: center;">Verify</th>      
              </tr>        
            </thead>
            <tbody id="recordList">              
            </tbody>
          </table>

          <div>
            <div class="inner">
              <p><a href="https://getbootstrap.com">ETH888</a>, 2018</p>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!--
    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
    <script>window.jQuery || document.write('<script src="js/jquery.min.js"><\/script>')</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    -->
    
    <script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/clipboard.min.js"></script>

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug 
    <script src="js/ie10-viewport-bug-workaround.js"></script>
    -->

    <script type="text/javascript">

    var records = null;

    $(document).ready(function() {

      new Clipboard('.btn');

      $('a.open-modal').click(function(event) {
        $(this).modal({
          fadeDuration: 250
        });
        return false;
      });


      $.getJSON( "getRecords.php?address=<?php echo $address; ?>", function(data) {

        records = data;

        for(var i = 0; i < data.length; i++)
        {
          var row = data[i];

          //console.log('element: ' + element);
          $('#recordList').append(element);                  

          var element = '<tr><th scope="row">' + (i + 1) + '</th><td>' + row['amount'] + '</td><td>' + row['lines'] + '</td><td>' + row['payout'] + '</td><td>' + row['date'] + '</td><td>' + row['time'] + '</td><td><a href="#" onclick="onPopUp(' + i + ')"><i class="fa fa-check-square-o" style="font-size:24px"></i></a></td></tr>';
        }

      }); 
      
    });
    
    function onPopUp(index)
    {
      var data = records[index];

      $('#hashModal').find('#seedHash').val(data['seedHash']);
      $('#hashModal').find('#serverSeed').val(data['serverSeed']);
      $('#hashModal').find('#playerSeed').val(data['playerSeed']);
      $('#hashModal').find('#stake').val(data['amount']);
      $('#hashModal').find('#lines').val(data['lines']);

      var etherscanURL = 'https://ropsten.etherscan.io/tx/';
      $('#hashModal').find('#etherScanLink1').attr('href', etherscanURL + data['tx']);

      if(data['payout'] > 0)
      {
        $('#hashModal').find('#etherScanLink2').attr('disabled', false);
        $('#hashModal').find('#etherScanLink2').attr('href', etherscanURL + data['settlementTX']);
      }
      else
      {
        $('#hashModal').find('#etherScanLink2').attr('disabled', true);
      }

      $('#hashModal').modal('show');
    }

    </script>

  </body>
</html>
