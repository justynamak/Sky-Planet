<?php
/**
 * @author mati
 */
class DB {
    
    # Localhost config
    const TYPE = '__SECRET__';
    const HOST = '__SECRET__';
    const LOGIN = '__SECRET__';
    const PASSWORD = '__SECRET__';
    const DATABASE = '__SECRET__';
    
    /**
     * @var PDO
     */
    private static $pdo;
    
    /**
     * Connect to DB by PDO
     */
    private static function connect() {
        
        if (is_null(self::$pdo)) {
            
            $options = array(
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            );

            self::$pdo = new PDO(self::TYPE.':host='.self::HOST.';dbname='.self::DATABASE, self::LOGIN, self::PASSWORD, $options);
        }
    }
    
    /**
     * @return PDO
     */
    public static function getInstance() {
        
        self::connect();
        
        return self::$pdo;
    }
    
    public static function getRow($query, $data) {
        
        self::connect();
        
        $res = self::$pdo->prepare($query);
        $res->execute($data);
        
        return $res->fetch(PDO::FETCH_ASSOC);
    }
    
    public static function getAll($query, $data) {
        
        self::connect();
        
        $res = self::$pdo->prepare($query);
        $res->execute($data);
        
        return $res->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * @param string $query
     * @return PDOStatement
     */
    public static function query($query) {
        
        self::connect();
        
        return self::$pdo->query($query);
    }
}
