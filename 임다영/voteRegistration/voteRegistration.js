var n = "";
$(document).ready(function () {
    selectOptions();
    $("#end-date").datepicker(); //날짜선택
    $('.dropdown-toggle').dropdown(); //드롭다운메뉴*/ 
});
//이미지 업로드 미리보기 
$(document).on('change', "input[id^=image]", function () {
    var id = $(this).attr("id")
    var m = $(this).attr("id").replace("image", "")
    alert("id는" + id, m + "번째 이벤트");
    ext = $(this).val().split('.').pop().toLowerCase(); //확장자
    //배열에 추출한 확장자가 존재하는지 체크
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
        resetFormElement($(this)); //폼 초기화
        window.alert('이미지 파일이 아닙니다! (gif, png, jpg, jpeg 만 업로드 가능)');
    }
    else {
        file = $(this).prop("files")[0];
        /*file = $(this).attr("id").prop("files")[0];*/
        blobURL = window.URL.createObjectURL(file);
        $('#image_preview' + m + ' img').attr('src', blobURL);
        $('#image_preview' + m).slideDown(); //업로드한 이미지 미리보기 
        var img = $('#image_preview' + m).slideDown();
        $(this).slideUp(); //파일 양식 감춤
        $(this).parent().prepend(img);
        /*$("#label1").remove();*/
        $(this).parent().children("label").text("MODIFY");
    }
});
$(document).on('click', "div[id^=image_preview] a", function () {
    alert("사진삭제 시 이 펑션이 뜨냐?");
    var imgId = $(this).parent().attr("id");
    $(this).parent().attr("id").replace("image_preview", "");
    alert(m + "번째입니당");
    resetFormElement($('#image' + m)); //전달한 양식 초기화
    $('#image' + m).slideDown(); //파일 양식 보여줌
    $(this).parent().slideUp(); //미리 보기 영역 감춤
    /* $(this).closest("label").remove();*/
    return false; //기본 이벤트 막음
});

function resetFormElement(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    //리셋하려는 폼양식 요소를 폼(<form>) 으로 감싸고 (wrap()) , 
    //요소를 감싸고 있는 가장 가까운 폼( closest('form')) 에서 Dom요소를 반환받고 ( get(0) ),
    //DOM에서 제공하는 초기화 메서드 reset()을 호출
    e.unwrap(); //감싼 <form> 태그를 제거
}
//동적으로 투표등록input칸 추가하기..  
/*       $("#addVote").click(function () {
        
         $( "#demo" ).append( $( "<abc>" ) );
          n = $( "abc" ).length;
         
         var row = "<tr>"
         row += "<td width='150'><input type='text' class='form-control'  placeholder='선택지 입력'></td> ";
         row += "<td width='80'><span><button class='btn btn--add'>삭제</button></span></td>";
         row += "<td><form>";
         row += "<label for='image"+n+"'>Image:</label>";
         row += "<input type='file' name='image"+n
         +"' id='image"+n+"'/>";
         row += "</form></td>";
         row += "<td width='250'><div id='image_preview"+n+"' style= 'display:none'>";
         row += "<img src='#' width='50px' height='50px'>";  
         row += "<a href='#'><button>삭제</button></a>";   
         row += "</div></td>";
         row += "</tr>";   
                
        $('#table').append(row);
        
	  });  */
//선택지 추가하기 
$("#addVote").click(function () {
    $("#demo").append($("<abc>"));
    n = $("abc").length;
    var row = "<div class='form-group'>";
    row += "<div class='col-xs-6' style='padding-left:0px;'>";
    row += "<label for='vote' class='control-label'><button id='remove' class='glyphicon glyphicon-minus'></button>EXAMPLE</label>";
    row += "<input type='text' class='form-control' id='vote' placeholder='ENTER CONTENT'></div>";
    row += "<div class='col-xs-6' id='filebox' style='margin-top:16px; padding-left:0px;'><form>";
    row += "<label for ='image" + n + "' style='margin-top:10px; margin-left:12px;'>ADD IMAGE</label>";
    row += "<input type='file' name='image" + n + "' id='image" + n + "' />";
    row += "</form>";
    row += "<div class='col-xs-4' id='image_preview" + n + "' style='display:none'>";
    row += "<img src='#' class='img-circle' width='50px' height='50px'>";
    /*row += "<a href ='#'><button>사진삭제</button></a>";*/
    row += "</div></div></div>";
    $('#table').append(row);
});
//투표등록칸 삭제하기 
$("#table").on("click", "#remove", function () {
    /*$(this).closest("div").remove();*/
    $(this).parent().parent().parent().remove();
});
//상세설정 보이기/숨기기  
$("#showHide").click(function () {
    if ($("#optionalSelect").css("display") == "none") {
        jQuery('#optionalSelect').show();
    }
    else {
        jQuery('#optionalSelect').hide();
    }
});
//버튼클릭에 따른 투표선택 디스플레이  
function selectOptions() {
    $('.js-select-button').click(function () {
        $('.js-select-button').removeClass('btn--active');
        $(this).addClass('btn--active');
        $('.js-select').hide();
        $('.js-' + $(this).val()).show();
    });
}