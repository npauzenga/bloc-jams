var albumAllHailWestTexas = {
  title: "All Hail West Texas",
  artist: "The Mountain Goats",
  label: "Rough Trade",
  year: "2001",
  albumArtUrl: "assets/images/album_covers/01.png",
  songs: [
    { title: "Blue", duration: "4:26" },
    { title: "Green", duration: "3:26" },
    { title: "Red", duration: "4:16" },
    { title: "Pink", duration: "4:24" },
    { title: "Magenta", duration: "6:26" }
  ]
};

var albumLifeAndDeath = {
  title: "Life and Death of an American Fourtracker",
  artist: "John Vanderslice",
  label: "Barsuk",
  year: "2003",
  albumArtUrl: "assets/images/album_covers/01.png",
  songs: [
    { title: "Blue", duration: "4:26" },
    { title: "Green", duration: "3:26" },
    { title: "Red", duration: "4:16" },
    { title: "Pink", duration: "4:24" },
    { title: "Magenta", duration: "6:26" }
  ]
};

var albumKnowByHeart = {
  title: "Know by Heart",
  artist: "American Analog Set",
  label: "Tiger Style",
  year: "2001",
  albumArtUrl: "assets/images/album_covers/01.png",
  songs: [
    { title: "Punk as Fuck", duration: "4:09" },
    { title: "The Only One", duration: "2:16" },
    { title: "Like Foxes Through Fences", duration: "3:37" },
    { title: "The Postman", duration: "2:59" },
  ]
};

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
    // this should refer to the $row
    var $songItem = $(this).find('.song-item-number');
    var $songItemNumber = $songItem.attr('data-song-number');

    // if there isn't a song playing, set the clicked song item number to pause
    if (currentlyPlayingSong === null) {
      $songItem.html(pauseButtonTemplate);
      currentlyPlayingSong = $songItemNumber

    // if the song that's playing is the song we've clicked, change to play button
    } else if (currentlyPlayingSong === $songItemNumber) {
      $songItem.html(playButtonTemplate);
      currentlyPlayingSong = null;

    // if the song that's playing is not the song we've clicked, change the clicked song's number
    // to pause button and change the previously playing song's pause button to number
    } else if (currentlyPlayingSong !== $songItemNumber) {
      var $currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSong + '"]');
      $currentlyPlayingSongElement.html($currentlyPlayingSongElement.attr('data-song-number'));
      $songItem.html(pauseButtonTemplate);
      currentlyPlayingSong = $songItemNumber;
    }
  };

  var onHover = function(event) {
    // we don't need to check that the parent element matches ".album-view-song-item"
    //   because we're calling onHover on $row, which represents "this" below
    //   and $row will always have a the same structure (see createSongRow)
    var $songItem = $(this).find(".song-item-number");
    var songItemNumber = $songItem.attr('data-song-number');

    if (songItemNumber !== currentlyPlayingSong) {
      $songItem.html(playButtonTemplate);
    }
  };

  var offHover = function(event) {
    var $songItem = $(this).find(".song-item-number");
    var songItemNumber = $songItem.attr('data-song-number');

    if (songItemNumber !== currentlyPlayingSong) {
      $songItem.html(songItemNumber);
    }
  };

  // This is how it's setup in the checkpoint --
  //   $row.find('.song-item-number').click(clickHandler);
  $row.click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) {
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

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

$(document).ready(function() {
  setCurrentAlbum(albumAllHailWestTexas);
});


