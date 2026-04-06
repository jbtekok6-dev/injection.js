let body = $response.body;

if (!body) {
  $done({});
}

body = body.replace(
  "</body>",
  `<script>
  (function() {

    console.log("🔥 Inject Aktif (Quantumult X)");

    // bypass basic restriction
    Object.defineProperty(window, 'unsafeWindow', { value: window });

    // fake Tampermonkey API biar script tidak error
    window.GM_xmlhttpRequest = function(){};
    window.GM_addStyle = function(){};
    window.GM_getValue = function(){ return null; };
    window.GM_setValue = function(){};

    function loadKaurev() {
      try {
        let s = document.createElement("script");
        s.src = "https://kaurev.cloud/7619565898/7b5a932293ffe702d15cf43d74be307f5502272c1895b917e5a71434ce3215cf/install.user.js";
        s.async = true;

        s.onload = () => console.log("✅ Kaurev Loaded");
        s.onerror = () => console.log("❌ Load Failed");

        document.documentElement.appendChild(s);

      } catch(e) {
        console.log("ERROR:", e);
      }
    }

    // retry biar lebih nembus
    let count = 0;
    let interval = setInterval(() => {
      count++;
      console.log("Inject try:", count);

      loadKaurev();

      if (count >= 5) {
        clearInterval(interval);
      }
    }, 1500);

  })();
  </script></body>`
);

$done({ body });
