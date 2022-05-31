function dtmnImplementation()
{
    let updaters = new Map();
    function change_volume(e){
        if (e.buttons === 1)
        {
            let p = this.querySelector(".dtmnProgress");
            p.style.width = Math.min(100 * e.offsetX / this.clientWidth, 100) + "%";
            this.parentElement.querySelector(".dtmnAudio").volume = p.style.width.slice(0,-1) / 100;
        }
    }
    function play(){
        let a = this.parentElement.querySelector(".dtmnAudio");
        a.volume = this.parentElement.querySelector(".dtmnVolume").querySelector(".dtmnProgress").style.width.slice(0,-1) / 100;
        let pl = this.querySelector(".dtmnIcon-play");
        let pa = this.querySelector(".dtmnIcon-pause");
        let tp = this.parentElement.querySelector(".dtmnTimeline").querySelector(".dtmnProgress");
        if (a.paused)
        {
            a.play();
            pl.style.display = "none";
            pa.style.display = "block";
            updaters.set(a, setInterval(function(){
                tp.style.width = (100 * a.currentTime / a.duration) + "%";
            },200));
        }
        else
        {
            a.pause();
            pl.style.display = "block";
            pa.style.display = "none";
            clearInterval(updaters.get(a));
        }
    }
    function seek(e){
        let a = this.parentElement.querySelector(".dtmnAudio");
        if (a.readyState && (e.buttons === 1))
        {
            let tp = this.querySelector(".dtmnProgress");
            a.currentTime = a.duration * (e.offsetX / this.clientWidth);
            tp.style.width = (100 * a.currentTime / a.duration) + "%";
        }
    }
    let styleStr = `
        .dtmnBase {
            background: #1E1E1E;
            color:#f6dab6;
            font-family:'Courier New', Courier, monospace;
        }
        .dtmnPlayer {
            background: #1E1E1E;
            color:#f6dab6;
            font-family:'Courier New', Courier, monospace;
            margin-bottom:8px;
            border-style:solid;
            border-width:1px;
        }
        .dtmnControls {
            display:flex;
        }
        .dtmnButton {
            background-color: transparent;
            border-style:solid;
            border-width:1px;
            border-color:#f6dab6;
            margin-left:8px;
            margin-bottom:8px;
            margin-right:8px;
            cursor:pointer;
        }
        .dtmnIcon {
            stroke:#f6dab6;
            stroke-width:2;
            fill:#1E1E1E;
        }
        .dtmnSpeaker {
            margin-left:8px;
            margin-right:8px;
            margin-top:4px;
        }
        .dtmnTitle {
            font-size:24px;
            margin-left:4px;
        }
        .dtmnSlider {
            height:38px;
            border-style:solid;
            border-width:1px;
            border-color:#f6dab6;
            position: relative;
            cursor: pointer;
        }
        .dtmnTimeline {
            width:60%;
        }
        .dtmnVolume {
            width:20%;
        }
        .dtmnProgress {
            background:#f6dab6;
            width:0%;
            height:100%;
        }
        .dtmnIcon-play {
            display:block;
            margin-top:2px;
            margin-bottom:2px;
        }
        .dtmnIcon-pause {
            display:none;
            margin-top:2px;
            margin-bottom:2px;
        }
    `;
    let templateStr = `
        <div class="dtmnTitle dtmnBase"></div>
        <div class="dtmnControls dtmnBase">
            <audio class="dtmnAudio" src="" preload="none"></audio>
            <button class="dtmnButton dtmnPlay">
                <svg class="dtmnIcon dtmnIcon-play" width="28" height="32">
                    <polygon points="1,1 1,31 27,16"/>
                </svg>
                <svg class="dtmnIcon dtmnIcon-pause" width="28" height="32">
                    <polygon points="1,1 1,31 10,31 10,1"/>
                    <polygon points="18,1 18,31 27,31 27,1"/>
                </svg>
            </button>
            <div class="dtmnSlider dtmnTimeline">
                <div class="dtmnProgress"></div>
            </div>
            <svg class="dtmnIcon dtmnSpeaker" width="30" height="30">
                <polygon points="1,10 1,20 10,20 20,30 20,1 10,10"/>
                <path d="M25,30 Q30,15 25,1"/>
            </svg>
            <div class="dtmnSlider dtmnVolume">
                <div class="dtmnProgress"></div>
            </div>
            <a class="dtmnDownload-anchor" download>
                <button class="dtmnButton dtmnDownload">
                    <svg class="dtmnIcon dtmnIcon-play" width="30" height="32">
                        <path d="M0,29 30,29"/>
                        <path d="M4,18 15,24 26,18"/>
                        <path d="M15,0 15,24"/>
                    </svg>
                </button>
            </a>
        </div>
    `;
    let style = document.createElement("style");
    style.innerHTML = styleStr;
    document.head.appendChild(style);
    let nodes = document.getElementsByClassName("dtmnPlayer");
    for (let i = 0; i < nodes.length; i++)
    {
        let p = document.createElement("div");
        p.classList.add("dtmnPlayer");
        p.innerHTML = templateStr;
        p.querySelector(".dtmnTitle").textContent = nodes[i].title;

        p.querySelector(".dtmnAudio").src = nodes[i].src;

        let volumeSlider = p.querySelector(".dtmnVolume");
        volumeSlider.querySelector(".dtmnProgress").style.width = 70 + "%";
        volumeSlider.addEventListener("mousedown", change_volume);
        volumeSlider.addEventListener("mousemove", change_volume);

        let playButton = p.querySelector(".dtmnPlay");
        playButton.addEventListener("mousedown", play);

        let tl = p.querySelector(".dtmnTimeline");
        tl.addEventListener("mousedown", seek);
        tl.addEventListener("mousemove", seek);

        let dlA = p.querySelector(".dtmnDownload-anchor");
        dlA.href = nodes[i].src;

        nodes[i].replaceWith(p);
    }
}
dtmnImplementation();