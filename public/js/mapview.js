function init(){

function showPosition(position) {

    var currloc = {
                                                 lat: position.coords.latitude,
                                                 lon: position.coords.longitude,
                                                 title: 'Your Location',
                                                 circle_options: {
                                                     radius: 160
                                                 },
                                                 stroke_options: {
                                                     strokeColor: '#aaaa00',
                                                     fillColor: '#eeee00'
                                                 }
                                                                            };
                                                                            flowloglocations.push(currloc);


                  if (maplace) {
                      maplace.RemoveLocations(1);
                      maplace.Load({locations: flowloglocations});
                  }


}

function updateuserlocation(){
console.log('blah blah');
 if (navigator.geolocation) {
       var t = navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log('navigator not supported by your browser');
    }

}



makepostcall('/getmapaggregates',{'start':0 , 'end': 2487025157},updatemap);
        maplace =
        new Maplace({
            locations: flowloglocations,
            map_div: '#myDiagramDiv',
            start: 10,
            view_all_text: 'Points of interest',
            type: 'circle',
            shared: {
                zoom: 2,
                //html: '%index'
            }
        }).Load();


}

 function updatemap(responsetxt){
    flowloglocations = JSON.parse(responsetxt);
    console.log(flowloglocations.length);
    for(var g in flowloglocations){
        if(!flowloglocations[g].lat){
            flowloglocations[g].lat = regionlocations[currregionindex].lat;
            flowloglocations[g].lon = regionlocations[currregionindex].lon;
        }
        flowloglocations[g].circle_options.radius = flowloglocations[g].circle_options.radius * 3000;
        if(flowloglocations[g].circle_options.radius < 150000){
            flowloglocations[g].circle_options.radius = 150000;
        }
        console.log(flowloglocations[g].circle_options.radius);
    }
                   if (maplace) {
                   console.log("am i here");
                       maplace.RemoveLocations(1);
                       maplace.Load({locations: flowloglocations});
                   }
  }