// src/api/interview.ts
import { API_URL } from './base';



/**
 * Strapiからインタビューのデータを取得する関数
 * @returns インタビューデータの配列 (Promise)
 */
export async function fetchInterviews() {
  try {

    const response = await fetch(`${API_URL}/interviews?populate=*`);
    
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