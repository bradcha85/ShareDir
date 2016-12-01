<%@page contentType="text/html; charset=utf-8" %>
<html>

<head>
    <meta charset="UTF-8">
    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">
    <!--     css        -->
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/tagsly/tagsly.css">
    <link rel="stylesheet" href="/css/jquery-colorbox/colorbox.css"> </head>

<body>
    <!--íë¡í ë©ë´-->
    <div class="float-nav">
        <a href="#" class="menu-btn button-collapse" data-activates="slide-out">
            <ul>
                <li class="line"></li>
                <li class="line"></li>
                <li class="line"></li>
            </ul>
            <!--            <div class="menu-txt">menu</div>-->
        </a>
    </div>
    <!--íí°ë§ ë©ë´-->
    <div class="float-filter-nav">
        <a href="#modal1" class="menu-btn">
            <div class="menu-filter-txt">Filter</div>
        </a>
    </div>
    <!--íí°ë§ ëª¨ë¬ -->
    <div id="modal1" class="modal">
        <div class="modal-content">
            <h4>Fitering</h4>
            <form action="#">
                <!--ì±ë³ íí°ë§ -->
                <p>Gender</p>
                <div>
                    <input name="gender" type="radio" id="all" />
                    <label for="all">All</label>
                    <input name="gender" type="radio" id="man" />
                    <label for="man">Man</label>
                    <input name="gender" type="radio" id="woman" />
                    <label for="woman">Woman</label>
                </div>
                <!--ì°ë ¹ë íí°ë§ -->
                <p>Age</p>
                <div>
                    <input type="checkbox" id="s10" />
                    <label for="s10">10s</label>
                    <input type="checkbox" id="s20" />
                    <label for="s20">20s</label>
                    <input type="checkbox" id="s30" />
                    <label for="s30">30s</label>
                    <input type="checkbox" id="s40" />
                    <label for="s40">40s</label>
                    <input type="checkbox" id="s50" />
                    <label for="s50">50s</label>
                    <input type="checkbox" id="s60" />
                    <label for="s60">60s</label>
                </div>
            </form>
            <!--ê´ì¬ì¬ íí°ë©-->
            <!--Category-->
            <p>Category (Max 3)</p>
            <div>
                <input id="tags" name="tags" type="text" value=""> </div>
        </div>
        <div class="modal-footer"> <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Filtering</a> </div>
    </div>
    <!---->
    <!--ì¶ê°íê¸° ë©ë´-->
    <div class="float-add-nav">
        <a href="#" id="add_btn" class="menu-btn">
            <div class="menu-add-txt">Add</div>
        </a>
    </div>
    <!---->
    <!---->
    <!--ì¼ìª¾ ì¬ì´ëë° -->
    <ul id="slide-out" class="side-nav">
        <li>
            <div class="userView">
                <div class="background"><img src="/images/background.png"> </div>
                <a href="#!user"><img class="circle" src="/images/card6.jpg"></a> <a href="#!name"><span class="white-text name">John Doe</span></a>
                <a href="#!email"> <span class="white-text email">jdandturk@gmail.com</span> </a>
            </div>
        </li>
       <li><a href="#">Logout</a></li>
         <li><a href="#" id="myAccount_btn">My Account</a></li>
        <li> <a href="#" id="adminPage_btn">Admin Page</a> </li>
        <li> <a href="#" id="myPick_btn">My Pick</a> </li>
    </ul>
    <!--ìë¨ ê²ì ë° -->
    <div class="sw">
        <form>
            <input type="search" class="search" placeholder="      Search..." />
            <button class="go"><span class="entypo-search"></span></button>
            <a href="#" class="logo" title="Pick"></a>
        </form>
    </div>
    <!--ë´ë¶ ì»¨íì¸ -->
    <div class="content">
        <div class="wrap">
            <div id="main" role="main">
                <ul id="tiles">
                    <!-- These are our grid blocks -->
                    <li id="pick10000">
                        <!--íëì ì»¨íì¸  ìì-->
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card1.jpg'> </div>
                            <div class='post-content'>
                                <div class='category'>Computer</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
                        <!--íëì ì»¨íì¸  ìì-->
                    </li>
                    <li id="pick10001">
                        <!--íëì ì»¨íì¸  ìì-->
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card2.jpg'> </div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
                        <!--íëì ì»¨íì¸  ìì-->
                    </li>
                             <li onclick="location.href='single-page.html';">
                      
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card3.jpg'> </div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
              
                    </li>
                    <li onclick="location.href='single-page.html';">
          
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card4.jpg'> </div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
         
                    </li>
            
                    <li onclick="location.href='single-page.html';">
                            <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card5.jpg'> </div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
              
                    </li>
                    <li onclick="location.href='single-page.html';">
         
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>26</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card6.jpg'></div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
               
                    </li>
                    <li onclick="location.href='single-page.html';">
              
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card7.jpg'> </div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
        
                    </li>
                    <li onclick="location.href='single-page.html';">
           
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card8.jpg'></div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
    
                    </li>
          
                    <li onclick="location.href='single-page.html';">
        
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card6.jpg'></div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
             
                    </li>
                    <li onclick="location.href='single-page.html';">
         
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card1.jpg'></div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
        
                    </li>
                    <li onclick="location.href='single-page.html';">
        
                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card2.jpg'></div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>
      
                    </li>
                    <li onclick="location.href='single-page.html';">

                        <div class='post-module'>
                            <div class='thumbnail'>
                                <div class='date'>
                                    <div class='day'>27</div>
                                    <div class='month'>Mar</div>
                                </div> <img src='/images/card3.jpg'> </div>
                            <div class='post-content'>
                                <div class='category'>Photos</div>
                                <h1 class='title'>City Lights in New York</h1>
                                <h2 class='sub_title'>The city that never sleeps.</h2>
                                <p class='description'>New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                <div class='post-meta'> <span class='timestamp'>
                                    <i class='fa fa-clock-o'></i> 6 mins ago
                                 </span> <span class='comments'>
                                    <i class='fa fa-comments'></i>
                                        <a href='#'>39 comments</a>
                              </span> </div>
                            </div>
                        </div>

                    </li> 
                    <!-- End of grid blocks -->
                </ul>
            </div>
        </div>
    </div>
    <!---->
    <!---//End-content---->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src='/javascript/main.js'></script>
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
    <script>
        $(".button-collapse").sideNav();
    </script>
    <!----wookmark-scripts---->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/4.1.1/imagesloaded.pkgd.min.js"></script>
<script src="/javascript/jquery.wookmark.js"></script> 
    <!--ëë¡­ë¤ì´ ì°ê³ ì¶ë¤-->
    <script src="/css/tagsly/tagsly.js"></script>
    <!--íìì°½ ì°ê³ ì¶ë¤-->
    <script src="/css/jquery-colorbox/jquery.colorbox-min.js"></script>
</body>

</html>