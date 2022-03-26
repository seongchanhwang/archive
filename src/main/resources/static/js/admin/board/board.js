"use strict"

/*상세페이지 이동*/
function moveDetail(){
    $.ajax({
        url:'/admin/board/moveDetail',
        type:'GET',
        dataType:'html',
        success:function(data){
            $("#overlay").html(data);
        },
        error:function(){
        }
    });
}
/*상세창 닫기*/
function closeModal(){
    $('#overlay').empty();
}

/*게시물 생성*/
/*function createBoard(){
    const formData = new FormData();
    const files = $('#imageUrl')[0].files[0];
    console.log(files);

    $.ajax({
        url: 'admin/board/createBoard',
        //enctype: 'multipart/form-data',
        type: 'POST',
        data: $('#boardForm')serialize(),
        dataType: 'json',
        success:function(data){
            alert("저장되었습니다.");
            $('#overlay').empty();
        }
    })
}*/

/*게시물 업데이트*/
function updateBoard(){}

/*게시물 삭제*/
function deleteBoard(){}
