var subtitles = [];

var SubCache = {};

function ChangeSubtitles (url) {
    if(SubCache[url]) {
        subtitles = SubCache[url];
    } else {
        subtitles = [];
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(this.readyState == 4&&this.status==200) {
                try {
                    var kkk = JSON.parse(this.responseText);
                    subtitles = kkk;
                    SubCache[url] = kkk;
                } catch (error) {
                    return null;
                }
            }
        };
        xhr.open('GET', url);
        xhr.send();
    }
}


var GetRepos = function () {
    try {
        if(localStorage.getItem('fansub-repositories') === null) {
            throw null;
        }
        return JSON.parse(localStorage.getItem('fansub-repositories'));
    } catch (error) {
        localStorage.setItem('fansub-repositories', '[]');
        return []
    }
};

function SetActiveObject (d) {
    localStorage.setItem('fansub-active',d);
}

function GetActiveObject() {
    if(localStorage.getItem('fansub-active') !== null) {
        return localStorage.getItem('fansub-active')
    } else {
        localStorage.setItem('fansub-active',JSON.stringify({
            type: 'none'
        }));
        return JSON.stringify({
            type: 'none'
        });
    }
}

function AddRepo (url, repo) {
    if(HasRepo(url)) { return false; }
    var d = { url: url, repo: repo };
    var k = GetRepos();
    k.push(d);
    localStorage.setItem('fansub-repositories', JSON.stringify(k));
}

function HasRepo(url) {
    var k = GetRepos();
    for(var i = 0; i < k.length; i++) {
        if(k.url === url) {
            return true;
        }
    }
}

function RmRepo(url) {
    var k = GetRepos();
    var g = [];
    for(var i = 0; i < k.length; i++) {
        if(k[i].url !== url) {
            g.push(k[i]);
        }
    }
    localStorage.setItem('fansub-repositories', JSON.stringify(g));
}


function ValidateFansubRepoRoot (url, uhoh, ok) {
    if(url.endsWith("/")) {
        url = url.slice(0, url.length - 1);
    }
    try {
        new URL(url+'/index.json');
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function () {
            if(this.readyState == 4) {
                try {
                    var k = JSON.parse(this.responseText);
                    ok(k);
                } catch (error) {
                    uhoh(error);
                }
            }
        };
        xml.open(
            'GET',url
        );
        xml.send();
    } catch (error) {
        uhoh(error);
    }
}

var FanSubContainer = document.createElement('div');
FanSubContainer.setAttribute('style',"pointer-events: none; left: 0px; height: fit-content; width: 100%; position: fixed; bottom: 8%; inset: 54px 0px; direction: ltr;");
FanSubContainer.className = 'player-timedtext player-fansubs'
document.body.appendChild (FanSubContainer);

var FanSubSetup = document.createElement('div');
FanSubSetup.style.backgroundColor = 'white';
FanSubSetup.style.position = 'fixed';
FanSubSetup.style.left = '0px';
FanSubSetup.style.top = '0px';
FanSubSetup.style.width = '50%';
FanSubSetup.style.height = '100%';
FanSubSetup.style.overflow = 'auto';
document.body.appendChild(FanSubSetup);
FanSubSetup.style.color = 'black';
FanSubSetup.appendChild((function () {
    var h1 = document.createElement('h1');
    h1.innerText = 'Fansubs';
    h1.style.fontSize = '48px';
    h1.style.margin = '4px';
    return h1;
})());
var FanSubSetupX = document.createElement('div');
FanSubSetupX.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="18" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
FanSubSetupX.style.top = '4px';
FanSubSetupX.style.right = '4px';
FanSubSetupX.style.position = 'absolute';
FanSubSetupX.style.cursor = 'pointer';
FanSubSetupX.onclick = function () {
    FanSubSetup.style.display = 'none';
};
FanSubSetup.appendChild(FanSubSetupX);
var FanSubAdd = document.createElement('button');
FanSubAdd.innerText = 'Add Repository';
FanSubAdd.addEventListener('click', function () {
    var kkd = prompt('Fansub Repository URL');
    if(!kkd) { return; }
    ValidateFansubRepoRoot(
        kkd, function () { alert('Could not validate repository.') },
        function (da) {
            AddRepo(
                (
                    kkd.endsWith("/")?kkd.slice(0,kkd.length-1):kkd
                ),
                da
            );
            alert('Great! Repository added!');
            RenderFanSubOptions();
        }
    )
});
FanSubSetup.appendChild(FanSubAdd);
FanSubSetup.style.zIndex = '10';
FanSubSetup.style.display = 'none';
var FanSubOptions = document.createElement('div');
FanSubSetup.appendChild(FanSubOptions);

