<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>ZWT PROJECT BASE</title>
<script src="bil/jquery-1.9.1.min.js" type="text/javascript"></script>
<?php

$path = array("./");//文件夹名
function tolist($paths,$hj){
	foreach($paths as $val){
		$dir_handle = @opendir($val) or die("没有此 $val 目录");
		$nohj=explode("/",$hj);
		while ($file = readdir($dir_handle)){	
			$myf=str_replace( '.' . pathinfo($file,PATHINFO_EXTENSION), '',$file);
			$nof="bil/phpMyAdmin/appserv";
			$nofs=explode("/",$nof);
			if (!in_array(pathinfo($file,PATHINFO_EXTENSION),$nohj)){
				if(!in_array($myf,$nofs)){
					$myfw=strtoupper(substr($myf,0,4));
					$num='';
					for($i=0;$i<6;$i++){@$num .=dechex(rand(0,15));}
					echo "<div class='prolist trn'><a href='/$file' class='trn'><div class='prolist_i' style='color:#".$num."'>".$myfw."</div><label>".$myf. "</label></a></div>";
				}
			}
		
		}
	}
	closedir($dir_handle);
}

?>
<link href="bil/beas.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="zwt_logo"><img src="bil/images/ZWT PROJECT BASE2.png"></div>
<div class="zwt_prolist box12">
<?php tolist($path,"rar/php");?>
<div class="clear"></div>
</div>
</body>

</html>
