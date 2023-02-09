var imgUpload = {
    dirName: '/Content/f/',
    buildBothArray: function(inp, fs){
        var _this = this;
        var $inp = $(inp);
        var wrap = $inp.closest('.inp_file_wrap');
        var files = wrap.find('.inp_file__files .inp_file__item');
        var oldItemLeng = wrap.find('.a_layout_work__ct__inp_file').val().trim() != '' ? wrap.find('.a_layout_work__ct__inp_file').val().split(';').length : 0;
        var progress = wrap.find('.inp_file__progress');

        if(wrap.find('.a_layout_work__ct__inp_file').data('multiple') == undefined || wrap.find('.a_layout_work__ct__inp_file').data('multiple') == false){
            oldItemLeng = 0;
        }
        $.each(fs.files, function(i, file){
            var i = i + oldItemLeng;
            var $link = files.eq(i);
            if(file.status == 'success'){
                $link.attr('href', _this.dirName + file.path);
                if($link.hasClass('inp_file__imgs__item')){
                    $link.find('img').attr('src', _this.dirName + file.path);
                }
            }else if(file.status == 'error'){

            }
        });
        _this.updateInp(inp);
        progress.removeClass('inp_file__progress_active');
    },

    updateInp: function(inp){
        var _this = this;
        var $inp = (typeof inp == 'object' ? inp : $(inp));
        var wrap = $inp.closest('.inp_file_wrap');
        var val = [];

        $.each(wrap.find('.inp_file__item'), function(i, elem){
            var elem = $(elem);
            var href = elem.attr('href').replace(_this.dirName, '');
            var size = elem.data('size');
            var name = elem.data('name');
            val[i] = href + ':' + size + ':' + name;
        });
        wrap.find('.a_layout_work__ct__inp_file').val(val.join(';'));
    },

    temp: function(o){
        var temp = '';
        temp += '<label class="button_pseudo">' + o.title;
        temp += '<input type="file"' + (o.accept !== false ? ' accept="' + o.accept + '"' : '') + ' name="' + o.name + '" data-url="' + o.url + '"' + (o.multiple == undefined || o.multiple == false ? '' : 'multiple') + ' />';
        temp += '</label>';
        temp += '<span class="inp_file__progress"><span></span></span>';

        if(o.placement == 'before'){
            temp = '<div class="inp_file__files inp_file__files_before"></div>' + temp;
        }else if(o.placement == 'after'){
            temp = temp + '<div class="inp_file__files inp_file__files_after"></div>';
        }
        return temp;
    },

    delItem: function(thisLink){
        var _this = this;
        var wrap = $(thisLink).closest('.inp_file_wrap');
        var thisLink = $(thisLink).closest('.inp_file__item');

        thisLink.hasClass('inp_file__imgs__item') ? thisLink.parent().remove() : thisLink.remove();
        _this.updateInp(wrap.find('.a_layout_work__ct__inp_file'));
    },

    typeTemp: function(o){
        var _this = this;
        var f = null;
        var wrap = $(o.inp).closest('.inp_file_wrap');
        var src = (o.file.base64 == undefined ? _this.dirName + o.file.src : o.file.base64);
        var closeBtn = '<span class="inp_file__item__close" onclick="imgUpload.delItem(this);return false;">×</span>';
        var type = null;
        var inpText = wrap.find('.a_layout_work__ct__inp_file');
        var fNameArr = null;

        type = o.file.name.indexOf('.jp') != -1 || o.file.name.indexOf('.png') != -1 || o.file.name.indexOf('.gif') != -1 ? 'image' : 'all';

        if(type == 'image' && inpText.data('img-preview') == undefined){
            f = '<div class="inp_file__imgs__item_wrap"><a href="' + src + '" data-name="' + o.file.name + '" target="_blank" class="inp_file__imgs__item inp_file__item" data-size="' + o.file.size + '">' + closeBtn + '<img src="' + src + '" /></a></div>';
        }else{
            fNameArr = o.file.name.split('.');
            f = '<a title="' + o.file.name + '" data-size="' + o.file.size + '" href="' + src + '" data-name="' + o.file.name + '" class="inp_file__files__item inp_file__item">' + closeBtn + '<span class="inp_file__item__name">' + fNameArr[0] + '</span><span class="inp_file__item__type">.' + fNameArr[1] + '</span><br/><i class="inp_file__files__item__size">' + Math.ceil(o.file.size / 1000) + '&nbsp;Kb</i></a>';
        }
        if(inpText.data('multiple') == undefined || inpText.data('multiple') == false){
            wrap.find('.inp_file__files').html(f);
        }else{
            wrap.find('.inp_file__files').append(f);
        }
        return f;
    },

    init: function(){
        var _this = this;
        var $inpWrap = null;
        var $inp = null;

        $('.a_layout_work__ct__inp_file').each(function(i, inp){
            var $inp = $(inp);
            var val = $inp.val().trim() != '' ? $inp.val().split(';') : undefined;

            $inp.attr('type', 'hidden');
            $inp.wrap('<div class="inp_file_wrap" />');
            $inp.parent().append(_this.temp({
                name: $inp.data('name'),
                url: $inp.data('url'),
                title: $inp.data('title'),
                multiple: $inp.data('multiple'),
                placement: ($inp.data('placement') == undefined ? 'before' : $inp.data('placement')),
                accept: ($inp.data('accept') == undefined ? false : $inp.data('accept'))
            }));
            if(val != undefined){
                $.each(val, function(i, val){
                    var splited = val.split(':');
                    var prop = splited.length == 3 ? splited : [splited[0], '0', splited[0]];
                    var name = prop[2];
                    var size = prop[1];
                    var src = prop[0];
                    _this.typeTemp({
                        file: {src: src, name: name.toLowerCase(), size: size},
                        inp: inp
                    });
                });
            }
        });

        $inpWrap = $('.inp_file_wrap');
        $inp = $inpWrap.find('input[type="file"]');
        $inp.liteUploader({
            script: $inp.data('url')
        })
            .on('lu:error', function (e, response){
                var response = JSON.parse(response);
            })
            .on('lu:before', function (ev, files){
                $.each(files, function(i, file) {
                    var reader = new FileReader();
                    reader.onload = function(e){
                        var f = null;
                        file.base64 = e.target.result;
                        f = _this.typeTemp({
                            file: file,
                            inp: ev.target
                        });
                    };
                    reader.readAsDataURL(file);
                });
            })
            .on('lu:progress', function (e, state){
                var wrap = $(this).closest('.inp_file_wrap');
                var progress = wrap.find('.inp_file__progress');
                progress.addClass('inp_file__progress_active');
                progress.find('span').css('width', state + '%');
            })
            .on('lu:success', function (e, response){
                var response = JSON.parse(response);
                var inp = $(e.target);
                if(response.status == 'success'){
                    _this.buildBothArray(inp, response);
                }else{
                    return false;
                }
            });
    }
};


