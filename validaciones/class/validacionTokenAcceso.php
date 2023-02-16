<?php
    /*Ataques CSRF: Cross-Site Request Forgery*/
    class validacionTokenAcceso
    {
        private $controlador;
        private $metodo;
        public $token;

        function __construct($controlador, $metodo)
        {
            $this->controlador = $controlador;
            $this->metodo = $metodo;

            $this->creacionToken();
        }

        public function creacionToken() {
            $controlador = str_split($this->controlador);
            $metodo = str_split($this->metodo);

            foreach ($controlador as $key => $val) {
                $this->token .= $controlador[$key];

                if(isset($metodo[$key])) {
                    $this->token .= $metodo[$key];
                }
            }

            $this->token .= md5(uniqid(mt_rand(), true));
        }
    }
?>