
<?php
    
        $UserName = $_POST["name"];
        $UserEmail =$_POST["email"];

        $subject = "Welcome To MyVibe \u{2764}";
        $message = file_get_contents("all.html");  
    
        $headers  = 'MIME-Version: 1.0' . "\r\n";//for html body 
        $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";//for html body
        $headers .= 'From:myvibemakeup@gmail.com '. "\r\n";

        echo "email sent! from PHP";

        if (mail($UserEmail, $subject, $message, $headers)) {
            echo "\nEmail successfully sent to $UserEmail...";
            echo "<script>console.log('email sent!');</script>";
        } else {
            echo "Email failed to send. ";
        }
        
    
   

    //echo "Hi, " . $UserName . "We will send an eamil to " . $UserEmail . " shortly. ";
   
?>