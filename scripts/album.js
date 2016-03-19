/*****
  Summary: Creates HTML for a row corresponding to a song in the album-view-song-list table.
           Adds click and hover event handlers to the row.

  Input:   songNumber -- an INT representing the the number of the song in the album
           songName -- a STRING representing the name of the song
           songLength -- a STRING representing the song's duration in minutes and seconds

  Return:  The completed song row element
 ****/
var createSongRow = function(songNumber, songName, songLength) {
  var playButtonTemplate = '<a class="album-song-button hidden"><span class="ion-play"></span></a>';
  var pauseButtonTemplate = '<a class="album-song-button hidden"><span class="ion-pause"></span></a>';
  var songNumberTemplate = '<span class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</span>';

  var template =
    '<tr class="album-view-song-item">'
  + ' <td>' + songNumberTemplate + playButtonTemplate + pauseButtonTemplate + '</td>'
  + ' <td class="song-item-title">' + songName + '</td>'
  + ' <td class="song-item-duration">' + songLength + '</td>'
  + '</tr>'
  ;

  var $row = $(template);

  var clickHandler = function() {
    var $row = $(this);
    var $songItem = $row.find('.song-item-number');
    var $songItemNumber = parseInt($songItem.attr('data-song-number'));
    var togglePlayPause = function() {
      // show the pause button
      $row.find(".ion-pause").parent().toggleClass("hidden");
      // hide the play button
      $row.find(".ion-play").parent().toggleClass("hidden");
    };

    // if there isn't a song playing
    if (currentlyPlayingSongNumber === null) {
      togglePlayPause();
      // set the currently playing song to this song
      setSong($songItemNumber);
      // play the current song
      currentSoundFile.play();
      // update the song and play/pause display in the player bar
      updatePlayerBarSong();

    // if the song that's playing is the song we've clicked, we want to pause
    } else if (currentlyPlayingSongNumber === $songItemNumber) {
      if (currentSoundFile.isPaused()) {
        currentSoundFile.play();
        togglePlayPause();
        $('.main-controls .play-pause').html(playerBarPauseButton);
      } else {
        currentSoundFile.pause();
        togglePlayPause();
        // switch the player bar button to play
        $('.main-controls .play-pause').html(playerBarPlayButton);
      }

    // if the song that's playing is not the song we've clicked
    } else if (currentlyPlayingSongNumber !== $songItemNumber) {
      // find the currently playing song (not the newly clicked song)
      var $currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);

      // if the current song is paused
      if (currentSoundFile.isPaused()) {
        // hide the play button
        $currentlyPlayingSongElement.parent().find(".ion-play").parent().toggleClass("hidden");
      } else {
        // hide the pause button
        $currentlyPlayingSongElement.parent().find(".ion-pause").parent().toggleClass("hidden");
      }

      // show the number of the currently playing song
      $currentlyPlayingSongElement.toggleClass("hidden");
      // show the pause button on the new song
      togglePlayPause();
      // make the newly clicked song the currently playing song
      setSong($songItemNumber);
      // play currentSoundFile
      currentSoundFile.play();
      // show the info in the player song bar
      updatePlayerBarSong();
    }
  };

  var onHover = function(event) {
    var $row = $(this);
    var $songItem = $row.find(".song-item-number");
    var songItemNumber = parseInt($songItem.attr('data-song-number'));

    if (songItemNumber !== currentlyPlayingSongNumber) {
      // hide the number and unhide the play button
      $row.find(".song-item-number").toggleClass("hidden");
      $row.find(".ion-play").parent().toggleClass("hidden")
    }
  };

  var offHover = function(event) {
    var $row = $(this);
    var $songItem = $row.find(".song-item-number");
    var songItemNumber = parseInt($songItem.attr('data-song-number'));

    if (songItemNumber !== currentlyPlayingSongNumber) {
      $row.find(".song-item-number").toggleClass("hidden");
      $row.find(".ion-play").parent().toggleClass("hidden")
    }
  };

  $row.click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

/*****
  Summary: Sets the album information at the top of the album view
           Populates album-view-song-list with the album's songs via createSongRow()

  Input:   album - an album object as defined in fixtures.js

  Return:  Nothing
 ****/
