<?php

$url = "http://[off-chain network ip]/submitBet.php?port=[off-chain network port]&".$_SERVER['QUERY_STRING'];
//$url = "http://localhost:8081/?".$_SERVER['QUERY_STRING'];

$curl_handle=curl_init();
  curl_setopt($curl_handle,CURLOPT_URL, $url);
  curl_setopt($curl_handle,CURLOPT_CONNECTTIMEOUT,2);
  curl_setopt($curl_handle,CURLOPT_RETURNTRANSFER,1);
  $buffer = curl_exec($curl_handle);
  curl_close($curl_handle);
  if (!empty($buffer)){

      print $buffer;
  }

?>