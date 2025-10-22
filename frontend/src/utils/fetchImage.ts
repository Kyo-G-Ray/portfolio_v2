import { getImageUrl } from './storage';




/**
 * workアイテムのリストに対して非同期で画像URLを取得し、
 * 新しいURLプロパティを追加したリストを返します。
 * * @param {Array<Object>} works - URLを取得したい work アイテムのリスト
 * @param {Function} getImageUrl - 画像ファイル名からURLを取得するための非同期関数
 * @param {string} scope - getImageUrl に渡すスコープ (例: 'public')
 * @returns {Promise<Array<Object>>} - imageUrl が追加された work アイテムのリスト
 */



export const fetchWorksWithUrls = async (works, getImageUrl, scope = 'public') => {
  if (!works || works.length === 0) {
    return [];
  }

  // 全ての work アイテムに対して非同期でURLを取得する Promise の配列を作成
  const worksWithUrlPromises = works.map(async (work) => {
    // getImageUrl は外部から渡される関数
    const imageUrl = await getImageUrl(work.image, scope);  // 画像ファイル取得

    return { 
      ...work,
      imageUrl: imageUrl  // 新しいプロパティとして imageUrl を追加
    };
  });

  // 全ての Promise が解決するのを待つ
  const worksWithUrls = await Promise.all(worksWithUrlPromises);

  return worksWithUrls;
};