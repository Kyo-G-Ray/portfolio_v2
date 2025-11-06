// src/api/interview.ts
import { API_URL } from './base';



/**
 * Strapiから制作実績のデータを取得する関数
 * @returns 制作実績データの配列 (Promise)
 */
export async function fetchVoices() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const API_URL = `${BASE_URL}/portfolioTable?type=voice`;

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