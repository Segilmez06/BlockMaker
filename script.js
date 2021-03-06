var color = "#0ff";

window.onload = function() {
    if(window.innerHeight < 350){
        alert("Your screen height is too low. App may not work correctly.");
    }

    $('#eraser').on('click', function(){
        color = "#0000";
    })
    $('#clear').on('click', function(){
        for (let i = 0; i < 256; i++) {
            $(`#pixel${i}`).css("background-color", "#0000");
        }
    })
    $('#choose').on('change', function(){
        color = $('#choose').val();
    })
    $('#random').on('click', function(){
        var p = Math.floor(Math.random() * 256);
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var pcolor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

        $(`#pixel${p}`).css("background-color", pcolor);
    })
    $('#frandom').on('click', function(){
        for (let i = 0; i < 256; i++) {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var pcolor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
            $(`#pixel${i}`).css("background-color", pcolor);
        }
    })
    $('#fill').on('click', function(){
        for (let i = 0; i < 256; i++) {
            $(`#pixel${i}`).css("background-color", color);
        }
    })

    $('#download').on('click', function(){
        $('#output').html("");
        for (let i = 0; i < 256; i++) {
            var row = Math.floor(i/16);
            var col = i - row * 16;

            var pixelcolor = document.getElementById("pixel" + i).style.backgroundColor;
            if(pixelcolor == ""){
                pixelcolor = "#0000";
            }

            let box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            box.setAttribute("fill", pixelcolor);
            box.setAttribute("width", "1");
            box.setAttribute("height", "1");
            box.setAttribute("x", col);
            box.setAttribute("y", row);
            $('#output').append(box);
        } 
        
        var svg = document.getElementById('output');
        var sWidth = svg.getBBox().width;
        var sHeight = svg.getBBox().height;

        var svgstr = svg.outerHTML

        var blob = new Blob([svgstr], {type: 'image/svg+xml;charset=utf-8'});
        var bloburl = window.URL.createObjectURL(blob);

        var image = new Image();
        image.addEventListener('load', function() {

            var canvas = document.createElement('canvas');

            canvas.width = sWidth;
            canvas.height = sHeight;

            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            let src = canvas.toDataURL('image/png');

            var download = document.createElement('a');
            download.href = src;
            download.download = "block.png";
            download.click();
        })
        image.src = bloburl;
    })

    $("#block").on('mousedown', function () {
        $("#block").on('mousemove', function () {
            var hovered = $(':hover');
            var pixelId = "";
            for (let i = 0; i < hovered.length; i++) {
                if (hovered[i].id.startsWith("pixel")) {
                    pixelId = hovered[i].id;
                }
            }
            console.log(pixelId);
            $("#" + pixelId).css("background-color", color);
        });
    });

    $(document).mouseup(function () {
        $("#block").unbind("mousemove");
    });

    for (let i = 0; i < 256; i++) {
        var btn = `<button type="button" class="pixelbtn" id="pixel${i}" title="Click to paint pixel."></button>`;
        $("#block").append(btn);
    }


    for (let i = 0; i < 256; i++) {
        $(`#pixel${i}`).on("click", function() {
            $(`#pixel${i}`).css("background-color", color);
        });
        $(`#pixel${i}`).on("contextmenu", function() {
            $(`#pixel${i}`).css("background-color", "#0000");
            return false;
        });
    }


    delay(50);
    console.log("Init complete.");
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}