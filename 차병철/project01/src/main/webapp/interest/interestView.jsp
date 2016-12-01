<%@page contentType="text/html; charset=utf-8" %>

<html>

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="interestView.css">
    <link rel="stylesheet" href="../fontello-51c93eec/css/close.css">
    <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'> </head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">

<body>
    <div id="container">
        <div class="row">
            <div class="col s12"><span class="flow-text">Input your detail info</span></div>
           <div class="input-field col s12">
                        <select>
                            <option value="" disabled selected>Age</option>
                            <option value="1">10</option>
                            <option value="2">20</option>
                            <option value="2">30</option>
                            <option value="2">40</option>
                            <option value="2">50</option>
                            <option value="2">60~</option>
                        </select>
                        <label>Age</label>
                    </div>
            <div class="input-field col s12">
                <select>
                    <option value="" disabled selected>Choose your gender</option>
                    <option value="1">Man</option>
                    <option value="2">Woman</option>
                </select>
                <label>gender</label>
            </div>
            <div class="input-field col s12">
                <select multiple>
                    <option value="" disabled selected>Choose your Interest</option>
                    <option value="2" data-icon="../image/card6.jpg" class="circle">Computer</option>
                    <option value="3" data-icon="../image/card1.jpg" class="circle">Coding</option>
                    <option value="3" data-icon="../image/card2.jpg" class="circle">job</option>
                    <option value="1" data-icon="../image/card3.jpg" class="circle">Computer</option>
                    <option value="2" data-icon="../image/card4.jpg" class="circle">Coding</option>
                    <option value="3" data-icon="../image/card5.jpg" class="circle">job</option>
                    <option value="1" data-icon="../image/card6.jpg" class="circle">Computer</option>
                    <option value="2" data-icon="../image/card7.jpg" class="circle">Coding</option>
                    <option value="3" data-icon="../image/card8.jpg" class="circle">job</option>
                    <option value="1" data-icon="../image/card9.jpg" class="circle">Computer</option>
                    <option value="2" data-icon="../image/card2.jpg" class="circle">Coding</option>
                    <option value="3" data-icon="../image/card3.jpg" class="circle">job</option>
                </select>
                <label>Interest</label>
            </div>
            <div class="col s6 offset-s6">
                <button class="btn waves-effect waves-light" id="register_btn">Register
                 <i class="material-icons right">send</i> 
            </button>
            </div>
        </div>
        <!---->
        <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
        <script src='interestView.js'></script>
    </div>
</body>

</html>