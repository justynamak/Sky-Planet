<?php
/**
 * @author mati
 */

require_once(__DIR__.'/DB.php');
require_once(__DIR__.'/utils.php');

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$request = new Request();

$pageLimit = $request->getParam('pageLimit', 7);
$page = ($request->getParam('page', 0) - 1); 
$count = 0;
$maxPages = 0;

$query = "SELECT COUNT(id) AS count FROM products";

try {
    
    $row = DB::getRow($query, array());
    $count = $row['count'];
    
} catch (Exception $e) {

    $data = array(
        
        'error'     => true,
        'message'   => $e->getMessage(),
    );
    
    die(json_encode($data));
}

$maxPages = floor($count / $pageLimit);

if ($page >= $maxPages) {
    
    $page = $maxPages;
    
} elseif ($page < 0) {
    
    $page = 0;
}

$query = "SELECT * FROM products LIMIT :limit OFFSET :offset";

$products   = array();
$error      = false;
$message    = 'OK';

try {
  
    $products = DB::getAll($query, array(
        
        'limit'     => $pageLimit,
        'offset'    => ($page * $pageLimit),
    ));
    
} catch (Exception $e) {
    
    $error = true;
    $message = $e->getMessage();
}

$data = array(
    
    'page'      => ++$page,
    'maxPages'  => ++$maxPages,
    'pageLimit' => $pageLimit,
    'products'  => $products,
    'error'     => $error,
    'message'   => $message,
);

die(json_encode($data));