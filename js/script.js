// Referencing jquery library for intellisence
/// <reference path="typings/index.d.ts"/>

jQuery(function ($) {
    var _i = -1;
    $('.navbar-toggle').on('click', function (){
        _i < 0 ? $('#menu-container').slideDown(300) : $('#menu-container').slideUp(300);
        _i *= -1;
    });
    $('#menu-container').delegate('li', 'click', function () { 
        $('#menu-container').slideUp(300)
        _i *= -1;
    });
    // #region SECTION: EVENTS
    
    // SECTION: Resume page
    var hide = setTimeout(function (){
        $('.summary-container').addClass('hide-left')
        clearTimeout(hide);
    }, 6000)
    $('.summary-container').delegate('.summary-item', 'click', function(){
        activeElementSummary(this);
    });
    
    // Contact ME 
    $('.form-container button').on('click', function (){
        _this = $(this);
        setTimeout(function () { _this.prop('disabled', true); }, 200);
        setTimeout(function () { _this.prop('disabled', false); }, 2000)
    });
    
    // #region SECTION: Plugins Code / Typing / carousel
    // Typing animated for feature text
    $(".typed").typewriter({
        speed: 30
    });
    
    //Set the carousel options
    $('.feature-carousel').carousel({
        pause: true,
        interval: 8000,
    });
    $('.recommandations-carousel').carousel({
        pause: true,
        interval: 4000,
    });
    // #endregion
    
    // SECTION: Resource page
    $('.blog-main').delegate('.tool-header', 'click', function(){
        var tool_category = $(this).siblings('.tool-category');
        if($(tool_category).css('display') === "block"){
            $(tool_category).slideUp(300)
            if($(tool_category).hasClass('last-child')){
                $(this).addClass('last-child');
                $(tool_category).removeClass('last-child');
            }
        }
        else {
            if($(this).hasClass('last-child')){
                $(this).removeClass('last-child');
                $(tool_category).addClass('last-child');
            }
            $('.tool-header').removeClass('fa-minus').addClass('fa-plus');
            $('.tool-category').slideUp(300)
            $(tool_category).slideDown(300);
        }
        $(this).toggleClass('fa-minus fa-plus');
    });
    
    // #region SECTION: Modal
    var _modal_showed = window.localStorage.getItem('modal');
    _modal_showed = null; // TESTING:
    if(_modal_showed === null){
        $('#modal-container').removeClass('hidden');
        window.localStorage.setItem('modal', true);
    }
    $('#modal').on('click', function () {
        $('#modal-bg').fadeOut(100);
        $('#modal').addClass('bounceOutRight');
    });
    // #endregion
    
    // Adding class for post-pages -> style purposes
    if ((p = $('.post-txt p:last-child')).text().includes('Pages:'))
    $(p).addClass('pages-nav');
    
    var addons_classes = 'v-hidden';
    var addons_elements = ['#up-container', '#fixNav-container', '#reload-container', '#check-container']
    var first_scroll = false;
    var addOns_hidden = false;
    
    var resume_section = $('.resume > .section');
    var resume_summary = $('.summary .summary-item');
    
    feature_width();
    scrolling();
    
    // Controlling Feature Height by the Width of the document
    $(window).on('resize', function () {
        feature_width();
    });
    var mouse_wheel = false;
    // $(window).on('mousewheel', function () {
    //     mouse_wheel = true;
    //     scrolling();
    //     setTimeout(function (){mouse_wheel = false}, 2000);
    // });
    $(window).on('scroll', function () {
        scrolling(true);
    });
    
    // adding classes to post comment ( Markup added by wordpress ) button for style purposes
    _ToggleClasses(true, 'dark-blue btn btn-primary btn-block btn-send uppercase', [$('.comments-area .submit')]);
    
    // #region SECTION: AddOns Functionnalities
    // ===== Scroll to Top ====
    
    // TOGGLE FIXED NAVBAR HEADER ===========================
    // var fixed = true;
    $('#fixNav-container').on('click', function () {
        $this = $(this);
        $this.find('.fa').toggleClass('fa-square');
        var fixed_elements = ['nav.navbar', 'body', 'header .progress'];
        var fixed = 'nav-fixed';
        _ToggleClasses('toggle', fixed, fixed_elements)
        
    });
    // #endregion AddOns Functionnalities
    
    // #endregion EVENTS
    
    // #region SECTION: functions
    
    function scrolling(browser_scroll = false) {
        
        var scroll_top = $(document).scrollTop();
        
        //#region SECTION: Show / Hide the addOns - Contrlling the top bar width
        var total_height = document.body.offsetHeight - window.innerHeight; //document.body.clientHeight;
        var progress_bar = $('.navbar + .progress .progress-bar');
        var width = Math.round(parseFloat((scroll_top * 100) / total_height));
        progress_bar.css('width', width + '%');
        if (scroll_top >= 50) {        // If page is scrolled more than 50px
            if (!addOns_hidden) {
                _ToggleClasses(false, addons_classes, addons_elements); // Fade in Addons buttons
                _ToggleClasses(true, 'bounceInUp animated', addons_elements);  // Add pulse animation to Addons buttons
                _ToggleClasses(false, 'bounceOutDown', addons_elements);
            }
        } else {
            addOns_hidden = false;
            _ToggleClasses(false, 'bounceInUp', addons_elements);     // Remove pulse animation from Addons buttons
            _ToggleClasses(true, 'bounceOutDown', addons_elements);     // Remove pulse animation from Addons buttons
        }
        //#endregion
        
        //#region SECTION: Resume Page : Animating sections when they are viewed for the first time
        var offset = 500;
        
        var section = $('.competences').offset();        
        if (section !== undefined && scroll_top >= section.top - offset) {
            // Unfold to see the whole array
            var limits = [{name : 'LARAVEL', value :50},
                            {name : 'PHP', value :50},
                            {name : 'WORDPRESS', value :60},
                            {name : 'DESIGN PATTERNS', value :40},
                            {name : 'MYSQL', value :60},
                            {name : 'JQUERY / JAVASCRIPT', value :70},
                            {name : 'BOOTSTRAP', value :70},
                            {name : 'SASS', value :50},
                            {name : 'HTML / CSS', value :80},
                            {name : 'C# .NET', value :70},
                            {name : 'ASP.NET', value :50},
                            {name : 'MSSQL SERVER', value :50},
                            {name : 'ENGLISH', value :70}, 
                            {name : 'FRENCH', value :70},
                            {name : 'ARABIC', value :90},
                            {name : 'BERBER', value :95},
                        ]
            var elements = $('.competences .progress-bar').toArray();
            index = 0
            if(!browser_scroll)
                activeElementSummary(resume_summary[0]) // TESTING:
            if (!first_scroll) {
                first_scroll = true;
                elements.forEach(function (element) {
                    $(element).append(limits[index].name + ' - <span class="progress-value">0</span>%');
                    $(element).css("transition", "padding-left .5s ease, width " + (limits[index].value / 40) + "s ease");
                    $(element).addClass("padding-left width-" + limits[index].value); // + " go-front");
                    anime_counter($(element).find('.progress-value'), limits[index].value);
                    index++;
                });
            }
        }

        section = $('.experiences').offset();
        if (section !== undefined && scroll_top >= section.top - offset) {
            if(!browser_scroll)
                activeElementSummary(resume_summary[1]);
            animateOneByOne($('.experiences .section'), 'rotated', false, 200);
        }
        section = $('.education').offset();
        if (section !== undefined && scroll_top >= section.top - offset) {
            // $('.education .section').removeClass('rotated');
            if(!browser_scroll)
                activeElementSummary(resume_summary[2]);
            animateOneByOne($('.education .section'), 'rotated', false, 200);
        }
        section = $('.portfolio').offset();
        if (section !== undefined && scroll_top >= section.top - offset) {
            // $('.portfolio .box').removeClass('small');
            if(!browser_scroll)
                activeElementSummary(resume_summary[3]);
            animateOneByOne($('.portfolio .box'), 'small', false, 80);
        }
        section = $('.passion').offset();
        if (section !== undefined && scroll_top >= section.top - offset) {
            if(!browser_scroll)
                activeElementSummary(resume_summary[4]);
            animateOneByOne($('.passion .list-group-item'), 'grow', true, 80);
        }
        section = $('.other-experiences').offset();
        if (section !== undefined && scroll_top >= section.top - offset) {
            if(!browser_scroll)
                activeElementSummary(resume_summary[5]);
            animateOneByOne($('.other-experiences .list-group-item'), 'grow', true, 80);
        }
        section = $('.recommandations').offset();
        if (section !== undefined && scroll_top >= section.top - offset) {
            if(!browser_scroll)
                activeElementSummary(resume_summary[6]);
            $('.carousel .carousel-control').removeClass('opaque').addClass('back-to-place-x go-front')
        }
        section = $('.contact-me').offset();
        if (section !== undefined && scroll_top >= section.top - offset) {
            if(!browser_scroll)
                activeElementSummary(resume_summary[7]);
            $('.contact-me .thank-you').addClass('bounceInRight').removeClass('bounceOutRight');
            $('.contact-me .form-container').addClass('bounceInLeft').removeClass('bounceOutLeft');
        }
        //#endregion
        
        //#region SECTION: Fixing / Unfixing the top nav bar of the page
        if (scroll_top <= (document.body.offsetWidth >= 750 ? 70 : 50)) {
            _ToggleClasses(false, 'navbar-fixed-top', ['header .progress'])
        }
        else {
            _ToggleClasses(true, 'navbar-fixed-top', ['header .progress'])
        }
        //#endregion
        
    }
    
    function animateOneByOne(element, _class, toggle, delay) {
        element.each(function (i) {
            setTimeout(function () {
                if (toggle) element.eq(i).addClass(_class);
                else element.eq(i).removeClass(_class);
            }, delay * (i + 1));
        })
    }
    
    function anime_counter(element, limit) {
        var loop = setInterval(function () {
            var txt = element;
            var txt_nbr = parseInt($(txt).text());
            if (txt_nbr == limit) {
                txt_nbr--;
                clearInterval(loop);
            }
            $(txt).text(txt_nbr + 1);
        }, 40);
    }
    
    function _ToggleClasses(toggle_state, classes, elements) {
        if (toggle_state == 'toggle') {
            for (j = 0; j < elements.length; j++) {
                $(elements[j]).toggleClass(classes)
            }
        }
        
        else if (toggle_state) {
            for (j = 0; j < elements.length; j++) {
                $(elements[j]).addClass(classes)
            }
        }
        else {
            for (j = 0; j < elements.length; j++) {
                $(elements[j]).removeClass(classes)
            }
        }
    }
    
    function feature_width() {
        var offset_width = document.body.offsetWidth;
        $('.feature > .container > .row').removeClass('no-img no-margin');
        if (offset_width > 750) $('.feature').css('height', '510px');
        else if (offset_width > 670) $('.feature').css('height', '400px');
        // else if(offset_width > 400) $('.feature').css('height', '200px');
        else {
            $('.feature').css('height', '350px');
            if (!$('.feature .row.me').length && offset_width < 500)
            $('.feature > .container > .row').addClass('no-img');
            else $('.feature > .container > .row').addClass('no-margin');
        }
    }
    
    function activeElementSummary(element){
        $('.summary-item').removeClass('active');
        $(element).addClass('active');
    }
    // #endregion FUNCTIONS
})
