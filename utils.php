<?php
/**
 * @author mati
 */
class HashMapIterator implements Iterator {
    
    /**
     * @var array
     */
    private $elements = array();
    
    /**
     * @param array $elements
     */
    public function __construct($elements = array()) {
        
        $this->elements = $elements;
    }
    
    /**
     * @return array
     */
    public function current() {
        
        return current($this->elements);
    }

    /**
     * @return $string
     */
    public function key() {
     
        return key($this->elements);
    }

    /**
     * 
     */
    public function next() {
        
        next($this->elements);
    }

    /**
     * 
     */
    public function rewind() {
        
        reset($this->elements);
    }

    /**
     * @return boolean
     */
    public function valid() {
        
        return key($this->elements) !== null;
    }
}

/**
 * @author mati
 */
class HashMap implements Countable, IteratorAggregate {
    
    /**
     * @var array
     */
    private $data = array();

    /**
     * @param string $name
     * @param mixed $value
     */
    public function put($name, $value) {
        
        $this->data[$name] = $value;
    }
    
    /**
     * @param array $values
     */
    public function putAll($values = array()) {
        
        $this->data = $values;
    }
    
    /**
     * @param string $name
     * @return mixed
     */
    public function get($name) {
        
        if ($this->containsKey($name)) {
            
            return $this->data[$name];
        }
        
        return null;
    }
    
    /**
     * @return array
     */
    public function getAll() {
        
        return $this->data;
    }
    
    /**
     * @param string $name
     */
    public function remove($name) {
        
        if ($this->containsKey($name)) {
        
            unset($this->data[$name]);
        }
    }
    
    /**
     * 
     */
    public function removeAll() {
        
        $this->data = array();
    }
    
    /**
     * @param string $name
     * @return boolean
     */
    public function containsKey($name) {
        
        return array_key_exists($name, $this->data);
    }
    
    /**
     * @param mixed $value
     * @return boolean
     */
    public function containsValue($value) {
        
        foreach ($this->data as $element) {
            
            if ($element == $value) {
                
                return true;
            }
        }
        
        return false;
    }

    /**
     * @return integer
     */
    public function count() {
        
        return count($this->data);
    }

    /**
     * @return HashMapIterator
     */
    public function getIterator() {
        
        return new HashMapIterator($this->data);
    }
}

/**
 * @author mati
 */
class CollectionIterator implements Iterator {
    
    /**
     * @var array
     */
    private $elements = array();
    
    /**
     * @param array $elements
     */
    public function __construct($elements = array()) {
        
        $this->elements = $elements;
    }
    
    /**
     * @return array
     */
    public function current() {
        
        return current($this->elements);
    }

    /**
     * @return $string
     */
    public function key() {
     
        return key($this->elements);
    }

    /**
     * 
     */
    public function next() {
        
        next($this->elements);
    }

    /**
     * 
     */
    public function rewind() {
        
        reset($this->elements);
    }

    /**
     * @return boolean
     */
    public function valid() {
        
        return key($this->elements) !== null;
    }
}

/**
 * @author mati
 */
class Collection implements IteratorAggregate, Countable {
    
    /**
     * @var array
     */
    private $data = array();
    
    /**
     * @param mixed $value
     */
    public function addElement($value) {
        
        $this->data[] = $value;
    }
    
    /**
     * @return integer
     */
    public function count() {
        
        return count($this->data);
    }

    /**
     * @return CollectionIterator
     */
    public function getIterator() {
        
        return new CollectionIterator($this->data);
    }
}

/**
 * @author mati
 */
class Request {
   
    /**
     * @var HashMap
     */
    private $data;
    
    /**
     * 
     */
    public function __construct() {
        
        $this->data = new HashMap();
        
        foreach ($_POST as $key => $POST) {
            
            $this->data->put($key, $POST);
        }
        
        foreach ($_GET as $key => $GET) {
            
            $this->data->put($key, $GET);
        }
    }
    
    /**
     * @param string $name
     * @param mixed $valueIfNull
     */
    public function getParam($name, $valueIfNull = null) {
        
        $value = $this->data->get($name);
        
        if (!is_null($value)) {
            
            return $value;
        }
        
        return $valueIfNull;
    }
    
    /**
     * @param type $name
     * @param type $value
     */
    public function addParam($name, $value) {
        
        $this->data->put($name, $value);
    }
}