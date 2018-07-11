
<?php



  $userName = array('吴琪'=>19,'李彦恢'=>27);


  $a= each($userName);

 // echo $a['key'];

    //创建一个类
   class Computer {

     private  $name= '联想';

     public function run(){
         echo $this->name;
     }


   }


   $a = new Computer();

   echo $a->run();




?>