var a = {
    redactors: {},
    redactorParam: function(){
        var randParam = '?' + parseInt(Math.random()*1000);
        var param = {
            'upload_path': '/upload_file/',
            // 'word_path': $(this).data('word_path'),
            'css': ['/Content/css/fonts.css' + randParam, '/Content/css/a/ftext.css' + randParam],
            'js': []
        };
        return param;
    },

    layerView: function(){
        var idx = $('.type_added_radio:checked').val();
        $('.a_struct_layer_by_type').hide();
        idx = idx == 0 ? 1 : idx;
        $('.a_struct_layer_by_type__' + idx).show();
    },

    checkNoticeCount: function(){
        var _this = this;

        clearInterval(_this.intervalTemp);
        _this.intervalTemp = setInterval(function(){
            $.ajax({
                url: '/Admin/',
                headers: {
                    'X-Requested-With': '0'
                },
                success: function(html){
                    var countNow = $('.a_layout_menu__item__count');
                    var countNew = $(html).find('.a_layout_menu__item__count');

                    countNow.each(function (i, el) {
                        var el_new = countNew.eq(i);
                        if (parseInt(el_new.text()) > parseInt($(el).text()) || ($(el).text() == '' && el_new.text() != '')) {
                            $(el).addClass('a_layout_menu__item__count_jump');
                        } else if (parseInt(el_new.text()) < parseInt($(el).text())) {
                            $(el).removeClass('a_layout_menu__item__count_jump');
                        }
                        $(el).html(el_new.html());
                    });
                }
            });
        }, 60000);
    },

    delete: function(url){
        var _url = (url == undefined ? $(event.target).closest('a').attr('href') : url);
        a.popup._show({preloader: true, dataType: 'html', style: {'max-width': '800px', 'margin': '40px 0'}, addedClass: ($(event.target).closest('.a_struct__props').length > 0 ? 'state_structed' : ''), url: _url});
    },

    init: {
        domready: function(){
            $('input[type="checkbox"],input[type="radio"]').customizeForm();
            
            a.els.struct__root = $("#a_struct__root");
            a.els.layout_work__ct = $("#a_layout_work__ct");
            a.els.layout_action_bar = $(".a_layout_action_bar");
            a.els.a_layout_menu__ct = $(".a_layout_menu__ct");

            a.layerView();

            $(window).resize(function(){
                a.popup._resize();
                a.onevent.window_resize();
            });
            a.popup._resize();
            a.onevent.window_resize();


            $("#object_Body_id").addClass("HTML");

            $('.HTML, .redactor_frame').each(function(){
                var ta = $(this);
                var ta_height = ta.height();
                var ta_width = ta.width();
                var parent = ta.parent().parent();
                var a_list__batch_actions = parent.parent().find('.a_list__batch_actions');
                var h = ta_height + (a.els.struct__root.height() - parent.height() - a_list__batch_actions.height() - 80);
                if(ta.hasClass('a_step_const_HTML')){
                    return;
                }
                ta.height(h < 200 ? 200 : h);
                ta.css('width','100%');
            });

            $('textarea.HTML').each(function(){
                if($(this).data('redactor') != '1' && !$(this).hasClass('a_step_const_HTML')){
                    $(this).data('redactor', '1');
                    var id = $(this).prop('id');
                    $(this).after('<input type="file" multiple style="display: none;" name="loadfile[]" />');
                    a.redactors[id] = $(this).redactor(a.redactorParam());
                }
            });

            $('.a_layout_work__ct__inp_date').spinpicker({lang:"ru"});

            a.els.a_layout_menu__ct.find('.a_layout_menu_scroll').perfectScrollbar();
            a.els.a_layout_menu__ct.find('.a_layout_menu_scroll').scroll(function(){
                var $this = $(this);
                var top = $this.scrollTop();
                var bottom = $('.a_layout_menu_top').outerHeight() - $this.outerHeight();

                $this.removeClass('a_layout_menu_top_sh_top');
                $this.removeClass('a_layout_menu_top_sh_bottom');
                $this.removeClass('a_layout_menu_top_sh_bottom_top');

                if (bottom < 0) {return false;}
                if (top == 0) {
                    $this.addClass('a_layout_menu_top_sh_bottom');
                } else if (top >= bottom) {
                    $this.addClass('a_layout_menu_top_sh_top');
                } else {
                    $this.addClass('a_layout_menu_top_sh_bottom_top');
                }
            }).scroll();


            a.els.struct__root.scroll(function(){
                var table = $(this).find('.a_list__table');
                var clone = null;
                if(table.hasClass('order_list_table')){
                    return false;
                }
                if($(this).scrollTop() > 0){
                    clone = table.find('thead').clone();
                    clone = $('<table cellspacing="0" cellpadding="0" class="a_list__table_fixed"><thead>' + clone.html() + '</thead></table>');
                    if(!table.prev().hasClass('a_list__table_fixed')){
                        table.before(clone);
                        table.find('tr:first-child th').each(function(i, th){
                            clone.find('th').eq(i).width($(th).width())
                        });
                    }
                }else{
                    if(table.prev().hasClass('a_list__table_fixed')){
                        table.prev().remove();
                    }
                }
            }).scroll();

            a.menuLeft.hider.init();
            a.tabs.init();
            imgUpload.init();
            a.sortable.init();
            a.checkNoticeCount();
            autosize($('textarea:not(.HTML)'));
        },
        pageload: function(){
            a.popupMessage.init();
        }
    },
    els: {
        struct__root: null,
        layout_work__ct: null,
        layout_action_bar: null,
        a_layout_menu__ct: null
    },
    onevent: {
        window_resize: function(){
            var menu_td = a.els.a_layout_menu__ct;
            var menuHeight = $(window).height() - menu_td.find('.a_layout_menu_bottom').outerHeight() - menu_td.find('.a_layout_menu_scroll').offset().top - 20;
            a.els.struct__root.outerHeight(5);
            // a.els.struct__root.outerHeight($(window).height() - a.els.layout_action_bar.outerHeight());
            a.els.struct__root.outerHeight($(window).height() - a.els.struct__root.offset().top);

            if(a.els.struct__root.find('.a_list__table').length > 0 && a.els.struct__root.find('.a_list__table_fixed').length > 0){
                a.els.struct__root.find('.a_list__table').find('tr:first-child th').each(function(i, th){
                    a.els.struct__root.find('.a_list__table_fixed').find('th').eq(i).width($(th).width())
                });
            }
            menu_td.find('.a_layout_menu_scroll').outerHeight(menuHeight).scroll();
        }
    },

    menuLeft: {
        hider: {
            init: function(){
                if($.cookie('a_layout_menu') == '0'){
                    a.els.a_layout_menu__ct.addClass('a_layout_menu__ct_hidded');
                }else if($.cookie('a_layout_menu') == '1'){
                    a.els.a_layout_menu__ct.removeClass('a_layout_menu__ct_hidded');
                }
            },
            onClick: function(){
                if(a.els.a_layout_menu__ct.hasClass('a_layout_menu__ct_hidded')){
                    $.cookie('a_layout_menu', '1');
                    a.els.a_layout_menu__ct.removeClass('a_layout_menu__ct_hidded');
                }else{
                    $.cookie('a_layout_menu', '0');
                    a.els.a_layout_menu__ct.addClass('a_layout_menu__ct_hidded');
                }
                $(window).resize();
            }
        }
    },
    
    tabs: {
        init: function(){
            var tabs = $('.a_tabs');

            $.each(tabs, function(i, tab){
                $(tab).attr('onclick', 'a.tabs.onClick(event);');
            });
        },
        
        onClick: function(e){
            var target = $(e.target);
            var tabId = target.closest('.a_tabs').data('id');
            var id = target.index() + 1;

            if($('.a_tab_item_' + tabId + '_' + id).length > 0 && target.hasClass('a_tab_selector')){
                $.cookie('a_tabs_' + tabId, id);
                target.closest('.a_tabs').find('.a_tab_selector').removeClass('a_tab_selector_active');
                target.addClass('a_tab_selector_active');

                $('.a_tab_item').removeClass('a_tab_item_active');
                $('.a_tab_item_' + tabId + '_' + id).addClass('a_tab_item_active');
                $(window).resize();
            }
        }
    },
    
    sortable: {
        init: function(){
            $('.a_list__table__sortable tbody').each(function(i, el){
                var $el = $(el);

                if($el.data('init-sortable') == undefined){
                    $el.data('init-sortable', '1');
                    $el.sortable({
                        forcePlaceholderSize: true,
                        items: '.a_list__table__tr'
                    }).bind('sortupdate', function(){
                        console.log(this);
                        a.sortable.sendSortedItem(this)
                    });
                }
            });
        },
        sendSortedItem: function(tbody){
            var data = '';
            var $tbody = $(tbody);
            var $table = $tbody.closest('.a_list__table__sortable');
            var p = preloader._show($table);

            $tbody.find('.a_list__table__tr').each(function(i, item){
                data += (i == 0 ? '' : ',') + $(item).data('id');
            });

            $.get(window.location.pathname + '/SetSortOrder?SetSort=' + data, function(data){
                var $data = $(data);
                $data = $data.find('.a_list__table__sortable').html();
                $table.html($data);
                a.sortable.init();
                $('input').customizeForm();
                p.remove();
            });
        }
    },


    
    popup: {
        elem: null,
        temps: {},
        cleanBox: function(){
            var _this = this;
            _this.elem.find('.a_layout_work__ct__popup__box').empty();
            $('body').unbind('keyup.popupClose');
        },
        _show: function(o, e){
            var _this = this;
            var p = $('<span style="display: inline-block;vertical-align: middle;color:#fff;">Пожалуйста подождите...</span>');

            if(o.preloader != undefined && o.preloader == true){
                _this.elem.addClass('a_layout_work__ct__popup_active');
                _this.elem.append(p);
            }

            $.ajax({
                url: o.url,
                dataType: o.dataType,
                success: function(data){
                    var box = _this.elem.find('.a_layout_work__ct__popup__box');
                    var closeBtn = '<span class="a_layout_work__ct__popup__close" onclick="a.popup._hide();" title="Закрыть окно"></span>';

                    if(o.temp != undefined){
                        data = _this.temps[o.temp](data);
                    }
                    if(o.style != undefined){
                        box.css(o.style);
                    }
                    if(o.addedClass != undefined){
                        box.addClass(o.addedClass);
                    }
                    box.html(data + closeBtn);
                    if(o.preloader == undefined){
                        _this.elem.addClass('a_layout_work__ct__popup_active');
                    }
                    p.remove();

                    setTimeout(function(){
                        $(window).resize();
                    }, 100);
                }
            });

            $('body').on('keyup.popupClose', function(event){
                if(event.keyCode == '27'){
                    _this._hide();
                }
            });
        },

        _hide: function(){
            var _this = this;
            var box = _this.elem.find('.a_layout_work__ct__popup__box');
            box.empty();
            box.attr('style', '');
            _this.elem.removeClass('a_layout_work__ct__popup_active');
            $('body').unbind('keyup.popupClose');
        },
        
        _resize: function(){
            var _this = this;
            if(_this.elem == null){
                _this.elem = $('.a_layout_work__ct__popup');
            }
            _this.elem.width($('#a_layout_work__ct').width());
        }
    },
    
    popupMessage: {
        temp: {
            box: function(o){
                var temp = '<div class="a_popup_message" data-type="' + (o.type != undefined ? o.type : '') + '">';
                if(o.text != undefined){
                    temp += o.text;
                }
                temp += a.popupMessage.temp.closeBtn();
                temp += '</div>';
                return temp;
            },
            closeBtn: function(){
                var temp = '<span class="a_popup_message__close" onclick="a.popupMessage._hide(this);"></span>';
                return temp;
            }
        },
        _show: function(o){
            var _this = this;
            var box = $(this.temp.box(o));
            $('body').append(box);
            setTimeout(function(){
                box.addClass('a_popup_message_active');
            }, 200);
            this.boxesPos();
            _this.timeCloseFun(box);
        },
        
        boxesPos: function(){
            $('.a_popup_message').each(function(i, box){
                $(box).css('top', i * $(box).outerHeight() + 15);
            })
        },

        _hide: function(close){
            var _this = this;
            var box = $(close).closest('.a_popup_message');
            box.removeClass('a_popup_message_active');
            setTimeout(function(){
                box.remove();
                _this.boxesPos();
            }, 200);
        },

        timeCloseFun: function(elems){
            setTimeout(function(){
                elems.find('.a_popup_message__close').click();
            }, 5000);
        },

        init: function(){
            var _this = this;
            var messages = $('.a_popup_message');
            if(messages.length > 0){
                messages.each(function(i, box){
                    if($(box).find('.a_popup_message__close').length == 0){
                        $(box).append(_this.temp.closeBtn());
                    }
                });
                messages.addClass('a_popup_message_active');
                _this.timeCloseFun(messages);
            }
        }
    }
};

$(document).ready(function(){
    a.init.domready();
});

$(window).load(function(){
    a.init.pageload();
    // a.popupMessage._show({
    //     type: 'warning',
    //     text: 'Все нормально'
    // });
});