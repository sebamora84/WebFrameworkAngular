<?php
echo "<p>".date("Y-m-d H:i:s");
$t= time()+3600;
echo "<p>".date("Y-m-d H:i:s",$t);
echo "<p>".date("Y-m-d H:i:s",time());
?>