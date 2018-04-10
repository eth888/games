<?php

$url = "http://[off-chain network ip]/getRecords-dapp1.php?".$_SERVER['QUERY_STRING'];

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