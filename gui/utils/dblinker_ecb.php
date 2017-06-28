<?php 
error_reporting(E_ALL ^ E_NOTICE);
function linkToTIS()
{
	
	include 'config.php';
    $link=new PDO("mysql:host=localhost;dbname=ecb",DB_USER,DB_PASSWORD,
               array(\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                        \PDO::ATTR_PERSISTENT => false,
                        \PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8mb4'
                    )
                );
    return $link;
	    
}
?>
