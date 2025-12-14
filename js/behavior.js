document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');
    const btnHe = document.getElementById('btn-hehao');
    const btnBu = document.getElementById('btn-buyao');
    let n = 0; // number of clicks on "不要"

    const messages = [
        '對不起，我知道錯了',
        '想吃甚麼都買給你!',
        '拜託嘛，我的寶貝',
        '女人，你在玩火!',
        '寶寶求求你嘛，我要哭惹哦'
    ];

    // store wrapper references and base widths so we can reserve space
    const heWrap = btnHe.parentElement;
    const buWrap = btnBu.parentElement;
    const baseHeWidth = Math.max(heWrap.offsetWidth, btnHe.offsetWidth);
    const baseBuWidth = Math.max(buWrap.offsetWidth, btnBu.offsetWidth);

    function applyState() {
        const imgIndex = 1 + n;
        hero.style.backgroundImage = `url('img/nono${imgIndex}.jpg')`;
        const scale = n + 1;
        // Only scale the "和好" button visually
        btnHe.style.transform = `scale(${scale})`;
        btnHe.style.transformOrigin = 'center';

        // Don't scale "不要"
        btnBu.style.transform = '';

        // Reserve enough layout space in wrappers so the scaled "和好" doesn't overlap the other button.
        // Apply safety factor to account for transform overflow/padding.
        const safety = 1.3;
        heWrap.style.width = Math.ceil(baseHeWidth * scale * safety) + 'px';
        // keep buWrap at base size (with safety) so it remains stable
        buWrap.style.width = Math.ceil(baseBuWidth * safety) + 'px';
    }

    // 點擊「不要」：圖片輪替、和好放大、並改按鈕文字（輪替）
    function handleBuClick() {
        n += 1;
        applyState();
        const msg = messages[(n - 1) % messages.length];
        btnBu.textContent = msg;
    }

    // 點擊「和好」：顯示 nono7 並隱藏「不要」按鈕，並改和好文字
    function handleHeClick() {
        hero.style.backgroundImage = "url('img/nonono.jpg')";
        btnBu.style.display = 'none';
        btnHe.textContent = '我們天下第一好!!';
    }

    // safety: ensure elements exist
    if (!hero || !btnHe || !btnBu) return;

    // initial state
    applyState();

    btnBu.addEventListener('click', handleBuClick);
    btnHe.addEventListener('click', handleHeClick);
});
