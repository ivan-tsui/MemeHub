// https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function getMemeId(element) {
    return element.attr("id").split("-").slice(-1)[0];
}


$("p[id^='tabselect-translations']").click(function() {
    var memeId = getMemeId($(this));
    if ($("#tab-translations-" + memeId).is(":hidden")) {
        //switch tabs
        $("#tab-comments-" + memeId).hide();
        $("#tab-translations-" + memeId).show();
        //change selected tab
        $("#tabview-comments-" + memeId).removeClass("meme-tab-selected");
        $("#tabview-comments-" + memeId).addClass("meme-tab-unselected");
        $("#tabview-translations-" + memeId).removeClass("meme-tab-unselected");
        $("#tabview-translations-" + memeId).addClass("meme-tab-selected");
    }
});

$("p[id^='tabselect-comments']").click(function() {
    var memeId = getMemeId($(this));
    if ($("#tab-comments-" + memeId).is(":hidden")) {
        //switch tabs
        $("#tab-translations-" + memeId).hide();
        $("#tab-comments-" + memeId).show();
        //change selected tab
        $("#tabview-translations-" + memeId).removeClass("meme-tab-selected");
        $("#tabview-translations-" + memeId).addClass("meme-tab-unselected");
        $("#tabview-comments-" + memeId).removeClass("meme-tab-unselected");
        $("#tabview-comments-" + memeId).addClass("meme-tab-selected");
    }
});


$("span[id^='option-translation-view']").click(function() {
    var memeId = getMemeId($(this));
    if ($.trim($(this).text()) == "View More") {
        $("div[id^='translation-{0}-']".format(memeId)).each(function() {
            if (!$(this).attr("id").endsWith("-1")) { //ignore first element
                $(this).show();
            }
        });
        $(this).text("View Less");
    } else if ($.trim($(this).text()) == "View Less") {
        $("div[id^='translation-{0}-']".format(memeId)).each(function() {
            if (!$(this).attr("id").endsWith("-1")) { //ignore first element
                $(this).hide();
            }
        });
        $(this).text("View More");
    }
});

$("span[id^='option-translation-add']").click(function() {
    var memeId = getMemeId($(this));
    
    if ($("#translation-form-" + memeId).is(':hidden')) {
        $("#translation-form-" + memeId).show();
        $(this).text("Hide Add Translation");
    } else {
        $("#translation-form-" + memeId).hide();
        $(this).text("Add Translation");
    }
});


$("span[id^='star-']").click(function() {
    var memeId = getMemeId($(this));
    var starNum = parseInt($(this).attr("id").split("-")[1]);
    
    var stars = [];
    //clear rating
    $("span[id^='star-']").each(function (){
       if ($(this).attr("id").endsWith("-" + memeId)) {
           $(this).text("☆");
           stars.push($(this));
       } 
    });
    
    //fill ratting appropriately
    for (var i = 0; i < stars.length; i++) {
        if (parseInt(stars[i].attr("id").split("-")[1]) <= starNum) {
            stars[i].text("★");
        }
    }
});






$("span[id^='vote-up-']").click(function () {
    var voteId = $(this).attr("id").split("vote-up-")[1];

    //check vote states
    if ($("#vote-down-" + voteId).hasClass("vote-selected"))  {
        //downvote already ticked, untick before changing score
        $("#vote-down-" + voteId).click();
        $(this).addClass("vote-selected");
        $("#score-" + voteId).text(parseInt($("#score-" + voteId).text()) + 1);
    } else if ($(this).hasClass("vote-selected")) {
        //upvote already ticked, reverse vote
        $(this).removeClass("vote-selected");
        $("#score-" + voteId).text(parseInt($("#score-" + voteId).text()) - 1);
    } else {
        //neither arrow ticked, safe to change score
        $(this).addClass("vote-selected");
        $("#score-" + voteId).text(parseInt($("#score-" + voteId).text()) + 1);
    }
});

$("span[id^='vote-down-']").click(function() {
    var voteId = $(this).attr("id").split("vote-down-")[1];

    //check vote states
    if ($("#vote-up-" + voteId).hasClass("vote-selected")) {
        //upvote already ticked, untick before changing score
        $("#vote-up-" + voteId).click();
        $(this).addClass("vote-selected");
        $("#score-" + voteId).text(parseInt($("#score-" + voteId).text()) - 1);
    } else if ($(this).hasClass("vote-selected")) {
        //downvote already ticked, reverse vote
        $(this).removeClass("vote-selected");
        $("#score-" + voteId).text(parseInt($("#score-" + voteId).text()) + 1);
    } else {
        //neither arrow ticked, safe to change score
        $(this).addClass("vote-selected");
        $("#score-" + voteId).text(parseInt($("#score-" + voteId).text()) - 1);
    }
});



