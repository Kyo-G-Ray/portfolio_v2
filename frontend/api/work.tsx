// src/api/interview.ts
import { API_URL } from './base';



/**
 * Strapiから制作実績のデータを取得する関数
 * @returns 制作実績データの配列 (Promise)
 */
export async function fetchWorks() {
  try {

    const response = await fetch(`${API_URL}/works?populate=*`);
    
    // エラーハンドリング
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Strapi v4のレスポンス形式に合わせてデータを整形して返す
    // data.dataがコンテンツの配列
    return data.data || [];

  } catch (error) {
    console.error("データの取得中にエラーが発生しました:", error);
    return []; // エラー時は空の配列を返す
  }
}