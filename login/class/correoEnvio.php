<?php
	class correoEnvio extends ConectarH
	{
		private $sqlConnect;
		//private int $val = 0;
		//private String $mensaje = "";
		//private String $errorClass = "";

		function __construct()
		{}

		public function VerificarCorreo($param, $sqlConnect = '')
		{
			$sql = <<<EOT
				SELECT
					COUNT( id_persona_PK ) AS existe
				FROM
					personas a
					INNER JOIN usuarios b ON a.id_persona_PK = b.id_persona_FK
				WHERE a.correo = '$param->usuario'
EOT;
			$this->sqlConnect = parent::conexionInterna($sqlConnect);
	        $query = $this->sqlConnect->query($sql);

	        $row = $query->fetch_object()->existe;

	        return $row;
		}

		public function enviarCorreo($param, $sqlConnect = '')
		{
			$firma = "Hola Firma";

			$correo = 'efraceve@gmail.com';

			$mail = new PHPMailer();
            $mail->CharSet = 'UTF-8';
            $mail->IsSMTP(); // telling the class to use SMTP
            $body = $firma;
            $mail->Host = "smtp.gmail.com"; // sets GMAIL as the SMTP server
            $mail->Port = 587; // set the SMTP port for the GMAIL server
            $mail->SMTPSecure = "tls"; // sets the prefix to the servier
            $mail->SMTPAuth = true; // enable SMTP authentication
            $mail->Username = "soporteespresso@gmail.com"; // GMAIL username
            $mail->Password = "siyozqeggsrqvjxn"; // GMAIL password
            $mail->SetFrom($correo, 'PROCESO DE RECUPERACION'); //
            $mail->Subject = 'CONTRASEÑA';
            $mail->AltBody = $body; // optional, comment out and test
            $mail->isHTML(true); // Indicamos que el correo va a ser HTML.
            $mail->MsgHTML($body);
            $mail->AddAddress($correo);
            $mail->AddBCC($correo);
            //foreach ($objectArchivoAdjunto as $key => $value) {
              //  $mail->AddAttachment($value->rutaArchivo,$value->nombreArchivo);
            //}
            //echo "<pre>->";
            //print_r($mail->Send());

            if (!$mail->Send()) {
                $enviado = false;
            } else {
                $enviado = true;
            }
		}
	}
?>