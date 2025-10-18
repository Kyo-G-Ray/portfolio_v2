// src/api/interview.ts
import { API_URL } from './base';



/**
 * Strapiから制作実績のデータを取得する関数
 * @returns 制作実績データの配列 (Promise)
 */
export async function fetchWorks() {
  // try {

  //   const response = await fetch(`${API_URL}/works?populate=*`);
    
  //   // エラーハンドリング
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const data = await response.json();
    
  //   // Strapi v4のレスポンス形式に合わせてデータを整形して返す
  //   // data.dataがコンテンツの配列
  //   return data.data || [];

  // } catch (error) {
  //   console.error("データの取得中にエラーが発生しました:", error);
  //   return []; // エラー時は空の配列を返す
  // }



  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const API_URL = `${BASE_URL}/portfolioTable?type=work`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}