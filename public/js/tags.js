function inittagspage(){
var selectedtagsarray = Array.from(selectedtags);
var selectedtagsinnerhtml = "<ul>";
for(var t in selectedtagsarray){
   var key = selectedtagsarray[t].split("|")[0]; var value = selectedtagsarray[t].split("|")[1];
   selectedtagsinnerhtml = selectedtagsinnerhtml + "<li><a href=\"#\" onclick=\"deselecttag('"+  selectedtagsarray[t]  +"')\"><span>" + key + " - " + value  +"</span></a></li>"
}
selectedtagsinnerhtml = selectedtagsinnerhtml + "</ul>";
document.getElementById('selectedtags').innerHTML = selectedtagsinnerhtml;

var alltagsarray = Array.from(alltags);
var availabletagsinnerhtml = "<ul>";
for(var t in alltagsarray){
    var key = alltagsarray[t].split("|")[0]; var value = alltagsarray[t].split("|")[1]; var count = alltagsarray[t].split("|")[2];
    availabletagsinnerhtml = availabletagsinnerhtml +  "<li><a href=\"#\" onclick=\"selecttag('" + key + "|" + value +"')\">" + key + ":" + value + "[" + count +"]" +"</a></li>";
}
availabletagsinnerhtml = availabletagsinnerhtml + "</ul>";
document.getElementById('tags').innerHTML = availabletagsinnerhtml;

}

function storeselectedtags(){
    if(localStorage){
        var valuetostore = "";
        var selectedtagsarray = Array.from(selectedtags);
        for(var g in selectedtagsarray){
            if(g == 0){valuetostore = selectedtagsarray[g];}else{valuetostore = valuetostore + "00separator00" + selectedtagsarray[g];}
        }
        localStorage.setItem('selectedtags',valuetostore);
    }else{
        console.log('No Browser support for local storage');
    }
}

function deselecttag(newtag){
   selectedtags.delete(newtag);
   storeselectedtags();
    inittagspage();
}

function selecttag(newtag){
    selectedtags.add(newtag);
    storeselectedtags();
    inittagspage();
}