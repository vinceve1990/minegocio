<?php
    /*Ataques CSRF: Cross-Site Request Forgery*/
    class validacionTokenAcceso
    {
        private $controlador;
        public $token;
        public $tokenKey;

        function __construct($controlador)
        {
            $this->controlador = $controlador;

            $this->creacionToken();

            $this->creacionTokenKey();
        }

        public function creacionToken() {
            $controlador = str_split($this->controlador);

            foreach ($controlador as $key => $val) {
                $this->token .= $controlador[$key];
            }

            $this->token .= md5(uniqid(mt_rand(), true));
        }

        public function creacionTokenKey() {
            $key = openssl_random_pseudo_bytes(32); // Generar una clave aleatoria de 32 bytes

            // Convertir la clave a una representación legible (opcional)
            $key = bin2hex($key);

            $this->tokenKey = $key;
        }
    }
?>