import { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/storage';
import { fetchDataWithImageUrl } from '../utils/fetchImage';




export function FaviconManager() {
  const isLocalDev = import.meta.env.VITE_DEV;

  const [isFaviconSet, setIsFaviconSet] = useState(false);


  // 実際にhead内のタグを書き換え
  const updateFavicon = (urls: {
    faviconWebp?: string;
    faviconPng?: string;
    appleTouch?: string;
  }) => {
    // favicon.webp
    if (urls.faviconWebp) {
      let linkWebp =
        document.querySelector("link[rel='icon'][type='image/webp']") ||
        document.createElement("link");
      linkWebp.rel = "icon";
      linkWebp.type = "image/webp";
      linkWebp.href = urls.faviconWebp;
      document.head.appendChild(linkWebp);
    }

    // favicon.png
    if (urls.faviconPng) {
      let linkPng =
        document.querySelector("link[rel='icon'][type='image/png']") ||
        document.createElement("link");
      linkPng.rel = "icon";
      linkPng.type = "image/png";
      linkPng.href = urls.faviconPng;
      document.head.appendChild(linkPng);
    }

    // apple-touch-icon
    if (urls.appleTouch) {
      let appleLink =
        document.querySelector("link[rel='apple-touch-icon']") ||
        document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      appleLink.href = urls.appleTouch;
      document.head.appendChild(appleLink);
    }
  };


  // 本番ではDBやStorageからfaviconのURLを取得
  const fetchFavicon = async () => {
    // 取得したい画像を3種類指定
    const faviconList = [
      { image: "favicon.webp" },
      { image: "favicon.png" },
      { image: "favicon.webp" },
    ];

    // 画像URLをfetchDataWithImageUrl経由で取得
    const faviconData = await fetchDataWithImageUrl(faviconList, getImageUrl, "public");

    if (!faviconData || faviconData.length === 0) return;

    // 各ファイルを判別してURLをセット
    const urls: {
      faviconWebp?: string;
      faviconPng?: string;
      appleTouch?: string;
    } = {};

    faviconData.forEach((item) => {
      if (item.image.includes("favicon.webp")) {
        urls.faviconWebp = item.imageUrl;
      } else if (item.image.includes("favicon.png")) {
        urls.faviconPng = item.imageUrl;
      } else if (item.image.includes("apple-touch-icon")) {
        urls.appleTouch = item.imageUrl;
      }
    });

    updateFavicon(urls);
  };



  useEffect(() => {
    if (isFaviconSet) return; // 一度設定済みなら処理しない


    if (!isLocalDev) {
      console.log("prod favicon fetch...");
      fetchFavicon();
    }

    else {
      console.log("dev favicon fetch...");
      const localFaviconUrl = {
        faviconWebp: import.meta.env.VITE_FAVICON,
        faviconPng: import.meta.env.VITE_FAVICON,
        appleTouch: import.meta.env.VITE_FAVICON,
      };
      updateFavicon(localFaviconUrl);
    }

    setIsFaviconSet(true);
  }, [isLocalDev, isFaviconSet]);


  return null; // UIは不要
};

