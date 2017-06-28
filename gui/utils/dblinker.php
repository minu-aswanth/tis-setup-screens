<?php 
include 'config.php';
error_reporting(E_ALL ^ E_NOTICE);
function linkToTIS()
{
	
	$link=new PDO("mysql:host=localhost;dbname=tis",DB_USER,DB_PASSWORD,
               array(\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                        \PDO::ATTR_PERSISTENT => false,
                        \PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8mb4'
                    )
                );
    return $link;
	
}

function linkToUG405()
{
	
	$link=new PDO("mysql:host=localhost;dbname=ug405",DB_USER,DB_PASSWORD,
               array(\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                        \PDO::ATTR_PERSISTENT => false,
                        \PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8mb4'
                    )
                );
    return $link;
	
}
?>
