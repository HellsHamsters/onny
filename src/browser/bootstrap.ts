// Start activities after window loaded

window.addEventListener('load', ()  => {

    console.log('Onny Preloaded');

    // Inject jQuery

    (<any>window).$ = (<any>window).jQuery = require('jquery');
    let $ = require('jquery');

    // Common UI fixes

    $('#page_header_cont').remove();
    $('#page_body').css('margin', '0 0 0 0');
    $('#footer_wrap').remove();
    $('.chat_onl_inner').remove();

    // UI fixes for Audio

    $('#side_bar').remove();
    $('#page_body').css('width', '965px');
    $('.audio_rows_header').css('width', '720px').css('top', 0);

    // Bind VK controls

    let $vkControls = $('.audio_rows_header');

    let $vkControlPlay = $vkControls.find('.audio_page_player_play');
    let $vkControlPrev = $vkControls.find('.audio_page_player_prev');
    let $vkControlNext = $vkControls.find('.audio_page_player_next');

    let $vkPerformer = $('.audio_page_player_title_performer');
    let $vkSong = $('.audio_page_player_title_song');

    // Location changes listener

    let location = require('./location').location;

    if(location.is('/login')){
        // @TODO
    }

    if(!location.is('/login') && !location.is('/audio')){
        location.set('/audio');
    }

    // IPC Listener from global hotkeys

    let ipc = require('electron').ipcRenderer;

    ipc.on('control', function(event, arg){

        switch(arg){
            case 'play-pause':
                $vkControlPlay.click();
                break;
            case 'play-prev':
                $vkControlPrev.click();
                break;
            case 'play-next':
                $vkControlNext.click();
                break;
        }

        notifyAboutSong($vkPerformer.text(), $vkSong.text());

    });

});

function notifyAboutSong(performer, song){

    song = song.replace('–', '');

    let notification = require('./notification').notification;
    notification.send(performer, song);

}