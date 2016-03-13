/*****
  Summary: Creates HTML for a row corresponding to a song in the album-view-song-list table.
           Adds click and hover event handlers to the row.

  Input:   songNumber -- an INT representing the the number of the song in the album
           songName -- a STRING representing the name of the song
           songLength -- a STRING representing the song's duration in minutes and seconds

  Return:  The completed song row element
 ****/
var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
  + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
  + ' <td class="song-item-title">' + songName + '</td>'
  + ' <td class="song-item-duration">' + songLength + '</td>'
  + '</tr>'
  ;

  var $row = $(template);

  var clickHandler = function() {
    var $songItem = $(this).find('.song-item-number');
    var $songItemNumber = $songItem.attr('data-song-number');

    // if there isn't a song playing, set the clicked song item number to pause
    if (currentlyPlayingSongNumber === null) {
      $songItem.html(pauseButtonTemplate);
      currentlyPlayingSongNumber = $songItemNumber;
      currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1];
      updatePlayerBarSong();

    // if the song that's playing is the song we've clicked, change to play button
    } else if (currentlyPlayingSongNumber === $songItemNumber) {
      $songItem.html(playButtonTemplate);
      currentlyPlayingSongNumber = null;
      currentSongFromAlbum = null;
      $('.main-controls .play-pause').html(playerBarPlayButton);

    // if the song that's playing is not the song we've clicked, change the clicked song's number
    // to pause button and change the previously playing song's pause button to number
    } else if (currentlyPlayingSongNumber !== $songItemNumber) {
      var $currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSongNumber + '"]');
      $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
      $songItem.html(pauseButtonTemplate);
      currentlyPlayingSongNumber = $songItemNumber;
      currentSongFromAlbum = currentAlbum.songs[currentlyPlayingSongNumber - 1];
      updatePlayerBarSong();
    }
  };

  var onHover = function(event) {
    // we don't need to check that the parent element matches ".album-view-song-item"
    //   because we're calling onHover on $row, which represents "this" below
    //   and $row will always have a the same structure (see createSongRow)
    var $songItem = $(this).find(".song-item-number");
    var songItemNumber = $songItem.attr('data-song-number');

    if (songItemNumber !== currentlyPlayingSongNumber) {
      $songItem.html(playButtonTemplate);
    }
  };

  var offHover = function(event) {
    var $songItem = $(this).find(".song-item-number");
    var songItemNumber = $songItem.attr('data-song-number');

    if (songItemNumber !== currentlyPlayingSongNumber) {
      $songItem.html(songItemNumber);
    }
  };

  // This is how it's setup in the checkpoint --
  //   $row.find('.song-item-number').click(clickHandler);
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

  // change text to current song name
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
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  var previousSongIndex = currentSongIndex;
  currentSongIndex++;
  console.log(currentSongIndex, previousSongIndex);

  // update the previous song's number with a number
  $('.song-item-number[data-song-number*="' + (previousSongIndex + 1) + '"]').html(previousSongIndex + 1);

  // set new current song
  currentlyPlayingSongNumber = currentSongIndex;
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

  // set new song's .song-item-number with a pause button
  $('.song-item-number[data-song-number*="' + currentSongIndex + '"]').html(pauseButtonTemplate);

  // update player bar with new song
  updatePlayerBarSong();
};

/*****
  Summary: Decrement the index of the current song in the array

  Input:   None

  Return:  None
 ****/
var previousSong = function() {};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
  setCurrentAlbum(albumAllHailWestTexas);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});
