const $ = require('jquery');

class Location {

    private base: string = 'https://vk.com';

    public is(location) {
        return (window.location.href.indexOf(location) > -1);
    }

    public isNot(location) {
        return (!this.is(location));
    }

    public set(location) {
        window.location.href = this.base + location;
    }


//
//     $(window).on('popstate', function(e){
//
//     console.log('popstate', e);
//
//     if(e.url.indexOf(location) > -1){
//         callbackfn();
//     }
//
// });

}

let location = new Location();
export { location };