var setCurrentAlbum = function(album) {
  currentAlbum = album;

  var $albumTitle =       $('.album-view-title');
  var $albumArtist =      $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage =       $('.album-view-cover-art');
  var $albumSongList =    $('.album-view-song-list');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for(var i = 0, j = album.songs.length; i < j; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

/*****
  Summary: finds the index of the given song in the album's songs array

  Input:   album - an album object as defined in fixtures.js
           song - a song object as definted in fixtures.js

  Return:  The index of the given song as an INT
 ****/
var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

/*****
  Summary: Changes the song title, artist name, play/pause button,
           and mobile display on the player bar

  Input:   None

  Return:  None
 ****/
var updatePlayerBarSong = function() {
  var $songNameHeading = $('.currently-playing .song-name');
  var $artistNameHeading = $('.currently-playing .artist-name');
  var $artistSongMobileHeading = $('.currenly-playing .artist-song-mobile');

  $songNameHeading.text(currentSongFromAlbum.title);
  $artistNameHeading.text(currentAlbum.artist);
  $artistSongMobileHeading.text(currentAlbum.artist + " " + currentSongFromAlbum.title);

  $('.main-controls .play-pause').html(playerBarPauseButton);
};

/*****
  Summary: Increment the index of the current song in the array

  Input:   None

  Return:  None
 ****/
var nextSong = function() {
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum); // returns 0-based index

  // if the current song isn't the last one, increment. Otherwise wrap back to the first
  if (currentSongIndex !== currentAlbum.songs.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }

  if (currentSoundFile.isPaused()) {
    // hide play button
    getSongNumberCell(currentlyPlayingSongNumber).parent().find(".ion-play").parent().toggleClass("hidden");
      } else {
    // hide the pause button on the currently playing song
    getSongNumberCell(currentlyPlayingSongNumber).parent().find(".ion-pause").parent().toggleClass("hidden");
  }

  // show currently playing song's number
  getSongNumberCell(currentlyPlayingSongNumber).parent().find(".song-item-number").toggleClass("hidden");

  // set new currently playing song
  setSong(currentSongIndex + 1);

  // play the new song
  currentSoundFile.play();

  // set new song's .song-item-number with a pause button
  getSongNumberCell(currentlyPlayingSongNumber).parent().find(".song-item-number").toggleClass("hidden");
  getSongNumberCell(currentlyPlayingSongNumber).parent().find(".ion-pause").parent().toggleClass("hidden");

  // update player bar with new song
  updatePlayerBarSong();
};

/*****
  Summary: Decrement the index of the current song in the array

  Input:   None

  Return:  None
 ****/
var previousSong = function() {
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

  // if the current song isn't the first one, decrement. Otherwise wrap back to the last
  if (currentSongIndex !== 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = currentAlbum.songs.length - 1;
  }

  if (currentSoundFile.isPaused()) {
    // hide play button
    getSongNumberCell(currentlyPlayingSongNumber).parent().find(".ion-play").parent().toggleClass("hidden");
      } else {
    // hide the pause button on the currently playing song
    getSongNumberCell(currentlyPlayingSongNumber).parent().find(".ion-pause").parent().toggleClass("hidden");
  }

  // show the index on the currently playing song
  getSongNumberCell(currentlyPlayingSongNumber).parent().find(".song-item-number").toggleClass("hidden");

  // set new currently playing song
  setSong(currentSongIndex + 1);

  // play the new song
  currentSoundFile.play();

  // set new song's .song-item-number with a pause button
  getSongNumberCell(currentlyPlayingSongNumber).parent().find(".song-item-number").toggleClass("hidden");
  getSongNumberCell(currentlyPlayingSongNumber).parent().find(".ion-pause").parent().toggleClass("hidden");

  // update player bar with new song
  updatePlayerBarSong();
};

var setSong = function(songNumber) {
  if (currentSoundFile) {
    // stop the currently playing song
    currentSoundFile.stop();
  }

  currentlyPlayingSongNumber = songNumber;
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: ["mp3"],
    preload: true
  });
  setVolume(currentVolume);
};

var setVolume = function(volume) {
  if (currentSoundFile) {
    currentSoundFile.setVolume(volume);
  }
};

var getSongNumberCell = function(songNumber) {
  return $('[data-song-number="' + songNumber + '"]');
};

var togglePlayFromPlayerBar = function() {
  var currentSong = getSongNumberCell(currentlyPlayingSongNumber);

  // if song is paused and play button is clicked
  if (currentlyPlayingSongNumber && currentSoundFile.isPaused()) {
    // change song number cell from play to pause
    currentSong.parent().find(".ion-play").parent().toggleClass("hidden");
    currentSong.parent().find(".ion-pause").parent().toggleClass("hidden");
    // change player bar's play button to pause
    $('.main-controls .play-pause').html(playerBarPauseButton);
    // play song
    currentSoundFile.play();

  // if song is playing and pause button is clicked
  } else if (currentlyPlayingSongNumber) {
    // change song number cell from pause to play
    currentSong.parent().find(".ion-play").parent().toggleClass("hidden");
    currentSong.parent().find(".ion-pause").parent().toggleClass("hidden");
    // change player bar's pause to play
    $('.main-controls .play-pause').html(playerBarPlayButton);
    // pause song
    currentSoundFile.pause();
  }
};

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playerBarPlayButton = $('.main-controls .play-pause');

$(document).ready(function() {
  setCurrentAlbum(albumAllHailWestTexas);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playerBarPlayButton.click(togglePlayFromPlayerBar);
});
