var slider;
var slides;
var active_slide_index;
var slider_dots;
var body_dir;

function init_slider(slider_id, auto = 0) {
    body_dir = $("body").attr("dir");
    slider = $(`#${slider_id}`);
    slides = slider.children(".slide");
    active_slide_index = slider.find(".active_slide").index();
    generate_slider_dots();
    generate_slider_buttons();
    init_slider_swipe();
    if (auto > 0) {
        init_slider_auto(auto);
    }
}

function generate_slider_dots() {

    slider_dots = `<div class="slider_dots_container">`;
    $.each(slides, function (index, element) {
        slider_dots += `<div class="slider_dot" onclick="set_active_slide(${index});"></div>`;

    });
    slider_dots += `</div>`;
    slider.append(slider_dots);
    slider_dots = $(".slider_dots_container").children(".slider_dot");
    set_active_dot(active_slide_index);

}

function generate_slider_buttons() {


    var start = body_dir == "ltr" ? "left" : "right";
    var end = body_dir == "ltr" ? "right" : "left";
    var slider_buttons = `
                        <div class="slider_buttons slider_button_${end}" onclick="move_slider('next')">&#x276F;</div>
                        <div class="slider_buttons slider_button_${start}" onclick="move_slider('prev')">&#x276E;</div>
                    
                        `;
    slider.append(slider_buttons);
}

function move_slider(direction) {
    if (direction == "next") {
        active_slide_index++;
        if (active_slide_index >= slides.length) {
            active_slide_index = 0;
        }
    } else {
        active_slide_index--;
        if (active_slide_index < 0) {
            active_slide_index = slides.length - 1;
        }
    }
    set_active_slide(active_slide_index);



}
function set_active_slide(new_active_slide_index) {
    slides.removeClass("active_slide");
    $(slides[new_active_slide_index]).addClass("active_slide");
    active_slide_index = new_active_slide_index;
    set_active_dot(active_slide_index);

}

function set_active_dot(new_active_slide_index) {
    slider_dots.removeClass("active_slider_dot");
    $(slider_dots[new_active_slide_index]).addClass("active_slider_dot");
}

function init_slider_auto(auto) {
    setInterval(() => {
        move_slider("next");
    }, auto);


}

function init_slider_swipe() {
    var swipe_next = "swipeleft";
    var swipe_prev = "swiperight";
    if (body_dir == "rtl") {
        swipe_next = "swiperight";
        swipe_prev = "swipeleft";
    }
    slides.on(swipe_next, function () {
        move_slider("next");
    });
    slides.on(swipe_prev, function () {
        move_slider("prev");
    });
}