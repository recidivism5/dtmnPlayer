![Example image](https://github.com/recidivism5/dtmnPlayer/blob/master/example.PNG)

The following is a minimal example of dtmnPlayer:
```html
<!DOCTYPE html>
<html>
    <body>
        <audio class="dtmnPlayer" title="Amiss" src="amiss.mp3" preload="none"></audio>
        <script src="dtmnPlayer.js"></script>
    </body>
</html>
```
dtmnPlayer.js replaces all audio elements of class "dtmnPlayer" with dtmnPlayers on startup,
thus, you must include dtmnPlayer.js below the audio elements you wish to convert to dtmnPlayers.
Using `preload="none"` will prevent loading the audio file until the user presses play, which
may be useful if you have a page with many dtmnPlayers on it. It should decrease webtraffic by
only loading the audio files that the user chooses to play.

dtmnPlayer.js does not use any browser-specific styles. That means no webkit malarkey.
It should look the same on all modern browsers.

dtmnPlayer.js has no dependencies.