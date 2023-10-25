let search = $("#search > div > div > div")
let pressed = '';
let links = [];
let class_list = [];
let interval_item = 0;

search.each(function (index, e) {
    class_list.push($(this).attr('class'));
    let key = index + 1;
    links[key] = $(this).find('a').attr('href');
    $(this).prepend(`<h2 class="my_chrome_helper_class_name" style="color: red; margin: 0; top: 14px; left: -18px; z-index: 20;" >`+key+`</h2>`);
});
$(document).ready(function(){
    setTimeout(function (){
        let {b_class, l_class} = class_name(class_list);
        run_function(b_class, l_class);

        $('body').append('<div class="google_fixed_div" style="position: fixed; top: 14%; right: 80px; z-index: 100; color: red; width: 15%; border-radius: 5px; height: 7%; border: 1px solid blue; text-align: center; padding: 10px; font-size: 30px; font-weight: 800;">.</div>');

    }, 1000);
});

function run_function(b_class, l_class) {
    var my_interval = setInterval(function(i, ind){
        let classes = $('.'+b_class/*+', .'+l_class*/);

        classes.each(function (index, e) {
            let key = index + 1;
            let l = $(this).find('a').attr('href');
            if (typeof l !== "undefined") {
                links[key] = l;
                let my_chrome_helper_class_name = $(this).find('.my_chrome_helper_class_name');

                if (my_chrome_helper_class_name.length === 0) {
                    $(this).prepend(`<h2 class="my_chrome_helper_class_name" style="color: red; margin: 0; top: 14px; left: -18px; z-index: 20;" >`+key+`</h2>`);
                } else {
                    $(this).find(my_chrome_helper_class_name).html(key);
                }
            }
        });
        interval_item++;
        if(interval_item*8/10 > 120) {
            console.log('cleared to 60 second')
            clearInterval(my_interval);
        }
    }, 800);

}

function clear_all_interval() {
    const interval_id = window.setInterval(function(){}, 99999); // Number.MAX_SAFE_INTEGER

// Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
}

function class_name(class_list) {
    const grouped = class_list.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const sorted = Object.entries(grouped).sort((a, b) => a[1] - b[1]);
    const b_class = sorted.at(-1)[0];
    const l_class = class_list.at(-1);

    return {b_class, l_class};
}

$(document).keypress(function (event) {

    let key = (event.keyCode ? event.keyCode : event.which);
    let character = String.fromCharCode(key)

    if (!isNaN(parseFloat(character)) && isFinite(character)) {
        pressed = pressed+character;
    }

    if (event.keyCode === 99) {
        pressed = '';
    }
    $('.google_fixed_div').html(pressed)

    if (event.keyCode === 13 && pressed) {
        if (typeof links[pressed] !== "undefined") {
            var win = window.open(links[pressed], '_blank');
            if (win) {
                //Browser has allowed it to be opened
                // win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website');
            }
        } else {
            $('.google_fixed_div').append("<br>not found")
        }
        pressed = '';
    }
});

