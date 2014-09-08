/**
 * 
 * @module userConfig
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */

'use strict';


(function(exports){

    exports.base = {
        username: '',
        email: '',
        description: '',
        points: 0,
        chunks: [],
        squares: {
            like: [],
            dislike: []
        }
    };

    exports.reserved = [
        'admin',
        'administrator',
        'cloud',
        'cloudsq',
        'cloudsquare',
        'square',
        'gbabula',
        'babula',
        'greg',
        'gregbabula'
    ];

    exports.banned = [
        'anal',
        'anus',
        'arse',
        'ass',
        'ballsack',
        'balls',
        'bastard',
        'bitch',
        'biatch',
        'bloody',
        'blowjob',
        'bollock',
        'bollok',
        'boner',
        'boob',
        'bugger',
        'bum',
        'butt',
        'buttplug',
        'clitoris',
        'cock',
        'coon',
        'crap',
        'cunt',
        'damn',
        'dick',
        'dildo',
        'dyke',
        'fag',
        'facebook',
        'feck',
        'fellate',
        'fellatio',
        'felching',
        'fuck',
        'fudgepacker',
        'flange',
        'homo',
        'jizz',
        'knobend',
        'labia',
        'muff',
        'nigger',
        'nigga',
        'penis',
        'piss',
        'poop',
        'prick',
        'pube',
        'pussy',
        'queer',
        'scrotum',
        'sex',
        'shit',
        'sh1t',
        'slut',
        'smegma',
        'spunk',
        'tit',
        'twit',
        'twitter',
        'tosser',
        'turd',
        'twat',
        'vagina',
        'wank',
        'whore'
    ];

})(typeof exports === 'undefined'? this['userConfig']={}: exports);
