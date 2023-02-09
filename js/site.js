// Отправлем юзера на страницу свойств клиента с данным id
function ClientInfo(id, new_tab = false) {
    if (new_tab) {
        console.log("Clients/" + id);
        window.open("Clients/" + id, id);
    }
    else {
        console.log("Clients/" + id);
        window.location.href = "Clients/" + id;
    }
}
// клик на строке таблицы СТАРЫЙ
//$("#applications_table td").on("click", function(e) {
//        document.getElementById('preloader_malc').style.display = 'block';
//        //$('.blurable')[0].style.filter = 'blur(5px)';
//        ClientInfo(this.id); 
//});

// клик на строке таблицы
function mouse_click(e) {
    if (e.which == 2) {  // если центральная кнопка мыши
        ClientInfo(this.id, true);
    }
    else if (e.which == 1) {   // если левая кнопка мыши
        document.getElementById('preloader_malc').style.display = 'block';
        ClientInfo(this.id);
    }
}
//document.querySelector("#applications_table").addEventListener("mousedown", mouse_click);
$("#applications_table td").on("mousedown", mouse_click);


// JSON to Table
function json_to_table(subscribe) {
    //console.log(subscribe);
    var jsonobj = subscribe;
    var html = '<table width="80%">';
    for (var i = 0; i < jsonobj.Email.length; i++) {
        html += '<tr><td width="10%"><b>Email:</b></td>' +
            '<td width="70%"><input type="text" class="email_value" style="width:700px" value="' +
            jsonobj.Email[i] + '"></td><td><a href="#" class="button_pseudo set_email" id="email_' +
            i + '">Обновить<a>' + '</td>' + '</tr>';
    }
    for (var g = 0; g < jsonobj.Email.length; g++) {
        html += '<tr><td width="10%"><b>Push:</b></td>' +
            '<td width="70%"><input type="text" class="push_value" style="width:700px" value="' +
            jsonobj.Push[g] + '"></td><td><a href="#" class="button_pseudo set_push" id="push_' +
            g + '">Обновить<a>' + '</td>' + '</tr>';
    }
    html += '</table>';
    //console.log(html);
    $(".table_from_json").html(html);
}
// Запускаем функцию
//json_to_table("Model.Subscribe");
//$("#table_from_json_btn").on("click", function () {
//    json_to_table();
//});


// Сохранение данных юзера
function generate_subscribe_json() {
    var email = $("#email_value").val();
    var push = $("#push_value").val();
    var json = '{ "Email": ["' + email + '"], "Push": ["' + push + '"] }';
    //$("#table_from_json_btn").append('<p>' + json + '</p>')
    return json;
}

//btn_save_user_settings
$("#table_from_json_btn").on("click", function () {
    generate_subscribe_json();
});

// Нажатие теста email
$("#email_test").on("click", function () {
    console.log('Test email sended');
    $.post('/Test/SendTestEmail/', { 'email': $('#subscribe_email').val() });
    alert('Отправлено');
});

// Нажатие теста push
$("#push_test").on("click", function () {
    console.log('Test push sended');
    $.post('/Test/SendTestPush/', { 'to': $('#subscribe_push').val() });
    alert('Отправлено');
});

// Работа с морфингом blurable блока и вызовом окна фильтра
function transform_blurable() {
    $('#left_bg_rect')[0].style.display = 'none';
    $('.modal_content')[0].style.display = 'none';
    $('#modal_bg_in_footer')[0].style.display = 'block';
    $('.blurable')[0].style.filter = 'blur(5px)';
    move('.blurable')
        .set('transform-origin', '50% 0')
        .set('transform', 'perspective(300px) rotateX(3deg)')
        .duration('0.15s')
        .end(show_filter_form());
}
function show_filter_form() {
    $('.modal_content')[0].style.display = 'none';
    $('#modal_bg_in_footer')[0].style.display = 'block';
    move('.modal_content')
        .y(-800)
        .set('display', 'block')
        .end();
    tmp();
    function tmp() {
        move('.modal_content')
            .y(-0)
            .duration('0.15s')
            .end();
    }
}
function reset_blurable() {
    move('.blurable')
        .set('transform-origin', '50% 0')
        .set('transform', 'perspective(300px) rotateX(0deg)')
        .duration('0.15s')
        .end();
}

function search_select(){  // Смена поиска на глобальный и обратно
    //$('#search_selector')
    if ($('#search_selector').is(':checked')) {
        $('#filter_table')[0].style.display = "none"
        $('#global_search_table')[0].style.display = "inherit"
    } else {
        $('#filter_table')[0].style.display = "inherit"
        $('#global_search_table')[0].style.display = "none"
    } 
}