$("#share-close").click(function() {
    $("#popup-share").hide();
    $("#fade").hide();
});

$("span[id^='share-']").click(function() {
    $("#fade").show();
    $("#popup-share").show();
});

$("#share-clipboard").click(function() {
    var copyText = document.getElementById("share-link");
    copyText.select();
    document.execCommand("Copy");
    
    toastr.info("Link copied to clipboard")
});


$("#layout-vertical").click(function() { 
    if ($(this).hasClass("layout-select-unselected")) {
        //change layout
        //1. hide left/right arrows
        $("span[id^='memenav-']").each(function() {
           $(this).hide(); 
        });
        //2. unhide all memes
        $("div[id^='meme-']").each(function() { 
           $(this).show();
        });
        
        //change selection display
        $(this).removeClass("layout-select-unselected");
        $(this).addClass("layout-select-selected");
        $("#layout-horizontal").addClass("layout-select-unselected");
        $("#layout-horizontal").removeClass("layout-select-selected");
    }
});

$("#layout-horizontal").click(function() {
    if ($(this).hasClass("layout-select-unselected")) {
        //change layout
        //1. unhide left/right arrows
        $("span[id^='memenav-']").each(function() {
           $(this).show(); 
        });
        //2. hide all but first meme
        $("div[id^='meme-']").each(function() { 
           $(this).hide();
        });
        $("#meme-1").show();
        
        //change selection display
        $(this).removeClass("layout-select-unselected");
        $(this).addClass("layout-select-selected");
        $("#layout-vertical").addClass("layout-select-unselected");
        $("#layout-vertical").removeClass("layout-select-selected");
    }
});


//TODO: hide arrows when no memes to left or right?
$("span[id^='memenav-left-']").click(function() {
    var memeId = parseInt($(this).attr("id").split("-")[2]);
    if ($("#meme-" + (memeId - 1)).length) {
        $("#meme-" + memeId).hide();
        $("#meme-" + (memeId - 1)).show();
    }
});

$("span[id^='memenav-right-']").click(function() {
    var memeId = parseInt($(this).attr("id").split("-")[2]);
    if ($("#meme-" + (memeId + 1)).length) {
        $("#meme-" + memeId).hide();
        $("#meme-" + (memeId + 1)).show();
    }
});


$("#create").click(function() {
    $("#fade").show();
    $("#popup-create").show(); 
});

$("#create-cancel").click(function() {
    //reset form
    $("#create-upload-image").removeAttr("src");
    //fix upload button
    $("#create-upload-button").css("opacity", "100");
    $("#create-upload-button").css("cursor", "pointer");
    //fix image size
    $("#create-upload-image").css("width", "20em")
    $("#create-upload-image").css("height", "15em");
    //clear inputs
    $("#create-title").val("");
    $("#create-tags").val("");
    
    //hide popup
    $("#popup-create").hide();
    $("#fade").hide();
});

$("#create-upload-button").click(function() {
    $("#create-upload-input").trigger("click");
});

$("#create-upload-input").change(function() {
    previewImage(this);
});

// https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
function previewImage(input) {
    console.log("trigger");
    
    if (input.files && input.files[0]) {
        console.log("read");
        var reader = new FileReader();

        reader.onload = function(e) {
            //set image source
            $('#create-upload-image').attr('src', e.target.result);
            //hide upload button
            $("#create-upload-button").css("opacity", "0");
            $("#create-upload-button").css("cursor", "default");
            //fix image size
            $("#create-upload-image").css("width", "400px")
            $("#create-upload-image").css("height", "auto");
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#create-publish").click(function() {
    $("#popup-create").hide();
    $("#fade").hide();
    toastr.success("Meme created!");
});

$("#fade").click(function() {
    $("div[id^='popup-']").each(function() {
        $(this).hide(); 
    });
    $(this).hide();
})


$(document).keydown(function(e) {
    //ensure keypress isn't in a form
    var elementTag = $(document.activeElement).prop("tagName");
    if (elementTag == "INPUT" || elementTag == "TEXTAREA") {
        return;
    }
    
    if ($("#layout-horizontal").hasClass("layout-select-selected")) { //horizontal layout active
        //find visible meme
        var meme;
        $("div[id^='meme-']").each(function() {
            if (!$(this).is(":hidden")) {
                meme = $(this);
                return;
            }
        })
        var memeId = meme.attr("id").split("-")[1];
        
        if (e.keyCode == 37) { //left
            $("#memenav-left-" + memeId).click();
        } else if (e.keyCode == 39) { //right
            $("#memenav-right-" + memeId).click();
        }
    }
});