<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods:PUT,DELETE');
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app = new \Slim\App;


//function for display all entity

function displayAll($table){

    $sql = "SELECT * FROM $table";

    try{
        //Get the DB object
        $db = new db();
        //connct call
        $db = $db->connect();

        $stmt = $db->query($sql);
        $display = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($display);

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
}

//function for display single entity

function displaySingle($table,$id,$tableId){
    
    $sql = "SELECT * FROM $table WHERE $tableId=$id";

    try{
        //Get the DB object
        $db = new db();
        //connct call
        $db = $db->connect();

        $stmt = $db->query($sql);
        $display = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($display);

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
}

//function for deleteing the entity

function deleteSingle($table,$id,$tableId){
    $sql = "DELETE FROM $table WHERE $tableId=$id";

    try{
        //Get the DB object
        $db = new db();
        //connct call
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo '{"notice":{"text":"Entity deleted"}';

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
}




//for get all users

$app->get('/api/users', function (Request $request, Response $response) {
    displayAll('user');
});

//for get single user

$app->get('/api/user/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    displaySingle('user',$id,'id');  
});

//Add user

$app->post('/api/user/add', function (Request $request, Response $response) {
    
    $username = $request->getParam('username');
    $password = $request->getParam('password');
    $name = $request->getParam('name');
    $age = $request->getParam('age');
    $mobile = $request->getParam('mobile');
    $email = $request->getParam('email');
    $qualification = $request->getParam('qualification');
    $intrest = $request->getParam('intrest');


    $sql = "INSERT INTO user (username,password,name,age,mobile,email,qualification,intrest) VALUES(:username,:password,:name,:age,:mobile,:email,:qualification,:intrest);";

    try{
        //Get the DB object
        $db = new db();
        //connct call
        $db = $db->connect();

       $stmt = $db->prepare($sql);

       $stmt->bindParam(':username',$username);
       $stmt->bindParam(':password',$password);
       $stmt->bindParam(':name',$name);
       $stmt->bindParam(':age',$age);
       $stmt->bindParam(':mobile',$mobile);
       $stmt->bindParam(':email',$email);
       $stmt->bindParam(':qualification',$qualification);
       $stmt->bindParam(':intrest',$intrest);

       $stmt->execute();
       echo '{"notice":{"text":"user Added"}';

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});


//Update user

$app->put('/api/user/update/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');


    $username = $request->getParam('username');
    $password = $request->getParam('password');
    $name = $request->getParam('name');
    $age = $request->getParam('age');
    $mobile = $request->getParam('mobile');
    $email = $request->getParam('email');
    $qualification = $request->getParam('qualification');
    $intrest = $request->getParam('intrest');
    $userImg = $request->getParam('userImg');

    $sql = "UPDATE user SET
                username = :username,
                password = :password,
                name = :name,
                age = :age,
                mobile = :mobile;
                email = :email,
                qualification = :qualification,
                intrest = :intrest,
                userImg = :userImg
                WHERE id=$id";

    try{
        //Get the DB object
        $db = new db();
        //connct call
        $db = $db->connect();

       $stmt = $db->prepare($sql);

       $stmt->bindParam(':username',$username);
       $stmt->bindParam(':password',$password);
       $stmt->bindParam(':name',$name);
       $stmt->bindParam(':age',$age);
       $stmt->bindParam(':mobile',$mobile);
       $stmt->bindParam(':email',$email);
       $stmt->bindParam(':qualification',$qualification);
       $stmt->bindParam(':intrest',$intrest);
       $stmt->bindParam(':userImg',$userImg);

       $stmt->execute();
       echo '{"notice":{"text":"user Upadted"}';

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

//for delete single user

$app->delete('/api/user/delete/{id}', function (Request $request, Response $response) {
    
    $id = $request->getAttribute('id');
    deleteSingle('user',$id,'id'); 
});









//for get all customers

$app->get('/api/customers', function (Request $request, Response $response) {
    displayAll('customers');
});

//for get only single customer

$app->get('/api/customer/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    displaySingle('customers',$id,'cstid');  
});

//for Adding customer

$app->post('/api/customer/add', function (Request $request, Response $response) {
    
    $username = $request->getParam('username');
    $password = $request->getParam('password');
    $name = $request->getParam('name');
    $brandname = $request->getParam('brandname');
    $email = $request->getParam('email');
    $intrest = $request->getParam('intrest');

    $sql = "INSERT INTO customers (username,password,name,brandname,email,intrest) VALUES(:username,:password,:name,:brandname,:email,:intrest);";

    try{
        //Get the DB object
        $db = new db();
        //connct call
        $db = $db->connect();

       $stmt = $db->prepare($sql);

       $stmt->bindParam(':username',$username);
       $stmt->bindParam(':password',$password);
       $stmt->bindParam(':name',$name);
       $stmt->bindParam(':brandname',$brandname);
       $stmt->bindParam(':email',$email);
       $stmt->bindParam(':intrest',$intrest);


       $stmt->execute();
       echo '{"notice":{"text":"Customer Added"}';

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

//for update the customer

$app->put('/api/customer/update/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');


    $username = $request->getParam('username');
    $password = $request->getParam('password');
    $name = $request->getParam('name');
    $brandname = $request->getParam('brandname');
    $email = $request->getParam('email');
    $intrest = $request->getParam('intrest');
    $userImg = $request->getParam('userImg');

    $sql = "UPDATE customers SET
                username = :username,
                password = :password,
                name = :name,
                brandname = :brandname,
                email = :email,
                intrest = :intrest,
                userImg = :userImg
                WHERE cstid=$id";

    try{
        //Get the DB object
        $db = new db();
        //connect call
        $db = $db->connect();

       $stmt = $db->prepare($sql);

       $stmt->bindParam(':username',$username);
       $stmt->bindParam(':password',$password);
       $stmt->bindParam(':name',$name);
       $stmt->bindParam(':brandname',$brandname);
       $stmt->bindParam(':email',$email);
       $stmt->bindParam(':intrest',$intrest);
       $stmt->bindParam(':userImg',$userImg);


       $stmt->execute();
       echo '{"notice":{"text":"Cutomer Upadted"}';

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

//for delete single customer

$app->delete('/api/customer/delete/{id}', function (Request $request, Response $response) {
    
    $id = $request->getAttribute('id');
    deleteSingle('customers',$id,'cstid'); 
});



/*

//for get all posts

$app->get('/api/intrestpost', function (Request $request, Response $response) {
    displayAll('intrestpage');
});

//for get only single post

$app->get('/api/intrestpost/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    displaySingle('intrestpage',$id,'postid');  
});

//for adding the post

$app->post('/api/intrestpost/add', function (Request $request, Response $response) {
    
    $PPusername = $request->getParam('PPusername');
    $PPimg = $request->getParam('PPimg');
    $Postimg = $request->getParam('Postimg');
    $hits = $request->getParam('hits');


    $sql = "INSERT INTO intrestpage (PPusername,PPimg,Postimg,hits) VALUES(:PPusername,:PPimg,:Postimg,:hits);";

    try{
        //Get the DB object
        $db = new db();
        //connct call
        $db = $db->connect();

       $stmt = $db->prepare($sql);

       $stmt->bindParam(':PPusername',$PPusername);
       $stmt->bindParam(':PPimg',$PPimg);
       $stmt->bindParam(':Postimg',$Postimg);
       $stmt->bindParam(':hits',$hits);

       $stmt->execute();
       echo '{"notice":{"text":"Post Added"}';

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

//for delete post

$app->delete('/api/intrestpost/delete/{id}', function (Request $request, Response $response) {
    
    $id = $request->getAttribute('id');
    deleteSingle('intrestpage',$id,'postid'); 
});

//` display all intrest 
$app->get('/api/intrests', function (Request $request, Response $response) {
    displayAll('intrest');
});



*/







//for get all post data

$app->get('/api/posts', function (Request $request, Response $response) {
    displayAll('postpages');
});

//for get single user

$app->get('/api/post/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');
    displaySingle('postpages',$id,'postid');  
});

//Add post

$app->post('/api/post/add', function (Request $request, Response $response) {
    
    $pagename = $request->getParam('pagename');
    $postUserImg = $request->getParam('postUserImg');
    $postUserUsername = $request->getParam('postUserUsername');
    $postHits = $request->getParam('postHits');
    $postImg = $request->getParam('postImg');

    $sql = "INSERT INTO postpages (pagename,postUserImg,postUserUsername,postHits,postImg) VALUES(:pagename,:postUserImg,:postUserUsername,:postHits,:postImg);";

    try{
        //Get the DB object
        $db = new db();
        //connct call
        $db = $db->connect();

       $stmt = $db->prepare($sql);

       $stmt->bindParam(':pagename',$pagename);
       $stmt->bindParam(':postUserImg',$postUserImg);
       $stmt->bindParam(':postUserUsername',$postUserUsername);
       $stmt->bindParam(':postHits',$postHits);
       $stmt->bindParam(':postImg',$postImg);
  
       $stmt->execute();
       echo '{"notice":{"text":"post Added"}';

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});


// post upadate
$app->put('/api/post/update/{id}', function (Request $request, Response $response) {
    $id = $request->getAttribute('id');



    $postHits = $request->getParam('postHits');
   
   

    $sql = "UPDATE postpages SET
               
                postHits = :postHits
                
                WHERE postid=$id";

    try{
        //Get the DB object
        $db = new db();
        //connect call
        $db = $db->connect();

       $stmt = $db->prepare($sql);

       $stmt->bindParam(':postHits',$postHits);



       $stmt->execute();
       echo '{"notice":{"text":"post Upadted"}';

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});
//for delete single post

$app->delete('/api/post/delete/{id}', function (Request $request, Response $response) {
    
    $id = $request->getAttribute('id');
    deleteSingle('postpages',$id,'postid'); 
});
