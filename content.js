var template = Handlebars.templates.appendage({text: "This works"});
$('p').append(template);
$('body').prepend('<div id="log"></div>')
$('.lf-logo').css('background-image', 'url('+chrome.runtime.getURL('images/focus.svg')+')');
$('.lf-logo').on('click', function() {
  var myExampleClickHandler = function (element) {
    debugger;
    console.log('Clicked element:', element);
    var hash = getElementHash($(element), event.target.nodeName);

    log1 = (hash !== "" ? hash : event.target.nodeName + " not hashable") + "<br />";
    log2 = "Test of " + event.target.nodeName + " would return " + (getElementByHash(hash) === null ? " No Match" : "Match") + "<br />"
    $("#log").append(log1);
    $("#log").append(log2);
    console.log(log1);
    console.log(log2);
    return false;
  }
  var myDomOutline = DomOutline({ onClick: myExampleClickHandler });
  // Start outline:
  myDomOutline.start();
  $(this).on('click', function() {
    myDomOutline.stop();
  })
})

function getElementHash(el, tag) {
    var hashKey = "H";
    var hashContent = $.trim(el.html());

    if (hashContent === "")
    {
        hashContent = getElementAttributes(el);
        if (hashContent !== "")
            hashKey = "A";
        else
            hashKey = "";
    }

    if (hashKey !== "")
        return(tag + ":" + hashKey + ":" + getHash(hashContent));
    else
        return "";
}

function getElementAttributes(el) {
   var allAttribs = el[0].attributes;
    attribs = "";
    for(var i=0;i<allAttribs.length;i++) {
        attribs += allAttribs[i].nodeName + "-" + allAttribs[i].nodeValue + ";";
    }
    return attribs;
}

function getElementByHash(hashValue)
{
    var el = null;
    var frags = hashValue.split(":");
    if (frags.length !== 3)
        return null;
    else
    {
        var tag = frags[0];
        var hashKey = frags[1];
        var hash = parseInt(frags[2]);

        $("body " + tag).each(function() {
            if (hashKey == "H") {
                if ((getHash($(this).html()) - hash) == 0) {
                    el = $(this);
                    return false;
                }
            } else {
                if ((getHash(getElementAttributes($(this))) - hash) == 0) {
                    el = $(this);
                    return false;
                }
            }
        });
    }
    return el;
}

function getHash(s) {
        var hash = 0;
        for (var i = 0; i < s.length; i++) {
                hash = parseInt(s.charCodeAt(i)) + ( parseInt(hash << 5) - parseInt(hash) );
        }
        return hash;
}