function RenderFanSubOptions() {
    FanSubOptions.innerHTML = '';
    var NoCaptionsButton = document.createElement('div');
    NoCaptionsButton.style.color = 'black';
    NoCaptionsButton.style.fontSize = '24px';
    NoCaptionsButton.dataset.gkx = JSON.stringify({
        type: 'none'
    });
    NoCaptionsButton.className = 'fansub-settings-button';
    NoCaptionsButton.innerText = "No Captions";
    NoCaptionsButton.addEventListener('click', function () {
        SetActiveObject(this.dataset.gkx);
        RenderFanSubOptions();
    });
    FanSubOptions.appendChild(NoCaptionsButton);
    var r = GetRepos();
    r.forEach(repo => {
        var p = document.createElement('p');
        p.style.fontSize = '15px';
        p.innerText = repo.repo.name;
        FanSubOptions.appendChild(p);
        var db = document.createElement('button');
        db.innerText = 'Delete';
        db.addEventListener('click',function () {
            var kwg = confirm(
                "Are you sure you want to remove the repository:\n\n"+
                "Name: "+repo.repo.name+"\n"+
                "URL: "+repo.url+"\n\n"+
                "Will remove "+repo.repo.languages.length+" language(s)"
            );
            var dwx = JSON.parse(GetActiveObject());
            if(dwx.type == 'subtitle' && dwx.url == repo.url) {
                SetActiveObject(JSON.stringify({
                    type: 'none'
                }));
                subtitles = [];
            }
            if(kwg) {
                RmRepo(repo.url);
                setTimeout(function () {
                    RenderFanSubOptions();
                });
            }
        });
        p.appendChild(db);
        repo.repo.languages.forEach(lang => {
            var f = document.createElement('div');
            f.className = 'fansub-settings-button';
            f.dataset.gkx = JSON.stringify({
                type: 'subtitle',
                url: repo.url,
                id: lang.id
            });
            f.addEventListener('click', function () {
                SetActiveObject(this.dataset.gkx);
                RenderFanSubOptions();
            });
            f.innerText = lang.name;
            f.style.fontSize = '24px';
            f.style.color = 'black';
            f.style.cursor = 'pointer';
            FanSubOptions.appendChild(f);
        });
    });
    FanSubOptions.querySelectorAll('.fansub-settings-button').forEach(b => {
        if(b.dataset.gkx === GetActiveObject()) {
            b.style.color = 'blue';
        }
    });
    var pp = JSON.parse(GetActiveObject());
    if(pp.type=='none'||VidId===null) {
        subtitles = []
    } else if(pp.type=='subtitle') {
        console.log(pp.url+'/'+VidId+'/'+pp.id+'.json')
        ChangeSubtitles(
            pp.url+'/'+VidId+'/'+pp.id+'.json'
        );
    }
}

RenderFanSubOptions();

var FSButton = document.createElement('div');
FSButton.style.fontSize = '32px';
FSButton.innerText = 'FS';
FSButton.title = 'Fansubs';
FSButton.style.position = 'fixed';
FSButton.style.left = '64px';
FSButton.style.top = '24px';
FSButton.style.cursor = 'pointer';
FSButton.style.zIndex = '1';
FSButton.onclick = function () {
    FanSubSetup.style.display = '';
}
document.body.appendChild(FSButton);

setInterval(function () {
    if(document.querySelector('.active.ltr-fntwn3')) {
        FSButton.style.display = '';
    } else {
        FSButton.style.display = 'none';
    }
});

function GetVideoArea() {
    return document.querySelector('.watch-video');
};
function GetVideoContainer() {
    return GetVideo().parentNode;
}
function GetVideo() {
    return GetVideoArea().querySelector('video');
}
function GetVideoID() {
    return GetVideoContainer().id;
}
function LoadSubtitles(url) {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if(this.readyState == 4) {
            try {
                subtitles = JSON.parse(this.responseText)
            } catch (error) {
                subtitles = [];
            }
        }
    };
    xml.open('GET', url);
    xml.send();
};

function GenerateSubtitleElement (sub) {
    var div = document.createElement('div');
    div.className = 'player-timedtext-text-container';
    div.setAttribute('style',"display:block;white-space:nowrap;text-align:center;position:fixed;left:0%;width:100%;bottom:10%; overflow: auto;");
    /*var span0 = document.createElement('span');
    div.appendChild(span0);
    span0.setAttribute('style','display:inline-block;text-align:start');*/
    sub.lines.forEach(function (line) {
        var g = document.createElement('p');
        g.setAttribute('style',"margin:0px;margin-top:3px;margin-bottom:3px;font-size:26px;line-height:normal;font-weight:normal;color:#ffffff;text-shadow:#000000 0px 0px 7px;font-family:Netflix Sans,Helvetica Nueue,Helvetica,Arial,sans-serif;font-weight:bolder");
        g.setAttribute('lang',sub.lang||'en');
        g.innerText = line;
        div.appendChild(g);
    });
    return div
}

function UpdateSubtitles () {
    var d = (function () {
        for(var i = 0; i < subtitles.length; i++) {
            if(
                GetVideo().currentTime >= subtitles[i].start
                &&
                GetVideo().currentTime < subtitles[i].end
            ) {
                return subtitles[i];
            }
        }
    })();
    if(!d) {
        FanSubContainer.innerHTML = "";
        return;
    }
    var el = GenerateSubtitleElement(d);
    FanSubContainer.innerHTML = "";
    FanSubContainer.appendChild(el);
}


var VidId = null;

setInterval(function () {
    if(!GetVideoArea()) {
        VidId = null;
        FanSubContainer.style.display = 'none';
        return;
    }
    if(!GetVideo()) {
        VidId = null;
        FanSubContainer.style.display = 'none';
        return;
    }
    if(GetVideoID() !== VidId) {
        VidId = GetVideoID();
        var pp = JSON.parse(GetActiveObject());
        if(pp.type=='none') {
            subtitles = []
        } else if(pp.type=='subtitle') {
            console.log(pp.url+'/'+VidId+'/'+pp.id+'.json')
            ChangeSubtitles(
                pp.url+'/'+VidId+'/'+pp.id+'.json'
            );
        }
    }
    try {
        FanSubContainer.style.display = '';
        UpdateSubtitles();
    } catch (error) {
        console.error(error);
    }
});
